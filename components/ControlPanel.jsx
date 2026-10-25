import React from 'react';
import { Play, RotateCcw, Shield, MapPin, Flag } from 'lucide-react';

export default function ControlPanel({
    algorithm,
    setAlgorithm,
    activeTool,
    setActiveTool,
    isSimulating,
    onRun,
    onReset
}) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-indigo-400">Control Panel</h2>

            <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Select Algorithm
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {['BFS', 'DFS'].map((algo) => (
                        <button
                            key={algo}
                            onClick={() => setAlgorithm(algo)}
                            className={`py-2 px-3 rounded-lg font-bold text-sm border transition-all ${algorithm === algo
                                    ? 'bg-indigo-600 border-indigo-500 text-white'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                        >
                            {algo} Mode
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Grid Placement Tool
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { id: 'wall', label: 'Wall', icon: Shield },
                        { id: 'start', label: 'Start', icon: MapPin },
                        { id: 'goal', label: 'Goal', icon: Flag }
                    ].map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${activeTool === tool.id
                                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <Icon className="w-4 h-4 mb-1" />
                                {tool.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="pt-2 flex gap-2">
                <button
                    onClick={onRun}
                    disabled={isSimulating}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
                >
                    <Play className="w-4 h-4 fill-white" /> Run Algorithm
                </button>
                <button
                    onClick={onReset}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold p-2.5 rounded-lg transition-all"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}