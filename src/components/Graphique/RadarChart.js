
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

function GraphiqueRadarChart({data}) {

    console.log("RadarChart--------------------- data-------",data)
    return (
        <RadarChart width={258} height={200} cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kindName" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      
    );
  
}


export default GraphiqueRadarChart