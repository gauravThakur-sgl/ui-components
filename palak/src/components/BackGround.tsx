import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import BackgroundImage from "../assets/bg.jpg";
interface BackGroundProps {
  children: React.ReactNode;
}

const BackGround = ({ children }: BackGroundProps) => {
  return (
    <div className="bg-cover h-screen" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <Link to="#" className="grid">
        <div className="flex items-start lg:mb-8 justify-center mt-8 mx-20 md:justify-start">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>
      </Link>

      <div className="rounded-lg shadow-lg w-full mx-auto my-auto max-w-md max-h-screen mt-8 px-3 bg-white pb-28">
        {children}
      </div>
    </div>
  );
};

export default BackGround;
