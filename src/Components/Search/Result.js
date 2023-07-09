import { Card } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Result = ({ event }) => {
  const navigate = useNavigate();
  function handleClick(event) {
    navigate(`/event-viewer/?&method=search&&event=${event._id}`);
  }

  return (
    <Card
      className="result-card"
      type="submit"
      onClick={() => handleClick(event)}
    >
      <Card.Body>
        <ul>
          <Card.Title>{event.groupName}</Card.Title>
        </ul>
        <ul>
          <Card.Text>{event.description}</Card.Text>
        </ul>
        <ul>
          <b>Location: </b>
          {event.location}
        </ul>
        <ul>
          <b>Host: </b>
          {event.host}
        </ul>
        <ul>
          <b>Date: </b>
          {event.date}, {event.time}
        </ul>
      </Card.Body>
    </Card>
  );
};
export default Result;
