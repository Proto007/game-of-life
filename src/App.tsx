import { useState,useEffect } from "react";
import {GiPerspectiveDiceSixFacesRandom} from "react-icons/gi"
import {AiOutlineClear} from "react-icons/ai"
import Navbar from "./components/Navbar";

export default function App() {
  const [setup, setSetup] = useState(false);
  const [color, setColor] = useState("border-green-300");
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [grid, setGrid] = useState(JSON.parse(JSON.stringify(Array(row).fill(Array(col).fill(0)))));

  useEffect(()=>{
    let r = Math.min(grid.length, row);
    let c = col;
    if(grid[0] != undefined){
      c = Math.min(grid[0].length, col);
    }
    let newGrid = JSON.parse(JSON.stringify(Array(row).fill(Array(col).fill(0))));
    for(let i=0; i<r; i++){
      for(let j=0; j<c; j++){
        newGrid[i][j] = grid[i][j]
      }
    }
    setGrid(newGrid);
  },[row,col])

  function randomizeGrid(){
    let newGrid = grid.map(() => Array.from({length:col}, () => {return Math.round(Math.random())}));
    setGrid(newGrid);
  }

  function clearGrid(){
    setGrid(JSON.parse(JSON.stringify(Array(row).fill(Array(col).fill(0)))));
  }

  return (
    <div>
      <div className="sticky top-0 z-50">
      <Navbar/>
      { 
        setup ?
          <div>GRID IS SET</div>
          // TODO: POST SETUP ACTION BAR
          :
          <div className="bg-green-300 p-2 flex-col md:flex-row flex justify-center gap-2 border-b border-black">
              <div className="flex font-electrolize align-middle w-full md:w-auto">
                <div className="grow md:grow-0 items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">row</div>
                <input type="number" id="quantity" name="quantity" defaultValue={0} min="0" max="50" onChange={e => setRow(+e.target.value)} className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-lg font-md"/>
              </div>
              <div className="flex font-electrolize align-middle w-full md:w-auto">
                <div className="grow md:grow-0 items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">col</div>
                <input type="number" id="quantity" name="quantity" defaultValue={0} min="0" max="50" onChange={e => setCol(+e.target.value)} className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-lg font-md"/>
              </div>
              <button onClick={() => randomizeGrid()} className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                  <GiPerspectiveDiceSixFacesRandom size={40}/>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Randomize</span>
                <span className="relative invisible">Randomize</span>
              </button>
              <button onClick={() => clearGrid()} className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                  <AiOutlineClear size={40}/>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Clear</span>
                <span className="relative invisible">Clear</span>
              </button>
              <div className="grow"></div>
              <select id="colorSelector" defaultValue="green" onChange={e => setColor(e.target.value)} className="py-2 text-center text-md md:text-lg lg:text-xl font-electrolize text-black block font-bold uppercase bg-green-100 border-2 border-black hover:border-white shadow leading-tight focus:outline-none focus:shadow-outline rounded-md hover:bg-black hover:text-green-300 focus:bg-black focus:text-green-300">
                  <option value="border-green-300">Green</option>
                  <option value="border-red-300">Red</option>
                  <option value="border-blue-300">Blue</option>
                  <option value="border-orange-300">Orange</option>
                  <option value="border-yellow-300">Yellow</option>
                  <option value="border-indigo-300">Indigo</option>
                  <option value="border-violet-300">Violet</option>
              </select>
              <button onClick={() => setSetup(true)} className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-green-300 transition duration-300 ease-out border-2 border-white rounded-md bg-black shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-green-300 transition-all duration-300 transform group-hover:translate-x-full ease">Start</span>
                <span className="relative invisible">Start</span>
              </button>
          </div>
      }
      </div>
      <div className="flex-col p-2">
        {
            grid.map((r:any,i:any) => (
              <div key={i} className="flex justify-center">
                {
                  r.map((_:any,j:any) => 
                    <div 
                      key={j} 
                      onClick={
                        () => {
                          let newGrid=[...grid];
                          if(grid[i][j]==0){
                            newGrid[i][j] = 1;
                          }
                          else{
                            newGrid[i][j] = 0;
                          }
                          setGrid(newGrid);
                        }
                      }
                      className={`aspect-square grow ${color} border-2 ring-1 ring-black ${grid[i][j]>0?"bg-black":"bg-white"}`}
                      //TODO: MOUSE CLICK DRAG EVENT
                    />
                  )
                }
              </div>
            ))
        }
      </div>
    </div>
  )
}
