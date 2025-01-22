import { useRef } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { loginEmployerThunk } from "../../redux/reducers/employer/employerAuth";
import AppLogo from "../../components/AppLogo";
import PasswordEye from "../../components/PasswordEye";

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
          <div className="mb-6">
            <PasswordEye passwordRef={passwordRef} />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="w-full py-3 text-lg"
          >
            Login
          </Button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/employer/signup"
                className="text-purple-500 hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EmployerLogin;
