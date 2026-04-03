import { Radar, RadarChart, PolarAngleAxis, PolarGrid, ResponsiveContainer, Tooltip } from 'recharts'

export function SkillsRadar({ data }) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-5">
      <div className="text-sm font-semibold text-text">Proficiency radar</div>
      <div className="mt-3 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="label" tick={{ fill: 'rgba(226,232,240,0.75)', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(10,10,15,0.9)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 12,
                color: '#e2e8f0',
              }}
            />
            <Radar
              dataKey="value"
              stroke="#22d3ee"
              fill="rgba(34,211,238,0.22)"
              strokeWidth={2}
              dot={{ r: 2, fill: '#6366f1' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

