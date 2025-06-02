import Celebrating from '/Celebrating.png';
import CoolSunglasses from '/Cool Sunglasses.png';
import Cowboy from '/Cowboy.png';

const CornerEmojis = ({ isDarkMode }) => {
  if (!isDarkMode) return null;
  
  return (
    <>
      <img src={Celebrating} alt="Celebrating" className="absolute top-16 right-16 w-16 h-16" />
      <img src={CoolSunglasses} alt="Cool Sunglasses" className="absolute bottom-16 left-16 w-16 h-16" />
      <img src={Cowboy} alt="Cowboy" className="absolute top-16 left-16 w-16 h-16" />
    </>
  );
};

export default CornerEmojis;