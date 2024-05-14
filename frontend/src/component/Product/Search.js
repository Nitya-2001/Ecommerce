import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const id = useParams();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`); // Using navigate function instead of history.push
    } else {
      navigate("/products"); // Using navigate function instead of history.push
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
