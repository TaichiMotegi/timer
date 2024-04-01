import { Link } from "react-router-dom";

export const NavButton = (props) => {
  return (
    <div className="flex justify-end fixed top-12 left-15">
      <Link to="/">
        <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500">
          HOME
        </button>
      </Link>

      <Link to="/timer">
        <button
          className={
            props.flag
              ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
              : "pointer-events-none text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
          }
        >
          TIMER
        </button>
      </Link>

      <Link to="/result">
        <button
          className={
            props.flag
              ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
              : "pointer-events-none text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
          }
        >
          RESULT
        </button>
      </Link>
    </div>
  );
};
