import { useState } from "react";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import withLoading from "../components/withLoading";

// const Button = ({ children, ...props }) => (
//   <button
//     // className="bg-blue-900 w-full h-11 mt-10 text-white text-sm font-medium rounded-lg max-w-sm"
//     {...props}
//   >
//     {children}
//   </button>
// );

const LoadingButton = withLoading();

const schema = z.object({
  email: z.string().email("Must be a valid email address"),
  password: z.string().min(6, "Password must be 6 or more characters long"),
});

const Login = ({ handleClick, isLoading, setIsLoading }) => {
  const [showPsswrd, setshowPsswrd] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = schema.safeParse({
      ...formData,
    });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setError(formattedErrors);
    } else {
      setError({});
      setIsLoading(true);
      try {
        await handleLogin();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleShow = () => {
    setshowPsswrd(!showPsswrd);
  };

  const handleLogin = async () => {
    const response = await axios.post(
      "https://api.fr.stg.shipglobal.in/api/v1/auth/login",

      {
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      }
    );
    const data = await response.data;
    console.log(data);

    if (data.data.token_details.token) {
      localStorage.setItem("jwtToken", data.token);
      navigate("/dashboard");
    } else {
      alert("failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-4 mt-10">
      <div className="rounded-lg shadow-lg  w-full max-w-md h-[510px] m-8 p-3  bg-white mb-18">
        <div className="flex flex-col p-6 ">
          <h3 className="font-bold text-xl text-center tracking-tight">
            Login
          </h3>
        </div>
        <div className="p-6 pt-0">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1 ">
              <label className="text-sm font-normal">
                Email <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-gray-300 border-[1px] flex h-10 w-full rounded-md px-3 py-2 text-sm "
                placeholder="Enter Email ID ..."
              />
              {error.email && (
                <p className="text-xs font-semibold text-red-600">
                  {error.email._errors[0]}
                </p>
              )}
            </div>
            <div className="space-y-1 mt-4">
              <label htmlFor="" className="text-sm font-normal">
                Password <span className="text-red-600 ml-1 ">*</span>
              </label>
              <div className="flex items-end  relative">
                <input
                  type={showPsswrd ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-gray-300 border-[1px] flex h-10 w-full rounded-md px-3 py-2 text-sm appearance-none "
                  placeholder="Type here ..."
                />

                {showPsswrd ? (
                  <GoEye
                    className="absolute right-4 bottom-3 cursor-pointer"
                    onClick={handleShow}
                  />
                ) : (
                  <GoEyeClosed
                    className="absolute right-4 bottom-3 cursor-pointer"
                    onClick={handleShow}
                  />
                )}
              </div>
              <div className=" w-64">
                {error.password && (
                  <p className="text-xs font-semibold text-red-600">
                    {error.password._errors[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="my-1">
              <a href="#">
                <span
                  className="text-sm font-medium text-blue-900"
                  onClick={handleClick}
                >
                  Forgot Password?
                </span>
              </a>
            </div>
            <div className="flex items-center justify-center ">
              <LoadingButton loading={isLoading}>Submit</LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
