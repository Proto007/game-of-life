import { useState,useEffect } from "react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { AiOutlineClear,AiOutlineArrowRight,AiOutlineArrowLeft } from "react-icons/ai";
import { MdLockReset,MdOutlineMotionPhotosPause,MdOutlinePlayCircle,MdOutlineSkipNext } from "react-icons/md";
import Navbar from "./components/Navbar";

export default function App() {
  const [setup, setSetup] = useState(false);
  const [color, setColor] = useState("border-green-300");
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [drag, setDrag] = useState(false);
  const [dragState, setDragState] = useState(1);
  const [grid, setGrid] = useState(JSON.parse(JSON.stringify(Array(row).fill(Array(col).fill(0)))));
  const [generation,setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  const [pause, setPause] = useState(true);
  // const [finish, setFinish] = useState(false);
  // TODO: Game over screen, slow down the game or add a slider, fix game layout for small screen
  const [max, setMax] = useState(0);

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
    if (count > max){
      setMax(count);
    }
  },[grid]);

  useEffect(() => {
    if(setup){
      setPause(false);
    }
    if(!setup){
      setPause(true);
      setGeneration(0);
    }
  },[setup]);

  useEffect(() => {
    if(!pause){
      setGeneration(generation+1);
    }
  },[pause]);

  function randomizeGrid(){
    let newGrid = grid.map(() => Array.from({length:col}, () => {return Math.round(Math.random())}));
    setGrid(newGrid);
  }

  function clearGrid(){
    setGrid(JSON.parse(JSON.stringify(Array(row).fill(Array(col).fill(0)))));
  }

  function transition(arr:any){
    let arrCopy = arr.map(function(x:any) { return x.slice(); });
    for (let i=0; i<arrCopy.length; i++){
      for (let j=0; j<arrCopy[0].length; j++){
        let ul = 0;
        let u = 0;
        let ur = 0;
        let l = 0;
        let r = 0;
        let dl = 0;
        let d = 0;
        let dr = 0;
        if (i - 1 >= 0 && j - 1 >= 0){
          ul = arrCopy[i-1][j-1];
        }
        if(i - 1 >= 0){
          u = arrCopy[i-1][j];
        }
        if(i - 1 >= 0 && j + 1 < arrCopy[0].length){
          ur = arrCopy[i-1][j+1]; 
        }
        if(j - 1 >= 0){
          l = arrCopy[i][j-1];
        }
        if(j + 1 < arrCopy[0].length){
          r = arrCopy[i][j+1];
        }
        if(i + 1 < arrCopy.length && j - 1 >= 0){
          dl = arrCopy[i+1][j-1];
        }
        if(i + 1 < arrCopy.length){
          d = arrCopy[i+1][j];
        }
        if(i + 1 < arrCopy.length && j + 1 < arrCopy[0].length){
          dr = arrCopy[i+1][j+1];
        }
        let neighborSum = ul + u + ur + l + r + dl + d + dr;
        if (arrCopy[i][j] == 1 && neighborSum < 2){
          arr[i][j] = 0;
        }
        else if (arrCopy[i][j] == 1 && (neighborSum == 2 || neighborSum == 3)){
          arr[i][j] = 1;
        }
        else if (arrCopy[i][j] == 1 && neighborSum > 3){
          arr[i][j] = 0;
        }
        else if (arrCopy[i][j] == 0 && neighborSum == 3){
          arr[i][j] = 1;
        }
      }
    }
  }

  function gameLoop(){
    const getCol = (arr:any, n:any) => arr.map((x:any) => x[n]);
    let gridCopy = grid;
    if (gridCopy[gridCopy.length-1].includes(1)){
      gridCopy.push(Array(gridCopy[0].length).fill(0));
    }
    if(gridCopy[0].includes(1)){
      gridCopy.unshift(Array(gridCopy[0].length).fill(0));
    }
    if (getCol(gridCopy,gridCopy[0].length-1).includes(1)){
      gridCopy.map(function(x:any){return x.push(0);})
    }
    if (getCol(gridCopy,0).includes(1)){
      gridCopy.map(function(x:any){return x.unshift(0);})
    }
    transition(gridCopy);
    if (!gridCopy[gridCopy.length-1].includes(1)){
      gridCopy = gridCopy.slice(0,-1);
    }
    if(!gridCopy[0].includes(1)){
      gridCopy = gridCopy.slice(1);
    }
    if (!getCol(gridCopy,0).includes(1)){ 
      gridCopy = gridCopy.map(function(x:any){return x.slice(1);})
    }
    if (!getCol(gridCopy,gridCopy[0].length-1).includes(1)){
      gridCopy = gridCopy.map(function(x:any){return x.slice(0,-1)});
    }
    setRow(gridCopy.length);
    setCol(gridCopy[0].length);
    setGrid(gridCopy);
  }

  useEffect(() => {
    if(setup && !pause){
      gameLoop();
      setGeneration(generation+1);
    }
    else if(setup && pause){
      gameLoop();
    }
  }, [generation]);

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
                <div className="align-self flex justify-center gap-2">
                  { 
                    pause ?
                      <button onClick={() => setPause(false)} className="grow relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                          <MdOutlinePlayCircle size={40}/>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Play</span>
                        <span className="relative invisible">Play</span>
                      </button>
                    :
                      <button onClick={() => setPause(true)} className="grow relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                          <MdOutlineMotionPhotosPause size={40}/>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Pause</span>
                        <span className="relative invisible">Pause</span>
                      </button>
                  }
                  <button onClick={() => setGeneration(generation+1)} className="grow relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                      <MdOutlineSkipNext size={40}/>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Next</span>
                    <span className="relative invisible">Next</span>
                  </button> 
                  <button onClick={() => {window.location.reload();}} className="grow relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                      <MdLockReset size={40}/>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Reset</span>
                    <span className="relative invisible">Reset</span>
                  </button> 
                </div>
                <div className="grow"></div>
                <div className="flex font-electrolize align-middle w-full md:w-auto">
                  <div className="grow md:grow-0 items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">Generation</div>
                    <div className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-lg font-md px-6 py-2 bg-white font-bold">{generation}</div>
                  </div>
                  <div className="flex font-electrolize align-middle w-full md:w-auto">
                    <div className="grow md:grow-0 items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">Population</div>
                    <div className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-lg font-md px-6 py-2 bg-white font-bold">{population}</div>
                  </div>
                  <div className="flex font-electrolize align-middle w-full md:w-auto">
                    <div className="grow md:grow-0 items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black border-2 border-black rounded-l-md bg-green-100 shadow-md">Highest</div>
                    <div className="rounded-r-md border-black border-y-2 border-r-2 shadow-md text-center text-lg font-md px-6 py-2 bg-white font-bold">{max}</div>
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
                      <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Random</span>
                      <span className="relative invisible">Random</span>
                    </button>
                    <button onClick={() => {window.location.reload();}} className="grow relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                        <MdLockReset size={40}/>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Reset</span>
                      <span className="relative invisible">Reset</span>
                    </button> 
                    <button onClick={() => clearGrid()} className="grow relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-electrolize font-bold text-md md:text-lg lg:text-xl uppercase text-black transition duration-300 ease-out border-2 border-black rounded-md bg-green-100 shadow-md group">
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-300 duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                        <AiOutlineClear size={40}/>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Clear</span>
                      <span className="relative invisible">Clear</span>
                    </button> 
                    <select id="colorSelector" defaultValue="green" onChange={e => setColor(e.target.value)} className="grow py-2 text-center text-md md:text-lg lg:text-xl font-electrolize text-black block font-bold uppercase bg-green-100 border-2 border-black hover:border-white shadow leading-tight focus:outline-none focus:shadow-outline rounded-md hover:bg-black hover:text-green-300 focus:bg-black focus:text-green-300">
                      <option value="border-green-100">Green</option>
                      <option value="border-red-100">Red</option>
                      <option value="border-blue-100">Blue</option>
                      <option value="border-orange-100">Orange</option>
                      <option value="border-yellow-100">Yellow</option>
                      <option value="border-indigo-100">Indigo</option>
                      <option value="border-violet-100">Violet</option>
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
                            if(setup){ return; }
                            if(grid[i][j]==0){ setDragState(1); }
                            else{ setDragState(0); }
                            let newGrid=[...grid];
                            newGrid[i][j] = dragState;
                            setGrid(newGrid);
                            setDrag(true);
                          }
                        }
                        onMouseUp={() => { if(!setup){ setDrag(false); } }}
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

