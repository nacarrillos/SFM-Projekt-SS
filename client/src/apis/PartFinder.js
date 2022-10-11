import axios from "axios";

//generelle API für Backend
export default axios.create({
  baseURL: "/api",
});
