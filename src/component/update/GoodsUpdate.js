import React, { useState } from 'react';

const GoodsUpdate = () => {
  const [form, setForm] = useState({
    g_name: '',
    g_cost: ''
  });

  const handleChange = () => {

  }

  const handleSubmit = () => {

  }

  return (
    <>
      <section>
        <h2>Goods DB수정을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor='g_code'>코드번호 :</label>
            <input name='g_code' id='g_code' value={form.g_code} readOnly />
          </p>
          <p>
            <label htmlFor='g_name'>상품명: </label>
            <input type='text' id='g_name' name='g_name' value={form.g_name} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor='g_cost'>가격: </label>
            <input type='number' id='g_cost' name='g_cost' value={form.g_cost} onChange={handleChange} required />
          </p>
          <button type='submit'>수정하기</button>
        </form>
      </section>
    </>
  );
};

export default GoodsUpdate;