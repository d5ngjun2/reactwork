import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../components/store/useUserStore'; // user 상태 관리
import { CgProfile } from 'react-icons/cg';
import { FaUser, FaIdBadge, FaEnvelope, FaBirthdayCake } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyPageWrapper = styled.div`
  background: #f4f4f4;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
`;

const CannotFindUser = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f9f9f9;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  box-sizing: border-box;

  & > div {
    background: white;
    padding: 3rem 4rem;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    line-height: 1.6;
  }
`;

const ProfileSection = styled.section`
  background: #dddddd;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

const ProfileDetails = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;

  p {
    margin: 0.5rem 0;
  }

  .email {
    font-size: 1rem;
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

const ProfileIcon = styled(CgProfile)`
  font-size: 100px;
  color: #4a4a4a;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  margin: 0.4rem 0;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #333;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(120, 168, 18, 0.3);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0.6rem 0;
  width: 100%;
  max-width: 400px;
`;

const IconWrapper = styled.div`
  font-size: 20px;
  color: #555;
  width: 30px;
  text-align: center;
`;

const DeleteButton = styled.button`
  padding: 0.8rem 2rem;
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #e20000;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const MyPage = () => {
  const { user, updateUser, deleteUser } = useUserStore(); // 상태에서 user와 logout 함수 불러오기
  const [form, setForm] = useState({
    username: '', // 초기값을 빈 문자열로 설정
    name: '',
    email: '',
    age: '',
  });
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
      });
    }
  }, [user]);
  const handleSave = () => {
    updateUser(form);
    toast.success('회원수정이 정상적으로 되었습니다.');
  };
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteUser(); // form 전달할 필요 없음
      toast.success('회원삭제가 정상적으로 처리되었습니다.');
    }
  };

  if (!user) {
    return (
      <CannotFindUser>
        <div>⚠️ 로그인 후 마이페이지를 이용할 수 있습니다.</div>
      </CannotFindUser>
    );
  }

  return (
    <MyPageWrapper>
      <ProfileSection>
        <ProfileIcon />
        <ProfileDetails>
          <InputGroup>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <StyledInput
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="아이디"
            />
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <FaIdBadge />
            </IconWrapper>
            <StyledInput type="text" name="name" value={form.name} onChange={handleChange} placeholder="닉네임" />
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <StyledInput type="email" name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <FaBirthdayCake />
            </IconWrapper>
            <StyledInput type="number" name="age" value={form.age} onChange={handleChange} placeholder="나이" />
          </InputGroup>
        </ProfileDetails>
        <ButtonGroup>
          <UpdateButton onClick={handleSave}>프로필 수정</UpdateButton>
          <DeleteButton onClick={handleDelete}>계정 삭제</DeleteButton>
        </ButtonGroup>
      </ProfileSection>
    </MyPageWrapper>
  );
};

export default MyPage;
