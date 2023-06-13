
import './App.css';
import { useParams } from "react-router-dom"
import GraphiqueBarChart from './components/Graphique/BarChart'
import GraphiqueLineChart from './components/Graphique/LineChart';
import GraphiqueRadarChart from './components/Graphique/RadarChart';
import GraphiquePieChart from './components/Graphique/PieChart';
import VerticalLayout from './components/VerticalLayout/VerticalLayout';
import Header from './components/Hearder/Header';
import IconsPerformance from './components/IconsPerformance/IconsPerformance';
import Service from './Api/DataService';
import icon5 from'./assets/icon5.png'
import icon6 from'./assets/icon6.png'
import icon7 from'./assets/icon7.png'
import icon8 from'./assets/icon8.png'

function App() {
  const userId = useParams();
  const services = new Service(userId.userId)
  const userData = services.getUserData()
  const activityData = services.getActivityData()
  const averageData = services.getAverageSessionsData()
  const performanceData = services.getPerformanceData()
  
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
              <p className='title_p'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        
              <div className="App">
                  <div className='Graphiques'>
                    {activityData &&
                    <GraphiqueBarChart data={activityData} />}

                    <div className='Graphiques_small'>
                        <div className='Graphique_small' id='LineChart'>
                        {averageData &&
                        <GraphiqueLineChart  data={averageData} />}
                        </div>

                        <div className='Graphique_small'id='RadarChart'>
                        {performanceData &&
                        <GraphiqueRadarChart data={performanceData}/> }
                       </div>

                        <div className='Graphique_small' id='PieChart'><GraphiquePieChart data={userData.createdData} />
                        </div>
                    </div>
                 </div>
                  <div className='performances'>
                      <IconsPerformance value={userData.newKeyData.Calories} src={icon5} nom ='Calories'/>
                      <IconsPerformance value={userData.newKeyData.Proteines} src={icon6} nom ='Proteines' />
                      <IconsPerformance value={userData.newKeyData.Glucides} src={icon7} nom ='Glucides'/>
                      <IconsPerformance value={userData.newKeyData.Lipides} src={icon8} nom='Lipides'/>
                  </div>
              </div> 
        </div>
    </div></>)  : ('')
  
}

export default App;
