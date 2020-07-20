import React from "react";

interface LoadingIconProps {
  className?: string;
}

const LoadingIcon = ({ className = "" }: LoadingIconProps) => {
  return (
    <svg
      style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={className} 
      data-testid="loading-icon"
    >
      <circle cx="30.0122" cy="50" fill="#93dbe9" r="20">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.5;1"
          values="30;70;30"
          begin="-0.5s"
        ></animate>
      </circle>
      <circle cx="69.9878" cy="50" fill="#689cc5" r="20">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.5;1"
          values="30;70;30"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="30.0122" cy="50" fill="#93dbe9" r="20">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.5;1"
          values="30;70;30"
          begin="-0.5s"
        ></animate>
        <animate
          attributeName="fill-opacity"
          values="0;0;1;1"
          calcMode="discrete"
          keyTimes="0;0.499;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
  );
};

export default LoadingIcon;
