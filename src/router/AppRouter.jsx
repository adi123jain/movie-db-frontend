import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Login";
import CreateMovies from "../components/CreateMovies";
import UpdateMovies from "../components/UpdateMovies";
import ViewMovies from "../components/ViewMovies";
import Layout from "../constants/Layout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route (no navbar) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Private Routes (with Navbar) */}
        <Route
          element={
            <PrivateRoute>
              <Layout /> {/* Navbar + outlet */}
            </PrivateRoute>
          }
        >
          <Route path="/createMovies" element={<CreateMovies />} />
          <Route path="/updateMovies" element={<UpdateMovies />} />
          <Route path="/viewMovies" element={<ViewMovies />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
