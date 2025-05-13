import React from "react";
import { ButtonProps, Button } from "antd";
const ButtonAtom: React.FC<ButtonProps> = ({ ...props }) => {
  return <Button {...props} />;
};

export default ButtonAtom;
