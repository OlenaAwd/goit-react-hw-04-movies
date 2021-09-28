import { useState } from "react";
import PropTypes from "prop-types";
import css from "./SearchForm.module.css";

function SearchForm({ search }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentQuery = query.trim();
    if (!currentQuery) return;
    search(currentQuery);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}

export default SearchForm;

SearchForm.propTypes = {
  search: PropTypes.func.isRequired,
};
