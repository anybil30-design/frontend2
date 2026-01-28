import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Main from './component/Main';
import Goods from './component/Goods';
import Fruits from './component/Fruits';
import Noodle from './component/Noodle';
import Bookstore from './component/Bookstore';
import Customer from './component/Customer';
import Contactus from './component/Contactus';

// Create
import GoodsCreate from './component/create/GoodsCreate';
import FruitsCreate from './component/create/FruitsCreate';
import BookstoreCreate from './component/create/BookstoreCreate';
import NoodleCreate from './component/create/NoodleCreate';
// Update
import GoodsUpdate from './component/update/GoodsUpdate';
import UpdateRouter from "./component/update/UpdateRouter";
import Qusetion from './component/Qusetion';

import Login from './component/Login';
import Join from './component/Join';
import { AlertProvider, AlertContext } from './AlertContext';
import axios from 'axios';

function AppContent() {
  const badge = {
    display: 'inline-block',
    marginLeft: 6,
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    width: 22,
    height: 22,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: '22px',
    fontWeight: 'bold'
  };
  const { questionCount, goodsCount, setGoodsCount, fruitsCount, userCount, setUserCount, setFruitsCount } = React.useContext(AlertContext);


  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get("https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/getAllData");
        setUserCount(data.user_count);
      } catch (err) {
        console.error(`db데이터 불러오기 실패: ${err}`);
      }
    }

    axios.get('https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/goods')
      .then(res => setGoodsCount(res.data.length));
    axios.get('https://port-0-backend-express-server-mkvweoae71d9732c.sel3.cloudtype.app/fruits')
      .then(res => setFruitsCount(res.data.length));
    loadData();
  }, [])

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Frontend(React)+Backend(MySql) Setting, DB데이터 입력/출력/삭제/수정 - 메인</h1>
          <nav className='hNavi'>
            <ul>
              <li><Link to='/'>홈으로</Link></li>
              <li><Link to='/goods'>Goods{goodsCount > 0 && (<span style={badge}>{goodsCount}</span>)}</Link></li>
              <li><Link to='/fruits'>Fruits{fruitsCount > 0 && (<span style={badge}>{fruitsCount}</span>)}</Link></li>
              <li><Link to='/noodle'>Noodle</Link></li>
              <li><Link to='/bookstore'>Bookstore</Link></li>
              <li><Link to='/customer'>Customer</Link></li>
              <li><Link to='/question'>Question{questionCount > 0 && (<span style={badge}>{questionCount}</span>)}</Link></li>
              <li><Link to='/contactus'>Contactus</Link></li>
              <li><Link to='/login'>Login{userCount > 0 && (<span style={badge}>{userCount}</span>)}</Link></li>
              <li><Link to='/register'>Join</Link></li>
            </ul>


          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/goods' element={<Goods />} />
            <Route path='/fruits' element={<Fruits />} />
            <Route path='/noodle' element={<Noodle />} />
            <Route path='/bookstore' element={<Bookstore />} />
            <Route path='/customer' element={<Customer />} />
            <Route path='/contactus' element={<Contactus />} />

            {/* Create */}
            <Route path='/goods/goodscreate' element={<GoodsCreate />} />
            <Route path='/fruits/fruitscreate' element={<FruitsCreate />} />
            <Route path='/bookstore/bookstorecreate' element={<BookstoreCreate />} />

            <Route path='/noodle/noodlecreate' element={<NoodleCreate />} />

            {/* Update (핵심) */}
            <Route path='/:t_name/update/:i_code' element={<UpdateRouter />} />

            <Route path='/goods/update' element={<GoodsUpdate />} />
            <Route path='/question' element={<Qusetion />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Join />} />
          </Routes>
        </main>

        <footer>

        </footer>
      </BrowserRouter>

    </>
  );
}

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  )
}

export default App;
