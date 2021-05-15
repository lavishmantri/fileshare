import './row.css';

interface RowProps {
  children: React.ReactChild | React.ReactChild[];
}

export const Row: React.FC<RowProps> = ({ children }) => {
  return <div className="row">{children}</div>;
};
