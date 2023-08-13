import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";

export default function App() {
  const [setup, setSetup] = useState(false);
  const [size, setSize] = useState("0");
  //TODO: ADD BUTTONS TO ADD NEW ROWS AND COLUMNS

  useEffect(()=>{console.log(size);},[size])

  return (
    <div>
      <Navbar/>
      {
        !setup
            && 
        <div className="bg-green-300 p-2 flex justify-center">
            <select defaultValue={0} onChange={e => setSize(e.target.value)} className="text-center text-lg md:text-xl lg:text-2xl font-electrolize text-black block bg-white border border-green-300 hover:border-black shadow leading-tight focus:outline-none focus:shadow-outline rounded-md">
                <option value={0}>Size</option>
                <option value={1}>Small</option>
                <option value={2}>Medium</option>
                <option value={3}>Large</option>
            </select>
            <button className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-green-300 transition duration-300 ease-out border-2 border-white rounded-md bg-black shadow-md group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-green-300 transition-all duration-300 transform group-hover:translate-x-full ease">Start</span>
              <span className="relative invisible">Start</span>
            </button>
        </div>
    }
    </div>
  )
}
