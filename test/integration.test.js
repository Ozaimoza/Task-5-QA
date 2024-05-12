import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  // API Create - POST
  let createURL = "http://localhost:3000/api/users";
  let createPayload = JSON.stringify({
    name: "morpheus",
    job: "leader",
  });
  let createParams = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: "10s", // Timeout set to 10 seconds
  };

  let createRes = http.post(createURL, createPayload, createParams);
  check(createRes, {
    "Create API is status 201": (r) => r.status === 201,
  });

  sleep(1);

  // API Update - PUT
  let updateURL = "http://localhost:3000/api/users/1";
  let updatePayload = JSON.stringify({
    name: "morpheus",
    job: "zion resident",
  });
  let updateParams = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: "10s", // Timeout set to 10 seconds
  };

  let updateRes = http.put(updateURL, updatePayload, updateParams);
  check(updateRes, {
    "Update API is status 200": (r) => r.status === 200,
  });

  sleep(1);
}
