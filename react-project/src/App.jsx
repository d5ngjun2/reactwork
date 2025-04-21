import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfileCard from './components/ProfileCard'


function App() {

  const profile = { 
    name : "황동준",
    age : 26,
    isOnline : true,
  }

  const offlineProfile = {
    name : "황동욱",
    age : 31,
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