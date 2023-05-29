
import { LineChart, XAxis,Tooltip ,Line ,Rectangle, YAxis} from 'recharts';
import'../../Style/LineChart.css'


const CustomizedAxisTick= (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x*0.89},${y})`}>
        <text x={13} y={0} dy={5} height={10} textAnchor="middle" fill="#FFFFFF" opacity='0.5' fontSize='12px'>
          {payload.value}
        </text>
      </g>
    );}

const CustomTooltip = ({ active, payload}) => {
      if (active && payload && payload.length) {
        return (
              <div className="lineChart-custom-tooltip" >
               <p className="lineChart-custom-tooltip-label">{`${payload[0].value}`} min</p>
              </div>
              )
      }
      return null;
    };

const CustomCursor = props => {
      const coordinateX = props.points[0].x
      return <Rectangle fill="rgba(0,0,0,0.1)" x={coordinateX} y={0} width={263- coordinateX} height={663} />;
  };


function GraphiqueLineChart({data}) {
    console.log("linechart",data )
    return(
        <><span className='LineChart_title'>Durée moyenne des sessions</span>
          <LineChart width={268} height={263} data={data}>
                <XAxis dataKey="dayName" tick={<CustomizedAxisTick/>} tickLine={false} axisLine={false}/>
                <YAxis  type="number" domain={[-15, 'dataMax + 40']} hide/>
                <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} /> 
                <Line type="natural" dataKey="sessionLength" height="160" stroke="#ffff" opacity="0.5" dot ={false} 
                 strokeWidth={2} />
          </LineChart>
        </>
      )
}

export default GraphiqueLineChart