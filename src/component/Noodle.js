import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
const Noodle = () => {
  const [keyword,setKeyword] = useState('');

  const [datas, setDatas] = useState([]);
  // 현재페이지 번호 상태값
  const [currentPage,setCurrentPage] = useState(1);
  const contCountMax = 5;

  const navigate = useNavigate();
  // 데이터 불러오기
  const getNoodelData=async()=>{
    try{
      const {data} = await axios.get('http://localhost:9070/noodle');
      setDatas(data);
    }catch(err){
      console.error(err);
    }
  };
  const filterData = datas.filter(item=>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(()=>{
    getNoodelData();
  },[]);

    // 최대 인덱스
  const maxIndexCont = currentPage * contCountMax;
  // 최대 인덱스 기준 젤 작은값
  const minIndexCont = maxIndexCont-contCountMax;

  // 현재 페이지의 콘텐츠
  const currentCont = filterData.slice(minIndexCont,maxIndexCont);

  // 전체페이지 올림
  const maxIndexPage = Math.ceil(filterData.length/contCountMax);

  // 하단에 나오게 할 개수
  let startPage = Math.max(1, currentPage-2);
  let endPage = Math.min(maxIndexPage,startPage+4);

  startPage = Math.max(1, endPage-4);

  const pageNumbers = Array.from({length:endPage-startPage+1},(_,i)=>startPage+i);
  const btnStyle ={
    color:'#333',marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px', background:'#e0e0e0',cursor:'pointer',
  };
  return (
    <>
      <h2>Noodle DB 입력/출력/수정/삭제</h2>
      <button onClick={()=>navigate('/noodle/noodlecreate')}>글쓰기</button>
      <table className="data_list"  >
        <caption>Noodle 테이블</caption>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품명</th>
            <th>브랜드</th>
            <th>종류</th>
            <th>가격</th>
            <th>유통기한</th>
            <th>등록날짜</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {
            currentCont.length > 0?(
            currentCont.map(item=>(
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.kind}</td>
                <td>{Number(item.price).toLocaleString()}</td>
                <td>{item.e_date}</td>
                <td>{item.reg_date}</td>
                <Button t_name='noodle' i_code={item.num} loadData={getNoodelData} />
              </tr>
            )))
            :(<tr><td colSpan='8'>검색결과가 없습니다.</td></tr>)
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
        <button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===maxIndexPage&&true} style={btnStyle}>다음</button>
      </div>

      <div style={{marginTop:'30px',textAlign:'center'}}>
        <input type='text' value={keyword} onChange={(e)=>setKeyword(e.target.value)}
        style={{
          width:'250px',
          padding:'8px',
          border:'1px solid #ccc',
          borderRadius:'4px'
        }}
        placeholder='상품명 검색'
        />
      </div>

    </>
  );
};

export default Noodle;