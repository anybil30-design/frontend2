import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

const Bookstore = () => {
  const [bookstore, setBookstore] = useState([]);
  const navigation = useNavigate();

  // 상태값
  // 1. 현재 페이지 1이 기본값
  const [currentPage, setCurrentPage] = useState(1);

  // 2. 검색하고있는 상태값
  const [searchText, setSearchText] = useState('');

  const [searchResult, setSearchResult] = useState('');

  const filterData = bookstore.filter(item=>
    item.name.toLowerCase().includes(searchResult.toLowerCase())
  );

  const handleSearch=()=>{
    setSearchResult(searchText);
    setCurrentPage(1);
    setSearchText('');
  }
  const handleKeyDown=(e)=>{
    if(e.key==='Enter'){
      handleSearch();
    }
  }

  // 한페이지에 들어갈수 있는 콘텐트 개수
  const defaultCont = 5;

  // 최대 콘텐츠 개수
  const maxCont = defaultCont * currentPage;
  const minCont = maxCont - defaultCont;

  // 필터링된 컨텐츠
  const currentCont = filterData.slice(minCont,maxCont);

  // 필터링된 페이지
  const totalPage = Math.max(1,Math.ceil(filterData.length/defaultCont));

  // 페이지 번호 구하기
  let startPage = Math.max(1,currentPage-2);

  // 이렇게 할경우  endPage의 최소값은 5임
  let endPage = Math.min(totalPage,startPage+4);

  startPage = Math.max(1, endPage-4);

  const pageNumbers = Array.from({length:endPage - startPage+1}, (_,i)=>startPage+i);

  const loadData = async() =>{
    try{
      const { data } = await axios.get('http://localhost:9070/bookstore');
      setBookstore(data);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    loadData();
  },[]);

  // 버튼 스타일
  const btnStyle ={
    color:'#333',marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px', background:'#e0e0e0',cursor:'pointer',
  };
  return (
    <>
      <section>
        <h2>Bookstore DB 입력/출력/수정/삭제</h2>
        <p>MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE). 수정(UPDATE)하기를 실습 응용한다. - CRUD</p>
      </section>
      <div><button onClick={()=>navigation('/bookstore/bookstorecreate')}>글쓰기</button></div>
      <table className="data_list">
        <caption></caption>
        <thead>
          <tr>
            <th>번호</th>
            <th>서점명</th>
            <th>지역1</th>
            <th>지역2</th>
            <th>지역3</th>
            <th>주문개수</th>
            <th>주문자</th>
            <th>주문자 번호</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {
            currentCont.length > 0?(
            currentCont.map((item)=>(
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.area1}</td>
              <td>{item.area2}</td>
              <td>{item.area3}</td>
              <td>{Number(item.book_cnt).toLocaleString()}</td>
              <td>{item.owner_nm}</td>
              <td>{item.tel_num}</td>
              <Button t_name='bookstore' i_code={item.code} loadData={loadData} />
            </tr>
            )))
            : <tr><td colSpan='9'>검색 결과가 없습니다.</td></tr>
          }
        </tbody>
      </table>

      <div style={{marginTop:'20px', textAlign:'center', width:'1300px'}}>
        <button style={btnStyle} onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1&&true}>이전</button>
        {/* 내용 */}
        {
          pageNumbers.map((number)=>(
            <button onClick={()=>setCurrentPage(number)}
              style={{marginRight:'5px', background:currentPage===number?'#4caf50':'#f0f0f0', padding:'5px 10px',border:'1px solid #ccc', borderRadius:'4px', color:currentPage===number?'#fff':'#333'}}
              key={number}
            >
              {number}
            </button>
          ))
        }
        <button style={btnStyle} onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===totalPage&&true}>다음</button>
      </div>

      <div style={{marginTop:'30px',textAlign:'center'}}>
        <input type='text' placeholder='상품명 검색' 
        style={{
          width:'250px',
          padding:'8px',
          border:'1px solid #ccc',
          borderRadius:'4px'
        }}
        value={searchText}
        onChange={(e)=>{setSearchText(e.target.value);}}
        onKeyDown={handleKeyDown}
        />

        <button 
        onClick={handleSearch}
        style={{
          marginLeft:'10px',
          padding:'8px 15px',
          border:'1px solid #ccc',
          borderRadius:'4px',
          background:'#4caf50',
          color: '#fff'
        }}>검색</button>
        <button onClick={()=>{setSearchText(''); setCurrentPage(1); setSearchResult('')}}
        style={{
          marginLeft:'10px',
          padding:'8px 15px',
          border:'1px solid #ccc',
          borderRadius:'4px',
          background:'#6b6b6b',
          color: '#fff'
        }}
          >초기화</button>
      </div>
    </>
  );
};

export default Bookstore;