import { useState, useEffect } from "react";
import { DefaultLayout } from "container";
import PrivateRouter from "PrivateRouter";
import PublicRouter from "PublicRouter";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Login = React.lazy(() => import("./pages/LoginPage"));
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const { REACT_APP_BASE_URL } = process.env;

function App() {
  useEffect(() => {
    async function fetchDataparams() {
      try {
        const response = await fetch(`${REACT_APP_BASE_URL}posts/`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        console.log("result: ", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataparams();
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route element={<PublicRouter />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/*<Route exact path="/login" name="Login Page" element={<Login />} />*/}
          {/*<Route exact path="/register" name="Register Page" element={<Register />} />*/}
          {/*<Route exact path="/404" name="Page 404" element={<Page404 />} />*/}
          {/*<Route exact path="/500" name="Page 500" element={<Page500 />} />*/}
          <Route element={<PrivateRouter />}>
            <Route path="*" element={<DefaultLayout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
