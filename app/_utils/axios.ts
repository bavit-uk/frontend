import axios from "axios";

console.log("NEXT_PUBLIC_BACKEND_URL", process.env.NEXT_PUBLIC_BACKEND_URL);
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

export { client };
