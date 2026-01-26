import React, { useEffect, useState, useContext } from "react";
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AlertContext} from '../AlertContext';

export default function Goods(props){
  const [data,setData] = useState([]);  // json데이터 받기 위해
  const navigate = useNavigate();       // url주소 가져오기 위해
  const [keyword,setKeyword] = useState('');  // 키워드 상태변수
  const {setGoodsCount}=useContext(AlertContext);
  // 페이지네이션 상태변수
  const [currentPage, setCurrentPage] = useState(1);

  // g_name검색어가 포함된 데이터만 필터링
  // 검색창에 검색단어만 입력해도 바로 검색되는 양식
  const filteredData = data.filter(item=>
    item.g_name.toLowerCase().includes(keyword.toLowerCase())
  );


  const itemsPerPage = 5; //한페이지당 보여지는 게시물 수

  // 1. 상품 리스트 조회(출력)
  const loadData=()=>{
    axios.get('http://localhost:9070/goods')
    // 성공시 데이터를 저장
    .then((res)=>{
      setData(res.data);
      setGoodsCount(res.data.length);
    })
    // 실패시
    .catch(err=>console.log(err));
  }
  useEffect(()=>{
    loadData();
  },[]);

  // 3. deleteData 함수 = 해당 g_code에 대한 자료 삭제하기
  const deleteData=(g_code)=>{  //매개변수로 g_code값을 받는다.
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios //서버에 delete 요청을 전송
      .delete(`http://localhost:9070/goods/${g_code}`)
      //성공일때 아래 내용을 실행함.
      .then(()=>{
        alert('데이터가 성공적으로 삭제되었습니다.');
        loadData(); //데이터 삭제가 이루어지면 목록 다시 갱신해야함.
        
      })
      // 실패일경우
      .catch(err=>console.error(err));
    }
  }

  // 4. 페이지네이션 계산 - 현재 게시물 수 50 / 5 = 10페이지
  // 현재페이지의 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻
  const indexOfLast = currentPage * itemsPerPage;

  // 현재 페이지의 첫 인덱스 번호를 계산 10-5=5, 6번째부터 10번째까지 아이템까지 보여줍니다.
  const indexOfFirst = indexOfLast - itemsPerPage;

  // 현재 보여지는 데이터
  // 예: data.slice(5,10) -> data[5], data[6], data[7], data[8], data[9]만 화면에 표시.
  // slice 마지막 인덱스 포함 안함 , 새배열 생성
  // const currentItems = data.slice(indexOfFirst, indexOfLast);
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  // 전체 페이지 수 totalpage = Math.ceil(13/5) = 3, 무조건 올림
  // 예) 페이지 번호는 게시물이 13개 있는 경우 1,2,3까지 나오도록 한다.
  // const totalPage = Math.ceil(data.length/itemsPerPage);

  // 페이지 네이션을 기준으로 filteredData변경함
  const totalPage = Math.ceil(filteredData.length / itemsPerPage);

  // 시작번호와 끝번호 계산
  let startPage = Math.max(1, currentPage-2);
  let endPage = Math.min(totalPage, startPage+4);

  // 만약 끝 페이지가 totalPage에 도달했으면, 시작 페이지도 다시 보정
  startPage = Math.max(1, endPage-4);

  // 페이지 번호 배열(1-5고정, 또는 totalPages까지 제한, 1,2,3,4,5)
  const pageNumbers = Array.from({length:endPage-startPage+1}, (_,i)=> startPage+i);

  const btnStyle ={
    color:'#333',marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc', borderRadius:'4px', background:'#e0e0e0',cursor:'pointer',
  };
  return(
    <>
      <h2>Goods 페이지</h2>
      <div><button onClick={()=>navigate('/goods/goodscreate')}>글쓰기</button></div>
      <table className="data_list">
        <caption>Goods테이블 출력</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>Code(코드번호)</th>
            <th>Name(상품명)</th>
            <th>Cost(상품가격)</th>
            <th>메뉴(삭제, 수정)</th>
          </tr>
        </thead>

        <tbody>
          {
            currentItems.length > 0 ?(
            // data.map((item,i)=>(
              currentItems.map((item,i)=>(
              <tr key={item.g_code}>
                <td>{i+1}</td>
                <td>{item.g_code}</td>
                <td>{item.g_name}</td>
                <td>{Number(item.g_cost).toLocaleString()}</td>
                <td className="btn">
                  <button onClick={()=>navigate('/goods/update')}>수정</button>
                  <button onClick={()=>deleteData(item.g_code)}>삭제</button>
                </td>
              </tr>
            ))
          ):(<tr><td colSpan='5'>검색 결과가 없습니다.</td></tr>)
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
      
      {/* 실시간 검색 */}
      <div style={{marginTop:'30px',textAlign:'center'}}>
        <input type='text' placeholder="상품명 검색" value={keyword} onChange={(e)=>{setKeyword(e.target.value); setCurrentPage(1);}}
        style={{
          width:'250px',
          padding:'8px',
          border:'1px solid #ccc',
          borderRadius:'4px'
        }}
        />
      </div>
    </>
  );
};