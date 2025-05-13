// Input.tsx
import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';
import '../../styles/form.css';

interface FormInputProps extends InputProps {
  label?: string;
  prefix?: React.ReactNode;
  theme?: 'light' | 'dark';
}

const InputAtom: React.FC<FormInputProps> = ({ prefix, theme = 'light', ...rest }) => {
  return (
    <Input {...rest} prefix={prefix} className={`input-${theme}`} />
  );
};

export default InputAtom;
