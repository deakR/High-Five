import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="absolute top-4 right-4 px-4 py-2 font-bold rounded-md flex items-center"
      style={{
        backgroundColor: isDarkMode ? '#fff' : '#ffc0cb',
        color: isDarkMode ? '#000' : '#fff',
        border: '2px solid',
        borderColor: isDarkMode ? '#000' : '#ffc0cb',
      }}
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;