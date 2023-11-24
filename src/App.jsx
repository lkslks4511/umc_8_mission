import './index.css'

import React, { useState } from 'react';

import axios from 'axios';

const initialState = {
  id: '',
  pw: '',
};

const App = () => {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.id || !user.pw) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('API_ENDPOINT', {
        id: user.id,
        pw: user.pw,
      });

      setLoading(false);

      setTimeout(() => {
        console.log('Loading Complete');
      }, 1500);

      if (response.data.code === 200) {
        console.log('로그인 성공!', response.data.userInfo);
      } else {
        alert('로그인 실패. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('API 통신 오류:', error);
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="text" name="id" value={user.id} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="pw" value={user.pw} onChange={handleChange} />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : '로그인'}
      </button>
    </form>
  );
};

export default App;
