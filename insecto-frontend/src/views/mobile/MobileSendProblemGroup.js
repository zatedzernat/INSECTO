import React, { useState, useEffect } from "react";
import axios from "axios";
import ProblemsNotResolved from "./ProblemsNotResolved";
import { Redirect } from "react-router-dom";

export default function MobileSendProblem(props) {
  const [itemGroupByType, setItemGroupByType] = useState({});
  const [room, setRoom] = useState({});
  const [problemsNotResolvedInRoom, setProblemsNotResolvedInRoom] = useState(
    []
  );
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [viewStep, setViewStep] = useState(0);
  const room_code = props.match.params.room_code;

  const fetchData = async (source) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}sendprobleminroom/${room_code}`,
        { cancelToken: source.token }
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
        setViewStep(3);
      } else {
        //* wait for check room (if not found return not found page (room not found))
        setRoom(res.data.room);
        setItemGroupByType(res.data.itemsGroupByType);
        setProblemsNotResolvedInRoom(res.data.problemsNotResolvedInRoom);
        if (res.data.problemsNotResolvedInRoom.length > 0) {
          setViewStep(1); //problems not resolved
        } else {
          setViewStep(2); //select types
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    fetchData(source);

    return () => {
      source.cancel();
    };
  }, []);

  switch (viewStep) {
    case 0:
      return <div>Loading</div>;
    case 1:
      return (
        <ProblemsNotResolved
          room={room}
          problems={problemsNotResolvedInRoom}
          setViewStep={setViewStep}
        />
      );
    case 2:
      return (
        <Redirect
          push
          to={{
            pathname: `/sendproblem/room/${room_code}/types`,
            state: { room: room, itemGroupByType: itemGroupByType },
          }}
        />
      );
    case 3:
      return <div>Error Page</div>;
    default:
      break;
  }
}
