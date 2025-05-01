import React from 'react';
import styled from 'styled-components';
import { MdOutlineSportsSoccer } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import useUserStore from '../components/store/useUserStore';
import { MdOutlineLogout } from 'react-icons/md';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 4rem;
  background-color: #78a812;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.5rem;
    font-size: 1.8rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const LogoutBtn = styled.p`
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const { user, logout } = useUserStore();
  return (
    <HeaderWrapper>
      <Logo>
        오늘의 축구 <MdOutlineSportsSoccer />
      </Logo>
      <Nav>
        <Link to="/">
          <FaClipboardList /> HOME
        </Link>
        <Link to="/board">
          <FaClipboardList /> 자유게시판
        </Link>
        <Link to="/video">
          <MdOutlineOndemandVideo />
          하이라이트
        </Link>
        {user ? (
          // 로그인 상태일 때 "마이페이지"로 링크 변경
          <Link to="/mypage">
            <FaUserPlus />
            마이페이지
          </Link>
        ) : (
          // 로그인 안되어 있으면 "로그인/회원가입" 링크 표시
          <Link to="/login">
            <FaUserPlus />
            로그인/회원가입
          </Link>
        )}
        {user && (
          // 로그아웃 버튼 추가
          <LogoutBtn
            onClick={() => {
              logout();
            }}
          >
            <MdOutlineLogout />
            로그아웃
          </LogoutBtn>
        )}
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
