export default function Navbar(){
    return (
        <div>
            <nav className="flex bg-black justify-center align-middle text-center">
                <a className="text-3xl md:text-5xl lg:text-6xl font-electrolize text-white p-5" target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a>
            </nav>
            {/* TODO: ADD A BAR SHOWING GRID SIZE */}
        </div>
    )
}