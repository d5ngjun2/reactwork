// NotFound.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // 홈으로 돌아가기
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지는 존재하지 않습니다. URL을 확인하거나 아래 버튼을 클릭해 홈으로 돌아가세요.</p>
      <button style={styles.button} onClick={handleGoHome}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default NotFound;
