import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import Store from './store';
import Cart from './cart';
import Orders from './orders';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <nav>
          <ul>
            <li><Link to='/store'>Магазин</Link></li>
            <li><Link to='/cart'>Корзина</Link></li>
            <li><Link to='/orders'>Заказы</Link></li>
          </ul>
        </nav>
      </header>
         <Switch>
          <Route exact path='/store' component={Store}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/orders' component={Orders}/>
        </Switch>
      </div>
    );
  }
}

export default App;
