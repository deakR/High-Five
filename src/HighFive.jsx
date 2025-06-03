import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MessageBox from "./MessageBox";
import HighFiveForm from "./HighFiveForm";
import DarkModeToggle from "./DarkModeToggle";
import CornerEmojis from "./CornerEmojis";
import Counter from "./Counter";
import { useFirestore } from "./hooks/useFirestore";

const HighFive = () => {
  const [highFives, setHighFives] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTooltip, setShowTooltip] = useState({ giveHighFive: false, justIncrement: false });
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(true);
  const [userData, setUserData] = useState(null);
  const formRef = useRef(null);
  
  const { 
    fetchHighFiveCount, 
    incrementHighFiveCount, 
    submitHighFive,
    popupMessages 
  } = useFirestore();

  // Set the document title
  useEffect(() => {
    document.title = `High-Fives: ${highFives}`;
  }, [highFives]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('highFiveUserData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
    
    // Also load dark mode preference
    const savedDarkMode = localStorage.getItem('highFiveDarkMode');
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, []);

  // Handle click outside form to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target) && isFormVisible) {
        setIsFormVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFormVisible]);

  // Fetch the current high-five count from Firestore
  useEffect(() => {
    const getCount = async () => {
      const count = await fetchHighFiveCount();
      setHighFives(count);
    };
    getCount();
  }, [fetchHighFiveCount]);

  // Detect screen size and set initial state for message box visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMessageBoxVisible(false); // Hide on mobile
      } else {
        setIsMessageBoxVisible(true); // Show on desktop
      }
    };

    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle handlers
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('highFiveDarkMode', newMode.toString());
  };
  
  const toggleMessageBox = () => setIsMessageBoxVisible(!isMessageBoxVisible);
  
  const handleHighFive = () => {
    // If we already have user data, use it directly
    if (userData) {
      handleQuickSubmit();
    } else {
      // Otherwise show the form
      setIsFormVisible(true);
    }
  };
  
  // Quick submit with saved data
  const handleQuickSubmit = async () => {
    const newCount = await submitHighFive(userData.name, userData.city, userData.country);
    setHighFives(newCount);
  };
  
  // Handle form submission through the firestore hook
  const handleFormSubmit = async (name, selectedCity, selectedCountry) => {
    // Save the user data to localStorage
    const newUserData = { name, city: selectedCity, country: selectedCountry };
    localStorage.setItem('highFiveUserData', JSON.stringify(newUserData));
    setUserData(newUserData);
    
    const newCount = await submitHighFive(name, selectedCity, selectedCountry);
    setHighFives(newCount);
    setIsFormVisible(false);
  };

  // Increment without form
  const handleIncrementCount = async () => {
    const newCount = await incrementHighFiveCount();
    setHighFives(newCount);
  };
  
  // Clear saved user data
  const clearUserData = () => {
    localStorage.removeItem('highFiveUserData');
    setUserData(null);
    setIsFormVisible(true);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-screen ${isDarkMode ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-r from-pink-300 via-pink-200 to-yellow-100'}`}
      style={{
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
      }}
    >
      {/* Dark Mode Toggle Button */}
      <DarkModeToggle 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* High-Five Text */}
      <motion.h1
        className="text-8xl font-extrabold mb-12 desktop:text-8xl mobile:text-5xl"
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: isDarkMode ? "unset" : "#fff",
        }}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        High-Five!
      </motion.h1>

      {/* Show Welcome Message if user data exists */}
      {userData && (
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg" style={{ color: isDarkMode ? "#fff" : "#fff" }}>
            Welcome back, {userData.name}! <button 
              onClick={clearUserData} 
              className="text-blue-400 hover:underline text-sm ml-2"
            >
              (Not you?)
            </button>
          </p>
        </motion.div>
      )}

      {/* Count and Emoji */}
      <div className="text-7xl flex items-center justify-center mb-16 desktop:text-7xl mobile:text-5xl">
        <picture>
          <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1faf8_1f3fb/512.webp" type="image/webp" />
          <img 
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1faf8_1f3fb/512.gif" 
            alt="🫸" 
            width="64" 
            height="64"
            style={{ margin: '0 12px 0 0' }}
          />
        </picture>

        <span className="mx-auto font-bold" style={{ display: 'flex', justifyContent: 'center', minWidth: '200px' }}>
          <Counter
            value={highFives}
            places={[10000, 1000, 100, 10, 1]}
            fontSize={64}
            padding={5}
            gap={10}
            fontWeight={900}
          />
        </span>

        <picture>
          <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1faf7_1f3fb/512.webp" type="image/webp" />
          <img 
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1faf7_1f3fb/512.gif" 
            alt="🫷" 
            width="64" 
            height="64"
            style={{ margin: '0 0 0 12px' }}
          />
        </picture>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-8 relative flex-col mobile:flex-col desktop:flex-row mobile:mt-8">
        <div className="relative mb-4">
          <motion.button
            onClick={handleHighFive}
            className="relative px-10 py-4 font-bold uppercase tracking-wide rounded-md transition-transform duration-300 desktop:text-xl mobile:text-base"
            style={{
              backgroundColor: isDarkMode ? '#fff' : 'transparent',
              color: isDarkMode ? '#000' : '#fff',
              border: "2px solid",
              borderColor: isDarkMode ? '#fff' : 'transparent',
              boxShadow: isDarkMode ? "0 4px 20px rgba(255, 255, 255, 0.1)" : "0 4px 20px rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              fontSize: "1.25rem",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip({ giveHighFive: true, justIncrement: false })}
            onMouseLeave={() => setShowTooltip({ giveHighFive: false, justIncrement: false })}
          >
            Give a High-Five!
          </motion.button>
          {showTooltip.giveHighFive && !userData && (
            <div
              className="absolute top-1/2 left-full transform -translate-y-1/2 ml-3 bg-gray-800 text-white px-4 py-3 rounded-md shadow-lg text-sm w-48 hidden md:block"
              style={{
                backgroundColor: isDarkMode ? '#333' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                boxShadow: isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.5)" : "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              Requires you to enter name and location
            </div>
          )}
        </div>
        <div className="relative">
          <motion.button
            onClick={handleIncrementCount}
            className="relative px-12 py-4 font-bold uppercase tracking-wide rounded-md transition-transform duration-300 desktop:text-xl mobile:text-base"
            style={{
              backgroundColor: isDarkMode ? '#fff' : 'transparent',
              color: isDarkMode ? '#000' : '#fff',
              border: "2px solid",
              borderColor: isDarkMode ? '#fff' : 'transparent',
              boxShadow: isDarkMode ? "0 4px 20px rgba(255, 255, 255, 0.1)" : "0 4px 20px rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              fontSize: "1.25rem",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip({ giveHighFive: false, justIncrement: true })}
            onMouseLeave={() => setShowTooltip({ giveHighFive: false, justIncrement: false })}
          >
            Just High-Five!
          </motion.button>
          {showTooltip.justIncrement && (
            <div
              className="absolute top-1/2 left-full transform -translate-y-1/2 ml-3 bg-gray-800 text-white px-4 py-3 rounded-md shadow-lg text-sm w-48 hidden md:block"
              style={{
                backgroundColor: isDarkMode ? '#333' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                boxShadow: isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.5)" : "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              Increment Count
            </div>
          )}
        </div>
      </div>

      {/* Form Component with ref for click-outside detection */}
      {isFormVisible && (
        <div ref={formRef}>
          <HighFiveForm 
            isDarkMode={isDarkMode}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {/* Message Box Component */}
      <MessageBox 
        isDarkMode={isDarkMode}
        isVisible={isMessageBoxVisible}
        toggleVisibility={toggleMessageBox}
        messages={popupMessages}
      />

      {/* Corner Emojis */}
      <CornerEmojis isDarkMode={isDarkMode} />

      {/* Media Queries for Mobile Responsiveness */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop\\:text-8xl {
            font-size: 72px;
          }
          .desktop\\:text-7xl {
            font-size: 64px;
          }
          .desktop\\:text-xl {
            font-size: 20px;
          }
          .desktop\\:w-96 {
            width: 100%;
          }
          .desktop\\:hidden {
            display: none;
          }
          .mobile\\:text-6xl {
            font-size: 48px;
          }
          .mobile\\:text-5xl {
            font-size: 40px;
          }
          .mobile\\:text-base {
            font-size: 16px;
          }
          .mobile\\:text-sm {
            font-size: 14px;
          }
          .mobile\\:w-full {
            width: 100%;
          }
          .mobile\\:block {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default HighFive;