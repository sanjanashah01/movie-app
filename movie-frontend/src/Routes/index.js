import React from "react";
import { Routes, Route } from "react-router-dom";
import VerticalLayout from "../Layout/VerticalLayout/index";
import { publicRoutes } from "./routes";

const Index = () => {
  return (
    <Routes>
      <Route>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<VerticalLayout>{route.component}</VerticalLayout>}
            key={idx}
            exact={true}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Index;
