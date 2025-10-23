import axios from "axios";
// Base API URL
// const base_url = "https://rooftop-uat.mpcz.in:8888/RCDC/api/movie";
const base_url = "https://resources.mpcz.in:8888/RCDC/api/movie";

// 1. User Login API
export const userLogin = (payload) => {
  return axios.post(
    "https://attendance.mpcz.in:8888/E-Attendance/api/user-login/authenticate",
    payload
  );
};

// 2. Create Movies
export const createMovieList = (payload) => {
  return axios.post(base_url + "/createMovie", payload);
};

// 3. Update Movies
export const updateMovieList = (payload) => {
  return axios.post(base_url + "/updateMovie", payload);
};

// 4. Get Movies List
export const getMovieList = () => {
  return axios.get(`${base_url}/getMyMoviesList?userId=12345`);
};

// Delete Movie
export const deleteMovie = (id) => {
  return axios.get(`${base_url}/removeMovieById?id=${id}`);
};
