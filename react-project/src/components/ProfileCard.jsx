import React from 'react'
import styled from 'styled-components'
import App from '../App'

const CardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 20px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  font-weight: bold;
  background-color: #8ddbff;
  color: white;
  text-align: center;
  font-size: 16px;
`;

const TableData = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  color: black;
  font-size: 14px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

const StatusText = styled.p`
  font-size: 14px;
  color: ${({ online }) => (online ? 'green' : 'red')};
  font-weight: bold;
`;


const ProfileCard = ({profile}) => {
  const onlineImg = "/img/images.jpg";
  const offlineImg = "/img/catimg1.jpg";

    return (
      <CardContainer>
        <Table>
          <thead>
            <tr>
             <TableHeader>이미지</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>나이</TableHeader>
              <TableHeader>상태</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <img src= {profile.isOnline ? onlineImg : offlineImg} />
              <TableData>{profile.name}</TableData>
              <TableData>{profile.age}</TableData>
              <TableData>{profile.isOnline ? '🟢 온라인 상태입니다.' : '🔴 오프라인 상태입니다.'}</TableData>
            </tr>
          </tbody>
        </Table>
      </CardContainer>
    );
  };

  



export default ProfileCard