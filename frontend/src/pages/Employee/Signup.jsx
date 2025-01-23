import { useRef } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { registerEmployeeThunk } from "../../redux/reducers/employee/employeeAuth";
import AppLogo from "../../components/AppLogo";
import PasswordEye from "../../components/PasswordEye";
import loginSvg from "../../assets/svgs/undraw_login_wqkt.svg";
import AuthRightHalf from "../../components/AuthRightHalf";

const EmployeeSignup = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loading } = useSelector((state) => state.employeeAuth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(registerEmployeeThunk(formData))
      .unwrap() // Wait for the thunk to resolve
      .then(() => {
        // Reset formData after success
        // setFormData({ username: "", email: "", password: "" });
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
          <p>Your dream job</p>
          <p>starts here.</p>
        </h1>
        <div className="flex flex-col justify-center items-center mt-14">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200"
          >
            <div className="mb-6">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                className="mb-6"
                inputRef={usernameRef}
              />
            </div>

            <div className="mb-6">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                inputRef={emailRef}
                className="mb-6"
              />
            </div>

            <PasswordEye passwordRef={passwordRef} />

            <button
              type="submit"
              className="w-full py-1 text-gray-100 bg-primary hover:bg-primaryhover text-lg rounded-sm"
            >
              Sign Up
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/employee/login"
                  className="text-primary hover:underline font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <AuthRightHalf authSvg={loginSvg} type={"employee"} />
    </div>
  );
};

export default EmployeeSignup;
