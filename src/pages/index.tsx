import React, { useEffect, useReducer, useState } from "react";
import FormContainer from "../components/organism/formContainer";
import { useTheme } from "../context/themeContext";
import TabsAtom, { TabPane } from "../components/atoms/tabs";
import "../styles/index.css";
import { FormData } from "../interface/types"; // Adjust this import path as per your project structure
import { message } from "antd";
import FormDataTable from "../components/molecules/formDataTable";

// Define action types
type Action =
  | { type: "initialize"; payload: FormData[] }
  | { type: "delete"; payload: string }
  | { type: "add"; payload: FormData };

// Reducer function with type safety
const reducer = (state: FormData[], action: Action): FormData[] => {
  switch (action.type) {
    case "initialize":
      return action.payload;
    case "delete":
      const updatedState = state.filter(
        (formData) => formData.id !== action.payload
      );
      localStorage.setItem("formData", JSON.stringify(updatedState));
      return updatedState;
    case "add":
      const updatedFormData = [...state, action.payload];
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
      return updatedFormData;
    default:
      return state;
  }
};

const initializer = (): FormData[] => {
  const storedData = localStorage.getItem("formData");
  return storedData ? JSON.parse(storedData) : [];
};

const Index: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("form");
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, dispatch] = useReducer(reducer, [], initializer);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      dispatch({ type: "initialize", payload: JSON.parse(storedData) });
    } else {
      localStorage.setItem("formData", JSON.stringify([]));
    }
  }, []);

  const updateFormData = (newFormData: FormData) => {
    dispatch({ type: "add", payload: newFormData });
    messageApi.success("Form Submitted Successfully");
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "delete", payload: id });
    messageApi.error("Data has been deleted");
  };

  return (
    <div
      className={`indexContainer ${theme === "dark" ? "dark-theme" : "light-theme"}`}
    >
      <TabsAtom
        type="card"
        size="large"
        activeKey={activeTab}
        onChange={handleTabChange}
      >
        <TabPane tab="Form" key="form">
          <FormContainer formData={formData} updateFormData={updateFormData} />
        </TabPane>
        <TabPane tab="Form Data" key="table">
          <FormDataTable dataSource={formData} handleDelete={handleDelete} />
        </TabPane>
      </TabsAtom>
      {contextHolder}
    </div>
  );
};

export default Index;
