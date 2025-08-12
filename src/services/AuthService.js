import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Yeni istifadəçi qeydiyyatı
async function userSignUp(user) {
  try {
    // Email mövcuddursa error at
    const res = await axios.get(`${BASE_URL}/users?email=${user.email}`);
    if (res.data.length) {
      throw new Error("This email is already registered");
    }

    // Yeni istifadəçi əlavə et
    const { data: newUser } = await axios.post(`${BASE_URL}/users`, {
      ...user,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    });

    return newUser;
  } catch (err) {
    throw new Error(err.message || "Qeydiyyat zamanı xəta baş verdi");
  }
}

// Giriş
async function userSignIn({ email, password }) {
  try {
    // Email ilə user-i tap
    const { data } = await axios.get(`${BASE_URL}/users?email=${email}`);
    if (!data.length) {
      throw new Error("Belə bir istifadəçi mövcud deyil");
    }

    const user = data[0];

    // Şifrə yoxla
    if (user.password !== password) {
      throw new Error("Şifrə yanlışdır");
    }

    // Son giriş tarixini yenilə
    await axios.patch(`${BASE_URL}/users/${user.id}`, {
      lastLogin: new Date().toISOString(),
    });

    return user;
  } catch (err) {
    throw new Error(err.message || "Giriş zamanı xəta baş verdi");
  }
}

export { userSignUp, userSignIn };
