import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdOutlineSportsSoccer } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useUserStore from '../components/store/useUserStore';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Yup schema 정의
const schema = yup.object({
  username: yup.string().required('아이디는 필수입니다.'),
  password: yup.string().required('비밀번호는 필수입니다.'),
});

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Container = styled.div`
  width: 800px;
  height: 550px;
  background: #5e9b7b;
  border-radius: 12px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 2rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 100px;
  background-color: #78a812;
  border-radius: 12px;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  letter-spacing: 1px;
`;

const InputText = styled.input`
  width: 500px;
  height: 50px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: white;
  font-size: 16px;
  color: #333;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 5px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #0f62fe;
    box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.2);
  }
`;

const Button = styled(Link)`
  width: 180px;
  padding: 0.6rem 1rem;
  margin: 20px 0;
  border: none;
  border-radius: 6px;
  background: white;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  &:hover {
    background: #dadada;
  }
`;

const LoginButton = styled.button`
  width: 180px;
  padding: 0.6rem 1rem;
  margin: 20px 0;
  border: none;
  border-radius: 6px;
  background: white;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  &:hover {
    background: #dadada;
  }
`;

const ErrorMessage = styled.p`
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
`;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // yup 유효성 검사 적용
  });

  // 로그인
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8888/api/members/login`, // 스프링 로그인 API 경로
        { userId: data.username, password: data.password } // 스프링 DTO 필드명에 맞게 변경
      );
      const userData = response.data; // 유효한 사용자 정보
      // 서버에서 받은 데이터가 없거나 빈 배열이라면 로그인 실패
      if (response.data.length === 0) {
        toast.error('아이디 또는 비밀번호가 잘못되었습니다.');
        return;
      }

      console.log('로그인 성공 ! ', userData); // 서버로부터 응답 데이터 출력
      toast.success('로그인 성공!');

      // 로그인 후 상태 업데이트
      useUserStore.getState().setUser(userData);

      navigate('/');
    } catch (error) {
      console.error('아이디 또는 비밀번호가 잘못되었습니다.', error);
      toast.error('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <MainContainer>
      <Container>
        <Title>
          오늘의 축구
          <MdOutlineSportsSoccer />
        </Title>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <InputText
            type="text"
            placeholder="아이디 입력"
            {...register('username')} // 아이디
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
          <InputText
            type="password"
            placeholder="비밀번호 입력"
            {...register('password')} // 비밀번호
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          <LoginButton type="submit">로그인</LoginButton>
          <h3>계정이 없으신가요?</h3>
          <Button to="/signup">회원가입</Button>
        </FormContainer>
      </Container>
    </MainContainer>
  );
};

export default Login;
