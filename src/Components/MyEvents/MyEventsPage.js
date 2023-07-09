import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyPreviousEvents from "./MyPreviousEvents";
import MyEventsView from "./MyEventsView";
// import MyOwnEvents from './MyOwnEvents';

export default function MyEventsPage(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleRenderEventViewer(event) {
    navigate(`/event-viewer/?&method=myEvent&event=${event._id}`);
  }

  const renderPage = (pathname) => {
    switch (pathname) {
      case "/myEvents":
        return (
          <MyEventsView
            handleViewEvent={handleRenderEventViewer}
          ></MyEventsView>
        );
      case "/myEvents/previous":
        return <MyPreviousEvents {...props} />;
      default:
        return <MyPreviousEvents {...props} />;
    }
  };

  return renderPage(pathname);
}
