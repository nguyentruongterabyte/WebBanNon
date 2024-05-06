import axios from "axios";
import { BASE_URL, API } from "./utils";

export default axios.create( {
  baseURL: BASE_URL + API
} );