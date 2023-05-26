
import dataLocal from'../../data/dataLocal'
import FetchApi from "../Outils/FetchApi"


const joinUrl =(baseUrl,url)=> {
    return `${baseUrl}/${url}`
}

const numberWithCommas= (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
            console.log(data)
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
        const handledData = (sessions)=>{
            return sessions.map((session,index)=>{
            session.day = index + 1
            return({...session})
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
        const newData = handledData(this.datas)
        return newData
    }
}



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
     return newData
    }

    getActivityData(){
        const datas = this.getLocalData(dataLocal.ActivityData,this.userId)
        const newData = new HandledData(datas).ActivityData()
        return newData
    }
    getAverageSessionsData(){
        const datas = this.getLocalData(dataLocal.AverageSessionsData,this.userId)
        const newData = new HandledData(datas).AverageSessionsData()
        return newData

    }
    getPerformanceData(){
        const datas = this.getLocalData(dataLocal.PerformanceData,this.userId)
        const newData = new HandledData(datas).PerformanceData()
        return newData
    }

}


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
        console.log("getUserData API",newData,error)
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
        console.log("getActivityData API",newData,error)
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
        console.log("getAverageSessionsData API",newData,error)
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
        console.log("getPerformanceData API",newData,error)
        return newData
        }
    }

}



class Service {
    constructor(userId){
        this.userId =  userId
        this.realApi = new RealApi(this.userId)
        this.mockApi = new MockApi(this.userId)
    }
    getUserData() {
        return this.realApi.getUserData() ?
        this.realApi.getUserData(): this.mockApi.getUserData()
    }
     

    getActivityData() {
        return this.realApi.getActivityData() ?
        this.realApi.getActivityData(): this.mockApi.getActivityData()

    }

    getAverageSessionsData(){
        return this.realApi.getAverageSessionsData() ?
        this.realApi.getAverageSessionsData(): this.mockApi.getAverageSessionsData()
       
    }

    getPerformanceData(){
        return this.realApi.getPerformanceData() ?
        this.realApi.getPerformanceData(): this.mockApi.getPerformanceData()
 
    }
}





/* class Services{
    constructor(userId){
        this.userId =  userId
        this.baseUrl = `http://localhost:3000/user/${userId}`
    }
    
    getUserData() {
        const url = this.baseUrl
        const {datas,isLoading,error} = FetchApi(url)
        console.log("error",error)
        const score = datas.todayScore ? datas.todayScore : datas.score
        const scorePercent = ( score*100)+'%'
        const createdData = [
                {name:scorePercent ,  value: score},
                {name:scorePercent ,  value: (1-score)},
              ]
        const handledData = (data)=>{
            const calories = numberWithCommas(data.calorieCount)
            console.log(data)
            let KeyObj =  {
                Calories : calories + 'Kcal',
                Proteines :data.proteinCount + 'g',
                Glucides  :data.carbohydrateCount + 'g',
                Lipides: data.lipidCount + 'g'
                         }
            return KeyObj 
        }

        if (!isLoading) {
            const {userInfos,keyData} = datas
            const {firstName,} = userInfos
            const newKeyData = handledData(keyData)
            return {userInfos,firstName,newKeyData,createdData}
        }
    }
    getActivityData(){
        const url = joinUrl(this.baseUrl,'activity')
        const {datas, isLoading } = FetchApi(url) 
        const handledData = (sessions)=>{
            return sessions.map((session,index)=>{
            session.day = index + 1
            return({...session})
            })}

        if (!isLoading) {
            const {sessions} = datas
            handledData(sessions)
            return sessions
        }
    }
    getAverageSessionsData(){
        const url = joinUrl(this.baseUrl,'average-sessions')
        const {datas, isLoading } = FetchApi(url)
     

        const handledData = (sessions) =>{
            const arrDayName = ['L','M','M','J','V','S','D']
            return sessions.map((session,index) =>{
            let dayName = arrDayName[index]
            return{...session,dayName}
            })
        }
        if (!isLoading) {
            const{sessions} = datas
            handledData(sessions)
            return sessions
        }
    }

    getPerformanceData(){
        const url = joinUrl(this.baseUrl,'performance')
        const {datas, isLoading } = FetchApi(url) 


        const handledData = (datas) =>{
            const KindObj = datas.kind
            return datas.data.map((data) => {
            const numberKind = data.kind
            const kindname = KindObj[numberKind]
            const kindName = kindname.replace(kindname[0],kindname[0].toUpperCase())
            return({...data,kindName})
            }) 
           }
        if (!isLoading) {
            const newData = handledData(datas)
            return newData
        }
    }
} */

export default Service 