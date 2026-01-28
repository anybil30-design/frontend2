import React, { useState, useContext } from 'react';
import axios from 'axios';
import QusetionList from './QusetionList';
import { AlertContext } from '../AlertContext';

const Qusetion = () => {
  const [agree,setAgree] = useState(false);
  const {setQuestionCount} = useContext(AlertContext);

  const [formData, setFormData] = useState({
    name:'',
    phone:'',
    email:'',
    content:''
  });


  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(agree===false){
      return alert('개인정보처리방침에 동의해주세요.');
    }
    try{
      const {data} = await axios.post('https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/api/question', formData);
      if(data.success){
        
        alert('등록 성공');
        setFormData({
          name:'',
          phone:'',
          email:'',
          content:''
        });
        setAgree(false);
        setQuestionCount(count => count + 1); // 뱃지숫자 증가
      }
    }catch(err){
      console.error(`입력실패: ${err}`);
    }
  }
  return (
    <>
      <section>
        <h2>Qusetion</h2>
        <form className='questionForm' onSubmit={handleSubmit}>
          <h3>정성을 다해 답변을 해드리겠습니다.</h3>
          {/* 박스 서식 */}
          <div>
            <div>
              <div>
                <label htmlFor='name'>성함</label>
                <input type='text' id='name' placeholder='성함을 입력해주세요' name='name' required value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor='phone'>전화번호</label>
                <input type='text' id='phone' placeholder='01012341234' name='phone' required value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor='email'>이메일</label>
                <input type='email' id='email' placeholder='이메일 주소를 입력해주세요.' name='email' required value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label htmlFor='content'>문의 내용</label>
              <textarea id='content' placeholder='문의 내용을 입력하세요' cols='30' rows="10" name='content' required value={formData.content} onChange={handleChange}></textarea>
            </div>
          </div>

          {/* 체크박스, 전송버튼 */}
          <div>
            <div>
              {/* agree===false?true:false */}
              <input type='checkbox' id='agree' checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
              <label htmlFor='agree'>개인정보처리 방침에 동의합니다.</label>
            </div>
            <button type='submit'>SEND</button>
          </div>
        </form>
      </section>
      <QusetionList />
    </>
  );
};


export default Qusetion;
