import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GoodsCreate(props){
  const navigate = useNavigate();

  const [form,setForm] = useState({
    g_name:'',
    g_cost:''
  });

  // 사용자가 입력박스에 입력을 하면 호출되는함수 == 값저장
  const handleChange=(e)=>{
    const {name,value} = e.target;
    setForm({
      ...form,
      [name]:value
    });
  }

  // 신규상품 등록하기 버튼 클릭시 호출되는 함수 == backend 서버로 전달
  const handleSubmit=(e)=>{
    e.preventDefault(); //새로고침 방지

    axios.post('https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/goods', form)
    .then(()=>{ //통신이 성공하면
      alert('상품이 등록되었습니다.');
      navigate('/goods');
    })
    .catch(err=>console.error(err));  //실패시 콘솔모드에 에러를 출력함
  }

  return(
    <>
      <section>
        <h2>Goods DB입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="g_name">상품명: </label>
            <input type='text' id='g_name' name='g_name' value={form.g_name} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="g_cost">가격</label>
            <input type='number' id='g_cost' name='g_cost' value={form.g_cost} onChange={handleChange} required />
          </p>
          <button type='submit'>신규상품 등록하기</button>
        </form>
      </section>
    </>
  );

};
