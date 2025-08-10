import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const getAllDlc = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/DLCs`);
    return res.data;
  } catch (err) {
    console.error("Dlcleri almaqda xəta:", err.message);
    return [];
  }
};

// Yeni Dlc əlavə et
export const addDlc = async (newDLC) => {
  try {
    const res = await axios.post(`${BASE_URL}/DLCs`, newDLC);
    return res.data;
  } catch (err) {
    console.error("Dlc əlavə olunarkən xəta:", err.message);
    return null;
  }
};

// Dlc redaktə et
export const updateDlc = async (id, updateDLCs) => {
  try {
    const res = await axios.put(`${BASE_URL}/DLCs/${id}`, updateDLCs);
    return res.data;
  } catch (err) {
    console.error("Dlc yenilənərkən xəta:", err.message);
    return null;
  }
};

// Dlc sil
export const deleteDlc = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/DLCs/${id}`);
    return true;
  } catch (err) {
    console.error("Dlc silinərkən xəta:", err.message);
    return false;
  }
};
