import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import '../styles/Chart.css'

const Chart = ({ type = 'line', data }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        {type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333355" />
            <XAxis dataKey="name" stroke="#b0b0b0" />
            <YAxis stroke="#b0b0b0" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a3e', border: '1px solid #d4af37' }}
              labelStyle={{ color: '#d4af37' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#d4af37" 
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        ) : (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333355" />
            <XAxis dataKey="name" stroke="#b0b0b0" />
            <YAxis stroke="#b0b0b0" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a3e', border: '1px solid #d4af37' }}
              labelStyle={{ color: '#d4af37' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              fill="#d4af3744" 
              stroke="#d4af37" 
              isAnimationActive={false}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
