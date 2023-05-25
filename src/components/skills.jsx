import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSearch } from "../features/skillsSlice";

const Skills = () => {
  const { search, items, loading, error } = useSelector(
    (state) => state.skills
  );
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(changeSearch(e.target.value));
  };

  const hasReq = search.length > 0;

  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!hasReq && <p>Type something to search...</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Skills;
