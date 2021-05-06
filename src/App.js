import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerEdit from './CustomerEdit';
import PromotionList from './PromotionList'
import PromotionEdit from './PromotionEdit';


class App extends Component {
  render() {
    return (
 
   
      <Router>
        <Switch>
          <Route path='/' exact={true} component={PromotionList}/>
          <Route path='/promotion/:id' exact={true} component={PromotionEdit}/>
          {/* <Route path='/customers' exact={true} component={CustomerList}/> */}
          <Route path='/customers/:id' component={CustomerEdit}/>

        </Switch>
      </Router>
     
    )
  }
}

export default App;