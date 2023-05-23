
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
    return {isLoading, datas }
    }

const getLocalDATAT = (objs,userId)=>{
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

class Service{
    constructor(userId){
        this.userId =  userId
        this.baseUrl = `http://localhost:3000/user/${userId}`
    }
    
    getUserData() {
        const {datas, isLoading } = FetchData(this.baseUrl)
/*         const Jjjj = getLocalDATAT(dataLocal.UserData,this.userId) */
        if (!isLoading) {
            /* console.log("JsonJsonJson",Jjjj) */
            console.log("userrrrrrrrrrrrr",datas)
            const {userInfos,score,keyData} = datas
            const {firstName,} = userInfos
            return {userInfos,firstName,score,keyData}
        }
       
    }
    getActivityData(){
        const url = joinUrl(this.baseUrl,'activity')
        const {datas, isLoading } = FetchData(url)
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
        const handledData = (sessions) =>{
            const arrDayName = ['L','M','M','J','V','S','D']
            return sessions.map((session,index) =>{
            let dayName = arrDayName[index]
            return{...session,dayName}
            })
        }
        const url = joinUrl(this.baseUrl,'average-sessions')
        const {datas, isLoading } = FetchData(url)
        if (!isLoading) {
            const{sessions} = datas
            const newData = handledData(sessions)
            return newData 
        }
    }

    getPerformanceData(){
        const url = joinUrl(this.baseUrl,'performance')
        const {datas, isLoading } = FetchData(url)
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