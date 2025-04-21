import React from 'react'
import styled from 'styled-components'
import App from '../App'

const CardContainer = styled.div`
    width: 1000px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.td`
  padding: 10px;
  font-weight: bold;
  background-color: #8ddbff;
  color: white;
  text-align: center;
  color: black;
`;

const TableData = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  color: black;
`;

const ProfileCard = ({profile}) => {
    return (
      <CardContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>이름</TableHeader>
              <TableHeader>나이</TableHeader>
              <TableHeader>상태</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableData>{profile.name}</TableData>
              <TableData>{profile.age}</TableData>
              <TableData>{profile.isOnline ? '🟢 온라인 상태입니다.' : '🔴 오프라인 상태입니다.'}</TableData>
            </tr>
          </tbody>
        </Table>
      </CardContainer>
    );
  };

  
const offlineProfileCard = ({profile}) => {
    return (
      <CardContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>이름</TableHeader>
              <TableHeader>나이</TableHeader>
              <TableHeader>상태</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
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