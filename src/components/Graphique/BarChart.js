import { BarChart, XAxis,Tooltip ,Legend,Bar,YAxis,CartesianGrid} from 'recharts';
import'../../Style/BarChart.css'

function GraphiqueBarChart({data}) {

  return(
        <div className='recharts-barchart'>
        <span className='barChart_title'>Activité quotidienne</span>
        <BarChart width={763} height={200} data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" />
        <YAxis dataKey="kilogram" domain={['dataMin -1', 'dataMax + 1']} tickCount={4} />
        <YAxis dataKey="calories" domain={[0, 'dataMax + 10']} />
   
        <Tooltip />
        <Legend />
        <Bar dataKey="kilogram" barSize={7} fill="#020203" radius={[3, 3, 0, 0]} />
        <Bar dataKey="calories" barSize={7} maxBarSize={10} fill="#E60000" radius={[3, 3, 0, 0]} />
      </BarChart>
      </div>
    )}
    

export default GraphiqueBarChart