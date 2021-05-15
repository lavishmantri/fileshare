import { Row } from '../row/row';

export const Grid = ({ items = [] }) => {
  return (
    <div>
      {items.map(item => (
        <Row>
          <>file</>
        </Row>
      ))}
    </div>
  );
};
