import axios from 'axios';
import React, { useState } from 'react';

const Join = () => {

  const [form,setForm]=useState({
    username:'',
    password:'',
    confirmPassword:''
  });

  const [error,setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setForm((prev)=>({
      ...prev,
      [name]:value
    }))
    setError('');
    setSuccess('');
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    // 비밀번호 확인
  if(form.password !== form.confirmPassword){
    setError('비밀번호가 일치하지 않습니다.');
    return;
  }
  try{
    await axios.post('http://localhost:9070/register',{username:form.username, password:form.password});
    setSuccess('회원가입이 완료되었습니다.');
    setForm({
      username:'',
      password:'',
      confirmPassword:''
    });

  }catch(err){
    setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
  }
  }
  return (
    <>
      <section>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor='username'>아이디: </label>
            <input type='text' id='username' name='username' placeholder='아이디' value={form.username} onChange={handleChange} required />
          </p>

          <p>
            <label htmlFor='password'>비밀번호: </label>
            <input type='password' id='password' name='password' placeholder='비밀번호' value= {form.password} onChange={handleChange} required />
          </p>

          <p>
            <label htmlFor='confirmPassword'>비밀번호 확인: </label>
            <input type='password' id='confirmPassword' name='confirmPassword' placeholder='비밀번호 확인' value={form.confirmPassword} onChange={handleChange} required />
          </p>
          <p>
            <input type='submit' value='회원가입' />
          </p>
          {/* 회원가입 에러가 나면 빨강색으로 문자 출력 */}
          {error&&<p style={{color:'red'}}>{error}</p>}

          {/* && : 조건부 렌더링 공식 : 조건에 맞으면 출력(실행) */}

          {/* 회원가입 성공이면 초록색으로 문자 출력 */}
          {success&&<p style={{color:'green'}}>{success}</p>}
        </form>
      </section>
    </>
  );
};

export default Join;