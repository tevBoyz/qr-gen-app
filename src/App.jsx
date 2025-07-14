import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QRCode from 'qrcode'
import QRCodeGenerator from './components/QRCodeGenerator'

function App() {
  

  return (
    <>
      <QRCodeGenerator />
    </>
  )
}

export default App
