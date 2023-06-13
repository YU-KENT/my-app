import dataLocal from'../datalocal/dataLocal'
import FetchApi from "../outils/FetchApi"
import HandledData from '../outils/HandledData'

//`http://localhost:3000/user/${userId}` - recuper user data, ultilise pour pieChart et icons
//`http://localhost:3000/user/${userId}/activity` - recuper activity data, ultilise pour BarChart
//`http://localhost:3000/user/${userId}/average-sessions` - recuper average data, ultilise pour LineChart
//`http://localhost:3000/user/${userId}/performance` - recuper performance data,ultilise pour RadarChart

const joinUrl =(baseUrl,url)=> {
    return `${baseUrl}/${url}`
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
    useMockApi = false
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