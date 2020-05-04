/*eslint-disable*/
import axios from "axios";

const instance = axios.create({
  baseURL: "https://pwsz-budget-tracker.azurewebsites.net",
});

export default instance;
