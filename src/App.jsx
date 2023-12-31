import { useState, useEffect } from "react";
import apiKey from "./apikey";
import uuid from "react-uuid";

import "./App.css";

function App() {
  const [gifSrc, setGifSrc] = useState("");

  const [numClicks, setNumClicks] = useState(0);

  const [highScore, setHighScore] = useState(0);

  const [clickedPics, setClickedPics] = useState([]);

  const onClick = (thisID) => {
    setClickedPics((prevPics) => [...prevPics, thisID]);
    console.log(clickedPics);
    if (clickedPics.includes(thisID)) {
      alert("You Lose!!!");
      setNumClicks(0);
      setClickedPics([]);
      if (numClicks > highScore) {
        setHighScore(numClicks);
      }
    } else setNumClicks((prevCount) => prevCount + 1);
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const searchTerm = "succession";
  useEffect(() => {
    const getData = async () => {
      const myData = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=9`,
        { mode: "cors" }
      );

      const goodData = await myData.json();

      shuffle(goodData.data);
      setGifSrc(goodData.data);
    };

    getData();
    return () => {
      setGifSrc("");
    };
  }, [numClicks]);

  return (
    <>
      <div className="score-container">
        <h1>Current Score: {numClicks}</h1>
        <h1>High Score: {highScore}</h1>
      </div>
      <div className="dog-container">
        {gifSrc.length > 0 &&
          gifSrc.map((gif) => {
            return (
              <img
                onClick={() => onClick(gif.id)}
                key={gif.id}
                src={gif.images.original.url}
              />
            );
          })}
      </div>
    </>
  );
}

export default App;
