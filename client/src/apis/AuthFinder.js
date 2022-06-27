import axios from "axios";
//So dass wir mit Cookies arbeiten können und das Server die Token erhält
axios.defaults.withCredentials = true;

//Wenn wir einmal Registrierung über Frontend benutzen
// export async function onRegistration(registrationData) {
//   return await axios.post(
//     "http://localhost:4000/user/register",
//     registrationData
//   );
// }

export async function onLogin(loginData) {
  return await axios.post("/user/login", loginData);
}

export async function onLogout() {
  return await axios.get("/user/logout");
}

export async function fetchProtectedInfo() {
  return await axios.get("/user/protected");
}

export async function getBenutzerTyp(benutzername) {
  return await axios.get(`/user/benutzertyp/${benutzername}`);
}
