

import { PieChart, Pie} from 'recharts';



function GraphiquePieChart({data}) {
    console.log("score",data.score)

    return (
        <><span className='LineChart_title'>Durée moyenne des sessions</span>
        <PieChart width={800} height={400} >
            <Pie
                data={data}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            ></Pie>
        </PieChart></>
        
        )

}
  

    

export default GraphiquePieChart