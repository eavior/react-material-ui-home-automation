import axios from "axios";
require("dotenv").config();

// const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = ""; // backend server url
const sensiboUrl = "https://home.sensibo.com/api/v2";
const standardHeader = {
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
};

export async function getUserACs(apiKey) {
  const response = await axios.get(
    sensiboUrl + "/users/me/pods?apiKey=" + apiKey,
    { "Access-Control-Allow-Origin": "*" },
    standardHeader
    // getAuthConfig(token)
  );
  const result = response.data.result;
  return result;
}

async function processResponse(itemId, response1, response2) {
  let result = {
    id: itemId,
    status: response1.status,
    on: response1.acState.on,
    mode: response1.acState.mode,
    targetTemperature: response1.acState.targetTemperature,
    temperatureUnit: response1.acState.temperatureUnit,
    fanLevel: response1.acState.fanLevel,
    swing: response1.acState.swing,
    light: response1.acState.light,
    changedProperties: response1.changedProperties,
    reason: response1.reason,
    failureReason: response1.failureReason,
    currentTemperature: response2.temperature.pop().value,
    currentHumidity: response2.humidity.pop().value,
  };
  return result;
}

export async function getACData(apiKey, itemId) {
  const response1 = await axios.get(
    sensiboUrl + "/pods/" + itemId + "/acStates?limit=1&apiKey=" + apiKey,
    standardHeader
    // getAuthConfig(token)
  );
  const response2 = await axios.get(
    sensiboUrl + "/pods/" + itemId + "/historicalMeasurements?apiKey=" + apiKey,
    standardHeader
    // getAuthConfig(token)
  );
  const result = processResponse(
    itemId,
    response1.data.result[0],
    response2.data.result
  );
  return result;
}

export async function changeACState(apiKey, itemId, property, newValue) {
  const response1 = await axios.patch(
    sensiboUrl +
      "/pods/" +
      itemId +
      "/acStates/" +
      property +
      "?apiKey=" +
      apiKey,
    {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      newValue: newValue,
    }
    // getAuthConfig(token),
  );
  const response2 = await axios.get(
    sensiboUrl + "/pods/" + itemId + "/historicalMeasurements?apiKey=" + apiKey,
    standardHeader
    // getAuthConfig(token)
  );
  const result = processResponse(
    itemId,
    response1.data.result,
    response2.data.result
  );
  return result;
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
