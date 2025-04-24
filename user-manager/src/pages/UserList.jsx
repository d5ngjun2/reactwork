import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import UserRegistration from './UserRegistration'
import { useState } from 'react'

const UserCard = styled.div`
    width: 500px;
    max-width: 600px;
  background-color: #ffffff;
  color: #333;
  border: 1px solid #d0d0d0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
  transition: transform 0.2s ease;
    &:hover {
    transform: translateY(-4px);
  }
  span {
    font-weight: bold;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  text-align: left;
`

const CloseBtn = styled.button`
  float: right;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #333;
  }
`

const Title = styled.h2`
  font-size: 30px;
  color: #2d3436;
  
`
const Background = styled.div`
   min-height: 100vh;
  background: linear-gradient(to bottom right, #c3e7ff, #ffffff);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: black;
`

// 유저 목록 페이지
const UserList = ({ user }) => {

    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    return (
        <Background>
            <Title>유저 목록</Title>
            {user.map((u, index) => {
                return (
                    <UserCard key={index} onClick={() => openModal(u)}>
                        이름 : {u.name}<br />
                        나이 : {u.age}<br />
                        직업 : {u.job}<br />
                        이메일 : {u.email}<br />
                        성별 : {u.gender}
                    </UserCard>
                )
            })}

            {/* 모달 창 */}
            {selectedUser && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
                        <h2>{selectedUser.name}님의 정보</h2>
                        <p><strong>나이:</strong> {selectedUser.age}</p>
                        <p><strong>직업:</strong> {selectedUser.job}</p>
                        <p><strong>이메일:</strong> {selectedUser.email}</p>
                        <p><strong>성별:</strong> {selectedUser.gender}</p>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Background>

    )
}

export default UserList