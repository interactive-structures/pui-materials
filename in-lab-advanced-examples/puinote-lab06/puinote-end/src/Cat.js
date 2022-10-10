import React from 'react';
import './App.css';

class Cat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCat: JSON.parse(localStorage.getItem("myCat")) || null,
      isLoaded: false,
      imageURL: "",
    };
  }
  
  registerCat = () => {
    let cat = { name: "Teru", weight: 10, age: 1.5 };
    this.setState({
      myCat: cat
    });
  };

  componentDidMount() {
    localStorage.setItem("myCat", JSON.stringify(this.state.myCat));

    fetch("https://api.thecatapi.com/v1/images/search")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          imageURL: result[0]["url"]
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }

  componentDidUpdate() {
    localStorage.setItem("myCat", JSON.stringify(this.state.myCat));
  }
  
  render() {
    const myCat = this.state.myCat;
    const isLoaded = this.state.isLoaded;
    const imageURL = this.state.imageURL;
    return (
      <div>
        {myCat ? <div>
          {myCat.name}

          {isLoaded && <img src={imageURL} ></img>}
          </div> : <button onClick={this.registerCat}>Register Cat</button>}
      </div>
    );
  }
}

export default Cat;