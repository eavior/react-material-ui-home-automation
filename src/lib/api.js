import axios from "axios";
require("dotenv").config();

// const apiKey = process.env.REACT_APP_API_KEY;
const apiKey = process.env.REACT_APP_API_KEY;

// const BaseUrl = 'http://127.0.0.1:5500';
const BaseUrl = "https://home.sensibo.com/api/v2";

// export async function getUserACs(userId, token) {
export async function getUserACs() {
  const response = await axios.get(
    BaseUrl + "/users/me/pods?apiKey=" + apiKey
    // getAuthConfig(token)
  );
  const result = response.data.result;
  return result;
}

export async function getACData(itemId) {
  const response = await axios.get(
    BaseUrl + "/pods/" + itemId + "/acStates?limit=1&apiKey=" + apiKey
    // getAuthConfig(token)
  );
  let result = {
    id: itemId,
    status: response.data.result[0].status,
    on: response.data.result[0].acState.on,
    mode: response.data.result[0].acState.mode,
    targetTemperature: response.data.result[0].acState.targetTemperature,
    temperatureUnit: response.data.result[0].acState.temperatureUnit,
    fanLevel: response.data.result[0].acState.fanLevel,
    swing: response.data.result[0].acState.swing,
    light: response.data.result[0].acState.light,
    changedProperties: response.data.result[0].changedProperties,
    reason: response.data.result[0].reason,
    failureReason: response.data.result[0].failureReason,
  };
  return result;
}

// One or more parameters:

// BaseUrl + "/pods/" + itemId + "/acStates/?apiKey=" + apiKey

// {
//   "acState": {
//     "on": true,
//     "mode": "cool",
//     "fanLevel": "auto",
//     "targetTemperature": 21,
//     "temperatureUnit": "C",
//     "swing": "stopped"
//   }
// }

export async function changeAcState(itemId, property, newValue) {
  console.log(property);
  console.log(newValue);
  const response = await axios.patch(
    BaseUrl + "/pods/" + itemId + "/acStates/" + property + "?apiKey=" + apiKey,
    { newValue: newValue }
    // getAuthConfig(token),
  );
  console.log(response.data.result);
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
  };
  return result;
}

const test = {
  status: "success",
  result: {
    temperature: [
      {
        time: "2021-10-04T10:24:50Z",
        value: 24.9,
      },
      {
        time: "2021-10-04T10:26:20Z",
        value: 24.9,
      },
      {
        time: "2021-10-04T10:27:50Z",
        value: 24.8,
      },
      {
        time: "2021-10-04T10:29:20Z",
        value: 24.8,
      },
      {
        time: "2021-10-04T10:30:50Z",
        value: 24.8,
      },
      {
        time: "2021-10-04T10:32:20Z",
        value: 24.8,
      },
      {
        time: "2021-10-04T10:33:50Z",
        value: 24.8,
      },
    ],
    humidity: [
      {
        time: "2021-10-03T00:00:12Z",
        value: 52.1,
      },
      {
        time: "2021-10-03T00:01:42Z",
        value: 52.1,
      },
      {
        time: "2021-10-03T00:03:12Z",
        value: 52.2,
      },
      {
        time: "2021-10-03T00:04:42Z",
        value: 52.2,
      },
      {
        time: "2021-10-03T00:06:12Z",
        value: 52.2,
      },
    ],
  },
};

// One parameter:

// BaseUrl + "/pods/" + itemId + "/acStates/" + parameter + "?apiKey=" + apiKey

// {
//   "newValue": 22
// }

// export async function getACData(pod) {
//   if (!pod) return;
//   else {
//     const response = await axios.get(
//       BaseUrl + "/pods/" + pod + "/acStates?limit=1&apiKey=" + apiKey
//       // getAuthConfig(token)
//     );
//     // const acData = response.data.result;

//     // var result = acList.map((ac) => ac.id);
//     // console.log(result);
//     return response.data.result;
//   }
// }

function getAuthConfig(token) {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}

// 1 Signup API - route: ‘/signup’ [POST] ok
export async function signUp(signUpData) {
  const response = await axios.post(`${BaseUrl}/signup`, signUpData);
  return response.data;
}

// 2 Login API - route: ‘/login’ [POST] ok
export async function login(loginData) {
  const response = await axios.post(`${BaseUrl}/login`, loginData);
  return response.data;
}

// 3 Add API KEY - Route: ‘/apikey’ [POST] (Protected to admin only)
export async function createAPIkey(newAPIKey, token) {
  const response = await axios.post(
    `${BaseUrl}/AC`,
    newAPIKey,
    getAuthConfig(token)
  );
  return response.data;
}

// 4
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

// 5 Get AC By ID API - Route: ‘/AC/:id’ [GET]
export async function getACById(ACId, token) {
  let result;
  const response = await axios.get(
    `${BaseUrl}/AC/` + ACId,
    getAuthConfig(token)
  );
  if (ACId === "all") {
    result = response.data.ACs;
  } else {
    result = response.data.AC[0];
  }
  return result;
}

// 12 Get ACs By User ID API - Route ‘/AC/user/:id’ [GET]
export async function getSavedACs(userId, token) {
  const response = await axios.get(
    BaseUrl + "/AC/user/" + userId + "/saved",
    getAuthConfig(token)
  );
  return response.data;
}

// 13 Get User By ID API - Route ‘/user/:id’ [GET]
export async function getCurrentUser(userId, token) {
  const response = await axios.get(
    BaseUrl + "/user/" + userId,
    getAuthConfig(token)
  );
  const user = response.data.user[0];
  return user;
}

// 14 Update User API - Route ‘/user/:id’ [PUT] (protected to logged in user)
export async function updateCurrentUser(userId, updatedUser, token) {
  const response = await axios.put(
    `${BaseUrl}/user/` + userId,
    updatedUser,
    getAuthConfig(token)
  );
  return response.data;
}

// 15 Get Users API - Route ‘/user’ [GET] (protected to admin)
export async function getUsers(token) {
  const response = await axios.get(`${BaseUrl}/user`, getAuthConfig(token));
  return response.data;
}

// 16 Get User By ID API - Route ‘/user/:id/full’ [GET]
export async function getAllACsForUser(userId, token) {
  const response = await axios.get(
    BaseUrl + "/user/" + userId + "/full",
    getAuthConfig(token)
  );
  return response.data;
}

// ADDITIONAL API's:

// 17 ok (all ACs + admin)
export async function getAllACs(token) {
  const response = await axios.get(BaseUrl + "/AC/all", getAuthConfig(token));
  return response.data.ACs;
}

// 18
export async function deleteAC(ACId, token) {
  const response = await axios.delete(
    `${BaseUrl}/AC/` + ACId,
    getAuthConfig(token)
  );
  return response.data;
}

// 19
export async function getSaveStatus(ACId, userId, token) {
  const response = await axios.get(
    // `${BaseUrl}/AC/save/${ACId}/current_user/`,
    `${BaseUrl}/AC/${ACId}/user/${userId}/`,
    getAuthConfig(token)
  );
  return response.data;
}

// 20 Update User API - for admins only
export async function updateUserRole(userId, updatedUser, token) {
  const response = await axios.put(
    `${BaseUrl}/user/${userId}/admin`,
    updatedUser,
    getAuthConfig(token)
  );
  return response.data;
}

// 21
export async function deleteUser(userId, token) {
  const response = await axios.delete(
    `${BaseUrl}/user/` + userId,
    getAuthConfig(token)
  );
  return response.data;
}
