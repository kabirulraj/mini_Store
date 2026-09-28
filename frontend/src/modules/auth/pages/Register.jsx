import { useState } from "react";
import useApi from "../../../shared/api";
import {useUser} from "../../../context/UseAuthContext"
import { useNavigate } from "react-router";


const Register = ()=>{
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const api = useApi()

  const authContext = useUser() 
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      
      const response = await api.post("/auth/register", form)

      console.log(response.data)
      authContext.setAccessToken(response.data.accessToken)
      authContext.setuser(response.data.data.user)

      navigate("/profile")
    } catch (error) {
      setError(error?.message || "Registration faild")
    }
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   try {
//     const response = await api.post("/auth/register", form);

//     console.log("1 - API successful");

// authContext.setAccessToken(response.data.data.accessToken);
// console.log("2 - token saved");

// authContext.setuser(response.data.data.user);
// console.log("3 - user saved");

// console.log("4 - navigating");

// navigate("/profile");

// console.log("5 - navigate called");

//     console.log("After navigation");
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     console.error("SERVER RESPONSE:", error?.response?.data);

//     setError(error?.message || "Registration failed");
//   }
// };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 p-6 border rounded-xl shadow"
      >
        <h2 className="text-xl font-semibold">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
export default Register;
