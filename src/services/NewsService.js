import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const getAllNews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/News`);
    return res.data;
  } catch (err) {
    console.error("News almaqda xəta:", err.message);
    return [];
  }
};

// Yeni Xeber əlavə et
export const addNew = async (newNews) => {
  try {
    const res = await axios.post(`${BASE_URL}/News`, newNews);
    return res.data;
  } catch (err) {
    console.error("News əlavə olunarkən xəta:", err.message);
    return null;
  }
};

// Xeber redaktə et
export const updateNew = async (id, updateNews) => {
  try {
    const res = await axios.put(`${BASE_URL}/News/${id}`, updateNews);
    return res.data;
  } catch (err) {
    console.error("News yenilənərkən xəta:", err.message);
    return null;
  }
};

// Xeber sil
export const deleteNew = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/News/${id}`);
    return true;
  } catch (err) {
    console.error("News silinərkən xəta:", err.message);
    return false;
  }
};
