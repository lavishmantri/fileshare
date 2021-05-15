interface ButtonProps {
  text: string;
  onClick?: () => {};
}

export const Button: React.FC<ButtonProps> = ({ text = '', onClick = () => {} }) => {
  const handleOnClick = () => {
    onClick();
  };

  return <button onClick={handleOnClick}>{text}</button>;
};
