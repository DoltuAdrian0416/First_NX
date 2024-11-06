import styles from './Square.module.scss';
import { Values } from './Board';
interface SquareProps {
  value: Values;
  onClick: () => void;
}
export function Square(props: SquareProps) {
  switch (props.value) {
    case Values.O:
      return (
        <button onClick={props.onClick} className={styles.square}>
          O
        </button>
      );
    case Values.X:
      return (
        <button onClick={props.onClick} className={styles.square}>
          X
        </button>
      );
    case Values.Empty:
      return (
        <button onClick={props.onClick} className={styles.square}></button>
      );
  }
}

export default Square;
