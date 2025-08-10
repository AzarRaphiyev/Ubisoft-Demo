import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAllGames = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/Games`);
    return res.data;
  } catch (error) {
    console.error(
      error.message || error || "There is issue while fetching process"
    );
  }
};
const getAllDLCs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/DLCs`);
    return res.data;
  } catch (error) {
    console.error(
      error.message || error || "There is issue while fetching process"
    );
  }
};

const getAllSliders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/Sliders`);
    return res.data;
  } catch (error) {
    console.error(
      error.message || error || "There is issue while fetching process"
    );
  }
};
const getAllUniverse = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/UbisoftUniverse`);
    return res.data;
  } catch (error) {
    console.error(
      error.message || error || "There is issue while fetching process"
    );
  }
};
const getAllNews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/News`);
    return res.data;
  } catch (error) {
    console.error(
      error.message || error || "There is issue while fetching process"
    );
  }
};
const getGamesById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/Games/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      error.message || error || "There is issue while fetching process"
    );
  }
};
const getDLCsById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/DLCs/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      error.message || error || "There is issue while fetching process"
    );
  }
};

export { getAllGames, getAllDLCs, getAllSliders, getGamesById, getDLCsById,getAllUniverse,getAllNews };
