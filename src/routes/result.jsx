import { useEffect, useState, useContext } from "react";
import db from "../firebase";
import { query, orderBy, collection, doc, getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { UserIdContext } from "../components/providers/UserIdContext";
import { NavButton } from "../components/navButton";
import { SubButton } from "../components/subButton";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function formatTime(time) {
  let eachTime = "";
  const [hours, minutes, seconds] = time.split(":").map(Number);
  eachTime += `${hours}時間${minutes}分${seconds}秒`;

  return eachTime;
}

function calculateTotalTime(timeStrings) {
  let totalSeconds = 0;

  timeStrings.forEach((timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, "0")}時間${String(
    minutes
  ).padStart(2, "0")}分${String(seconds).padStart(2, "0")}秒`;

  return formattedTime;
}

function Result() {
  const [posts, setPosts] = useState([]);
  const contextValue = useContext(UserIdContext);
  const uid = contextValue.userId;

  useEffect(() => {
    //データ取得
    const parentDocRef = doc(db, "users/" + uid);
    const childCollRef = collection(parentDocRef, "submit");
    const q = query(childCollRef, orderBy("submitDate", "desc"));
    getDocs(q).then((snapShot) => {
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });

    //リアルタイムで反映
    onSnapshot(q, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
    });
  }, [uid]);

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

  //金額の合計を計算　改善の余地あり
  let total = 0;
  posts.map((post) => (total += Number(post.money)));
  // カンマ区切りの文字列に変換
  const totalCommas = total.toLocaleString();

  let timeStrings = [];
  posts.map((post) => timeStrings.push(post.studyHours));
  const totalTime = calculateTotalTime(timeStrings);
  // console.dir(posts);
  if (windowWidth < 767) {
    return (
      <div>
        <div className="flex flex-col items-center">
          <NavButton flag={true} />
          <SubButton />
          <div className="mt-44 fixed top-5 w-10/12 lg:w-4/12">
            <div className="overflow-y-auto h-[calc(100vh-210px)]">
              <div className="mb-5 text-center text-2xl font-bold overflow-x-auto whitespace-nowrap md:text-4xl">
                {totalTime !== 0 ? totalTime : ""}
              </div>
              <div className="mb-5 text-center text-4xl font-mono font-bold whitespace-nowrap md:text-5xl">
                ⇅
              </div>
              <div className="mb-5 text-center text-2xl font-bold overflow-x-auto whitespace-nowrap md:text-4xl">
                {totalCommas !== 0 ? totalCommas : ""}円
              </div>
              <table className="items-center w-full">
                {posts.map((post) => (
                  <tbody>
                    <tr>
                      <td className="px-2 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 border-b-0 whitespace-nowrap font-semibold text-center">
                        {format(post.submitDate.toDate(), "yyyy年MM月dd日")}
                      </td>
                      <td
                        rowSpan="2"
                        className="px-2 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      >
                        <Link to="/edit" state={{ category: post.category }}>
                          {post.category}
                        </Link>
                      </td>
                      <td
                        rowSpan="2"
                        className="px-2 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      >
                        {post.money.toLocaleString()}円
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center">
                        {formatTime(post.studyHours)}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-col items-center">
          <NavButton flag={true} />
          <SubButton />
          <div className="mt-44 fixed top-5 w-10/12 lg:w-auto">
            <div className="py-2 mb-5 text-center text-2xl font-mono font-bold overflow-x-auto whitespace-nowrap md:text-4xl">
              {totalTime !== 0 ? totalTime : ""} ⇄
              {totalCommas !== 0 ? totalCommas : ""}円
            </div>
            <div className="overflow-y-auto h-[calc(100vh-300px)]">
              <table className="items-center w-full">
                {posts.map((post) => (
                  <tbody>
                    <tr>
                      <td className="px-2 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 border-b-0 whitespace-nowrap font-semibold text-center">
                        {format(post.submitDate.toDate(), "yyyy年MM月dd日")}
                      </td>
                      <td
                        rowSpan="2"
                        className="px-2 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      >
                        <Link to="/edit" state={{ category: post.category }}>
                          {post.category}
                        </Link>
                      </td>
                      <td
                        rowSpan="2"
                        className="px-2 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      >
                        {post.money.toLocaleString()}円
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-center">
                        {formatTime(post.studyHours)}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Result;
