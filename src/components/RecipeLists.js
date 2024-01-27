import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { fetchData } from "../service";

function RecipeLists(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("Noodles");
  const [data, setData] = useState("");

  const searchrecipe = (searchQuery) => {
    fetchData(searchQuery).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  };

  useEffect(() => {
    fetchData(query).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  }, []);
  return (
    <div className="container">
      <div className="heading-line">
        <strong>Search Recipes</strong>
        <div className="input-wrapper">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search"
          />
          <button
            onClick={() => (searchrecipe(searchTerm), props.setLoader(true))}
          >
            <BsSearch />
          </button>
        </div>
      </div>
      <div className="flexbox">
        {data &&
          data.hits.map((item, index) => (
            <div key={index} className="flexItem">
              <div className="img-wrapper">
                <img src={item.recipe.image} alt={item.recipe.label} />
              </div>
              <p>{item.recipe.label}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipeLists;
