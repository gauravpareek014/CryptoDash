import React from "react";
import RecentActivity  from "./RecentActivity";
import BTCHistViz from "./BTCHistViz";
import ETCHistViz from "./ETCHistViz";
import CompHistViz from "./CompHistViz";
import { Link } from "react-router"
import { Button,Jumbotron,Grid,Row,Col,Panel } from 'react-bootstrap';
import PortfolioPerformance from "./PortfolioPerformance";

export default class Home extends React.Component{
    constructor () {
        super()
        this.state = {
            isBTCHidden: false,
            isETHHidden: true,
            isCompHidden: true
        }
    }
    toggleBTC () {
        this.setState({
            isBTCHidden: false,
            isETHHidden: true,
            isCompHidden: true
        })
    }

    toggleETH () {
        this.setState({
            isBTCHidden: true,
            isETHHidden: false,
            isCompHidden: true
        })
    }

    toggleComp () {
        this.setState({
            isBTCHidden: true,
            isETHHidden: true,
            isCompHidden: false
        })
    }

    render(){
        return (

                   <Jumbotron>

                       <Grid>
                           <Row className="show-grid">
                               <Col xs={12} md={8}>

                                   <Grid>
                                       <Row className="show-grid">
                                           <Col xs={12} md={12} lg={12}>
                                               <Panel bsStyle="default">
                                                   <Panel.Heading>
                                                       <Panel.Title componentClass="h3">Price Comparison Panel      <Button  bsStyle="danger" onClick={this.toggleBTC.bind(this)} >
                                                                       Bitcoin
                                                                   </Button>
                                                                   <Button  bsStyle="danger" onClick={this.toggleETH.bind(this)} >
                                                                       Ethereum
                                                                   </Button>
                                                                   <Button  bsStyle="danger"  onClick={this.toggleComp.bind(this)} >
                                                                       Price Comparison
                                                                   </Button></Panel.Title>
                                                       
                                                   </Panel.Heading>
                                                   <Panel.Body>
                                                       <Grid>
                                                           <Row className="show-grid">
                                                               <Col xs={12} md={8}>
                                                                   {!this.state.isBTCHidden && <div><BTCHistViz/></div>}
                                                               </Col>
                                                               <Col xs={12} md={8}>
                                                                   {!this.state.isETHHidden && <div><ETCHistViz/></div>}
                                                               </Col>
                                                               <Col xs={12} md={8}>
                                                                   {!this.state.isCompHidden && <div><CompHistViz/></div>}
                                                               </Col>
                                                           </Row>
                                                       </Grid>
                                                   </Panel.Body>
                                               </Panel>
                                           </Col>
                                       </Row>
                                   </Grid>

                                   {/*<Grid>
                                       <Row className="show-grid">
                                           <Col sm={6} md={4}>
                                               <Panel bsStyle="default">
                                                   <Panel.Heading>
                                                       <Panel.Title componentClass="h3">Bitcoin Brushing Graph</Panel.Title>
                                                   </Panel.Heading>
                                                   <Panel.Body/>
                                               </Panel>
                                           </Col>

                                           <Col sm={6} md={4}>
                                               <Panel bsStyle="default">
                                                   <Panel.Heading>
                                                       <Panel.Title componentClass="h3">Ethereum Brushing Graph</Panel.Title>
                                                   </Panel.Heading>
                                                   <Panel.Body/>
                                               </Panel>
                                           </Col>
                                       </Row>
                                   </Grid>*/}
                               </Col>

                               <Col xs={12} md={4}>
                                   <Panel bsStyle="default">
                                       <Panel.Heading>
                                           <Panel.Title componentClass="h3">Portfolio Performance</Panel.Title>
                                       </Panel.Heading>
                                       <Panel.Body >
                                           <PortfolioPerformance/>
                                        
                                       </Panel.Body>
                                   </Panel>

                                   <Panel bsStyle="default">
                                       <Panel.Heading>
                                           <Panel.Title componentClass="h3">Recent Activity</Panel.Title>
                                       </Panel.Heading>
                                       <Panel.Body>
                                       <RecentActivity/>
                                       </Panel.Body>
                                   </Panel>
                               </Col>

                           </Row>
                       </Grid>



                   </Jumbotron>

    );
    }
}

