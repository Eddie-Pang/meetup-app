import React, { useRef, useState } from "react";
import { searching } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function SearchArea() {
  const keywordRef = useRef();
  const locationRef = useRef();
  const [error, setError] = useState("");
  let navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    try {
      setError("");
      const query = {
        keyword: keywordRef.current.value,
        location: locationRef.current.value,
      };
      let result = await searching(query);

      navigate({
        pathname: "/result",
        data: result.data,
      });
    } catch {
      setError("failed to search");
    }
  }

  return (
    <form>
      <div className="form-row">
        <div className="col">
          <input
            type="texct"
            name="keyword"
            className="form-control"
            placeholder="Search for ..."
            ref={keywordRef}
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="Location"
            ref={locationRef}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-success mt-2 btn-block"
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
  );
}
