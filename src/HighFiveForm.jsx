import { useState } from "react";
import CountrySelector from "./CountrySelector";

const HighFiveForm = ({ isDarkMode, onSubmit }) => {
  const [name, setName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, selectedCity, selectedCountry);
    // Form will be hidden by parent component after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 desktop:w-96 mobile:w-full`}
      style={{
        color: isDarkMode ? '#fff' : '#000',
        boxShadow: isDarkMode ? "0 8px 24px rgba(0, 0, 0, 0.5)" : "0 8px 24px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
      }}
    >
      <h2 className="text-lg font-bold desktop:text-lg mobile:text-sm">Enter Your Details</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`border p-2 rounded w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        required
      />
      
      <CountrySelector
        isDarkMode={isDarkMode}
        selectedCountry={selectedCountry}
        selectedCity={selectedCity}
        setSelectedCountry={setSelectedCountry}
        setSelectedCity={setSelectedCity}
      />
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold shadow-lg desktop:text-lg mobile:text-sm"
        style={{
          background: "linear-gradient(to right, #007BFF, #0056b3)",
          boxShadow: "0 4px 12px rgba(0, 123, 255, 0.5)",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default HighFiveForm;