import { useLocation } from "react-router-dom";
import { UserIdContext } from "../components/providers/UserIdContext";
import { useContext } from "react";
import { updateCategory } from "../api/updateCategory";
import { NavButton } from "../components/navButton";

function Edit() {
  const location = useLocation();
  const { category } = location.state;
  const contextValue = useContext(UserIdContext);
  const uid = contextValue.userId;
  return (
    <div>
      <div className="flex flex-col items-center justify-evenly font-bold text-4xl h-screen">
        <NavButton flag={true} />
        Category：{category}
        <button
          className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:outline-none font-medium rounded-full h-20 w-20 text-sm text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 m-5"
          onClick={() => {
            updateCategory(category, uid);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Edit;
