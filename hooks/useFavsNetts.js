import { getUserFavsNetts } from "firebase/client"
import { useState, useEffect } from "react"
import useUser from "./useUser"


const useFavsNetts = () => {
    
    const [ favsUserTimeline, setFavsUserTimeline] = useState([])

    const user = useUser()

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getUserFavsNetts( favsNetts => {
                 setFavsUserTimeline(favsNetts)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    return favsUserTimeline
}

export default useFavsNetts