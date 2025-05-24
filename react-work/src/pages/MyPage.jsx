import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../components/store/useUserStore'; // user 상태 관리
import { CgProfile } from 'react-icons/cg';
import { FaUser, FaIdBadge, FaEnvelope, FaBirthdayCake, FaLock } from 'react-icons/fa'; // FaLock 아이콘 추가
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
    userId: '',
    userName: '', // userName으로 통일 (이전에 지적했던 부분)
    email: '',
    age: '',
    // currentPassword: '', // 현재 비밀번호 확인 필드는 필요하다면 추가 (백엔드 로직에 따라)
    newPassword: '', // 새 비밀번호
    confirmPassword: '', // 새 비밀번호 확인
  });

  useEffect(() => {
    if (user) {
      setForm((prevForm) => ({
        ...prevForm, // 기존 비밀번호 필드는 건드리지 않음
        userId: user.userId || '',
        userName: user.userName || '', // user.userName으로 설정 (백엔드 Response DTO의 userName 필드에 맞춤)
        email: user.email || '',
        age: user.age || '',
      }));
    }
  }, [user]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // 비밀번호 변경 로직 추가
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      toast.error('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    if (form.newPassword && form.newPassword.length < 4) {
      // 최소 길이 제한
      toast.error('비밀번호는 4자 이상이어야 합니다.');
      return;
    }

    // 백엔드로 보낼 데이터 준비
    const updateData = {
      userId: form.userId, // 아이디는 변경 불가하므로 같이 보냄
      userName: form.userName,
      email: form.email,
      age: form.age,
    };

    // 새 비밀번호가 입력된 경우에만 추가
    if (form.newPassword) {
      updateData.password = form.newPassword; // 백엔드 DTO에 password 필드가 있을 경우
    }

    updateUser(updateData); // 수정된 데이터(비밀번호 포함 가능)를 전달
    toast.success('회원수정이 정상적으로 되었습니다.');
    // 비밀번호 입력 필드 초기화 (보안상 좋음)
    setForm((prev) => ({
      ...prev,
      newPassword: '',
      confirmPassword: '',
    }));
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
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="아이디"
              readOnly
            />
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <FaIdBadge />
            </IconWrapper>
            <StyledInput
              type="text"
              name="userName" // userName으로 변경
              value={form.userName}
              onChange={handleChange}
              placeholder="닉네임"
            />
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

          {/* 새 비밀번호 입력 필드 추가 */}
          <InputGroup>
            <IconWrapper>
              <FaLock />
            </IconWrapper>
            <StyledInput
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="새 비밀번호 (변경 시 입력)"
              autoComplete="new-password" // 브라우저 자동 완성 기능 도움
            />
          </InputGroup>

          {/* 새 비밀번호 확인 입력 필드 추가 */}
          <InputGroup>
            <IconWrapper>
              <FaLock />
            </IconWrapper>
            <StyledInput
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="새 비밀번호 확인"
              autoComplete="new-password"
            />
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
