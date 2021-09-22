import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react/cjs/react.development"

const ComposeTweet = () => {

    const user = useUser()

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
        <section>
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange} placeholder="¿Qué esta pasando?"></textarea>
                <Button disabled={message.length === 0} background="black">Nettear</Button>
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