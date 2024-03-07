import axios from "axios";
async function login(loginValues) {
  return (
    await axios.post("http://localhost:9000/shoppingItem/login", loginValues)
  ).data;
}

export { login };
