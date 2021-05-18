interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ className = '', text = '', onClick = () => {} }) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    (
    <button className={className} onClick={handleOnClick}>
      {text}
    </button>
  )
  );
};
