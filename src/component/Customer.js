import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';

const Customer = () => {

  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate();

  const getData=async()=>{
    try{
      const { data } = await axios.get('http://localhost:9070/customer');
      setCustomer(data);
    }catch(err){
      console.error(err);
    }
  }
  
  // 값불러오기(함수호출)
  useEffect(()=>{
    getData();
  },[])

  return (
    <>
      <h2>Customer DB 입력/출력/수정/삭제</h2>
      <table className="data_list">
        <thead>
          <tr>
            <th>No</th>
            <th>가게명</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>수정/삭제</th>
          </tr>
        </thead>

        <tbody>
          {
            customer.map((item)=>(
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.c_name}</td>
                <td>{item.c_address}</td>
                <td>{item.c_tel}</td>
                <Button  t_name='customer' i_code={item.num} loadData={getData} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default Customer;