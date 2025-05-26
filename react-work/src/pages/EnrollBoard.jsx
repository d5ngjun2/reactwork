import React from 'react';
import styled from 'styled-components';
import useUserStore from '../components/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useBoardStore from '../components/store/useBoardStore';
import { toast } from 'react-toastify';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
`;

const EnrollForm = styled.form`
  width: 100%;
  max-width: 800px;
  min-height: 700px;
  background: #e0e0e0;
  border-radius: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  gap: 1.5rem;
`;

const InputTitle = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: white;
  font-size: 16px;
  color: #333;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #0f62fe;
    box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.2);
  }
`;

const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-left: 3px;
`;

const TextArea = styled.textarea`
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  height: 250px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  resize: none;
  background: white;
  font-size: 16px;
  color: #333;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #0f62fe;
    box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.2);
  }
`;

const FileInput = styled.input`
  border: none;
  background: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  background-color: #0f62fe;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0053d6;
  }

  &:nth-child(2) {
    background-color: #aaa;

    &:hover {
      background-color: #888;
    }
  }
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background-color: #0f62fe;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0053d6;
  }

  &:nth-child(2) {
    background-color: #aaa;

    &:hover {
      background-color: #888;
    }
  }
`;

const EnrollBoard = () => {
  const sysdate = new Date().toISOString().split('T')[0];
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { addBoard } = useBoardStore();

  const onSubmit = async (formData) => {
    if (!user || !user.userName) {
      toast.error('로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.');
      navigate('/login');
      return;
    }
    const boardFormData = new FormData();
    const boardTextData = {
      title: formData.title,
      content: formData.content,
      writer: user.userName,
      date: sysdate,
    };
    console.log('프론트에서 전송될 boardTextData:', boardTextData);
    console.log('프론트에서 전송될 JSON 문자열:', JSON.stringify(boardTextData));
    boardFormData.append(
      'boardData',
      new Blob([JSON.stringify(boardTextData)], {
        type: 'application/json',
      })
    );

    const selectedFile = formData.file?.[0]; // useForm에서 파일 객체를 직접 가져옴
    if (selectedFile) {
      boardFormData.append('file', selectedFile);
    }

    try {
      // 이제 addBoard 함수에 FormData 객체를 전달
      await addBoard(boardFormData);
      console.log('게시글 입력 성공!');
      toast.success('게시글이 작성되었습니다.');
      navigate('/board');
    } catch (err) {
      console.error('등록 실패 : ', err);
      toast.error('게시글 등록에 실패했습니다.'); // 사용자에게 실패 알림
    }
  };

  return (
    <MainContainer>
      <EnrollForm onSubmit={handleSubmit(onSubmit)}>
        <h2>게시글 작성</h2>
        <FormGroup>
          <Label>제목</Label>
          <InputTitle type="text" placeholder="제목을 입력하세요." {...register('title')} />
        </FormGroup>

        <FormGroup>
          <Label>날짜</Label>
          <InputTitle type="text" value={sysdate} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>작성자</Label>
          <InputTitle type="text" value={user.userName} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea placeholder="내용을 입력하세요." {...register('content')} />
        </FormGroup>

        <FormGroup>
          <Label>첨부파일</Label>
          <FileInput type="file" {...register('file')} />
        </FormGroup>

        <ButtonGroup>
          <ActionButton type="submit">작성</ActionButton>
          <BackButton type="button" onClick={() => navigate('/board')}>
            돌아가기
          </BackButton>
        </ButtonGroup>
      </EnrollForm>
    </MainContainer>
  );
};

export default EnrollBoard;
