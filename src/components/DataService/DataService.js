import dataLocal from'../../data/dataLocal'
import FetchApi from "../Outils/FetchApi"


//`http://localhost:3000/user/${userId}` - recuper user data, ultilise pour pieChart et icons
//`http://localhost:3000/user/${userId}/ac` - recuper activity data, ultilise pour BarChart
//`http://localhost:3000/user/${userId}/average-sessions` - recuper average data, ultilise pour LineChart
//`http://localhost:3000/user/${userId}/performance` - recuper performance data,ultilise pour RadarChart

const joinUrl =(baseUrl,url)=> {
    return `${baseUrl}/${url}`
}

// rajoute une Virgule pour data calories
const numberWithCommas= (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// traiter les données avant d'ultiliser
class HandledData {
    constructor(datas){
        this.datas = datas
    }
    UseData(){
        const score = this.datas.todayScore ? this.datas.todayScore : this.datas.score
        const scorePercent = ( score*100)+'%'
        const createdData = [
                {name:scorePercent ,  value: score},
                {name:scorePercent ,  value: (1-score)},
              ]
        const handledData = (data)=>{
            const calories = numberWithCommas(data.calorieCount)
            let KeyObj =  {
                Calories : calories + 'Kcal',
                Proteines :data.proteinCount + 'g',
                Glucides  :data.carbohydrateCount + 'g',
                Lipides: data.lipidCount + 'g'
                         }
            return KeyObj 
        }
            const {userInfos,keyData} = this.datas
            const {firstName} = userInfos
            const newKeyData = handledData(keyData)
            return {userInfos,firstName,newKeyData,createdData}

    }
    ActivityData(){
        const {sessions} = this.datas
        const handledData = (sessions)=>{
            return sessions.map((session,index)=>{
            session.day = index + 1
            return({...session})
            })}
        const newData = handledData(sessions)
            return newData 
    }
    AverageSessionsData(){
        const{sessions} = this.datas
        const handledData = (sessions) =>{
            const arrDayName = ['L','M','M','J','V','S','D']
            return sessions.map((session,index) =>{
            let dayName = arrDayName[index]
            return{...session,dayName}
            })}
        const newData = handledData(sessions)
        return newData 
    }
    PerformanceData(){
        const handledData = (datas) =>{
            const KindObj = datas.kind
            return datas.data.map((data) => {
            const numberKind = data.kind
            const kindname = KindObj[numberKind]
            const kindName = kindname.replace(kindname[0],kindname[0].toUpperCase())
            return({...data,kindName})
            }) 
           }
        const newData = handledData(this.datas).reverse()
        return newData
    }
}

// rappelle mocked data '../data/dataLical'
class MockApi {
    constructor(userId){
        this.userId =  userId
    }

    getLocalData (objs,userId){
        return objs.find((obj) => { 
        const ID = (obj.id ? obj.id : obj.userId).toString()
        return ID === userId
   })
   } 
 
    getUserData(){
        const datas = this.getLocalData(dataLocal.UserData,this.userId)
        const newData = new HandledData(datas).UseData()
        console.log("-------- mocked api")
        return newData
    }

    getActivityData(){
        const datas = this.getLocalData(dataLocal.ActivityData,this.userId)
        const newData = new HandledData(datas).ActivityData()
        console.log("-------- mocked api")
        return newData
    }
    getAverageSessionsData(){
        const datas = this.getLocalData(dataLocal.AverageSessionsData,this.userId)
        const newData = new HandledData(datas).AverageSessionsData()
        console.log("-------- mocked api")
        return newData

    }
    getPerformanceData(){
        const datas = this.getLocalData(dataLocal.PerformanceData,this.userId)
        const newData = new HandledData(datas).PerformanceData()
        console.log("-------- mocked api")
        return newData
    }
}

// rappelle vrais Api par fetch url
class RealApi {
    constructor(userId){
        this.userId =  userId
        this.baseUrl = `http://localhost:3000/user/${userId}`
                       }

    getUserData() {
        const url = this.baseUrl
        const {datas,isLoading,error} = FetchApi(url)
        if(error)  return false
        if(isLoading) return false
        else{

        const newData = new HandledData(datas).UseData()
        console.log("------getUserData RealAPI",newData)
        return newData
            }
    }
    getActivityData(){
        const url = joinUrl(this.baseUrl,'activity')
        const {datas,isLoading,error} = FetchApi(url)
        if(error)  return false
        if(isLoading) return false
        else{
        const newData = new HandledData(datas).ActivityData()
        console.log("-------getActivityData RealAPI",newData)
        return newData
        }
    }
    getAverageSessionsData(){
        const url = joinUrl(this.baseUrl,'average-sessions')
        const {datas,isLoading,error} = FetchApi(url)
        if(error)  return false
        if(isLoading) return false
        else{
        const newData = new HandledData(datas).AverageSessionsData()
        console.log("------getAverageSessionsData RealAPI",newData)
        return newData
        }
    }
    getPerformanceData(){
        const url = joinUrl(this.baseUrl,'performance')
        const {datas,isLoading,error} = FetchApi(url)
        if(error)  return false
        if(isLoading) return false
        else{
        const newData = new HandledData(datas).PerformanceData()
        console.log("------getPerformanceData RealAPI",newData)
        return newData
        }
    }
}

class Service {
    // on peut change 'useMockApi = false' pour rapeller vrai Api
    useMockApi = true
    constructor(userId){
        this.userId =  userId
        this.realApi = new RealApi(this.userId)
        this.mockApi = new MockApi(this.userId)
    }
    getUserData() {
        return this.useMockApi? this.mockApi.getUserData()
        : this.realApi.getUserData()
    }
     
    getActivityData() {
        return this.useMockApi?  this.mockApi.getActivityData()
        :this.realApi.getActivityData()
    }

    getAverageSessionsData(){
        return this.useMockApi?  this.mockApi.getAverageSessionsData()
       : this.realApi.getAverageSessionsData()
    }

    getPerformanceData(){
        return this.useMockApi?  this.mockApi.getPerformanceData()
        : this.realApi.getPerformanceData()
    }
}


export default Service 