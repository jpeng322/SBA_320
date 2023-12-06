import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { data } from "../data";
import Card from "./components/Card";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   getExercises();
  // }, []);

  async function getExercises() {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    console.log(options);
  }

  console.log(data);
  return (
      <div className="card-container">
        {data.map((exercise) => {
          return (
            <Card
              key={exercise.id}
              equipment={exercise.equipment}
              gif={exercise.gifUrl}
              name={exercise.name}
              target={exercise.target}
              bodyPart={exercise.bodyPart}
            />
          );
        })}
      </div>
  );
}

export default App;
