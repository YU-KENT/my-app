import { LineChart, XAxis,Tooltip ,Line} from 'recharts';
import'../../Style/LineChart.css'

function GraphiqueLineChart({data}) {
    
    return(
        <><span className='LineChart_title'>Durée moyenne des sessions</span>
          <LineChart width={258} height={100} data={data}
                margin={{ top: 35, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="dayName" />
                <Tooltip/>
                <Line type="monotone" dataKey="sessionLength" stroke="#8884d8" />
          </LineChart>
        </>
      )


}

export default GraphiqueLineChart