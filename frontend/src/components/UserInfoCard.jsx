import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleUserRound } from "lucide-react";

const UserInfoCard = ({ ApiFunc }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchEmployerData() {
      try {
        const fetchedEmployerData = await ApiFunc();
        console.log(fetchedEmployerData);
        console.log(fetchedEmployerData.data.user_data);
        setUserData(fetchedEmployerData.data.user_data);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }

    fetchEmployerData();
  }, []);

  // !Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-200 shadow-md rounded-lg absolute right-2 top-2">
      <CircleUserRound size={36} className="text-gray-500" />
      <div className="flex-grow">
        <h2 className="font-semibold text-base text-gray-800">
          {userData?.username || "Username"}
        </h2>
        <h2 className="text-sm text-gray-500">
          {userData?.email || "user@example.com"}
        </h2>
      </div>

      {/* Logout Button */}
      <button
        className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfoCard;
