import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginStyle.css';
import axios from 'axios';

const Login = () => {

  //1. 상태변수 선언 username, password
  const [form, setForm] = useState({
    username:'',
    password:''
  });
  
  const [error,setError] = useState('');

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setForm((prev)=>({
      ...prev,
      [name]:value
    }));
    setError('');
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:9070/login',form);
      localStorage.setItem('token', res.data.token);
      alert('로그인 성공');
    }catch(err){// 실패시
      setError('로그인 실패: 아이디와 패스워드를 다시 확인하세요.');
    }
  }
  
  return (
    <>
      <section>
        <h2>로그인</h2>
        <form className='loginForm' onSubmit={handleSubmit}>
          <p>
            <label htmlFor='username'>아이디: </label>
            <input type='text' id='username' name='username' placeholder='아이디' value={form.username} onChange={handleChange} />
          </p>
          <p>
            <label htmlFor='password'>패스워드: </label>
            <input type='password' id='password' name='password' placeholder='비밀번호' value={form.password} onChange={handleChange} />
          </p>

          <input type='submit' value='로그인' />

          {error&&<p style={{color:'red'}}>{error}</p>}

          <p className='link'>
            <Link to='/id_search'>아이디 찾기</Link>
            <Link to='/pw_search'>비밀번호 찾기</Link>
            <Link to='/register'>회원가입</Link>
          </p>

          
        </form>

        <dl>
          <dt>* 로그인 구현 전체 구성</dt>
          <dd>1. 프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청하기</dd>
          <dd>2. 백엔드(Backend : Node.js + Express) : 로그인 처리, JWT토큰 발급</dd>
          <dd>3. 데이터베이스(MYSQL) : DB입출력</dd>
          <dd>4. 보안 : 비밀번호 bycrpt 암호화, JWT로 인증을 유지</dd>
        </dl>

        <div>
          <p>DB 설계(users)</p>
          <pre>
            Insert INTO users(username,password) VALUES('jeon', '1234');
          </pre>
        </div>
      </section>
    </>
  );
};

export default Login;