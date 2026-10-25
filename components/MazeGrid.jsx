import React from 'react';
import { Bot, Flag, Play } from 'lucide-react';

export default function MazeGrid({
    grid,
    startPos,
    goalPos,
    robotPos,
    path,
    visited,
    activeTool,
    onCellClick
}) {
    const isVisited = (r, c) => visited.some(([vr, vc]) => vr === r && vc === c);
    const isPath = (r, c) => path.some(([pr, pc]) => pr === r && pc === c);

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                <Play className="w-5 h-5" /> 2D Grid Maze Visualizer
            </h2>

            <div className="grid grid-cols-10 gap-1 bg-slate-950 p-3 rounded-lg border border-slate-800 overflow-x-auto">
                {grid.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                        const isStart = startPos[0] === rIdx && startPos[1] === cIdx;
                        const isGoal = goalPos[0] === rIdx && goalPos[1] === cIdx;
                        const isRobot = robotPos && robotPos[0] === rIdx && robotPos[1] === cIdx;
                        const cellVisited = isVisited(rIdx, cIdx);
                        const cellPath = isPath(rIdx, cIdx);

                        let bgClass = "bg-slate-900 border-slate-800";
                        if (cell === 1) bgClass = "bg-slate-700 border-slate-600"; // Wall
                        else if (isRobot) bgClass = "bg-amber-500/30 border-amber-400";
                        else if (isStart) bgClass = "bg-emerald-950 border-emerald-500";
                        else if (isGoal) bgClass = "bg-rose-950 border-rose-500";
                        else if (cellPath) bgClass = "bg-indigo-600 border-indigo-400";
                        else if (cellVisited) bgClass = "bg-slate-800 border-slate-700";

                        return (
                            <button
                                key={`${rIdx}-${cIdx}`}
                                onClick={() => onCellClick(rIdx, cIdx)}
                                className={`w-10 h-10 border rounded flex items-center justify-center transition-all duration-150 ${bgClass}`}
                            >
                                {isRobot ? (
                                    <Bot className="w-6 h-6 text-amber-400 animate-pulse" />
                                ) : isStart ? (
                                    <Play className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                                ) : isGoal ? (
                                    <Flag className="w-5 h-5 text-rose-400 fill-rose-400" />
                                ) : cellPath ? (
                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-300" />
                                ) : null}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}