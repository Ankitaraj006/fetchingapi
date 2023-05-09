import React, { useState } from "react";
//import ReactDOM from "react-dom";
import axios from "axios";

function SearchField() {
  const [queries, setQueries] = useState("");
  const [output, setOutput] = useState([]);
  const [sorting, setSorting] = useState("Name");

  function changeHandler(event) {
    setQueries(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    axios
      .get(`https://api.github.com/search/repositories?q=${queries}`)
      .then((res) => {
        setOutput(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function sortHandler(event) {
    setSorting(event.target.value);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" onChange={changeHandler} />
        <button type="submit">Click here!!!</button>
        <label htmlFor="sort">Sort</label>
        <select name="select" onChange={sortHandler} value={sorting}>
          <option value="stars">Stars</option>
          <option value="watchers">watchers count</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created">created_at</option>
          <option value="updated">updated_at</option>
        </select>
      </form>
      <div>
        {output.map((output) => (
          <div key={output.id}>
            <img src={output.owner.avatar_url} />
            <h3>{output.name}</h3>
            <p>{output.description}</p>
            <a href={output.html_url}>Github</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchField;
