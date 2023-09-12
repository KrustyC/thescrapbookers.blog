interface PinterestIconProps {
  className?: string;
  onClick?: VoidFunction;
}

export const PinterestIcon: React.FC<PinterestIconProps> = ({
  className = "w-6 h-6",
  onClick,
}) => (
  <svg
    fill="currentColor"
    className={className}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path d="M216,112c0,22.56738-7.89648,43.20606-22.23389,58.11426C180.38916,184.02248,162.25,192,144,192c-17.8833,0-29.8208-5.85742-37.43164-11.9873L95.78711,225.83205A7.99971,7.99971,0,0,1,80.21289,222.168l32-136a7.99971,7.99971,0,0,1,15.57422,3.66406L110.894,161.62893C113.98926,166.021,123.29639,176,144,176c27.52734,0,56-23.93945,56-64A72,72,0,1,0,68.18555,152.09279a8.00027,8.00027,0,0,1-13.28223,8.92188A88.00371,88.00371,0,1,1,216,112Z" />
  </svg>
);
