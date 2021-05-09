import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PromotionEdit from './PromotionEdit'
import PromotionList from './PromotionList'



class App extends Component {
  render() {
    return (
 
   
      <Router>
        <Switch>
          <Route path='/' exact={true} component={PromotionList}/>
          <Route path='/promotion/:id' exact={true} component={PromotionEdit}/>
          
        </Switch>
      </Router>
     
    )
  }
}

export default App;