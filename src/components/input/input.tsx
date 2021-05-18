import React from 'react';
import { EnterKey, TabKey } from '../../utils/key-code';
import './input.css';

interface InputProps {
  className?: string;
  onEnter?: (value: string) => void;
  onTab?: (value: string) => void;
  onChange: (value: string) => void;
  value?: string;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  value,
  onChange,
  onEnter = () => {},
  onTab = () => {},
}) => {
  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.code === TabKey) {
      evt.preventDefault();
      onTab((evt.target as HTMLInputElement).value);
      return false;
    }
  };
  const handleKeyUp = (evt: React.KeyboardEvent) => {
    if (evt.code === EnterKey) {
      onEnter((evt.target as HTMLInputElement).value);
      return;
    }

    if (evt.code === TabKey) {
      onTab((evt.target as HTMLInputElement).value);
      return;
    }
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);
  };

  return (
    <input
      value={value}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      onChange={handleOnChange}
      className={`input ${className}`}
      autoFocus
    />
  );
};
