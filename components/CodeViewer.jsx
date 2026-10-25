import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

const cppCode = `// STREAM Muqablo Model 4 - Arduino Maze Solver
#include <NewPing.h>

#define TRIG_FRONT 11
#define ECHO_FRONT 12
#define MAX_DIST 200

NewPing sonarFront(TRIG_FRONT, ECHO_FRONT, MAX_DIST);

void setup() {
  Serial.begin(9600);
}

void loop() {
  int distance = sonarFront.ping_cm();
  if (distance > 15 || distance == 0) {
    // Path Clear -> Forward
  } else {
    // Wall detected -> Search path
  }
}`;

const pyCode = `# Python BFS Pathfinding Logic
import collections

def bfs(grid, start, goal):
    queue = collections.deque([[start]])
    seen = {start}
    while queue:
        path = queue.popleft()
        if path[-1] == goal: return path
        # Search adjacent cells...
    return None`;

export default function CodeViewer() {
    const [activeTab, setActiveTab] = useState('cpp');
    const [copied, setCopied] = useState(false);

    const codeToCopy = activeTab === 'cpp' ? cppCode : pyCode;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
                    <Code className="w-5 h-5" /> Embedded Scripts
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('cpp')}
                        className={`px-3 py-1 rounded text-xs font-bold ${activeTab === 'cpp' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                    >
                        C++ (Arduino)
                    </button>
                    <button
                        onClick={() => setActiveTab('py')}
                        className={`px-3 py-1 rounded text-xs font-bold ${activeTab === 'py' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                    >
                        Python
                    </button>
                    <button onClick={handleCopy} className="p-1 text-slate-400 hover:text-white">
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <pre className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto max-h-48 border border-slate-800">
                <code>{codeToCopy}</code>
            </pre>
        </div>
    );
}