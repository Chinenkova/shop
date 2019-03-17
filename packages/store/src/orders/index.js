import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class Orders extends Component {
  state = {
    orders: []
  }
  componentDidMount() {
    fetch('/orders')
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
  }

  columns = [{
    Header: 'Номер заказа',
    accessor: 'id'
  }, {
    Header: 'Сумма',
    Cell: cellInfo => {
      let sum = 0;
      cellInfo.original.order && cellInfo.original.order.forEach(item => {
        sum += item.quantity * item.price;
      })
      return sum;
    }
  }]
  
  render() {
    const data = Object.values(this.state.orders)
    return (
      <div className="App">
        <h1>Заказы</h1>
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

export default Orders;