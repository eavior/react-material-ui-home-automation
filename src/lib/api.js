import axios from "axios";
require("dotenv").config();

// const apiKey = process.env.REACT_APP_API_KEY;
const BaseUrl = "";
const SensiboUrl = "https://home.sensibo.com/api/v2";

// export async function getUserACs(userId, token) {
export async function getUserACs(apiKey) {
  const response = await axios.get(
    SensiboUrl + "/users/me/pods?apiKey=" + apiKey
    // getAuthConfig(token)
  );
  const result = response.data.result;
  return result;
}

export async function getACData(apiKey, itemId) {
  const response1 = await axios.get(
    SensiboUrl + "/pods/" + itemId + "/acStates?limit=1&apiKey=" + apiKey
    // getAuthConfig(token)
  );
  const response2 = await axios.get(
    SensiboUrl + "/pods/" + itemId + "/historicalMeasurements?apiKey=" + apiKey
    // getAuthConfig(token)
  );
  let result = {
    id: itemId,
    status: response1.data.result[0].status,
    on: response1.data.result[0].acState.on,
    mode: response1.data.result[0].acState.mode,
    targetTemperature: response1.data.result[0].acState.targetTemperature,
    temperatureUnit: response1.data.result[0].acState.temperatureUnit,
    fanLevel: response1.data.result[0].acState.fanLevel,
    swing: response1.data.result[0].acState.swing,
    light: response1.data.result[0].acState.light,
    changedProperties: response1.data.result[0].changedProperties,
    reason: response1.data.result[0].reason,
    failureReason: response1.data.result[0].failureReason,
    currentTemperature: response2.data.result.temperature.pop().value,
    currentHumidity: response2.data.result.humidity.pop().value,
  };
  return result;
}

export async function changeAcState(apiKey, itemId, property, newValue) {
  const response = await axios.patch(
    SensiboUrl +
      "/pods/" +
      itemId +
      "/acStates/" +
      property +
      "?apiKey=" +
      apiKey,
    { newValue: newValue }
    // getAuthConfig(token),
  );
  const response2 = await axios.get(
    SensiboUrl + "/pods/" + itemId + "/historicalMeasurements?apiKey=" + apiKey
    // getAuthConfig(token)
  );
  let result = {
    id: itemId,
    status: response.data.result.status,
    on: response.data.result.acState.on,
    mode: response.data.result.acState.mode,
    targetTemperature: response.data.result.acState.targetTemperature,
    temperatureUnit: response.data.result.acState.temperatureUnit,
    fanLevel: response.data.result.acState.fanLevel,
    swing: response.data.result.acState.swing,
    light: response.data.result.acState.light,
    changedProperties: response.data.result.changedProperties,
    reason: response.data.result.reason,
    failureReason: response.data.result.failureReason,
    currentTemperature: response2.data.result.temperature.pop().value,
    currentHumidity: response2.data.result.humidity.pop().value,
  };
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
  const response = await axios.post(`${BaseUrl}/signup`, signUpData);
  return response.data;
}

export async function login(loginData) {
  const response = await axios.post(`${BaseUrl}/login`, loginData);
  return response.data;
}

export async function createAPIkey(newAPIKey, token) {
  const response = await axios.post(
    `${BaseUrl}/AC`,
    newAPIKey,
    getAuthConfig(token)
  );
  return response.data;
}

export async function createImage(newImage, token) {
  const response = await axios.post(
    `${BaseUrl}/AC/picture_url`,
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
