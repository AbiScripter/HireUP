import { useRef } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { loginEmployerThunk } from "../../redux/reducers/employer/employerAuth";
import AppLogo from "../../components/AppLogo";
import PasswordEye from "../../components/PasswordEye";
import searchPeopleSvg from "../../assets/svgs/undraw_people-search_xpq4.svg";
import AuthRightHalf from "../../components/AuthRightHalf";

const EmployerLogin = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loading } = useSelector((state) => state.employerAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("formdata in login component", formData);
    dispatch(loginEmployerThunk(formData))
      .unwrap() // Wait for the thunk to resolve
      .then(() => {
        // Reset formData after success
        // setFormData({ email: "", password: "" });
        window.location.href = "/employer/dashboard";
      })
      .catch((error) => {
        // Handle error (optional)
        console.error(error);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-2">
      <main className="bg-gray-300 h-screen">
        <div className="flex justify-center pt-4">
          <Link to="/">
            <AppLogo />
          </Link>
        </div>
        <h1 className="text-5xl flex flex-col items-center h-[300px] justify-end">
          <p>Welcome back!</p>
          <p>Find the talent you need.</p>
        </h1>
        <div className="flex flex-col justify-center items-center mt-14">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200"
          >
            <div className="mb-6">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                inputRef={emailRef}
              />
            </div>

            <PasswordEye passwordRef={passwordRef} />

            <button
              type="submit"
              className="w-full py-1 text-gray-100 bg-primary hover:bg-primaryhover text-lg rounded-sm"
            >
              Login
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/employer/signup"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <AuthRightHalf authSvg={searchPeopleSvg} type={"employer"} />
    </div>
  );
};

export default EmployerLogin;
