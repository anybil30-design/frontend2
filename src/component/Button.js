import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Button({t_name, i_code, loadData}){
  const navigate = useNavigate();
  const deleteData = (t_name, i_code) =>{
    if(window.confirm('정말 삭제하시겠습니까?')){
    axios.delete(`https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/${t_name}/${i_code}`)
    .then(()=>{
      alert('데이터가 성공적으로 삭제되었습니다.');
      // loadData(); //데이터 삭제가 이루어지면 목록 다시 갱신해야함.
      loadData();
    })
    .catch(err=>console.error(err));
    }
  }

  return(
    <td className="btn">
      <button onClick={()=>navigate(`/${t_name}/update/${i_code}`)}>수정</button>
      <button onClick={()=>deleteData(t_name, i_code)}>삭제</button>
    </td>
  );

}
