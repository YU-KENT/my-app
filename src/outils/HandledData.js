
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

export default HandledData