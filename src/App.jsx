import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { data } from "../data";
import Card from "./components/Card";
import Dropdown from "./components/Dropdown";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [exerciseName, setExerciseName] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      const exerciseData = await response.data;

      if (page === 1) {
        setItems([...exerciseData.slice(0, 12)]);
      } else {
        setItems((prevItems) => [
          ...prevItems,
          ...exerciseData.slice(page * 12, (page + 1) * 12),
        ]);
      }
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const filteredExercises = items.filter((exercise) => {
    if (filterValue && exerciseName) {
      if (filterValue[0] === "target") {
        return (
          exercise.target.includes(filterValue[1].toLowerCase()) &&
          exercise.name.includes(exerciseName.toLowerCase())
        );
      } else if (filterValue[0] === "equipment") {
        return (
          exercise.equipment.includes(filterValue[1].toLowerCase()) &&
          exercise.name.includes(exerciseName.toLowerCase())
        );
      } else if (filterValue[0] === "body part") {
        return (
          exercise.bodyPart.includes(filterValue[1].toLowerCase()) &&
          exercise.name.includes(exerciseName.toLowerCase())
        );
      }
    } else if (filterValue) {
      if (filterValue[0] === "target") {
        return exercise.target.includes(filterValue[1].toLowerCase());
      } else if (filterValue[0] === "equipment") {
        return exercise.equipment.includes(filterValue[1].toLowerCase());
      } else if (filterValue[0] === "body part") {
        return exercise.bodyPart.includes(filterValue[1].toLowerCase());
      }
    } else {
      return exercise.name.includes(exerciseName.toLowerCase());
    }
    // if (filterValue[0] === "target") {
    //   return exercise.target.includes(filterValue[1].toLowerCase());
    // } else if (filterValue[0] === "equipment") {
    //   return exercise.equipment.includes(filterValue[1].toLowerCase());
    // } else if (filterValue[0] === "body part") {
    //   return exercise.bodyPart.includes(filterValue[1].toLowerCase());
    // } else {
    //   return exercise.name.includes(exerciseName.toLowerCase());
    // }
  });

  const cardData = exerciseName || filterValue ? filteredExercises : items;

  console.log(filterValue);
  return (
    <>
      <h1>Exercise Selector</h1>
      <div className="exercise-name">
        <label htmlFor="exerciseName">Input Exercise Name </label>
        <input
          name="exerciseName"
          type="text"
          value={exerciseName}
          onChange={() => setExerciseName(event.target.value)}
        />
        <div className="filter">
          <div onClick={() => setShowDropdown(!showDropdown)}>Filter </div>
          {showDropdown && (
            <Dropdown
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          )}
        </div>
      </div>
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
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </>
  );
}

export default App;
