import React from 'react';
import styles from './App.module.scss';
import Visual from "./startup";
import {Keyboard} from "./Keyboard";
import {keyboards} from "./slices/keyboard.slice";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Keyboard keyboard={keyboards.chromEq}/>
      <Keyboard keyboard={keyboards.harmonics}/>
      {/*<Visual width={512} height={400}/>*/}
    </div>
  );
}

export default App;
