// LoadingSpinner.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(0.5); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #333;
  animation: ${loadingAnimation} 1.2s infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <Dot />
      <Dot />
      <Dot />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
