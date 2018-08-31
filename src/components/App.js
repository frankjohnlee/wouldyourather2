import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { List, ListItem, ListItemGraphic,  ListItemMeta, ListItemText,  ListGroup, ListDivider } from 'rmwc/List';
import { handleInitialData } from '../actions/shared'
import {connect} from 'react-redux';
import Dashboard from "./Dashboard";
import { Drawer, DrawerHeader, DrawerContent, DrawerTitle, DrawerSubtitle, DrawerAppContent} from 'rmwc/Drawer';
import {Col, Grid, Row} from "react-flexbox-grid";
import { CONST_All_Questions, CONST_ANSWERED_ONLY, CONST_UNANSWERED_ONLY } from "./Dashboard";
import './App.css';
import QuestionCard from "./QuestionCard"
import {Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarMenuIcon, ToolbarIcon, ToolbarFixedAdjust} from 'rmwc/Toolbar';
import { Card } from 'rmwc/Card'
import MaterialIcon from '@material/react-material-icon';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            dismissibleOpen: true
        }
    }


  componentDidMount(){
    /* When this component mounts get the data */
      this.props.dispatch(handleInitialData())
  }
  render() {
    const { name } = this.props;
    return (
        <Router>
            <div>
            <Toolbar >
                      <ToolbarRow>
                            <ToolbarSection alignStart>
                                  <ToolbarMenuIcon icon="comment"/>
                                <ToolbarTitle>Would You Rather</ToolbarTitle>
                             </ToolbarSection>
                             <ToolbarSection alignEnd>
                                   <ToolbarMenuIcon icon="how_to_reg"/>
                                 <ToolbarTitle>{ name } </ToolbarTitle>

                             </ToolbarSection>
                        </ToolbarRow>

                </Toolbar>
                <ToolbarFixedAdjust />
            <Grid fluid>
                <Row>
                    <Col xs={3} md={3}>
                        <Card>
                        <DrawerContent>
                                <ListDivider />
                                <Link to={'/'}  >
                                    <ListItem>
                                           <ListItemGraphic icon="home"/>
                                            Home
                                    </ListItem>
                                </Link>
                                <ListDivider />
                                <Link to={'answered'}  >
                                    <ListItem>
                                        <ListItemGraphic icon="favorite"/>
                                          Answered
                                    </ListItem>
                                </Link>
                                <ListDivider />
                                <Link to = {'/unanswered'}>
                                    <ListItem>
                                        <ListItemGraphic icon = "favorite_border"/>
                                        Unanswered
                                    </ListItem>
                                </Link>
                                <ListDivider />
                                <Link to={'/all'}>
                                    <ListItem>
                                        <ListItemGraphic icon = "group_work"/>
                                        All
                                    </ListItem>
                                </Link>
                                <ListDivider />
                                <Link to={'/create'}>
                                     <ListItem>
                                        <ListItemGraphic icon = "add"/>
                                        New Question
                                    </ListItem>
                                </Link>
                                <ListDivider />
                                <Link to={'/leaderboard'}>
                                    <ListItem>
                                        <ListItemGraphic icon = "bar_chart"/>
                                        Leaderboard
                                    </ListItem>
                                </Link>
                                <ListDivider />
                                <Link to={'/logout'}>
                                    <ListItem>
                                        <ListItemGraphic icon = "verified_user"/>
                                        Logout
                                    </ListItem>
                                </Link>
                                <ListDivider />


                            </DrawerContent>
                        </Card>

                    </Col>
                    <Col xs={7} md={7}>


                            {
                                this.props.loading === true
                                    ? null
                                    :
                                        <div>
                                            <Route path = '/' exact render={()=><Dashboard mode = { CONST_UNANSWERED_ONLY }/>}/>
                                            <Route path = '/answered'  render={()=><Dashboard mode = { CONST_ANSWERED_ONLY }/>}/>
                                            <Route path = '/unanswered'  render={()=><Dashboard mode = { CONST_UNANSWERED_ONLY }/>}/>
                                            <Route path = '/all'  render={()=><Dashboard mode = {CONST_All_Questions}/>}/>
                                            <Route path = '/question/:id'  render={()=><QuestionCard mode = { CONST_ANSWERED_ONLY }/>}/>
                                        </div>
                            }
                    </Col>
                </Row>
            </Grid>
            </div>
        </Router>

    );
  }


}

function mapStateToProps({authedUser, users}){
    let name = "";
    if (users[authedUser] !== undefined){
        name = users[authedUser].name;
    }
   return {
       loading: authedUser === null,
       name: name
   }
}

export default connect(mapStateToProps)(App);
