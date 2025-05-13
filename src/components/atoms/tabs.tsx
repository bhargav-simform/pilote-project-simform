import React from "react";
import { Tabs, TabsProps } from "antd";

export const { TabPane } = Tabs;

const TabsAtom: React.FC<TabsProps> = ({ ...props }) => {
  return <Tabs {...props} />;
};

export default TabsAtom;
