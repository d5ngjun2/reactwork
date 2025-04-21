import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfileCard from './components/ProfileCard'


function App() {

  const profile = { 
    name : "슬픈 고양이",
    age : 3,
    isOnline : true,
  }

  const offlineProfile = {
    name : "빡친 고양이",
    age : 2,
    isOnline : false,
  }

  return (
    <>
      <ProfileCard profile = {profile}/>
      <ProfileCard profile = {offlineProfile}/>
    </>
  )
}

export default App