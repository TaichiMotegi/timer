import { useStopwatch } from "react-timer-hook";
import db from "../firebase.js";
import { collection, addDoc, doc, Timestamp } from "firebase/firestore";
import { UserIdContext } from "../components/providers/UserIdContext";
import { useContext, useState, useEffect } from "react";
import useSound from "use-sound";
import Sound from "../レジスターで精算.mp3";

export const MyStopwatch = () => {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  // 現在のウィンドウの幅をstateとして管理
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // ウィンドウの幅が変更された場合にstateを更新する
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };
  // コンポーネントがマウントされたときに、ウィンドウリサイズのイベントリスナーを追加する
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    // コンポーネントがアンマウントされるときにイベントリスナーを削除する
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //submit時のサウンド
  const [play] = useSound(Sound);

  let sum = hours === 0 ? 0 : hours * 39000;
  let money = minutes === 0 ? sum + 0 : minutes * 150 + sum;
  let time = `${hours}:${minutes}:${seconds}`;

  const contextValue = useContext(UserIdContext);
  const uid = contextValue.userId;
  const parentDocRef = doc(db, "users/" + uid);
  // const childCollRef = collection(parentDocRef, "submit");

  const submit = () => {
    let category = window.prompt("何を勉強しましたか？");
    if (category) {
      play();
      addDoc(collection(parentDocRef, "submit"), {
        category: category,
        money: money,
        studyHours: time,
        submitDate: Timestamp.fromDate(new Date()),
      });
      reset(0, false);
    }
  };

  // ウィンドウサイズに応じた処理を行う
  if (windowWidth < 1200) {
    // ウィンドウ幅が1200px未満の場合の処理
    return (
      <div class="timer">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-mono font-bold mb-0">
            <span>{hours < 10 ? "0" + hours : hours}</span>:
            <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
            <span>{seconds < 10 ? "0" + seconds : seconds}</span>
          </div>
          <div className="text-5xl font-mono font-bold mb-0">⇅</div>
          <div className="text-5xl font-mono font-bold mb-0">
            {(minutes === 0 ? sum + 0 : minutes * 150 + sum).toLocaleString()}円
          </div>
          <div className="flex justify-center">
            <button
              onClick={isRunning === true ? pause : start}
              className={
                isRunning === true
                  ? "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-full h-20 w-20 text-sm text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 m-5"
                  : "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full h-20 w-20 text-sm text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 m-5"
              }
            >
              <p>{isRunning === true ? "Stop" : "Start"}</p>
            </button>
            <button
              onClick={() => {
                submit();
              }}
              className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:outline-none font-medium rounded-full h-20 w-20 text-sm text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 m-5"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    // ウィンドウ幅が1200px以上の場合の処理
    return (
      <div>
        <div className="flex flex-col items-center">
          {/* <h1 className="font-bold mt-10 md: mt-0">
            Convert Study Time into Money
          </h1> */}
          {/* <p className="font-bold mb-4 md:mb-0">
            Timer visualizes your hard work!
          </p> */}
          <div className="text-7xl font-mono font-bold mb-0">
            <span>{hours < 10 ? "0" + hours : hours}</span>:
            <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
            <span>{seconds < 10 ? "0" + seconds : seconds}</span>
            <span>
              {" "}
              ⇄{" "}
              {(minutes === 0 ? sum + 0 : minutes * 150 + sum).toLocaleString()}
              円
            </span>
          </div>
          <div className="flex justify-center">
            <button
              onClick={isRunning === true ? pause : start}
              className={
                isRunning === true
                  ? "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-full h-20 w-20 text-sm text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 m-5"
                  : "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full h-20 w-20 text-sm text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 m-5"
              }
            >
              <p>{isRunning === true ? "Stop" : "Start"}</p>
            </button>
            <button
              onClick={() => {
                submit();
              }}
              className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:outline-none font-medium rounded-full h-20 w-20 text-sm text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 m-5"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
};
