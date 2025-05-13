import React from "react";
import "../../styles/navbar.css"; // Your component-specific styles
import ImageAtom from "../atoms/image";
import SwitchAtom from "../atoms/switch";
import { useTheme } from "../../context/themeContext";
import logo from "../../assets/simform.svg";
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div
      className={`navbarContainer ${theme === "dark" ? "dark-theme" : "light-theme"}`}
    >
      <div className="logoContainer">
        <ImageAtom src={logo} alt="Logo" preview={false} />
      </div>
      <div className="themeSwitchContainer">
        <SwitchAtom
          className="toggleThemeSwitch"
          onChange={handleToggle}
          checkedChildren="Light"
          unCheckedChildren="Dark"
          defaultChecked={theme === "light"}
        />
      </div>
    </div>
  );
};

export default Navbar;
