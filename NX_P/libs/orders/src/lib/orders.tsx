import styles from './orders.module.scss';
import { useEffect, useState } from 'react';

export function Orders() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
    console.log('UseEffectCode');
  }, [counter]);
  if (counter % 2 === 0) {
    return (
      <div className={styles['container']}>
        <h1>Welcome to Orders!</h1>
      </div>
    );
  } else {
    return <h1>Else State</h1>;
  }
}

export default Orders;
