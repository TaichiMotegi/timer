import { Link } from "react-router-dom";

export const SubButton = (props) => {
  return (
    <div className="flex justify-end fixed top-28 left-15">
      <Link to="/chart">
        <button
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg   
        text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
        >
          CHART
        </button>
      </Link>
    </div>
  );
};
