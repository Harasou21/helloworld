import React,{Component} from 'react';
import { Rnd } from "react-rnd";
// https://qiita.com/seira/items/f063e262b1d57d7e78b4
// https://qiita.com/FumioNonaka/items/277d79e700eaca42d5b0
// https://qiita.com/aokisinn1192/items/dd5f2598aef88d5a824f

import styles from './App.css'

export default class sample extends Component{
  constructor(props){
    super(props);
    // React コンポーネントのコンストラクタは、
    // マウントされる前に呼び出されます。
    // React.Component サブクラスのコンストラクタ
    // を実装するときは、他の文の前に super(props) 
    // を呼び出す必要があります。
    // そうでなければ、
    // this.props はコンストラクタ内で未定義になり、
    // バグの原因となる可能性があります。
    this.state = {
      diffX: 0,
      diffY: 0,
      currentX: 0,
      currentY: 0,
      dragging: false,
      resizing: false,
      width: 0,
      height: 0,
      styles: {      }
    }

    this._dragStart = this._dragStart.bind(this);
    this._dragging = this._dragging.bind(this);
    this._dragEnd = this._dragEnd.bind(this);
    this._resizeStart = this._resizeStart.bind(this);
    this._resizing = this._resizing.bind(this);
    this._resizeEnd = this._resizeEnd.bind(this);
    this._displayNav = this._displayNav.bind(this);
    this.hideNav = this._hideNav.bind(this);
  }

  _dragStart(e){
    this.setState({
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,

      // screenXはマウスイベントで、ウィンドウの左側からマウスまでの距離を表す
      // currentTargetは、イベントが起こった要素を取得
      // getBoundingClientRect().leftでターゲット要素の
      // ブラウザの一番左からの距離を取得する

      // つまりdiffXが何を表してるかと言うと、
      // 要素のどの位置をクリックしたか
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true
    })
    this._displayNav(e)

  }

  _dragging(e){
    if(this.state.dragging){
      let left = e.screenX - this.state.diffX;
      let top = e.screenY - this.state.diffY;
      
      this.setState({
        styles: {
          left: left,
          top: top
        }
      })
    }
  }

  _dragEnd(e){
    this.setState({
      dragging: false
    })
    this._hideNav(e)

  }

  _displayNav(e){
    e.currentTarget.style.border = "solid 1px blue"
  }

  _hideNav(e){
    e.currentTarget.style.border = "none"
  }


  // リサイズするには、押した位置と、スクロールした位置の
  // 差分を現在の要素をwidthに当てる感じ

  _resizeStart(e){
    e.stopPropagation() 
    this.setState({
      currentX: e.clientX,
      currentY: e.clientY,
      resizing: true
    })
// 現在のカーソルの位置を取得
console.log("resizeStart")
  }

  _resizing(e){
    e.stopPropagation() 
    this.setState({
      width: document.getElementById("square").clientWidth,
      height: document.getElementById("square").clientHeight
    }) 

    if(this.state.resizing){

      if(e.target.id === "rightBottomDot"){
        let movedX = e.clientX - this.state.currentX;
        let movedY = e.clientY - this.state.currentY;
        // 現在のカーソルと、先程のカーソルとの差分を算出

  
        console.log(movedX)
        
        this.setState({
          styles: {
            width: this.state.width + movedX,
            height: this.state.height + movedY
          }
        })


        // これだと、前のwidthがどんどん足されていって、指数関数的に面積が増えてしまう。
        console.log(this.state.styles.width)
      }
    }
  }

  _resizeEnd(e){
    e.stopPropagation() 
    this.setState({
      resizing: false
    })
    console.log("resizeEnd")
  }
  // マウスが動いた瞬間に、リサイズしてしまって、一向にキーアップできない


  // 左側のポインタで拡大しようとしたら、x軸が-になってしまう
  // それとどうように上側のポインタで縮小しようとしたら、Y軸が+になってしまう
  // それぞれのポインタごとに異なった処理が必要
  



  render(){
    return(
    <Rnd
     enableResizing={true}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
    >
      <div id="square"
        // style={this.state.styles}
        // onMouseDown={this._dragStart}
        // onMouseMove={this._dragging}
        // onMouseUp={this._dragEnd}
      >

        <div id="dots"
          // onMouseDown={this._resizeStart}
          // onMouseMove={this._resizing}
          // onMouseUp={this._resizeEnd}
        >
          <div className="topDots">
            <p id="leftTopDot" className="leftTopDot" ></p>
            <p id="rightTopDot" className="rightTopDot"></p>
          </div>

          <div className="BottomDots">
            <p id="rightBottomDot" className="rightBottomDot"></p>
            <p id="leftBottomDot" className="leftBottomDot"></p>
          </div>
        </div>
     
      </div>
    </Rnd>

    );
  }
}
