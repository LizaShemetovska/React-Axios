import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

let apiUrl="https://jsonplaceholder.typicode.com/users";

class App extends Component {
  constructor(){
    super();
    this.state={
      persons:[],
      name:'',
      customers:[],
    }
  }
  componentDidMount(){
  
    axios.get(apiUrl)
    .then(res=>{
    const persons=res.data;
    this.setState({persons});
    })
  }
  handleChange =event =>{
    this.setState({name:event.target.value});
  }
  handleSubmit=event =>{
    event.preventDefault();
    const user ={name:this.state.name};
    axios.post(apiUrl , {user})
    .then (res =>{
      console.log(res);
      console.log(res.data);
  const customer=res.data;
  this.setState({customers: [...this.state.customers, customer]});
    })
    .catch(err=>{
      console.log(`Some error ${err}`);
    });
  }

  render() {
    return (
      <div className="App">
       <ul>
         {this.state.persons.map((person,index)=> <li key={index}>{person.name}</li>)}
       </ul>
       <div>
         <form onSubmit={this.handleSubmit}>
         <label>Person name:  
           <input type="text" name="name" on onChange={this.handleChange}/>
         </label>
         <button type="submit"> Add</button>
         </form>
       </div>
       <ul>
         {this.state.customers.map((customer,index)=> <li key={index}>{customer.user.name}</li>)}
       </ul>
      </div>
    );
  }
}

export default App;
