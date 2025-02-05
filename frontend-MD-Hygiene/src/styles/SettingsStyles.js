import styled from "styled-components";

export const SettingsContainer = styled.div`
margin-top:60px;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SettingsHeader = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 6px;
  background: #f3f4f6;
  font-size: 16px;
`;

export const SettingsIcon = styled.div`
  font-size: 20px;
  color: #007bff;
`;

export const ToggleSwitch = styled.input.attrs({ type: "checkbox" })`
  width: 40px;
  height: 20px;
  appearance: none;
  background: #ccc;
  border-radius: 10px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: 0.3s;

  &:checked {
    background: #007bff;
  }

  &::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    top: 1px;
    left: 2px;
    transition: 0.3s;
  }

  &:checked::before {
    left: 20px;
  }
`;

export const SaveButton = styled.button`
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #0056b3;
  }
`;
