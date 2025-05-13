import { Switch, SwitchProps } from "antd";

import React from "react";

const SwitchAtom: React.FC<SwitchProps> = ({ ...props }) => {
  return <Switch {...props} />;
};

export default SwitchAtom;
