import React, { useRef, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Calendar } from "lucide-react";
import { userSignUp } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const UbisoftRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const birthdayRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const birthday = birthdayRef.current.value;

    // 🔹 1. Sadə yoxlamalar
    if (!username || !email || !password || !confirmPassword || !birthday) {
      toast.error("Bütün hissələri doldurun");
      return;
    }
    if (username.length < 3) {
      toast.error("İstifadəçi adı minimum 3 simvol olmalıdır");
      return;
    }
    if (password.length < 8) {
      toast.error("Şifrə minimum 8 simvol olmalıdır");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Şifrəni düzgün təkrarlayın");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email formatı düzgün deyil");
      return;
    }

    // 🔹 2. Yaş yoxlaması
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 6) {
      toast.error("Minimum yaş 6 olmalıdır");
      return;
    }

    // 🔹 3. Göndəriləcək data
    const userData = {
      username,
      email,
      password,
      birthday,
      role: "user",
      isActive: true,
      orderedList: []
    };

    try {
      setIsLoading(true);
      await userSignUp(userData);
      toast.success("Qeydiyyat uğurla tamamlandı!");

      // 🔹 Form təmizlə
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      birthdayRef.current.value = "";

      navigate("/auth/login");
    } catch (error) {
      let errorMessage = "Qeydiyyat zamanı xəta baş verdi";

      
      if (error.response && error.response.data) {
        const backendMessage = error.response.data.message?.toLowerCase() || "";

        if (backendMessage.includes("email") && backendMessage.includes("username")) {
          errorMessage = "Bu email və istifadəçi adı artıq istifadə olunub";
        } 
        else if (backendMessage.includes("email")) {
          errorMessage = "Bu email artıq istifadə olunub";
        } 
        else if (backendMessage.includes("username")) {
          errorMessage = "Bu istifadəçi adı artıq istifadə olunub";
        } 
        else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } 
      else if (error.message) {
        if (error.message.includes("Network")) {
          errorMessage = "İnternet bağlantısı problemi";
        } else {
          errorMessage = error.message;
        }
      }

      toast.error(errorMessage);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full scale-90 max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <img
              src="https://logos-marques.com/wp-content/uploads/2021/03/Ubisoft-Embleme.png"
              alt="Ubisoft Logo"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Ubisoft</h1>
          <p className="text-slate-400">Create your account</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 space-y-6"
        >
          {/* Username & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium flex items-center gap-2 mb-2">
                <User size={16} />
                Username
              </label>
              <input
                ref={usernameRef}
                type="text"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="Your username"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium flex items-center gap-2 mb-2">
                <Mail size={16} />
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="Your email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium flex items-center gap-2 mb-2">
                <Lock size={16} />
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  placeholder="Password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-white text-sm font-medium flex items-center gap-2 mb-2">
                <Lock size={16} />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  ref={confirmPasswordRef}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  placeholder="Confirm password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Birthday */}
          <div>
            <label className="text-white text-sm font-medium flex items-center gap-2 mb-2">
              <Calendar size={16} />
              Birthday
            </label>
            <input
              ref={birthdayRef}
              type="date"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              disabled={isLoading}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <Link
              to={"/auth/login"}
              className="text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UbisoftRegister;
