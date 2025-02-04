import { Values } from '@./Models';
import styles from './Square.module.scss';
export interface SquareProps {
  value: Values;
  onClick: () => void;
}
export function Square(props: SquareProps) {
  function getStyle() {
    const squareStyle = styles.square;
    if (props.value === Values.Empty) {
      return squareStyle;
    }
    const playerStyle =
      props.value === Values.X ? styles.player_x : styles.player_o;
    return `${squareStyle} ${playerStyle}`;
  }
  return (
    <button onClick={props.onClick} className={getStyle()}>
      {props.value === Values.X ? 'X' : props.value === Values.O ? 'O' : null}
    </button>
  );
}

export default Square;
