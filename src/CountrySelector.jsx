import { useState, useEffect } from 'react';

const CountrySelector = ({ 
  isDarkMode, 
  selectedCountry, 
  selectedCity, 
  setSelectedCountry, 
  setSelectedCity 
}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries and cities from the API
  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries");
        const data = await response.json();
        setCountries(data.data);
      } catch (error) {
        console.error("Error fetching countries and cities:", error);
      }
    };
    fetchCountriesAndCities();
  }, []);

  // Filter cities for the selected country
  useEffect(() => {
    if (selectedCountry) {
      const countryData = countries.find((country) => country.country === selectedCountry);
      if (countryData) {
        setCities(countryData.cities);
      }
    }
  }, [selectedCountry, countries]);

  return (
    <>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className={`border p-2 rounded w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        required
      >
        <option value="" disabled>Select Country</option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.country}>
            {country.country}
          </option>
        ))}
      </select>
      
      {selectedCountry && (
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={`border p-2 rounded w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
        >
          <option value="" disabled>Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default CountrySelector;