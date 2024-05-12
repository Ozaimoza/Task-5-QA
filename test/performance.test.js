import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 1000,
  iterations: 3500,
  thresholds: {
    http_req_duration: ["p(95)<2000"], // Response time should be less than 2 seconds (95th percentile)
  },
};

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
  };

  let createRes = http.post(createURL, createPayload, createParams);
  check(createRes, {
    "Create API is status 201": (r) => r.status === 201,
  });

  sleep(1);

  // API Update - PUT
  let updateURL = "http://localhost:3000/api/users/4";
  let updatePayload = JSON.stringify({
    name: "morpheus",
    job: "zion resident",
  });
  let updateParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let updateRes = http.put(updateURL, updatePayload, updateParams);
  check(updateRes, {
    "Update API is status 200": (r) => r.status === 200,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
