interface CurrencyEuroIconProps {
  className?: string;
  onClick?: VoidFunction;
}

export const CurrencyEuroIcon: React.FC<CurrencyEuroIconProps> = ({
  className = "w-6 h-6",
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    onClick={onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
