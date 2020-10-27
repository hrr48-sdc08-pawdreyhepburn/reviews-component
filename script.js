import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 100,
      maxVUs: 100
    }
  }
};

export default function () {
  const productId = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);
  const url = `http://localhost:3004/api/reviews/${productId}`
  if (Math.random() <= 0.1) {
    const review = {
      username: 'newUser',
      title: 'A new review',
      body: 'Here is the body of a new review',
      wouldRecommend: true,
      overall: 5,
      comfort: 5,
      style: 5,
      value: 5,
      sizing: 5
    };
    http.post(url, review);
  } else {
    http.get(url);
  }
  sleep(1);
}