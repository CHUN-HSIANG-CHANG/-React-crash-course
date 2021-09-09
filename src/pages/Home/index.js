import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from "../../global/constants";

import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";

async function fetchData(setData) {
  const res = await fetch(API_GET_DATA)
  const { data } = await res.json()//data的部分加大括號是為了做'解構'的動作，這樣才能拿到裡面的data
  setData(data)
}

async function fetchSetData(data) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ data })//data的部分加大括號是因為在db.json中，我所宣告的數據格式是一個大括號裡面再一個"data"
  })
}

const Home = () => {
  const [data, setData] = useState([]);
  const submittingStatus = useRef(false);

  useEffect(() => {
    fetchData(setData)  /*fetchData()若data的部分沒有加大括號的話，就相當於:
                         fetch(API_GET_DATA)
                         .then(res => res.json())//如果獲取的資源是JSON格式，則可以使用.json()進行解析
                         .then(data => {
                         setData(data)
                         })*/
  }, [])

  useEffect(() => {
    if (!submittingStatus.current) {
      return
    }
    fetchSetData(data).then(data => submittingStatus.current = false)
  }, [data])

  return (
    <div className="app">
      <Edit add={setData} submittingStatus={submittingStatus} />
      <List listData={data} deleteData={setData} submittingStatus={submittingStatus} />
    </div>
  );
};

export default Home;
