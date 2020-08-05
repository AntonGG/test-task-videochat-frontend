import React from "react";
import { Redirect, Route, Switch } from "react-router";
import SignIn from "./containers/Auth/SignIn";
import NotFound from "./components/NotFound/NotFound";
import VideoChat from "./containers/VideoChat/VideoChat";

// генерирует Route компонент
const CreateRoute = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <CreateRoute key={route.key} {...route} />;
      })}
      <Route component={() => NotFound()} />
    </Switch>
  );
}

const ROUTES = [
  {
    path: "/",
    key: "HOME",
    exact: true,
    component: () => <Redirect to={"/auth/signIn"} />,
  },
  {
    path: "/auth",
    key: "AUTH",
    component: RenderRoutes,
    routes: [
      {
        path: "/auth/signIn",
        key: "AUTH_SIGNIN",
        component: SignIn,
      },
    ],
  },
  {
    path: "/vc",
    key: "VC",
    component: (props) => {
      console.log("VC PROPS:", props);
      const name = localStorage.getItem("name");
      if (name) {
        return <RenderRoutes {...props} />;
      } else {
        if (props.location && props.location.pathname) {
          // "/vc/videochat/evf43rved23wecrv43e"
          const roomid = props.location.pathname.split("/vc/videochat/");
          if (roomid.length > 1) {
            localStorage.setItem("beginRoomId", roomid[1]);
          }
        }
        //alert("You need to log in to access app routes");
        return <Redirect to={"/"} />;
      }
    },
    routes: [
      {
        path: "/vc/videochat/:roomId",
        key: "VC_VIDEOCHAT_ROOM",
        exact: true,
        component: VideoChat,
      },
      {
        path: "/vc/videochat",
        key: "VC_VIDEOCHAT",
        exact: true,
        component: VideoChat,
      },
    ],
  },
];

export default ROUTES;
