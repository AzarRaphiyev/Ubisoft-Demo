import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const getAllGame = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/Games`);
    return res.data;
  } catch (err) {
    console.error("Oyunları almaqda xəta:", err.message);
    return [];
  }
};

// Yeni Oyun əlavə et
export const addGame = async (newGame) => {
  try {
    const res = await axios.post(`${BASE_URL}/Games`, newGame);
    return res.data;
  } catch (err) {
    console.error("Oyun əlavə olunarkən xəta:", err.message);
    return null;
  }
};


// Oyunu redaktə et
export const updateGame = async (id, updatedGame) => {
  try {
    const res = await axios.put(`${BASE_URL}/Games/${id}`, updatedGame);
    return res.data;
  } catch (err) {
    console.error("Oyun yenilənərkən xəta:", err.message);
    return null;
  }
};


// Oyunu sil
export const deleteGame = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/Games/${id}`);
    return true;
  } catch (err) {
    console.error("Oyun silinərkən xəta:", err.message);
    return false;
  }
};