import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/Users`);
    return res.data;
  } catch (err) {
    console.error("Users almaqda xəta:", err.message);
    return [];
  }
};

// Users redaktə et
export const updateUser = async (id, updatedUser) => {
  try {
    const res = await axios.put(`${BASE_URL}/Users/${id}`, updatedUser); // updatedUser düzəldildi
    return res.data;
  } catch (err) {
    console.error("Users yenilənərkən xəta:", err.message);
    return null;
  }
};

// Users sil
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/Users/${id}`);
    return true;
  } catch (err) {
    console.error("User silinərkən xəta:", err.message);
    return false;
  }
};