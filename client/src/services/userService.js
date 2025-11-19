import api from "./api";

// Get all users
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

// Update a user
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
