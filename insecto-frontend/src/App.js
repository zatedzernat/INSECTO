import React from "react";
import { Route, Switch } from "react-router-dom";
import Brands from "./views/Brands";
import Buildings from "./views/Buildings";
import Rooms from "./views/Rooms";
import Items from "./views/Items";
import ItemTypes from "./views/ItemTypes";
import ProblemDes from "./views/ProblemDescriptions";
import Statuses from "./views/Statuses";
import NotiProblems from "./views/NotificationProblems";
import HistoryLogs from "./views/HistoryLogs";
import SendProblem from "./views/mobile/SendProblem";
import MobileSendProblem from "./views/mobile/MobileSendProblem";
import SendProblemGroup from "./views/mobile/MobileSendProblemGroup";
import Home from "./views/mobile/trackingProblem";
import Thank from "./views/mobile/Thanks";
import { Mobile, Admin } from "./Layout/layout";
// import SelectTypeInRoom from "./views/mobile/SelectTypeInRoom";
// import SelectItemInRoom from "./views/mobile/SelectItemInRoom";
import SelectItemAndTypeInRoom from "./views/mobile/SelectItemAndTypeInRoom";
import NoResultFound from "./views/mobile/NoResultFound";

export default function App() {
  return (
    <div>
      <Switch>
        <RouteWrapper exact path="/" component={Home} layout={Mobile} />
        <RouteWrapper
          exact
          path="/admin"
          component={NotiProblems}
          layout={Admin}
        />
        <RouteWrapper path="/admin/brands" component={Brands} layout={Admin} />
        <RouteWrapper
          path="/admin/buildings"
          component={Buildings}
          layout={Admin}
        />
        <RouteWrapper path="/admin/rooms" component={Rooms} layout={Admin} />
        <RouteWrapper path="/admin/items" component={Items} layout={Admin} />
        <RouteWrapper
          path="/admin/item_types"
          component={ItemTypes}
          layout={Admin}
        />
        <RouteWrapper
          path="/admin/problem_descriptions"
          component={ProblemDes}
          layout={Admin}
        />
        <RouteWrapper
          path="/admin/status"
          component={Statuses}
          layout={Admin}
        />
        <RouteWrapper
          path="/admin/history_logs"
          component={HistoryLogs}
          layout={Admin}
        />
        <RouteWrapper
          exact
          path="/sendproblem/:code"
          component={SendProblem}
          layout={Mobile}
        />
        <RouteWrapper
          exact
          path="/sendproblem/:code/form"
          component={MobileSendProblem}
          layout={Mobile}
        />
        <RouteWrapper
          exact
          path="/sendproblem/room/:room_code"
          component={SendProblemGroup}
          layout={Mobile}
        />
        {/* <RouteWrapper
          exact
          path="/sendproblem/room/:room_code/types"
          component={SelectTypeInRoom}
          layout={Mobile}
        />
        <RouteWrapper
          exact
          path="/sendproblem/room/:room_code/types/items"
          component={SelectItemInRoom}
          layout={Mobile}
        /> */}
        <RouteWrapper
          exact
          path="/sendproblem/room/:room_code/items"
          component={SelectItemAndTypeInRoom}
          layout={Mobile}
        />
        <RouteWrapper
          exact
          path="/send/success"
          component={Thank}
          layout={Mobile}
        />
        <RouteWrapper component={NoResultFound} layout={Mobile} />
      </Switch>
    </div>
  );
}

function RouteWrapper({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
