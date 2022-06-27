import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { BauteilContextProvider } from "./context/BauteilContext";
import BauteilHome from "./routes/BauteilHome";
import Home from "./routes/Home";
import LoginPage from "./routes/LoginPage";
import Bottom from "./components/Bottom";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

const App = () => {
  return (
    <BauteilContextProvider>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/bauteil/:id" element={<BauteilHome />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/protected" element={<ProtectedRoute />} />
          </Route>
          <Route element={<RestrictedRoutes />}>
            <Route exact path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
      <Bottom />
    </BauteilContextProvider>
  );
};

export default App;
