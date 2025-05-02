import React from 'react';
import styled from 'styled-components';
import useUserStore from '../components/store/useUserStore'; // user 상태 관리
import { CgProfile } from 'react-icons/cg';

const MyPageWrapper = styled.div`
  background: #f4f4f4;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 3rem;
`;

const ProfileSection = styled.section`
  background: #cbcbcb;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ProfileDetails = styled.div`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;

  p {
    margin: 0.5rem 0;
  }

  .email {
    font-size: 0.9rem;
    color: #555;
  }
`;

const UpdateButton = styled.button`
  padding: 0.8rem 2rem;
  background: #78a812;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #66a106;
  }
`;

const MyPage = () => {
  const { user } = useUserStore(); // 상태에서 user와 logout 함수 불러오기

  if (!user) {
    return <div>로그인 후 마이페이지를 이용할 수 있습니다.</div>;
  }

  return (
    <MyPageWrapper>
      <ProfileSection>
        {/* 프로필 아이콘, 이름, 이메일 */}
        <CgProfile />
        <ProfileDetails>
          <p>{user.name}</p>
          <p className="email">{user.email}</p>
          <p>나이: {user.age} 세</p>
        </ProfileDetails>
        <UpdateButton onClick={() => alert('프로필 수정 페이지로 이동')}>프로필 수정</UpdateButton>
      </ProfileSection>
    </MyPageWrapper>
  );
};

export default MyPage;
