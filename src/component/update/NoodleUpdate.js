import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export default function NoodleUpdate(props){
  // 해당 id값 빼오기
  const {i_code} = useParams();
  const navigate = useNavigate();
  // console.log(i_code);
  const [form, setForm] = useState({
    name:'',
    company:'',
    kind:'',
    price:'',
    e_date:'',
    reg_date:''
  });

  useEffect(()=>{
    const getBaseData=async()=>{
      try{
        const {data} = await axios.get(`https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/noodle/${i_code}`);
        setForm(prev=>({
          ...prev,
          ...data
        }))
      }catch(err){
        console.error(err);
      }
    }
    getBaseData();
  },[i_code]);

  const formChange=(e)=>{
    const {name, value} = e.target;
    setForm(prev=>({
      ...prev,
      [name]:value
    }));
  }

  const dataInput=(e)=>{
    e.preventDefault();
    axios.put(`https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/noodle/update/${i_code}`,form)
    .then(()=>{
      alert('수정이 완료되었습니다.');
      navigate('/noodle');
    }).catch((err)=>{
      console.error(`수정실패: ${err}`);
    });
  }

  return(
    <>
      <h2>Noodle DB 수정</h2>
      <form onSubmit={dataInput}>
        <p>
          <label htmlFor="i_code">상품번호: </label>
          <input id='i_code' name='i_code' value={i_code} readOnly />
        </p>
        <p>
          <label htmlFor='name'>상품명: </label>
          <input type='text' id='name' name='name' value={form.name} onChange={formChange} required />
        </p>

        <p>
          <label htmlFor='company'>브랜드: </label>
          <input type='text' id='company' name='company' value={form.company} onChange={formChange} required />
        </p>

        <p>
          <label htmlFor='kind'>종류: </label>
          <input type='text' id='kind' name='kind' value={form.kind} onChange={formChange} required />
        </p>

        <p>
          <label htmlFor='price'>가격: </label>
          <input type='number' id='price' name='price' value={form.price} onChange={formChange} required />
        </p>

        <p>
          <label htmlFor='e_date'>유통기한: </label>
          <input type='number' id='e_date' name='e_date' value={form.e_date} onChange={formChange} required />
        </p>

        <button type='submit'>수정하기</button>
      </form>
    </>
  );

};

