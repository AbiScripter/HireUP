import { useRef } from "react";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { loginEmployeeThunk } from "../../redux/reducers/employee/employeeAuth";
import AppLogo from "../../components/AppLogo";
import PasswordEye from "../../components/PasswordEye";

const EmployeeLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.employeeAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(loginEmployeeThunk(formData))
      .unwrap() // Wait for the thunk to resolve
      .then(() => {
        navigate("/employee/dashboard");
      })
      .catch((error) => {
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
        <p>Let’s get you hired.</p>
      </h1>
      <div className="flex flex-col justify-center items-center mt-14">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg border border-gray-200"
        >
          <div className="mb-6">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              inputRef={emailRef}
              name="email"
            />
          </div>

          <PasswordEye passwordRef={passwordRef} />

          <Button
            type="submit"
            variant="contained"
            className="w-full py-3 text-lg"
          >
            Login
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/employee/signup"
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

export default EmployeeLogin;
