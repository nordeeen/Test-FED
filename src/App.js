import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "./index.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => {
        const values = res.data.results;
        setItems(
          values
            .map((data) => {
              return {
                label: data.name,
                value: data.name,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
        console.log(res.data.results);
      })
      .catch((error) => {
        console.error(`Error Message : ${error.message}`);
      });
  }, []);

  const handleButton = () => {
    setIsShow((state) => !state);
  };

  return (
    <>
      <h1 style={{ textTransform: "uppercase" }}>{isShow ? userSelect : ""}</h1>
      <button onClick={handleButton} style={{ margin: "auto" }}>
        {isShow ? "Show Name" : "Hide Button"}
      </button>
      <Select options={items} onChange={(e) => setUserSelect(e.value)} />
    </>
  );
};

export default App;
