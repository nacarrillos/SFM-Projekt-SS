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

//Wenn private Routes getriggert werden wird erst geprüft ob der Benutzer aunthentifiziert ist, ansonsten wird zu Login Page geführt
const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

//Wenn restricted Routes getriggert werden wird zum Home gebracht. z.B. LoginPage für schon gemeldete Benutzer
const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

//Context Definiert und jeder Seite unter dem Context gerendet. Erst Navbar, dann abhängig von den möglichen Routes die anderen Seiten
// und zuletzt das "Botton" Bar. Hier werden unter Private oder Restricted Routers die ausgewählte Routes platziert
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
