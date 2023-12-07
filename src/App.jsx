import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { data } from "../data";
import Card from "./components/Card";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [page, setPage] = useState(1);

  const [exerciseName, setExerciseName] = useState("");

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // console.log(data.slice(0, 10));
  // console.log(data.slice(page * 10, (page + 1) * 10), page)
  // console.log(data.slice(11, 20))
  // console.log(items);
  // async function fetchData() {
  //   // const options = {
  //   //   method: "GET",
  //   //   url: "https://exercisedb.p.rapidapi.com/exercises",
  //   //   headers: {
  //   //     "X-RapidAPI-Key": API_KEY,
  //   //     "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  //   //   },
  //   // };

  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     // const response = await axios.request(options);
  //     // console.log(response.data);
  //     // const data = await response.data;
  //     // setItems((prevItems) => [...prevItems, ...data]);
  //     // console.log(data);

  //     if (page === 1) {
  //       setItems((prevItems) => [...data.slice(0, 10)]);
  //       console.log("STILL AT 1")
  //     } else {
  //       setItems((prevItems) => [
  //         ...prevItems,
  //         ...data.slice(page * 10, (page + 1) * 10),
  //       ]);
  //       console.log("asdsadasdasdad")
  //     }
  //     console.log(data.slice(page + 10, page * 10))
  //     setPage((prevPage) => prevPage + 1);
  //     // const updatedPage = page + 1;
  //     // console.log(updatedPage, "UPDATEDPAGE")
  //     // setPage(updatedPage);

  //     console.log(page, items);
  //   } catch (error) {
  //     console.error(error);
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // // console.log(items, page, "PUITSIODE")

  // // useEffect(() => {
  // //   console.log(items, page, "PUITSIODE");
  // // }, [items, page]);

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //       document.documentElement.offsetHeight ||
  //     isLoading
  //   ) {
  //     return;
  //   }
  //   fetchData();
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading]);

  // console.log(page,items,isLoading);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // const response = await fetch(`https://api.example.com/items?page=${page}`);
      // const data = await response.json();

      // setItems(prevItems => [...prevItems, ...data]);

      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      console.log(response.data);
      const exerciseData = await response.data;
      // setItems((prevItems) => [...prevItems, ...data]);
      // console.log(data);

      if (page === 1) {
        setItems([...exerciseData.slice(0, 10)]);
        console.log("STILL AT 1");
      } else {
        setItems((prevItems) => [
          ...prevItems,
          ...exerciseData.slice(page * 10, (page + 1) * 10),
        ]);
        console.log("asdsadasdasdad");
      }
      setPage((prevPage) => prevPage + 1);
      console.log(page, items);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(page);

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

  const filteredExercises = items.filter((exercise) =>
    exercise.name.includes(exerciseName.toLowerCase())
  );

  const cardData = exerciseName ? filteredExercises : items;

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
      {/* <div className="card-container">
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
      </div> */}
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
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </>
  );
}

export default App;
