import Link from "next/link";

export default function Main() {
    return(
        <div className="pt-8 text-center splash-box overflow-y-scroll min-h-screen">
            <div className="pt-8">
                <h1 className="splash-page-text text-8xl">Benjamin Pruitt <br/> Code Assignment</h1>
            </div>
            <div className="pt-10 text-5xl">
                <Link className="btn btn-gradient-border btn-glow text-5xl" href={'/tetris'}>Tetris Game</Link>
            </div>
            <div className="pt-20 text-5xl">
                <Link className="btn btn-gradient-border btn-glow" href={'/3d'}>3D Torus Knot</Link>
            </div>
        </div>
    )
}