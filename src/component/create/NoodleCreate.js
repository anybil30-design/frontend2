import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NoodleCreate = () => {
  const [form, setForm] = useState({
    name:'',
    company:'',
    kind:'',
    price:'',
    e_date:''
  });
  

  const navigate = useNavigate();

  const formChange=(e)=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]:value
    });
  }

  const dataInput=(e)=>{
    e.preventDefault();
    const payload = {
      ...form,
      e_date: form.e_date.replace(/-/g, ""), // 전송시에만 20260114
    };

    axios.post('https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/noodle/create',payload)
    .then(()=>{
      alert('등록에 성공했습니다.');
      navigate('/noodle');
    }).catch((err)=>{
      console.error(err);
    })
  }
  return (
    <>
      <h2>Noodle DB 입력</h2>
      <form onSubmit={dataInput}>
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
          <input type='date' id='e_date' name='e_date' value={form.e_date} onChange={formChange} required />
        </p>

        <button type='submit'>등록하기</button>
      </form>
    </>
  );
};


export default NoodleCreate;
