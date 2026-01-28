import React,{useState, useEffect} from "react";
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function BookstoreUpdate(props){
  const navigate = useNavigate();
  const { i_code } = useParams();
  const [form , setForm] = useState({
    name:'',
    area1:'',
    area2:'',
    area3:'',
    book_cnt:'',
    owner_nm:'',
    tel_num:''
  });


  useEffect(()=>{
    // 비동기방식 get
    const getData=async()=>{
      try{
        const {data} = await axios.get(`https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/bookstore/${i_code}`);
        setForm((val)=>({
          ...val,
          ...data
        }));
      }catch(err){
        console.error(err);
      }
    }
    getData();
  },[i_code])

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setForm({
      ...form,
      [name]:name==="book_cnt"? Number(value):value
    })
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    //비동기 방식으로 업데이트할 내용을 백엔드로 전달
    axios.put(`https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/bookstore/${i_code}`,form)
    .then(()=>{
      alert('수정이 완료되었습니다.');
      navigate('/bookstore');
    }).catch((err)=>{
      console.error(err);
    })
  }
  

  return(
    <>
      <section>
        <h2>4. Books DB 수정페이지</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='code'>번호</label>
            <input id='code' name='code' value={i_code} readOnly />
          </div>

          <div>
            <label htmlFor="name">서점명 : </label>
            <input id='name' name='name' value={form.name} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="area1">지역1(시) : </label>
            <select id='area1' name="area1" onChange={handleChange} value={form.area1}>
              <option value=''>지역을 선택하세요.</option>
              <option value='서울'>서울</option>
              <option value="경기">경기</option>
              <option value="경남">경남</option>
              <option value="광주">광주</option>
              <option value="강원">강원</option>
              <option value="대전">대전</option>
              <option value="대구">대구</option>
              <option value="부산">부산</option>
              <option value="제주도">제주도</option>
            </select>
          </div>

          <div>
            <label htmlFor="area2">지역2(구) : </label>
            <select id='area2' name="area2" onChange={handleChange} value={form.area2}>
              <option value=''>지역을 선택하세요.</option>
              <option value='서초'>서초</option>
              <option value="성남">성남</option>
              <option value="남구">남</option>
              <option value="창원">창원</option>
              <option value="서귀포">서귀포</option>
              <option value="수영">수영</option>
              <option value="경기">경기</option>
            </select>
          </div>

          <div>
            <label htmlFor="area3">지역3(동) : </label>
            <select id='area3' name='area3' onChange={handleChange} value={form.area3}>
              <option value="">지역을 선택해주세요.</option>
              <option value="방배">방배</option>
              <option value="청담">청담</option>
              <option value="구기">구기</option>
              <option value="인사">인사</option>
              <option value="명동">명동</option>
              <option value="익선">익선</option>
              <option value="삼청">삼청</option>
              <option value="하계">하계</option>
              <option value="중계">중계</option>
              <option value="상계">상계</option>
            </select>
          </div>
          <div>
            <label htmlFor="book_cnt">상품개수 :</label>
            <input id='book_cnt' type='number' name='book_cnt' value={form.book_cnt} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="owner_nm">대표자명</label>
            <input id='owner_nm' name='owner_nm' value={form.owner_nm} onChange={handleChange} required/>
          </div>

          <div>
            <label htmlFor="tel_num">전화번호: </label>
            <input id='tel_num' name='tel_num' value={form.tel_num} onChange={handleChange} required />
          </div>
          <button type='submit'>
            수정하기
          </button>
        </form>
      </section>
    </>
  );

};

