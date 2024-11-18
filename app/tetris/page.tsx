import Game from "../components/Game";
import Title from "../components/Title";

export default function Tetris() {
    return (
        <div>
            <div id="stars1"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <Title />
            <div className="flex justify-center overflow-scroll">
                <Game />
            </div>
        </div>
    );
}