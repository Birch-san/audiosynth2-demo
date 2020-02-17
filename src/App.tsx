import React from 'react';
import styles from './App.module.scss';
import Visual from "./startup";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Visual width={512} height={400}/>
    </div>
  );
}

export default App;
