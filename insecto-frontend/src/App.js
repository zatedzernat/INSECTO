import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Brands from "./views/Brands";
import Buildings from "./views/Buildings";
import Rooms from "./views/Rooms";
import Items from "./views/Items";
import ItemTypes from "./views/ItemTypes";
import ProblemDes from "./views/ProblemDescriptions";
import Statuses from "./views/Statuses";
import NotiProblems from "./views/NotificationProblems";
import HistoryLogs from "./views/HistoryLogs";
import NotFoundPage from "./views/NotFoundPage";
import SendProblem from "./views/mobile/MobileSendProblem";

export default function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={NotiProblems} />
        <Route path="/brands" component={Brands} />
        <Route path="/buildings" component={Buildings} />
        <Route path="/rooms" component={Rooms} />
        <Route path="/items" component={Items} />
        <Route path="/item_types" component={ItemTypes} />
        <Route path="/problem_descriptions" component={ProblemDes} />
        <Route path="/status" component={Statuses} />
        <Route path="/history_logs" component={HistoryLogs} />
        {/* <Route path="/mobile/:id" render={(props) => <SendProblem {...props}/>} /> */}
        <Route path="/mobile" component={SendProblem} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}
