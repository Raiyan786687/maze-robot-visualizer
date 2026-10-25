import React from 'react';
import { Cpu, Radio, Gauge } from 'lucide-react';

export default function SensorDashboard({ isSimulating, currentStep }) {
    // Simulated ultrasonic telemetry values
    const frontDist = isSimulating ? Math.floor(Math.random() * 15) + 10 : 45;
    const leftDist = isSimulating ? Math.floor(Math.random() * 30) + 5 : 12;
    const rightDist = isSimulating ? Math.floor(Math.random() * 25) + 20 : 85;

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
                <Cpu className="w-5 h-5" /> Hardware Telemetry
            </h2>

            <div className="grid grid-cols-3 gap-2">
                {[
                    { label: 'Left Sensor', val: `${leftDist} cm` },
                    { label: 'Front Sensor', val: `${frontDist} cm` },
                    { label: 'Right Sensor', val: `${rightDist} cm` }
                ].map((s, idx) => (
                    <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                        <Radio className="w-4 h-4 text-emerald-400 mx-auto mb-1 animate-pulse" />
                        <div className="text-[10px] text-slate-400 uppercase font-bold">{s.label}</div>
                        <div className="text-sm font-extrabold text-slate-200 mt-1">{s.val}</div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-semibold text-slate-300">L298N Motor Speed</span>
                </div>
                <span className="text-xs font-mono font-bold bg-indigo-950 text-indigo-300 px-2 py-1 rounded border border-indigo-800">
                    PWM: 180 (70%)
                </span>
            </div>
        </div>
    );
}