import api from "./apiClient";

export const loginUser = async (credentials) => {
  const res = await api.post("/login", credentials);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};
