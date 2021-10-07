import axios from "axios";
require("dotenv").config();

// const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = "https://home-automation-nodejs-server.herokuapp.com"; // backend server url
// const baseUrl = "http://127.0.0.1:5501"; // backend server url

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
    alert(error.response.data.sensibo.message);
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
    alert(error.response.data.sensibo.message);
  }
}

export async function changeACState(apiKey, itemId, property, newValue) {
  try {
    const response = await axios.patch(
      baseUrl + "/sensibo/ac/" + itemId + "/" + property + "/" + apiKey,
      {
        newValue: newValue,
      }
      // getAuthConfig(token)
    );
    const result = response.data.sensibo;
    return result;
  } catch (error) {
    alert(error.response.data.sensibo.message);
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
