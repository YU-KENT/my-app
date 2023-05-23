
import './App.css';
import { useParams } from "react-router-dom"
import GraphiqueBarChart from './components/Graphique/BarChart'
import GraphiqueLineChart from './components/Graphique/LineChart';
import GraphiqueRadarChart from './components/Graphique/RadarChart';
import GraphiquePieChart from './components/Graphique/PieChart';
import VerticalLayout from './components/VerticalLayout/VerticalLayout';
import Header from './components/Hearder/Header';
import Service from './components/DataService/DataService';

function App() {
  const userId = useParams();
  const services = new Service(userId.userId)
  const userData = services.getUserData()
  console.log("uuuuuuuuuuuuuu",userData)
  const activityData = services.getActivityData()

  const averageData = services.getAverageSessionsData()
  console.log("ssssssssssssss",averageData)
  const performanceData = services.getPerformanceData()
  console.log("pppppppppppp",performanceData)

      return userData ? (
      <>
      <Header />
      <div className='layout'>
        <VerticalLayout />
        <div className='body'>
          <div className='titles'>
            <h1 className='title_bonjour'>Bonjour </h1>
            <span className='title_prenom'>{userData.firstName}</span> 
          </div>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        
            <div className="App">
              <div className='Graphiques'>
                   {activityData &&
                  <GraphiqueBarChart data={activityData} />}

                <div className='Graphiques_small'>
                    <div>
                    {averageData &&
                    <GraphiqueLineChart  data={averageData} />}
                    </div>

                    <div>
                    {performanceData &&
                    <GraphiqueRadarChart data={performanceData}/> }
                   </div>

                   <div><GraphiquePieChart data={userData.score} /></div>
                </div>
              </div>
              <div className='performances'>

              </div>
            </div> 
        </div>
    </div></>)  : ('')
  
}

export default App;
