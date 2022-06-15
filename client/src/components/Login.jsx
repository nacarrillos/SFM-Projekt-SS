import React, { useContext, useState } from "react";
import { getBenutzerTyp, onLogin } from "../apis/AuthFinder";
//To dispatch an action for the slices authorization
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { BauteilContext } from "../context/BauteilContext";

const Login = () => {
  const [benutzername, setBenutzerName] = useState("");
  const [kennwort, setKennwort] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const { userData, setUserData } = useContext(BauteilContext);

  const dispatch = useDispatch();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await onLogin({
        benutzername: benutzername,
        kennwort: kennwort,
      });
      //wenn wir diese Aktion "dispatch" dann ist der State zu "true" geändert
      dispatch(authenticateUser());
      localStorage.setItem("isAuth", "true");
      setErrMsg("");

      const response2 = await getBenutzerTyp(benutzername);
      const benutzertyp = response2.data.data.benutzertyp;
      setUserData({
        benutzername,
        benutzertyp,
      });
      console.log(benutzertyp);
    } catch (err) {
      setErrMsg(err.response.data.errors[0]);
      console.error(err.message);
    }
  };

  return (
    // <>
    //   {success ? (
    //     <section>
    //       <h1>Erfolgreich eingeloggt</h1>
    //       <br />
    //       <p>
    //         <a href="/">Go to Home</a>
    //       </p>
    //     </section>
    //   ) : (
    <div>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg.msg}
      </p>
      <form action="">
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            value={benutzername}
            onChange={(e) => setBenutzerName(e.target.value)}
            type="text"
            id="benutzername"
            className="form-control"
            name="Benutzername"
            required
          />
          <label className="form-label" htmlFor="form2Example1">
            Benutzername
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            value={kennwort}
            onChange={(e) => setKennwort(e.target.value)}
            type="password"
            id="form2Example2"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="form2Example2">
            Kennwort
          </label>
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* <!-- Checkbox --> */}
            {/* verwendung zu prüfen!!! <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label className="form-check-label" for="form2Example31"> Remember me </label>
                        </div> */}
          </div>

          <div className="col">
            {/* <!-- Simple link --> */}
            <a href="#!">Passwort vergessen?</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}
        <button
          onClick={handleLogIn}
          type="button"
          className="btn btn-primary btn-block mb-4"
        >
          Anmelden
        </button>

        {/* <!-- Register Info --> */}
        <div className="text-center">
          <p>Für die Registrierung bitte den Admin kontaktieren</p>
        </div>
      </form>
    </div>
    //   )}
    // </>
  );
};

export default Login;
