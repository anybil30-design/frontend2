import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function FruitsUpdate(props){
  const { i_code } = useParams();

  const navigate = useNavigate();

  const [form,setForm]=useState({
    num:i_code,
    name:'',
    price:'',
    color:'',
    country:''
  });

  const getInfo=async()=>{
    try{
      const { data } = await axios.get(`http://localhost:9070/fruits/${i_code}`);
      
      // 하나의 데이터만 조회하는거기 때문에 하나의 배열만 가져옴
      const row = Array.isArray(data) ? data[0] : data;
      
      setForm(prev => ({
        ...prev,          // 기존값
        ...row,          // 서버에서 온 값만 덮어쓰기
        num: i_code      // num은 params 기준으로 유지(선택)
      }));

      // setForm(data); 에러 코드

    }catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    getInfo();
  },[i_code]);



  const handleChange=(e)=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]:value
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    axios.put(`http://localhost:9070/fruits/${i_code}`,{
      name:form.name,
      price:form.price,
      color:form.color,
      country:form.country
    })
    .then(()=>{//통신이 성공적으로 이루어질 경우
      alert('상품정보가 수정 완료되었습니다.');
      navigate('/fruits');
    })
    .catch((err)=>console.error(err)
      
    );
  }


  return(
    <>
      <section>
        <h2>Fruits DB수정을 위한 페이지</h2>
        <form name='과일정보입력' onSubmit={handleSubmit}>
          <div>
            <p>
              <label htmlFor="num">Num :</label>
              <input id='num' name='num' value={form.num} readOnly />
            </p>
            <p>
              <label htmlFor="name">과일명: </label>
              <input type='text' id='name' name='name' value={form.name} onChange={handleChange} required />
            </p>
            
            <p>
              <label htmlFor="price">가격: </label>
              <input type='number' id='price' name='price' value={form.price} onChange={handleChange} required />
            </p>

            <p>
              <label htmlFor="color">색상: </label>
              <input type='text' id='color' name='color' value={form.color} onChange={handleChange} required />
            </p>

            <p>
              <label htmlFor="country">원산지: </label>
              <input type='text' id='country' name='country' value={form.country} onChange={handleChange} required />
            </p>
            <button type='submit'>신규상품 등록하기</button>
          </div>
        </form>
      </section>
    </>  
  );
};