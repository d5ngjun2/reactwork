import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Mainpage = styled.div`
  background: linear-gradient(to bottom right, #c3e7ff, #ffffff);
  width: 100%;
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #636e72;
  margin-bottom: 3rem;
`
const Home = () => {
  return (
    <Mainpage>
      <Title>메인 페이지에 오신 것을 환영합니다.</Title>
      <Subtitle>유저를 등록하거나 유저 목록을 확인해보세요.</Subtitle>
    </Mainpage>
  )
}

export default Home
