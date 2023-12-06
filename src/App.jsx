import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { data } from "../data";
import Card from "./components/Card";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [exerciseName, setExerciseName] = useState("");

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

  // console.log(exerciseName);
  const filteredExercises = data.filter((exercise) =>
    exercise.name.includes(exerciseName.toLowerCase())
  );

  const cardData = exerciseName ? filteredExercises : data;
  console.log(filteredExercises);
  return (
    <>
      <h1>Exercise Selector</h1>
      <label htmlFor="exerciseName">Input Exercise</label>
      <input
        name="exerciseName"
        type="text"
        value={exerciseName}
        onChange={() => setExerciseName(event.target.value)}
      />
      <div className="card-container">
        {cardData.length > 0 ? (
          cardData.map((exercise) => {
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
          })
        ) : (
          <div className="no-exercises">No Exercises Available</div>
        )}
      </div>
    </>
  );
}

export default App;
