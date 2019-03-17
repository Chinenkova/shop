import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class Store extends Component {
  state = {
    items: [],
    cart: {}
  }
  componentDidMount() {
    localStorage.getItem('cart') && this.setState({cart: JSON.parse(localStorage.getItem('cart'))});
    fetch('/items')
      .then(res => res.json())
      .then(items => this.setState({ items }));
  }

  columns = [{
    Header: 'Наименование',
    accessor: 'name'
  }, {
    Header: 'Доступно (шт.)',
    accessor: 'inStore',
  }, {
    Header: 'Цена',
    accessor: 'price'
  }, {
    Header: '',
    Cell: cellInfo => {
      if(cellInfo.original.inStore) {
        if(this.state.cart[cellInfo.original.id] && (this.state.cart[cellInfo.original.id].quantity >= parseInt(cellInfo.original.inStore, 10))) {
          return 'Невозможно заказать больше'
        } else {
          return (
            <button onClick={this.addToCart(cellInfo.original)}>Добавить в корзину</button>
          )
        }        
      } else {
        return 'Товара нет в наличии'
      }      
    }
  }]

  addToCart = item => () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    const {id, name, price} = item;
    const newItem = {
      id,
      name,
      price,
      quantity: 1
    }
    if(Object.keys(cart).length && Object.keys(cart).indexOf(String(newItem.id)) !== -1) {
      cart[newItem.id].quantity += 1;        
    } else {
      cart[newItem.id] = newItem;
    }
    this.setState({cart});
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  render() {
    const data = Object.values(this.state.items)
    return (
      <div className="App">
        <h1>Магазин</h1>
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

export default Store;
