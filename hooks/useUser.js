import { useState, useEffect } from "react/cjs/react.development"
import { onAuthStateChanged } from "firebase/client"
import { useRouter } from "next/dist/client/router"

export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined
}

const useUser = () => {
    const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

    const router = useRouter()

    useEffect( () => {
        onAuthStateChanged(user => setUser(user))
      }, [])

    useEffect(() => {
        user === USER_STATES.NOT_LOGGED && router.push('/')
    }, [user])

    return user
    
}

export default useUser