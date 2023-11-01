import { useState, useEffect } from "react";
import apiKey from "./apikey";
import uuid from "react-uuid";

import "./App.css";

function App() {
  const [dogSrc, setDogSrc] = useState("");

  const searchTerm = "dogs";
  useEffect(() => {
    const getData = async () => {
      const myData = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=12`,
        { mode: "cors" }
      );

      const goodData = await myData.json();
      setDogSrc(goodData.data);
      console.log(dogSrc);
    };

    getData();
    return () => {
      setDogSrc("");
    };
  }, []);

  return (
    <>
      <div className="dog-container">
        {dogSrc.length > 0 &&
          dogSrc.map((gif) => {
            return <img id="poo" key={"poo"} src={gif.images.original.url} />;
          })}
      </div>
    </>
  );
}

export default App;
