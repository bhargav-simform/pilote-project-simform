import { Image, ImageProps } from "antd";
import React from "react";

const ImageAtom: React.FC<ImageProps> = ({ ...props }) => {
  return <Image {...props} />;
};

export default ImageAtom;
