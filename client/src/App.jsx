import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { BauteilContextProvider } from "./context/BauteilContext";
import BauteilHome from "./routes/BauteilHome";
import HomeBaugruppen from "./routes/HomeBaugruppen";
import HomeTeilegruppeAufbau from "./routes/HomeTeilegruppeAufbau";
import LoginPage from "./routes/LoginPage";
import Bottom from "./components/Bottom";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./styles/App.css";
import Datenschutz from "./routes/Datenschutz";
import Impressum from "./routes/Impressum";
import AdminHome from "./routes/AdminHome";
import HomeBauteilgruppeAußenwand from "./routes/HomeBauteilgruppeAußenwand";
import HomeBauteilgruppeInnenwand from "./routes/HomeBauteilgruppeInnenwand";
import HomeBauteilgruppeFußboden from "./routes/HomeBauteilgruppeFußboden";
import HomeBauteilgruppeFenster from "./routes/HomeBauteilgruppeFenster";
import HomeBauteilgruppeDach from "./routes/HomeBauteilgruppeDach";
import HomeBauteilgruppeTür from "./routes/HomeBauteilgruppeTür";
import HomeBauteilAußenwand from "./routes/HomeBauteilAußenwand";
import HomeBauteilInnenwand from "./routes/HomeBauteilInnenwand";
import HomeBauteilFußboden from "./routes/HomeBauteilFußboden";
import HomeBauteilDach from "./routes/HomeBauteilDach";
import HomeBauteilFenster from "./routes/HomeBauteilFenster";
import HomeBauteilTür from "./routes/HomeBauteilTür";

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
    <BauteilContextProvider className="App">
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomeBaugruppen />} />
            <Route  exact path="/aufbau" element={<HomeTeilegruppeAufbau/>}/>
            <Route exact path="/aufbau/aussenwand" element={<HomeBauteilgruppeAußenwand/>}/>
            <Route exact path="/aufbau/aussenwand/:teilenummer" element={<HomeBauteilAußenwand/>}/>
            <Route exact path="/aufbau/innenwand" element={<HomeBauteilgruppeInnenwand/>}/>
            <Route exact path="/aufbau/innenwand/:teilenummer" element={<HomeBauteilInnenwand/>}/>
            <Route exact path="/aufbau/fussboden" element={<HomeBauteilgruppeFußboden/>}/>
            <Route exact path="/aufbau/fussboden/:teilenummer" element={<HomeBauteilFußboden/>}/>
            <Route exact path="/aufbau/dach" element={<HomeBauteilgruppeDach/>}/>
            <Route exact path="/aufbau/dach/:teilenummer" element={<HomeBauteilDach/>}/>
            <Route exact path="/aufbau/fenster" element={<HomeBauteilgruppeFenster/>}/>
            <Route exact path="/aufbau/fenster/:teilenummer" element={<HomeBauteilFenster/>}/>
            <Route exact path="/aufbau/tuer" element={<HomeBauteilgruppeTür/>}/>
            <Route exact path="/aufbau/tuer/:teilenummer" element={<HomeBauteilTür/>}/>
            <Route exact path="/datenschutz" element={<Datenschutz />} />
            <Route exact path="/impressum" element={<Impressum />} />
            <Route exact path="/bauteil/:id" element={<BauteilHome />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/protected" element={<ProtectedRoute />} />
              <Route exact path="/admin" element={<AdminHome />} />
            </Route>
            <Route element={<RestrictedRoutes />}>
              <Route exact path="/login" element={<LoginPage />} />
            </Route>
            {/* <Route path='*' element={<Error/>}/> muss noch gemacht werden*/}
          </Routes>
          <Bottom />
        </Router>
      </div>
    </BauteilContextProvider>
  );
};

export default App;
