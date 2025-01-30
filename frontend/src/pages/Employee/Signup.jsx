import { useRef } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { registerEmployeeThunk } from "../../redux/reducers/employee/employeeAuth";
import PasswordEye from "../../components/PasswordEye";
import MobileAppLogo from "../../components/MobileAppLogo";
import AuthTestimonials from "../../components/AuthTestimonials";

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
        console.error(error);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid lg:grid-cols-2">
      {/*Testimonals only on  screens above 1024px  */}
      <AuthTestimonials type={"employee"} />

      {/* Main content */}
      <main className="bg-gray-300 h-screen mobile-bg">
        {/* Different color logos for different screen sizes */}
        <div className="flex justify-center pt-4">
          <Link to="/">
            <div className="hidden lg:block">
              <MobileAppLogo color={"black"} logoColor={"#902bf5"} />
            </div>

            <div className="block lg:hidden">
              <MobileAppLogo color={"white"} />
            </div>
          </Link>
        </div>

        {/* Phrases */}
        <h1 className="text-4xl sm:text-5xl flex flex-col items-center h-[300px] justify-end px-1 text-center text-white lg:text-black">
          <p>Your dream job</p>
          <p>starts here.</p>
        </h1>

        {/* form */}
        <div className="flex flex-col justify-center items-center mt-32 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 pt-8 xs:p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200"
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
    </div>
  );
};

export default EmployeeSignup;
