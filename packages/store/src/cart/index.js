import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

import './index.css';

class Cart extends Component {
    state = {
        cart: {},
        name: '',
        phone_number: ''
    }
  componentDidMount() {
    localStorage.getItem('cart') && this.setState({cart: JSON.parse(localStorage.getItem('cart'))})
  }

  columns = [{
    Header: 'Наименование',
    accessor: 'name'
  }, {
    Header: 'Количество',
    accessor: 'quantity',
  }, {
    Header: 'Цена',
    accessor: 'price'
  }]

  clearCart = () => () => {
    localStorage.removeItem('cart');
    this.setState({cart: {}});
  }

  handleChange = field => e => {
      this.setState({[field]: e.target.value})
  }

  createOrder = () => {
    if(Object.keys(this.state.cart).length) {
      fetch("/orders/create", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            phone_number: this.state.phone_number,
            order: Object.values(this.state.cart)
        })
    })
    this.clearCart()();
    } else {
      alert('Корзина пуста')
    }
        
  }

  render() {
      const data = Object.values(this.state.cart);
    return (
      <div className="App">
        <h1>Корзина</h1>
        <form onSubmit={this.createOrder} className="order-form">
            <label>
                Имя:
                <input type="text" value={this.state.value} onChange={this.handleChange('name')} />
            </label>
            <label>
                Номер телефона:
                <input type="text" value={this.state.value} onChange={this.handleChange('phone_number')} />
            </label>
            <button type="submit" value="Submit">Оформить заказ</button>
            <button type="button" onClick={this.clearCart()}>Очистить корзину</button>
        </form>
        <ReactTable 
          data={data}
          columns={this.columns}
          previousText='Назад'
          nextText='Далее'
          noDataText='Данные не найдены'
          pageText='Страница'
          ofText='из'
          rowsText='строк' 
        />                
      </div>
    );
  }
}

export default Cart;