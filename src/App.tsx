import { useState,useEffect } from "react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"
import { AiOutlineClear,AiOutlineArrowRight,AiOutlineArrowLeft } from "react-icons/ai"
import { BiSkipPrevious,BiSkipNext } from "react-icons/bi"
import Navbar from "./components/Navbar";

export default function App() {
  const [setup, setSetup] = useState(false);
  const [color, setColor] = useState("border-green-300");
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [drag, setDrag] = useState(false);
  const [dragState, setDragState] = useState(1);
  const [grid, setGrid] = useState(JSON.parse(JSON.stringify(Array(row).fill(Array(col).fill(0)))));
  const [population, setPopulation] = useState(0);

  useEffect(()=>{
    if (setup){
      return;
    }
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
  },[row,col]);

  useEffect(() => {
    let count = 0;
    for(let i=0; i<row; i++){
      for(let j=0; j<col; j++){
        if(grid[i][j]){
          count++;
        }
      }
    }
    setPopulation(count);
  },[grid]);
  
  function randomizeGrid(){
    let newGrid = grid.map(() => Array.from({length:col}, () => {return Math.round(Math.random())}));
    setGrid(newGrid);
  }

  function clearGrid(){
    setGrid(JSON.parse(JSON.stringify(Array(row).fill(Array(col).fill(0)))));
  }

  function expandGrid(){
    let rowAdded = 0;
    if (grid[row-1].includes(1)){
      grid.push(Array(col).fill(0));
      rowAdded += 1;
    }
    if(grid[0].includes(1)){
      grid.unshift(Array(col).fill(0));
      rowAdded += 1;
    }
    setRow(row+rowAdded);
    const getCol = (arr, n) => arr.map(x => x[n]);
    let colAdded = 0;
    if (getCol(grid,row-1).includes(1)){
      grid.map(function(x){return x.push(0);})
      colAdded += 1;
    }
    if (getCol(grid,0).includes(1)){
      grid.map(function(x){return x.unshift(0);})
      colAdded += 1;
    }
    setCol(col+colAdded);
  }

  function trimGrid(){
    let rowDiff = 0;
    let gridCopy = grid;
    if (!grid[row-1].includes(1)){
      gridCopy = gridCopy.slice(0,-1);
      rowDiff += 1;
    }
    if(!grid[0].includes(1)){
      gridCopy = gridCopy.slice(1);
      rowDiff += 1;
    }
    setRow(row-rowDiff);
    const getCol = (arr, n) => arr.map(x => x[n]);
    let colDiff = 0;
    if (!getCol(gridCopy,0).includes(1)){ 
      gridCopy = gridCopy.map(function(x){return x.slice(0,-1);})
      colDiff += 1;
    }
    if (!getCol(gridCopy,row-1).includes(1)){
      gridCopy = gridCopy.map(function(x){return x.slice(1)});
      colDiff += 1;
    }
    setCol(col-colDiff);
    setGrid(gridCopy);
  }

  useEffect(() => {
    if (setup == true){
      //expandGrid();
      //trimGrid();
    }
  },[setup]);


  return (
    <div>
      <div className="sticky top-0 z-50">
      <Navbar/>
      { 
        setup ?
          <div className="bg-green-300 p-2 flex-col md:flex-row flex justify-center gap-2 border-b border-black">
            <button onClick={() => setSetup(false)} className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-green-300 transition duration-300 ease-out border-2 border-white rounded-md bg-black shadow-md group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                <AiOutlineArrowLeft size={30}/>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-green-300 transition-all duration-300 transform group-hover:translate-x-full ease">Back</span>
              <span className="relative invisible">Back</span>
            </button>
            <div className="grow"></div>
            <div className="grow"></div>
            <div className="flex justify-center">
              {/* TODO: MAKE THE BUTTONS FUNCTIONAL */}
              <button className="hover:opacity-50">
                <BiSkipPrevious size={45}/>
              </button>
              <button className="hover:opacity-50">
                <BiSkipNext size={45}/>
              </button>
            </div>
            <div className="grow"></div>
            <div className="flex font-electrolize align-middle w-full md:w-auto">
              <div className="grow md:grow-0 items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">Generation</div>
              <div className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-lg font-md px-6 py-2 bg-white font-bold">{0}</div>
              {/* TODO: GENERATION COUNTER */}
            </div>
            <div className="flex font-electrolize align-middle w-full md:w-auto">
              <div className="grow md:grow-0 items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">Population</div>
              <div className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-lg font-md px-6 py-2 bg-white font-bold">{population}</div>
            </div>
          </div>
          :
          <div className="bg-green-300 p-2 flex-col xl:flex-row flex justify-center gap-2 border-b border-black">
              <div className="flex flex-col md:flex-row justify-center gap-2">
                <div className="flex font-electrolize align-middle w-full md:w-auto">
                  <div className="grow md:grow-0 items-center justify-center px-4 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">row</div>
                  <input type="number" id="quantity" name="quantity" defaultValue={row} min="0" max="50" onChange={e => setRow(+e.target.value)} className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-md lg:text-lg font-md"/>
                </div>
                <div className="flex font-electrolize align-middle w-full md:w-auto">
                  <div className="grow md:grow-0 items-center justify-center px-4 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">col</div>
                  <input type="number" id="quantity" name="quantity" defaultValue={col} min="0" max="50" onChange={e => setCol(+e.target.value)} className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-md lg:text-lg font-md"/>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <button onClick={() => randomizeGrid()} className="grow relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                    <GiPerspectiveDiceSixFacesRandom size={40}/>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Randomize</span>
                  <span className="relative invisible">Randomize</span>
                </button>
                <button onClick={() => clearGrid()} className="grow relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                    <AiOutlineClear size={40}/>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Clear</span>
                  <span className="relative invisible">Clear</span>
                </button> 
                <select id="colorSelector" defaultValue="green" onChange={e => setColor(e.target.value)} className="grow py-2 text-center text-md md:text-lg lg:text-xl font-electrolize text-black block font-bold uppercase bg-green-100 border-2 border-black hover:border-white shadow leading-tight focus:outline-none focus:shadow-outline rounded-md hover:bg-black hover:text-green-300 focus:bg-black focus:text-green-300">
                    <option value="border-green-300">Green</option>
                    <option value="border-red-300">Red</option>
                    <option value="border-blue-300">Blue</option>
                    <option value="border-orange-300">Orange</option>
                    <option value="border-yellow-300">Yellow</option>
                    <option value="border-indigo-300">Indigo</option>
                    <option value="border-violet-300">Violet</option>
                </select>
              </div>
              <div className="grow"></div>
              <button 
                onClick={
                  () => {
                    if(grid.length==0 || population==0){
                      alert("Add some cells to a grid to start game.");
                      return;
                    }
                    setSetup(true);
                  }
                } 
                className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-green-300 transition duration-300 ease-out border-2 border-white rounded-md bg-black shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                  <AiOutlineArrowRight size={30}/>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-green-300 transition-all duration-300 transform group-hover:translate-x-full ease">Start</span>
                <span className="relative invisible">Start</span>
              </button>
          </div>
      }
      </div>
      <div 
        className="flex-col p-2"
        onMouseUp={() => {if(!setup){setDrag(false);}}}
        onMouseLeave={() => {if(!setup){setDrag(false);}}}
      >
        {
            grid.map((r:any,i:any) => (
              <div key={i} className="flex justify-center">
                {
                  r.map((_:any,j:any) => 
                    <div 
                      key={j} 
                      onMouseEnter={
                        () => {
                          if(!setup && drag){
                            let newGrid=[...grid];
                            newGrid[i][j] = dragState;
                            setGrid(newGrid);
                          }
                        }
                      }
                      onMouseDown={
                        () => {
                          if(setup){
                            return;
                          }
                          if(grid[i][j]==0){
                            setDragState(1);
                          }
                          else{
                            setDragState(0);
                          }
                          let newGrid=[...grid];
                          newGrid[i][j] = dragState;
                          setGrid(newGrid);
                          setDrag(true);
                        }
                      }
                      onMouseUp={() => {if(!setup){setDrag(false);}}}
                      className={`aspect-square grow ${color} border-2 ring-1 ring-black ${grid[i][j]>0?"bg-black":"bg-white"}`}
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
