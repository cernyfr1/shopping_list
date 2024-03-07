import axios from "axios";

const shoppingListApiUri = "http://localhost:9000/shoppingItem";
async function login(loginValues) {
  return (await axios.post(shoppingListApiUri + "/login", loginValues)).data;
}

async function getListsByUser(userId) {
  return (await axios.get(shoppingListApiUri + `/${userId}/lists`)).data;
}

export { login, getListsByUser };
