import React, { useState, useEffect } from 'react';
import Moveable from 'react-moveable';
import './App.css';

const App = () => {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    setTarget(document.querySelector('.mix'));
  }, []);

  

  return (
    <React.Fragment>
      <div id="square" className={'moveable mix'}>mix</div>
      <Moveable
       // target={target}
        draggable={true}
        scalable={true}
        rotatable={true}
        origin={false}
        throttleRotate={0}
        onDrag={e => {
          e.target.style.transform = e.transform;
        }}
        onScale={e => {
          e.target.style.transform = e.transform;
        }}
        onRotate={e => {
          e.target.style.transform = e.transform;
        }}
      />
    </React.Fragment>
  );
};

export default App;

// 回るナビゲーションを四隅にする。
// 枠の青い部分は図形をクリックしたときのみ
// 四隅でしかリサイズできないようにする
// 図形の下の部分に、図形の大きさ(高さ、幅)を表示


// js リサイズで調べる
// diffがすでに定義されてるから、それをそのまま
// widthに当てればいけんじゃね