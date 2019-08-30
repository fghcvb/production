import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddItem from './AddItem';


const products = [
  {
    name: "ipad",
    price: 200,
  },
  {
    name: "iphone",
    price: 650,
  }

]
localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  before delete
      // products1: []
      // when deleted entry
      products1: JSON.parse(localStorage.getItem('products'))
    };

    // binding events methods
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);

  }
  componentWillMount() {
    // before delete code
    // this.getProducts();
    // when deleted entry
    const products1 = this.getProducts();
    this.setState({ products1 });
  }

  getProducts() {
    // before delete code
    // const products1 = JSON.parse(localStorage.getItem('products'));
    // this.setState({ products1 });
    // console.log('products', products1);

    // when deleted entry
    //  return JSON.parse(localStorage.getItem('products'));
    return this.state.products1;
  }
  onAdd(name, price) {
    console.log(name, price);
    const products1 = this.getProducts();
    products1.push({
      name,
      price
    });
    this.setState({ products1 });
  }
  onDelete(name) {
    //console.log(name);
    // when deleted entry
    const products1 = this.getProducts();
    const filteredProducts = products1.filter(product => {
      return product.name !== name;
    });

    // console.log('filteredProducts', filteredProducts);
    this.setState({ products1: filteredProducts });
  }
  onEditSubmit(name, price, originalName) {
   // console.log(name, price);
   let products1 = this.getProducts();
   products1 = products1.map(product => {
     if(product.name === originalName){
      product.name = name;
      product.price = price;
     }
     return product;
   });
   // console.log('products1', products1);
   this.setState({ products1 });

  }


  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>
        <AddItem
          onAdd={this.onAdd}
        />
        {
          this.state.products1.map(product => {
            return (
              <ProductItem
                key={product.name}
                {...product}
                onDelete={this.onDelete}
                onEditSubmit={this.onEditSubmit}
              />
            );
          })
        }
      </div>
    );
  }

}

export default App;
