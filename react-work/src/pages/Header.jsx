import React from 'react';
import styled from 'styled-components';
import { MdOutlineSportsSoccer } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { RiLoginBoxLine } from 'react-icons/ri';
import { FaClipboardList } from 'react-icons/fa';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';

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

const Header = () => {
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
        <Link to="/login">
          <FaUserPlus />
          로그인/회원가입
        </Link>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
