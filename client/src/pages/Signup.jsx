import { useState } from "react";
import { errorToast, successToast } from "../utils/Toast";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/Api";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting formData:', formData);

    const isFormDataFilled = Object.values(formData).every(
     
      (value) =>value !== ""
      
    );

    if (!isFormDataFilled) {
      errorToast("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        API_URL + "/users/admin/register",
        formData
      );
      if (response?.data?.status == 201) {
        successToast("Successfully registered");

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });

        setLoading(false);
        navigate("/login");
      } else {
        errorToast(
          response?.data?.message || "Error occurred while registering"
        );
      }
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="pb-12">
      <h1 className="text-xl text-[#5D41D0] font-extrabold text-center my-12">
        LIBRARY MANAGEMENT SYSTEM
      </h1>
      <div className="flex flex-col items-center mt-8 border w-full md:w-[35vw] mx-auto py-8 px-16">
        <h1 className="font-black text-black mb-4 text-xl">Create account</h1>
        
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <Input
              type="text"
              name="firstname"
              placeholder="First name"
              defaultInputValue={formData.firstname || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              name="lastname"
              placeholder="Last name"
              defaultInputValue={formData.lastname || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              defaultInputValue={formData.email || ""}
              onChange={handleChange}
            />
          </div>
          
          
          <div className="mb-8">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              defaultInputValue={formData.password || ""}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mb-6 flex justify-center mx-auto text-base px-4 py-3 text-white rounded-md"
          >
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#5D41D0] font-bold">
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
