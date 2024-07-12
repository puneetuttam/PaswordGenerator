import React, { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef=useRef(null);

  const passwordGenerator = useCallback(() => {
    
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*_=-+[]{}~ ";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass+=str.charAt(char)
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  const copyPassToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 my-16 rounded-lg shadow-md text-blue-700  bg-gray-800">
      <h1 className="text-white py-2 text-center"> Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          placeholder="Password"
          className="outline-none w-full px-3 py-1" 
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPassToClipboard} className="text-white px-3 py-0.5 shrink-0 bg-blue-700">copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e)=>setLength(e.target.value)}
          className="cursor-pointer"/>
          <label >Length:{length}</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
          type="checkbox"
          id="numberInput"
          defaultChecked={numberAllowed}
          
          onChange={()=>setNumberAllowed((prev)=>!prev)}
          className="cursor-pointer"/>
          <label >Number</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
          type="checkbox"
          id="numberCharacter"
          defaultChecked={charAllowed}
          
          onChange={()=>setCharAllowed((prev)=>!prev)}
          className="cursor-pointer"/>
          <label >Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
