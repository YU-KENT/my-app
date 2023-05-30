
import { PieChart, Pie,Cell,Sector,Text} from 'recharts';
import '../../Style/PieChart.css'
 const COLORS = ["#FF0000","#FBFBFB"]

function GraphiquePieChart({data}) {
    console.log("score",data)
    return (
        <><span className='PieChart_title'>Score</span>
           <p className='PieChart_title_score'>{data[0].name}</p>
           <p className='PieChart_title_text'>de votre objectif</p>
        <PieChart width={258} height={200} >
            <Pie data={data} innerRadius={80} outerRadius={90} stroke='#FBFBFB'
                dataKey="value" startAngle={90} cornerRadius={40} >
              {data.map((entry,index)=>(
              <Cell key={`cell-${index}`} fill={COLORS[index]}  />
             ))}
            </Pie>
            <Pie data={data} dataKey="value" innerRadius={0}  outerRadius={80}  fill="#FFFF">
            </Pie>
        </PieChart></>
        )
}
  

export default GraphiquePieChart