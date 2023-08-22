import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:5000/api/";
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGU2ZTMzY2IzNzYyZjZmNWM2Y2RhMSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODcwNTc1OTgsImV4cCI6MTY4NzMxNjc5OH0.lHovbtKMT5Mj1syLNkPAF_p7ytpFq3V_wTnIspW9mKo"
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { 'token': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjg3NTg3NzYxLCJleHAiOjE2ODc4NDY5NjF9.o1u0gF7YOEOB4X6RMAAqSLZPqfbDUSgAYYnsZOpUvOw" },
});
