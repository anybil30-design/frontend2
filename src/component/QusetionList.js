import React, { useEffect, useState } from "react";
import axios from "axios";
export default function QusetionList(){

  const [data,setData] = useState([]);

  // 데이터 불러오기
  const loadData=async()=>{
    try{
      const {data} = await axios.get('http://localhost:9070/question');
      setData(data);
    }catch(err){
      alert(`데이터 가져오기 실패: ${err}`);
    }
  }

  useEffect(()=>{
    loadData();
  },[]);

  // 4. 날짜 데이터 포멧
  const formatData = (date) =>{
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR'); //한국 지역날짜
  }
  return(
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>phone</th>
            <th>email</th>
            <th>content</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item)=>(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.content}</td>
                <td>{formatData(item.date)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};