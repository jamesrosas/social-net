import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/client"
import { useRouter } from "next/router"

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
    // creo que la desuscripcion, para cuando hacemos logout puede ser mas en este useEffect porque estamos usando una funcion que todo el tiempo esta viendo el cambio del estado del usuario.

    useEffect(() => {
        user === USER_STATES.NOT_LOGGED && router.push('/')
    }, [user])

    return user
    
}

export default useUser