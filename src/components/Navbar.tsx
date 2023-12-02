import { FaGithubSquare } from "react-icons/fa";

export default function Navbar(){
    return (
        <div>
            <nav className="sticky z-50 top-0 flex flex-row bg-black justify-center items-center text-center">
                <div className="flex-grow"></div>
                <a className="text-2xl md:text-5xl lg:text-6xl font-electrolize text-green-300 p-5" target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a>
                <div className="flex-grow"></div>
                <a target="_blank" href="https://github.com/Proto007/game-of-life">
                  <FaGithubSquare color="white" size="8vh"/>
                </a>
            </nav>
        </div>
    )
}

