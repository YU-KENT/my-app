
import { Radar, RadarChart, PolarGrid, PolarAngleAxis} from 'recharts';
import'../../Style/RadarChart.css'

const CustomizedAxisTick= (props) => {
  const { x, y,cx,cy, payload,...rest } = props;
   return (
    <text
      {...rest}
      verticalanchor="middle" 
      fill= "#ffff"
      fontSize="12px"
      y={y + (y - cy) / 10}
      x={x}
    >
      {payload.value}
    </text>
  );
}

function GraphiqueRadarChart({data}) {

    console.log("RadarChart--------------------- data-------",data)
    return (
        <RadarChart width={258} height={220} cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid gridType="polygon" radialLines={false} stroke="#FFFF"/>
          <PolarAngleAxis dataKey="kindName" tick={<CustomizedAxisTick/>}   />
          <Radar  dataKey="value" fill="#FF0101B2"/>
        </RadarChart>
      
    );
  
}


export default GraphiqueRadarChart