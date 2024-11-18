"use client";

import { useTetris } from "../hooks/useTetris";
import Board from "./Board";
import UpcomingBlocks from "./UpcomingBlocks";
import { useState, useRef } from "react";

export default function Game() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [isMusicOn, setIsMusicOn] = useState(true);
  const song = require('../../public/Tetris.mp3');
  const gameOverAudio = require('../../public/game-over.mp3');
  const audio = useRef<HTMLAudioElement | null>(null);


  const handleGameOver = async () => {
    setGameStarted(false);
    setLastUpdated(Date.now());
    if(audio.current) {
        audio.current.pause();
        audio.current.src = gameOverAudio;
        audio.current.play();
        audio.current.loop = false;
    }
  };

  const handleStartGame = () => {
    if(audio.current) {
        audio.current.volume = 0.1;
        audio.current.src = song;
        audio.current.play();
        audio.current.loop = true;
    }
    startGame()
  }

  const handlePauseMusic = () => {
    setIsMusicOn(!isMusicOn);
    if (audio.current && isMusicOn) {
        audio.current.pause();
    } else if(audio.current && !isMusicOn){
        audio.current.play()
    }
  }

  const { board, startGame, isPlaying, score, upcomingBlocks } =
    useTetris(handleGameOver);

  return (
    <>
        <audio
            ref={audio}
            style={{
                width: 'min(100% - 2rem, 30ch)',
                visibility: 'hidden',
                position: 'fixed',
                bottom: 20,
                insetInlineStart: '50%',
                transform: 'translateX(-50%)',
            }}
            controls
            controlsList="nodownload"
            src={song}
        />
        {!isPlaying ? (
            <div className="flex justify-center">
                <button className="btn btn-gradient-border btn-glow" onClick={handleStartGame}>START GAME</button>
            </div>
        ) : (
            <div className="board">
                <div className="p-5">
                    <Board currentBoard={board} />
                </div>
                <div className="p-5">
                    <button onClick={handlePauseMusic}>{isMusicOn ? 'Pause Music' : 'Play Music'}</button>
                    <div className="pt-8">Score: {score}</div>
                    <div className="pt-8"><h2>Next Up:</h2></div>
                    <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
                </div>
            </div>
        )}
    </>
  );
}
