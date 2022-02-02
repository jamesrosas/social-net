import { getAllUserPosts, listenLatestDevits } from "firebase/client"
import { useState, useEffect } from "react"
import useUser from "./useUser"

const useGetNetts = () => {

    const [allNetts, setAllNetts] = useState([])
    const [userTimeline, setUserTimeline] = useState([])

    const user = useUser()

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = listenLatestDevits( newDevits => {
                setAllNetts(newDevits)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getAllUserPosts( newDevits => {
                 setUserTimeline(newDevits)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    return {
        allNetts,
        userTimeline
    }
}

export default useGetNetts

