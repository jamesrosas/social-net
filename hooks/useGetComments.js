import { getUserComments } from "firebase/client"
import { useState, useEffect } from "react"
import useUser from "./useUser"


const useGetComments = (uid) => {

    const user = useUser()

    const [commentsData, setCommentsData] = useState([])
    
    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getUserComments( uid,  newComments => {
                setCommentsData(newComments)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])


    return commentsData
}

export default useGetComments