import axios from "axios";
import { BASE_URL } from "./utils";

export default axios.create( {
  baseURL: BASE_URL
} );