import { useEffect, useState, useContext, useRef, useReducer, useMemo, useCallback } from 'react';
import './App.css';
import GlobalInfoContext from './main';
import SomeChild from './SomeChild';
import useLocalStorage from './useLocalStorage';



const reducer = (state, action) => {
  switch(action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};


function App() {
  const [count,setCount] = useState(0);
  const globalInfo = useContext(GlobalInfoContext);
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, 0);

  const handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log("Hello Hooks");
  }, [count]);

  const handleRef = () => {
    console.log(ref);
    console.log(ref.current.value);
    console.log(ref.current.offsetTop);
  };

  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // useMemo 値のメモ化
  // useMemoを使わないと、関係ない処理のときでも下記の重い処理が済んでからでないと先に進めない
  // const square = () => {
  //   let i = 0;
  //   while(i < 200000000) {
  //     i++;
  //   }
  //   return count02 * count02;
  // };
  const square = useMemo(() => {
    let i = 0;
    while(i < 200000000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  // useCallback 関数のメモ化
  const [counter, setCounter] = useState(0);
  // const showCount = () => {
  //   alert("これは重い処理です");
  // };
  const showCount = useCallback(() => {
    setCounter(100);
    alert("これは重い処理です");
  }, [counter]);

  //カスタムフック
  const [age, setAge] = useLocalStorage("age", 24);


  return (
    <>
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>＋</button>
      <p>{count}</p>
      <h2>
        useStateはデータが変更されたときに画面を再レンダリングする関数です。<br />
        普通にデータを変更する場合と違い、内部的なデータの変更を画面にもすぐに反映できます😎
      </h2>
      <h2>
        useEffectは画面を再レンダリングするときの発火のタイミングを指定することができる関数です。 発火のタイミングの指定は第二引数に記述します。<br />
        つまり、「①第二引数が更新される → ②画面がレンダリングされる → ③第一引数の関数が実行される」という順番で処理が行われます。<br />
        useEffectは「関心の分離」という用途でよく使われます。第二引数の変数が更新されたときにだけ特定の処理を実行したい場合によく用いられます。<br />
        ちなみに第二引数に空配列[]を渡すと、そのコンポーネントを読み込んだ最初の一回のときだけ処理を実行するようにできます。<br />
      </h2>

      <hr />

      <h1>useContext</h1>
      <p>{globalInfo.name}</p>
      <p>{globalInfo.age}</p>
      <h2>
        親コンポーネントから子へのデータを受け渡しは通常はpropsを使います。しかしそれだとデータの受け渡しがバケツリレーのようになってしまいます。これには、データの発生源やルートが分かりづらくなっていくという問題点があります。<br />
        useContextを使えば大元のコンポーネントから直接データを受け渡せるようになります😊<br />
        使う手順としては、「①大元のコンポーネントでデータを定義 → ②Providerで囲いつつエクスポートする → ③データを使いたいコンポーネントでuseContextを使用する」となります。
      </h2>

      <hr />

      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>useRef</button>
      <h2>
        useRefとは、書き換え可能な値を.currentプロパティ内に保持することができる「箱」のようなものです。<br />
        useRefでは箱の中身が変更されても再レンダリングが発生しない、という特徴があります😃
      </h2>

      <hr />

      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>＋</button>
      <button onClick={() => dispatch({ type: "decrement" })}>ー</button>
      <h2>
        useReducerは状態管理に使用するHooksです。stateの状態を変化させる裏側の処理を設定することができます。<br />
        通常はReduxなどの状態管理ライブラリの中で使うことが多く、単体で使用することは稀です🤔
      </h2>

      <hr />

      <h1>useMemo</h1>
      <div>カウント1：{count01}</div>
      <div>カウント2：{count02}</div>
      <div>カウント2を二乗した結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>1</button>
      <button onClick={() => setCount02(count02 + 1)}>2</button>
      <h2>
        Reactのパフォーマンスを上げる目的で使用するHooksです。重い処理が存在するとき、その重い処理に関係がなくかつ画面の再レンダリングが発生する処理では、useMemoでブラウザのメモリに保存された値を使って画面をレンダリングします。<br />
        重い処理をラップして第一引数とし、第二引数には依存関係を設定する変数を指定します。
      </h2>

      <hr />

      <h1>useCallback</h1>
      <SomeChild showCount={showCount} />
      <h2>
        useMemoのコールバック関数バージョン。
      </h2>

      <hr />

      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>
      <h2>
        hooksを自作できる機能。
      </h2>
    </>
  )
}

export default App
