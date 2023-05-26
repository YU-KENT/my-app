
import { useState,useEffect } from "react"
import dataLocal from'../../data/dataLocal'

const FetchData = (url)=> {
    const [datas, setDatas] = useState({})
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
    async function fetchData() {
    try{
        const response = await fetch(url)
        const data = await response.json()
        setDatas(data.data)
        setLoading(false)
    }
    catch(err){
        console.log(err)
    }
    }
    setLoading(true)
    fetchData()
    
    }, [url])
    return {isLoading,datas }
    }

const getLocalData = (objs,userId)=>{
console.log(objs,userId)
    return objs.find((obj) => { 
       const ID = obj.id ? obj.id : obj.userId
       console.log(ID.toString(),userId)
       return ID.toString() === userId
})
}   

const joinUrl =(baseUrl,url)=> {
    return `${baseUrl}/${url}`
}

const numberWithCommas= (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



class Service{
    constructor(userId){
        this.userId =  userId
        this.baseUrl = `http://localhost:3000/user/${userId}`
    }
    
    getUserData() {
        const url = this.baseUrl
        const {datas,isLoading} = FetchData(url,dataLocal.UserData,this.userId)

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
        const {datas, isLoading } = FetchData(url) 
        /*  : getLocalData(dataLocal.ActivityData,this.userId) */
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
        const {datas, isLoading } = FetchData(url)
     

        const handledData = (sessions) =>{
            const arrDayName = ['L','M','M','J','V','S','D']
            return sessions.map((session,index) =>{
            let dayName = arrDayName[index]
            return{...session,dayName}
            })
        }
        if (!isLoading) {
            const{sessions} = datas
            const newData = handledData(sessions)
            return newData 
        }
    }

    getPerformanceData(){
        const url = joinUrl(this.baseUrl,'performance')
        const {datas, isLoading } = FetchData(url) 
        /* : getLocalData(dataLocal.PerformanceData,this.userId) */

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
}

export default Service