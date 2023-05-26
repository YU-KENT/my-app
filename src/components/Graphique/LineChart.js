
import { LineChart, XAxis,Tooltip ,Line} from 'recharts';
import'../../Style/LineChart.css'


const CustomizedAxisTick= (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x*0.89},${y})`}>
        <text x={13} y={0} dy={25} textAnchor="middle" fill="#FFFFFF" opacity='0.5' fontSize='12px'>
          {payload.value}
        </text>
      </g>
    );}

const CustomTooltip1 = ({ active, payload}) => {
      if (active && payload && payload.length) {
        return (
          <div className="lineChart-custom-tooltip1">
            <p className="lineChart-custom-tooltip1-label">{`${payload[0].value}`} min</p>
          </div>
        );
      }
      return null;
    };
    const tooltipFormatter = ({ value, name }) => {
      if (name === 'foo') return
      return null
  }
   /*  const CustomTooltip2 = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip2">
          </div>
        );
      }
      return null;
    }; */

function GraphiqueLineChart({data}) {
  
    console.log("LineChart LineChart LineChart",data)
    return(
        <><span className='LineChart_title'>Durée moyenne des sessions</span>
          <LineChart width={268} height={160} data={data}>
                <XAxis dataKey="dayName" tick={<CustomizedAxisTick/>} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip1 />}  formatter={tooltipFormatter} name='foo' />
            {/*     <Tooltip content={<CustomTooltip2 />} position={{ y: 0 }} /> */}
                <Tooltip />
                <Line type="natural" dataKey="sessionLength" stroke="#ffff" opacity="0.5" dot ={false} 
                /* activeDot={{r:4}} */  strokeWidth={2}/>
          </LineChart>
        </>
      )


}

export default GraphiqueLineChart