import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { isTemplateElement } from '@babel/types';

let countId = 0

function InputField(props) {
  const [value, setValue] = useState(null)
  function submitForm(e) {
    props.handleSubmit(e);
    setValue('');
  }
  return (
    <form onSubmit = {(e) => submitForm(e)}>
    <label>
      Add Item
      <input type="text" 
            value = {value} 
            onChange = {(e) => setValue(e.target.value)}
            onSubmit = {(e) => submitForm(e)}
            />
    </label>
    <input type="submit" value="Submit"/>
  </form>
  )
}


// class InputField extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value:"",
//     }
//     this.handleChange = this.handleChange.bind(this)
//   }

//   handleChange(e) {
//     this.setState({
//       value: e.target.value,
//     })
//   }
  
//   render() {
//     return (
    // <form onSubmit = {this.props.handleSubmit}>
    //   <label>
    //     Add Item
    //     <input type="text" 
    //           value = {this.state.value} 
    //           onChange = {this.handleChange}
    //           onSubmit = {this.props.handleSubmit}
    //           />
    //   </label>
    //   <input type="submit" value="Submit"/>
    // </form>
//     )
//   }
// }

function ItemButton(props) {
  return (
    <button onClick={props.handleClick} label = {props.label}>{props.label}</button>
  )
}

function ItemTitle(props) {
  return (
    <span>{props.text}</span>
  )
}

function Item(props) {
  return (
    <div id={props.id}>
      <ItemButton label = 'x' handleClick = {props.handleClick}/>
      <ItemTitle text = {props.title} width = "200"/>
      <ItemButton label = '-' handleClick = {props.handleClick}/>
      <ItemTitle text = {props.score} width = "20"/>
      <ItemButton label = "+" handleClick = {props.handleClick}/>
    </div>
  )
}

function ListItems(props) {
  let styleObject = {"listStyleType": "none"}
  let elements = Array.from(props.elements)
  console.log("List Items Props: ", elements)
  return (
    <ul style={styleObject}>
      {elements.map((item,index) => {
        return (<li key={item.id}>
          <Item id={item.id} title={item.title} score={item.score} handleClick={props.handleClick} />
        </li>);
      })}
    </ul>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      items: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }
  nextId() {
    var oldID = countId
    countId++
    return (oldID)
  }

  handleSubmit(e) {
    console.log("Title: ", e.target[0].value)
    e.preventDefault()
    this.setState({
      items: [...this.state.items,
        {title: e.target[0].value,
         id: this.nextId(),
         score: 0,
        }]
    }, () => console.log("State: ", this.state))
  }

  handleClick(e) {
    console.log("Label: ",e.target.getAttribute("label"), "Current State: ",this.state.items)
    const label = e.currentTarget.getAttribute("label")
    const itemId = parseInt(e.currentTarget.parentNode.id,10)

    function findingIndex(element) {
      console.log("printing findingIndex: ", element.id, "printing ItemID: ", itemId)
      return parseInt(element.id,10) === itemId
    }
    
    if(label === "x") {
      console.log("Deleting: ")
      this.setState({
        items: this.state.items.filter(item => item.id !== itemId)
      })

    } else if(label === "+") {
      let itemIndex = this.state.items.findIndex(findingIndex)
      let stateCopy = Object.assign({}, this.state)
      stateCopy.items[itemIndex].score += 1
      this.setState(stateCopy)

    } else {
      console.log("Label: ", label)
      let itemIndex = this.state.items.findIndex(findingIndex)
      let stateCopy = Object.assign({}, this.state)
      stateCopy.items[itemIndex].score -= 1
      this.setState(stateCopy)
  }
}

  render() {
    return (
    <div>
      <InputField handleSubmit={this.handleSubmit}/>
      <ListItems elements = {this.state.items} handleClick = {this.handleClick}/>
    </div>
    )
  }

}




// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
