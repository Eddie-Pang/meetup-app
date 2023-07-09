import React from "react";

import SearchArea from "./SearchArea";
import { useLocation } from "react-router-dom";
import "../../styles/resultStyle.css";
import NavBar from "../NavBar";
import { useAuth } from "../../Context/AuthContext";
import { loadingIcon } from "../../util/imgPicker";
import Result from "./Result";

export default function ResultPage() {
  let location = useLocation();

  const { loading } = useAuth();
  console.log(location.state);
  const events = location.state;

  // console.log(events);

  const renderResult = (events) => {
    if (!events) return <>not</>;
    return (
      <>
        {events?.map((event, index) => {
          return (
            <div key={index}>
              <Result event={event} />
              <br />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <NavBar />

      <div className="results">
        <SearchArea />
        <br />
        {loading ? (
          <div style={{ width: "600px", margin: "auto", textAlign: "center" }}>
            {loadingIcon()}
          </div>
        ) : (
          renderResult(events)
        )}
      </div>
    </>
  );
}
