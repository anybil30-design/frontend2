import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { AlertContext } from '../../AlertContext';

export default function FruitsCreate(props){
  const navigate = useNavigate();
  // const {setFruitsCount} = useContext(AlertContext);
  const [form, setFrom] = useState({
    name:'',
    price:'',
    color:'',
    country:''
  });

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFrom({
      ...form,
      [name]:value
    });
  }

  // 저장된 값을 서버로 보내야함.
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:9070/fruits',form)
    .then(()=>{//통신이 성공적으로 이루어지면)
      alert('상품이 정상적으로 등록 완료되었습니다.');
      
      // setFruitsCount(res.data.length);
      navigate('/fruits');
    })
    .catch(err=>console.error(err));
    // setFrom({
    //   name:'',
    //   price:'',
    //   color:'',
    //   country:''
    // });
  }
  return(
    <>
      <section>
        <h2>Fruits DB입력을 위한 페이지</h2>
        <form name='과일정보입력' onSubmit={handleSubmit}>
          <div>
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