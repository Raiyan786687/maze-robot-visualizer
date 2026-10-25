import React from 'react';
import { BookOpen } from 'lucide-react';

export default function PresentationPitch() {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl space-y-2">
            <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
                <BookOpen className="w-5 h-5" /> Judges Pitch & Script
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-3 rounded-lg border border-slate-800">
                "Respected Judges, Assalamu Alaikum! Today I present our STREAM Muqablo Model 4: Algorithmic Pathfinding Maze Robot[cite: 1, 2]. Using Breadth-First Search (BFS) logic combined with real-time Ultrasonic distance readings, this autonomous vehicle calculates graph paths dynamically to navigate complex mazes without manual control[cite: 1, 2]."
            </p>
        </div>
    );
}