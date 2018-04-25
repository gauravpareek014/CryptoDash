import React from "react";
import ReactDOM from 'react-dom';
import {Button,Image,Jumbotron,Grid,Row,Col,Panel,Thumbnail,Label,Form,FormGroup,Alert,ControlLabel,FormControl} from 'react-bootstrap';
import FaAccount from 'react-icons/lib/md/account-balance-wallet'
import {Meteor} from "meteor/meteor";
import axios from 'axios';
import { withTracker } from 'meteor/react-meteor-data';
import { Userwallet } from '../../../api/transaction';



class BuyPayment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptos :'0.00',
            currency:'NULL',
            buy:'BUY',
            btc: 1,
            eth:this.props.eth,
            amount:'0.00',
            usd:'0.00',
            cryptototal:'0.0000'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    bitcoin() {
        this.setState({currency: "BTC"});

        axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos: cryptos});
            })
        document.getElementById("btc").setAttribute("class", "");
        document.getElementById("eth").setAttribute("class", "thumbnail");


    }

    etherium() {
        this.setState({currency: "ETH"});

        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then(res => {
                const cryptos = res.data;
                console.log(cryptos);
                this.setState({cryptos: cryptos});
            })
        document.getElementById("eth").setAttribute("class", "");
        document.getElementById("btc").setAttribute("class", "thumbnail");

    }

    buy() {
        this.setState({buy: "BUY"});
    }

    sell() {
        this.setState({buy: "SELL"});
    }

    handleSubmit(event) {
        event.preventDefault();
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        //var cryptos = '';
        let wallet = this.props.wallet;
        console.log(this.state.cryptos);
        if(wallet != 0){
        var transaction = 'BUY';
        var cryptocurrency = this.state.currency;
        var cryptoAmount = this.state.cryptos.USD;
        var cryptototal = number / cryptoAmount;
        var bankAmount = number;
        var date = new Date();
        var eth= wallet[0].eth;
        var btc=wallet[0].btc;
        var usd=wallet[0].usd-number;
        this.state.usd=usd;
        this.state.cryptototal=cryptototal;
        var walletid =wallet[0]._id;
        if(this.state.currency == "BTC"){
        btc=btc+cryptototal;
        
        }
        if(this.state.currency == "ETH"){
        eth=eth+cryptototal;
        }
    

       
        if(usd >= 0 && cryptocurrency != ''){
        Meteor.call('transactions.insert', transaction, cryptototal, cryptocurrency, cryptoAmount, bankAmount, date );
        Meteor.call('wallet.update',walletid,usd,btc,eth);
        this.setState({
            message: 'Purchase successful!',
            bstyle: 'success',
        });  
        }
        else{
            this.setState({
                message: 'Transaction Error, please review your purchase',
                bstyle: 'danger',
            });
    }
}
    else{
        this.setState({
            message: 'Account Setup Error! Please setup your account to start the transaction',
            bstyle: 'danger',
        });
    }
        // Clear form
        console.log(number);
        console.log(cryptototal);
        console.log(date);
        console.log(usd);
        console.log(btc);
        console.log(eth);
        console.log(wallet[0].usd);
        ReactDOM.findDOMNode(this.refs.numberInput).value = '';

    }

    changeAmount(){
        let wallet = this.props.wallet;
        if(wallet != 0){
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        this.setState({
            amount:number!=""?number:"0.00",
            cryptototal:number / this.state.cryptos.USD,
            usd:wallet[0].usd-number
            
        });
    }
    }

    render() {
        return (
            <div className="buySellPayment">
                <Grid>
                    <Row>
                        <Col xs={12} md={6}>
                            <Row>
                                <Col xs={4} md={2}>
                                    <Image src="/images/Bitcoin-icon.png" alt="20x20" id="btc" width="50px"
                                           height="50px"
                                           onClick={this.bitcoin.bind(this)} responsive/>
                                </Col>
                                <Col xs={4} md={2}>
                                    <Image src="/images/etherium-icon.png" alt="20x20" id="eth" width="50px"
                                           height="50px"
                                           onClick={this.etherium.bind(this)} responsive/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={20} md={20}>
                                    <Form horizontal className="customForm" onSubmit={this.handleSubmit.bind(this)}>
                                        <FormGroup controlId="formHorizontalCrypto">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                {this.state.currency}:
                                            </Col>
                                            <Col sm={10} lg={4}>
                                                <FormControl type="text" placeholder={this.state.cryptos.USD}
                                                             defaultValue={this.state.cryptos.USD}
                                                             readOnly="readOnly"></FormControl>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalInput">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                USD:
                                            </Col>
                                            <Col sm={10} lg={4}>
                                                <FormControl type="float" ref="numberInput" placeholder="0.00 USD"  onKeyUp={this.changeAmount.bind(this)}
                                                             required/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col smOffset={2} sm={10}>
                                                <Button type="submit" bsStyle="danger">{this.state.buy}</Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col smOffset={2} sm={10}>
                                                {this.state.message ? <Alert bsStyle={this.state.bstyle}
                                                                             id="alertBox">{this.state.message}</Alert> : undefined}
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={6}>
                            <Panel bsStyle="default">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Transaction Details</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <h2 className="trandetails">You are buying</h2>
                                    <h3 className="trandetails">{this.state.cryptototal} {this.state.currency}</h3>
                                    <h4 className="trandetails">@ ${this.state.cryptos.USD} per {this.state.currency}</h4>
                                    <hr/>
                                    <h4 className="trandetails"><FaAccount/>Payment Method : virtual wallet</h4>
                                    <h4 className="trandetails yes">Entered Amount is: ${this.state.amount}</h4>
                                    <hr/>
                                    <h5 className="trandetails">{this.state.cryptototal}{this.state.currency} .................... ${this.state.amount} </h5>
                                    <h5 className="trandetails">Remaining Wallet Amount .................... ${this.state.usd}</h5>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>

                </Grid>

            </div>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('wallet');
    return {
        wallet: Userwallet.find({},{userId:this.userId}).fetch(),
    };
})(BuyPayment);