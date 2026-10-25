'use client';

import React, { useState } from 'react';
import MazeGrid from '@/components/MazeGrid';
import ControlPanel from '@/components/ControlPanel';
import SensorDashboard from '@/components/SensorDashboard';
import CodeViewer from '@/components/CodeViewer';
import PresentationPitch from '@/components/PresentationPitch';

const INITIAL_GRID = Array(10).fill(null).map(() => Array(10).fill(0));

export default function Home() {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [startPos, setStartPos] = useState([1, 1]);
  const [goalPos, setGoalPos] = useState([8, 8]);
  const [robotPos, setRobotPos] = useState([1, 1]);
  const [algorithm, setAlgorithm] = useState('BFS');
  const [activeTool, setActiveTool] = useState('wall');
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCellClick = (r, c) => {
    if (isSimulating) return;
    const newGrid = grid.map(row => [...row]);

    if (activeTool === 'wall') {
      if ((r !== startPos[0] || c !== startPos[1]) && (r !== goalPos[0] || c !== goalPos[1])) {
        newGrid[r][c] = newGrid[r][c] === 1 ? 0 : 1;
        setGrid(newGrid);
      }
    } else if (activeTool === 'start') {
      setStartPos([r, c]);
      setRobotPos([r, c]);
      newGrid[r][c] = 0;
      setGrid(newGrid);
    } else if (activeTool === 'goal') {
      setGoalPos([r, c]);
      newGrid[r][c] = 0;
      setGrid(newGrid);
    }
  };

  const runAlgorithm = async () => {
    setIsSimulating(true);
    setVisited([]);
    setPath([]);

    // Simple BFS Traversal Simulation
    const queue = [[...startPos, [startPos]]];
    const visitedNodes = [];
    const visitedSet = new Set();
    visitedSet.add(`${startPos[0]}-${startPos[1]}`);

    let finalPath = [];

    while (queue.length > 0) {
      const [r, c, currentPath] = queue.shift();
      visitedNodes.push([r, c]);

      if (r === goalPos[0] && c === goalPos[1]) {
        finalPath = currentPath;
        break;
      }

      const neighbors = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
      ];

      for (const [nr, nc] of neighbors) {
        if (
          nr >= 0 && nr < 10 && nc >= 0 && nc < 10 &&
          grid[nr][nc] === 0 &&
          !visitedSet.has(`${nr}-${nc}`)
        ) {
          visitedSet.add(`${nr}-${nc}`);
          queue.push([nr, nc, [...currentPath, [nr, nc]]]);
        }
      }
    }

    // Animate Visited Cells
    for (let i = 0; i < visitedNodes.length; i++) {
      setVisited(visitedNodes.slice(0, i + 1));
      await new Promise(res => setTimeout(res, 30));
    }

    // Animate Final Path and Robot Move
    for (let i = 0; i < finalPath.length; i++) {
      setPath(finalPath.slice(0, i + 1));
      setRobotPos(finalPath[i]);
      await new Promise(res => setTimeout(res, 100));
    }

    setIsSimulating(false);
  };

  const handleReset = () => {
    setGrid(INITIAL_GRID);
    setStartPos([1, 1]);
    setGoalPos([8, 8]);
    setRobotPos([1, 1]);
    setVisited([]);
    setPath([]);
    setIsSimulating(false);
  };

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
            STREAM Muqablo Model 4: Pathfinding Robot
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Modular Next.js Architecture • Breadth-First Search & Hardware Simulation
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MazeGrid
            grid={grid}
            startPos={startPos}
            goalPos={goalPos}
            robotPos={robotPos}
            path={path}
            visited={visited}
            activeTool={activeTool}
            onCellClick={handleCellClick}
          />
          <CodeViewer />
        </div>

        <div className="space-y-6">
          <ControlPanel
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            isSimulating={isSimulating}
            onRun={runAlgorithm}
            onReset={handleReset}
          />
          <SensorDashboard isSimulating={isSimulating} />
          <PresentationPitch />
        </div>
      </div>
    </main>
  );
}