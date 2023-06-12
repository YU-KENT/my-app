import { BarChart, XAxis,Tooltip ,Legend,Bar,YAxis,CartesianGrid} from 'recharts';
import'../../Style/BarChart.css'

const CustomTooltip = ({ active, payload}) => {
if (active && payload && payload.length) {
  return (
    <div className="barChart-custom-tooltip">
      <p className="barChart-label">{`${payload[0].value}`}kg</p>
      <p className="barChart-label">{`${payload[1].value}`}Kcal </p>
    </div>
  );
  }}

function GraphiqueBarChart({data}) {

  return(
        <div className='recharts-barchart'>
        <span className='barChart_title'>Activité quotidienne</span>
        <BarChart width={763} height={180} data={data} margin={{Right:'10px'}}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="day" tickLine={false} axisLine={false} dy={10} />
        <YAxis yAxisId="right" domain={['dataMin-1', 'dataMax + 1']} orientation ='right' tickCount={4} tickLine={false} axisLine={false}/>
        <YAxis yAxisId="left" domain={[0, 'dataMax + 30']} hide/>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" align="right" iconType ="circle" iconSize="8"
        wrapperStyle ={{top:"-95px",width:"360px"}}
        formatter={(value)=> <span className='text-color-class'>{value}</span>}
        />
        <Bar yAxisId="right" dataKey="kilogram"  barSize={7} fill="#020203" name="Poids (kg)" 
        radius={[3, 3, 0, 0]} />
        <Bar yAxisId="left" dataKey="calories" barSize={7} fill="#E60000" name="Calories brûlées (kCal)"
        radius={[3, 3, 0, 0]} />
      </BarChart>
      </div>
    )}
    

export default GraphiqueBarChart