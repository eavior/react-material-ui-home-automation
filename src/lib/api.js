import axios from "axios";
require("dotenv").config();

// const apiKey = process.env.REACT_APP_API_KEY;
// const baseUrl = "http://127.0.0.1:5501";
const baseUrl = "https://home-automation-nodejs-server.herokuapp.com";
// const baseUrl =
//   "http://ec2-18-185-249-86.eu-central-1.compute.amazonaws.com/api";

export async function getUserACs(apiKey) {
  try {
    const response = await axios.get(
      baseUrl + "/sensibo/me/pods/" + apiKey
      // standardHeader
      // getAuthConfig(token)
    );
    const result = response.data.sensibo;
    return result;
  } catch (error) {
    //   alert(error.response.data.sensibo.message);
    alert(error);
  }
}

export async function getACData(apiKey, itemId) {
  try {
    const response = await axios.get(
      baseUrl + "/sensibo/ac/" + itemId + "/" + apiKey
      // standardHeader
      // getAuthConfig(token)
    );
    const result = response.data.sensibo;
    return result;
  } catch (error) {
    //   alert(error.response.data.sensibo.message);
    alert(error);
  }
}

export async function changeACState(apiKey, itemId, property, newValue) {
  try {
    const response = await axios.patch(
      baseUrl + "/sensibo/ac/" + itemId + "/" + property + "/" + apiKey + "/",
      {
        newValue: newValue,
      }
      // getAuthConfig(token)
    );
    const result = response.data.sensibo;
    return result;
  } catch (error) {
    //   alert(error.response.data.sensibo.message);
    alert(error);
  }
}

function getAuthConfig(token) {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}

export async function signUp(signUpData) {
  const response = await axios.post(`${baseUrl}/signup`, signUpData);
  return response.data;
}

export async function login(loginData) {
  const response = await axios.post(`${baseUrl}/login`, loginData);
  return response.data;
}

export async function createAPIkey(newAPIKey, token) {
  const response = await axios.post(
    `${baseUrl}/AC`,
    newAPIKey,
    getAuthConfig(token)
  );
  return response.data;
}

export async function createImage(newImage, token) {
  const response = await axios.post(
    `${baseUrl}/AC/picture_url`,
    newImage,
    getAuthConfig(token),
    {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${newImage._boundary}`,
      },
    }
  );
  return response.data;
}
