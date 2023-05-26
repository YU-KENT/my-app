
import { LineChart, XAxis,Tooltip ,Line ,Rectangle} from 'recharts';
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

const CustomTooltip = ({ active, payload}) => {
      if (active && payload && payload.length) {
        return (
              <div className="lineChart-custom-tooltip" style={{}}>
               <p className="lineChart-custom-tooltip-label">{`${payload[0].value}`} min</p>
              </div>
          
        );
      }
      return null;
    };

  const CustomCursor = props => {
      const { x, y, width, height } = props;
      return <Rectangle fill="rgba(0,0,0,0.1)" x={x} y={y} width={width} height={263} />;
  };


function GraphiqueLineChart({data}) {
/*   let [posData, setposData] = useState({}) */
    console.log("LineChart LineChart LineChart",data)
    return(
        <><span className='LineChart_title'>Durée moyenne des sessions</span>
          <LineChart width={268} height={263} data={data}>
                <XAxis dataKey="dayName" tick={<CustomizedAxisTick/>} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} /> {/* position={{ x: posData.x, y: posData.y - 40 }}  */}
                <Line type="natural" dataKey="sessionLength" height={160}stroke="#ffff" opacity="0.5" dot ={false} 
                 strokeWidth={2} />
          </LineChart>
        </>
      )


}

export default GraphiqueLineChart