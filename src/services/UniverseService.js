import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("BASE_URL:", BASE_URL);

export const getAllUniverse = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/UbisoftUniverse`);
    return res.data;
  } catch (err) {
    console.error("Dunyaları almaqda xəta:", err.message);
    return [];
  }
};

// Yeni dunya əlavə et
export const addUniverse = async (newUniverse) => {
  try {
    const res = await axios.post(`${BASE_URL}/UbisoftUniverse`, newUniverse);
    return res.data;
  } catch (err) {
    console.error("Dunya əlavə olunarkən xəta:", err.message);
    return null;
  }
};

// dunya redaktə et
export const updateUniverse = async (id, updateUniverse) => {
  try {
    const res = await axios.put(`${BASE_URL}/UbisoftUniverse/${id}`, updateUniverse);
    return res.data;
  } catch (err) {
    console.error("Dunya yenilənərkən xəta:", err.message);
    return null;
  }
};

// dunya sil
export const deleteUniverse = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/UbisoftUniverse/${id}`);
    return true;
  } catch (err) {
    console.error("Dunya silinərkən xəta:", err.message);
    return false;
  }
};
