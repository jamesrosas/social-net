import { useState, useEffect } from "react"
import useUser from "./useUser"
import { getCurrentUser } from "firebase/client"

const useCurrentUser = () => {

    const [ currentUser, setCurrentUser] = useState({})

    const user = useUser()

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getCurrentUser( data => {
                setCurrentUser(data)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    return currentUser
    
}

export default useCurrentUser