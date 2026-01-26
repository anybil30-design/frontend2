import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

const Fruits = () => {
  const [datas, setDatas]=useState([]);
  const navigate = useNavigate();
  // 검색어 입력용
  const [inputKeyword,setInputKeyword] =useState('');

  const {setFruitsCount} = useContext(AlertContext);

  //  상태값이 2개인 이유 하나는 실시간 검색을 받는 상태값
  // 하나는 검색버튼 클릭시 바뀌는 상태값 -> 이렇게 해야 filterData 함수 호출이 검색시에만 가능

  // 실제 검색에 사용될 키워드
  const [keyword, setKeyword] =useState('');  
    // 상태변수
  const [currentPage, setCurrentPage] = useState(1);

    // 검색클릭시
  const handleSearch=()=>{
    setKeyword(inputKeyword); //검색단어 확정
    setCurrentPage(1);  //검색 시 항상 1페이지부터
    setInputKeyword('');
  }

  // 키보드 'Endter'키를 눌러도 검색이 되도록 함.
  const handleKeyDown =(e)=>{
    if(e.key==='Enter'){
      handleSearch();
    }
  }


  // 검색시 name(과일명) 기준으로 검색
  const filterData = datas.filter(item=>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );



  // 한페이지에 들어갈 data개수
  const itemsPerPage = 5; // 한페이지에 보여질 게시물 개수

  // 페이지네이션 계산 공식만들기   게시물 50개 / 5개씩 보여주겠다 = 50/5 = 5개 페이지가 나와야
  // 현재 페이지의 마지막 인덱스 번호
  const indexOfLast= currentPage * itemsPerPage;

  const indexOfFirst = indexOfLast-itemsPerPage;

  // 필터링된 데이터
  const currentItems = filterData.slice(indexOfFirst,indexOfLast);


  // 수정: 필터링된 전체페이지 구하기
  // const totalPage = Math.ceil(filterData.length/itemsPerPage);
  
  // totalPage가 0이 되는경우 최소값은 1
  const totalPage = Math.max(1,Math.ceil(filterData.length/itemsPerPage));


  let startPage = Math.max(1, currentPage-2);
  let endPage = Math.min(totalPage, startPage+4);

  // 만약에 끝 페이지가 totalpage에 도달하면 시작페이지도 다시 수정
  startPage = Math.max(1, endPage -4);

  // 페이지 번호 배열(1~5고정)
  const pageNumbers = Array.from({length:endPage - startPage + 1}, (_,i)=>startPage+i);
  const btnStyle ={
    color:'#333',marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px', background:'#e0e0e0',cursor:'pointer',
  };



  const loadData = async () =>{
    try{
      const { data } = await axios.get("http://localhost:9070/fruits");
      setDatas(data);
      setFruitsCount(data.length);
    }catch (err){
      console.error(err);
    }
  }

  useEffect(()=>{
    loadData();
  },[]);

  return (
    <>
      <section>
        <h2>Fruits DB 입력/출력/수정/삭제</h2>
        <p>MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE). 수정(UPDATE)하기를 실습 응용한다. - CRUD</p>
      </section>
      <div><button onClick={()=>navigate('/fruits/fruitscreate')}>글쓰기</button></div>
      <table className="data_list">
        <caption>fruits data map 함수로 출력하기</caption>
        <thead>
          <tr>
            <th>번호</th>
            <th>과일명</th>
            <th>가격</th>
            <th>색상</th>
            <th>원산지</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.length > 0 ?(
            currentItems.map(item=>(
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.name}</td>
                <td>{Number(item.price).toLocaleString()}</td>
                <td>{item.color}</td>
                <td>{item.country}</td>
                <Button t_name='fruits' i_code={item.num} loadData={loadData} />
              </tr>
            )))
            :(<tr><td colSpan='6'>검색 결과가 없습니다.</td></tr>)
          }
        </tbody>
      </table>    
      {/* 페이지 번호 */}
      <div style={{marginTop:'20px', textAlign:'center', width:'1300px'}}>
        {/* 이전버튼 */}
        <button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1&&true} style={btnStyle}>이전</button>
        {/* 페이지번호 */}
        {
          pageNumbers.map((number)=>(
            <button onClick={()=>setCurrentPage(number)} style={{marginRight:'5px', background:currentPage===number?'#4caf50':'#f0f0f0', padding:'5px 10px',border:'1px solid #ccc', borderRadius:'4px', color:currentPage===number?'#fff':'#333'}} key={number}>{number}</button>
          ))
        }

        {/* 다음 버튼 */}
        <button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===totalPage&&true} style={btnStyle}>다음</button>
      </div>

      <div style={{marginTop:'30px',textAlign:'center'}}>
        {/* 1. 검색창에 검색단어를 입력하고 검색버튼 클릭시 검색되게 하기 */}
        <input type='text' placeholder="상품명 검색" value={inputKeyword} onChange={(e)=>{setInputKeyword(e.target.value); setCurrentPage(1);}}
        style={{
          width:'250px',
          padding:'8px',
          border:'1px solid #ccc',
          borderRadius:'4px'
        }}
        onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} style={{
          marginLeft:'10px',
          padding:'8px 15px',
          border:'1px solid #ccc',
          borderRadius:'4px',
          background:'#4caf50',
          color: '#fff'
        }}>검색</button>

        {/* 초기화 */}
        <button style={
          {
            marginLeft:'10px',
            padding:'8px 15px',
            border:'1px solid #ccc',
            borderRadius:'4px',
            background:'#6b6b6b',
            color: '#fff'
          }
        } onClick={()=>{setInputKeyword(''); setCurrentPage(1); setKeyword('');}}>초기화</button>
      </div>
    </>
  );
};

export default Fruits;