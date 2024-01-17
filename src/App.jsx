/* eslint-disable no-import-assign */

import './App.css'
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {


  const [Length, setLength] = useState(8);

  const [NumberAllowed, setNumberAllowed] = useState(false)

  const [CharacterAllowed, setCharacterAllowed] = useState(false);

  const [Password, setPassword] = useState("")

  const passwordGenrator = useCallback(() => {


    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (NumberAllowed) str += "0123456789"
    if (CharacterAllowed) str += "@!#$%^&*()}{}"

    for (let i = 1; i <= Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }
    , [Length, NumberAllowed, CharacterAllowed, setPassword])

  // useref 
  const passwordRef = useRef(null);

  const cpyPassword = useCallback(() => {
    passwordRef.current?.select()
    if (passwordRef.current) {
      navigator.clipboard.writeText(passwordRef.current.value)

    }
  }, [passwordRef]);

  useEffect(() => {
    passwordGenrator()
  },
    [Length, NumberAllowed, CharacterAllowed, passwordGenrator]
  )
  return (
    <>
      <div className='w-90 mw-w-md mx-auto shadow-md text-orange-400 rounded-lg px-4 py-3 my-8 bg-gray-700'>
        <h1 className='text-center text-white'>Password Generator</h1>
        <div className='flex overflow-hidden shadow rounded-lg mb-4 mt-3'>
          <input type="text" value={Password} placeholder='password' className='outline-none w-full py-2 px-3' ref={passwordRef} readOnly />
          <button className='outline-none bg-blue-600 text-white py-2 px-4' onClick={cpyPassword} > Copy </button>
        </div>
        <div className='flex flex-wrap text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" value={Length} min={8} max={20} className='cursor-pointer' onChange={(e) => {
              setLength(e.target.value)
            }} />
            <label >Lenght: {Length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" checked={NumberAllowed} id='numberInput' onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" checked={CharacterAllowed} id='charInput' onChange={() => {
              setCharacterAllowed((prev) => !prev)
            }} />
            <label htmlFor='charInput'>Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
