import { useState,useEffect } from "react"

function FetchApi (url){
    const [datas, setDatas] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        async function fetchData() {
        try{
            const response = await fetch(url)
            const data = await response.json()
            setDatas(data.data)
            setLoading(false)

        }catch(err){
            console.log(err)
            setError(true)
        }}
        setError(false)
        setLoading(true)
        fetchData()
    }, [url])

    return {isLoading,datas,error }
}

export default FetchApi