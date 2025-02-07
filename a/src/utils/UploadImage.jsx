import React, { useState } from "react";
import { UploadContainer, Label, HiddenInput, FileName, Icon } from "../styles/UploadImageStyles";

function UploadImage({ uploadImage }) {
  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (event) => {
    setFileName(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };

  return (
    <UploadContainer>
      <Label htmlFor="fileInput">
        <Icon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 16V21H21V16H3ZM5 18H19V16H5V18ZM3 6H21V14H3V6ZM5 10H19V8H5V10Z" />
        </Icon>
        <FileName>{fileName?.name ? fileName.name : "Choose file"}</FileName>
      </Label>
      <HiddenInput
        type="file"
        id="fileInput"
        accept=".png, .jpeg, .jpg"
        required
        onChange={handleFileInputChange}
      />
    </UploadContainer>
  );
}

export default UploadImage;
