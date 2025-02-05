import styled from "styled-components";

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  background: #f3f4f6;
  color: #374151;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #e5e7eb;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FileName = styled.span`
  font-size: 14px;
  color: #374151;
`;

export const Icon = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  fill: currentColor;
`;
