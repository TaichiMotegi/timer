import { useEffect, useState, useContext } from "react";
import db from "../firebase";
import { query, orderBy, collection, doc, getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { UserIdContext } from "../components/providers/UserIdContext";
import { NavButton } from "../components/navButton";
import { SubButton } from "../components/subButton";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// firebaseから取得したデータをカテゴリごとに統合するための関数
function mergeData(data) {
  let result = [];
  let nameIndexMap = {};
  data.forEach(function (item) {
    if (nameIndexMap[item.category] !== undefined) {
      result[nameIndexMap[item.category]].money += item.money;
    } else {
      nameIndexMap[item.category] = result.length;
      result.push({ category: item.category, money: item.money });
    }
  });

  return result;
}

// 円チャートに使用する色の作成
const colors = [
  "#f37053",
  "#5c73b7",
  "#7ab977",
  "#f68b58",
  "#7361ab",
  "#c0db75",
  "#fdbf64",
  "#8f64ab",
  "#6ea7a1",
  "#fff56c",
  "#6289a4",
  "#c76781",
];

function Chart() {
  const [posts, setPosts] = useState([]);
  // 現在のウィンドウの幅をstateとして管理
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

  // 円チャートに使用するデータの生成
  const data = [];
  posts.map((post) =>
    data.push({ category: post.category, money: post.money })
  );
  const mergedData = mergeData(data);

  // データを金額順にソート
  mergedData.sort((a, b) => {
    return a.money > b.money ? -1 : 1;
  });

  //金額の合計を計算　改善の余地あり
  let total = 0;
  posts.map((post) => (total += Number(post.money)));
  // カンマ区切りの文字列に変換
  const totalCommas = total.toLocaleString();

  // 円グラフのクリックされた部分の情報を表示する機能
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
            fontWeight: "bold",
          }}
        >
          <label>{`${payload[0].name} : ${Math.round(
            (payload[0].value / total) * 100
          )}%`}</label>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-evenly h-screen">
        <NavButton flag={true} />
        <SubButton />
        <div className="mt-44 fixed top-5 w-10/12 lg:w-4/12">
          <h1 className="text-center text-2xl font-mono font-bold md:text-4xl">
            TOTAL : {totalCommas !== 0 ? totalCommas : ""}円
          </h1>
          <div className="overflow-y-auto h-[calc(100vh-200px)]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mergedData}
                  dataKey="money"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={85}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend layout="horizontal" height={100} iconType="star" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chart;
