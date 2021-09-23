import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react/cjs/react.development"
import { addNett } from "firebase/client"
import { useRouter } from "next/dist/client/router"


const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCES: 2,
    ERROR: -1
}

const ComposeTweet = () => {

    const user = useUser()

    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
    const router = useRouter()

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
        addNett({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            userName: user.username
        }).then(() => {
            router.push('/home')
        }).catch( err => {
            console.log(err)
            setStatus(COMPOSE_STATES.ERROR)
        })
    }

    return (
        <>
        <section>
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange} placeholder="¿Qué esta pasando?"></textarea>
                <Button disabled={isButtonDisabled} background="black">Nettear</Button>
            </form>
        </section>

        <style jsx>{`

            section {
                height: 100vh;
                width: 100%;
            }
            form {
                width: 100%;
                padding: 1rem;
            }
            textarea {
                margin: 3rem 0;
                border: none;
                padding: 1rem;
                font-family: 'Poppins', sans-serif;
                font-size: 1.8rem;
                width: 100%;
                height: 300px;
            }    

        `}</style>

        </>
    )
}

export default ComposeTweet