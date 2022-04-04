import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";

function SearchPage({ handleModal }) {
  return (
    <SearchForm handleModal={handleModal}/>
  );
}

export default SearchPage;
