import React from "react";
import "./App.scss";
import GithubAutocomplete from "./GithubAutocomplete/GithubAutocomplete";


const App = () => {
  return (
    <div className="app">
      <p className="app-title">Github autocomplete component</p>
      <GithubAutocomplete />
    </div>
  );
};
export default App;
