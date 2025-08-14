import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function userSignUp(user) {
  try {
    // Email və username yoxlaması eyni anda
    const [emailRes, usernameRes] = await Promise.all([
      axios.get(`${BASE_URL}/users?email=${user.email}`),
      axios.get(`${BASE_URL}/users?username=${user.username}`)
    ]);

    const emailExists = emailRes.data.length > 0;
    const usernameExists = usernameRes.data.length > 0;

    if (emailExists && usernameExists) {
      throw new Error("Email və istifadəçi adı artıq qeydiyyatdan keçib");
    } 
    if (emailExists) {
      throw new Error("Bu email artıq qeydiyyatdan keçib");
    }
    if (usernameExists) {
      throw new Error("Bu istifadəçi adı artıq qeydiyyatdan keçib");
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
