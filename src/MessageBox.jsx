import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaComment, FaCommentSlash } from "react-icons/fa";

const MessageBox = ({ isDarkMode, isVisible, toggleVisibility, messages }) => {
  const messageBoxRef = useRef(null);

  // Close message box when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageBoxRef.current && !messageBoxRef.current.contains(event.target) && window.innerWidth <= 768) {
        if (isVisible) toggleVisibility();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, toggleVisibility]);

  return (
    <>
      {/* Pop-Up Messages Container */}
      <div
        ref={messageBoxRef}
        className={`fixed top-1/2 right-4 bottom-4 w-80 p-4 rounded-lg shadow-lg flex flex-col gap-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} desktop:w-80 mobile:w-full z-50 transform -translate-y-10`}
        style={{
          background: isDarkMode ? "linear-gradient(to bottom, #333, #444)" : "linear-gradient(to bottom, #FFDFDF, #FFFFC2)",
          height: "370px",
          overflowY: "auto",
          display: isVisible ? 'block' : 'none',
        }}
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className="px-6 py-3 rounded-lg shadow-lg desktop:text-lg mobile:text-sm mb-4"
            style={{
              background: isDarkMode ? "linear-gradient(to right, #555, #666)" : "linear-gradient(to right, #FFB3B3, #FFDFBF)",
              boxShadow: isDarkMode ? "0 4px 12px rgba(0, 0, 0, 0.5)" : "0 4px 12px rgba(255, 183, 183, 0.5)",
              color: isDarkMode ? "#fff" : "#4D4D4D",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.div>
        ))}
      </div>

      {/* Message Box Toggle Button (Visible on Mobile) */}
      <button
        onClick={toggleVisibility}
        className="absolute px-4 py-2 font-bold rounded-md flex items-center desktop:hidden mobile:block"
        style={{
          backgroundColor: isDarkMode ? '#fff' : '#ffc0cb',
          color: isDarkMode ? '#000' : '#fff',
          border: '2px solid',
          borderColor: isDarkMode ? '#000' : '#ffc0cb',
          right: '25px',
          bottom: '70px',
        }}
      >
        {isVisible ? <FaCommentSlash /> : <FaComment />}
      </button>

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.top-1/2.right-10.bottom-4.w-80.p-4.rounded-lg.shadow-lg.flex.flex-col.gap-2 {
            display: ${isVisible ? 'block' : 'none'};
            width: 100%;
            height: auto;
            max-height: 50vh;
            position: fixed;
            bottom: 0;
            right: 50px;
            left: 0;
            margin: 0;
            padding: 1rem;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
};

export default MessageBox;