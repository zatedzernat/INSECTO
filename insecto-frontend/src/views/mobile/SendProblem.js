import React, { useState, useEffect } from "react";
import axios from "axios";
import ProblemsNotResolved from "./ProblemsNotResolved";
import { Redirect } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import NoResultFound from "./NoResultFound";

export default function SendProblem(props) {
  const [item, setItem] = useState({
    item_code: "Item Code",
    room_id: 0,
    item_name: "Item name",
  });
  const [allproblemDes, setAllProblemDes] = useState([]);
  const [problemsNotResolved, setProblemsNotResolved] = useState([]);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const code = props.match.params.code;
  const [viewStep, setViewStep] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}sendproblem/` + code
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
        setViewStep(3);
      } else {
        //* wait for check item (if not found return not found page (item not found))
        setItem(res.data.item);
        setAllProblemDes(res.data.problemsThatCanSend);
        setProblemsNotResolved(res.data.problemsNotResolved);
        if (props.location.state === undefined) {
          if (res.data.problemsNotResolved.length > 0) {
            setViewStep(1); //problems not resolved
          } else {
            setViewStep(2); //mobile send problem page
          }
        } else {
          if (props.location.state.form)
            if (props.location.state.form === "sendproblem in room") {
              setViewStep(2); //mobile send problem page
            }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (viewStep) {
    case 0:
      return <LoadingPage />;
    case 1:
      return (
        <ProblemsNotResolved
          item={item}
          problems={problemsNotResolved}
          setViewStep={setViewStep}
        />
      );
    case 2:
      return (
        <Redirect
          push
          to={{
            pathname: `/sendproblem/${code}/form`,
            state: {
              item: item,
              allproblemDes: allproblemDes,
            },
          }}
        />
      );
    case 3:
      return <NoResultFound message={isError.message} />;
    default:
      break;
  }
}
