import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}

const CatHook = () => {
  const [myCat, setMyCat] = useLocalStorage("myCat", null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const registerCat = () => {
    let cat = { name: "Teru", weight: 10, age: 1.5 };
    setMyCat(cat);
  };

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setImageURL(result[0]["url"]);
      },
      (error) => {
        setIsLoaded(true);
        
      }
    )
  }, [])

  return (
    <div>
        {myCat ? 
          <div>
            <div>{myCat.name}</div>
            <div>{isLoaded && <img src={imageURL} ></img>}</div>
          </div> 
          : <button onClick={this.registerCat}>Register Cat</button>}
      </div>
  );
}
export default CatHook;