import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react/cjs/react.development"
import { addNett, uploadImage } from "firebase/client"
import { useRouter } from "next/dist/client/router"


const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCES: 2,
    ERROR: -1
}

const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
}

const ComposeTweet = () => {

    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
    const [task, setTask] = useState(null)
    const [imageURL, setImageURL] = useState(null)

    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        if (task) {
          const onProgress = () => {}
          const onError = () => {}
          const onComplete = () => {
            console.log('onComplete')
            task.snapshot.ref.getDownloadURL().then((url) => setImageURL(url))
          }
          task.on("state_changed", onProgress, onError, onComplete)
        }
      }, [task])

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
        addNett({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            userName: user.username,
            img: imageURL
        }).then(() => {
            router.push('/home')
        }).catch( err => {
            console.log(err)
            setStatus(COMPOSE_STATES.ERROR)
        })
    }
    
    const handleDragEnter = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }
    const handleDragLeave = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
    }
    const handleDrop = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
        
        const file = e.dataTransfer.files[0]
        console.log(e.dataTransfer.files[0])
        const task = uploadImage(file)
        setTask(task)
    }

    console.log(task)
    
    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
    
    return (
        <>
        <section>
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange} 
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                placeholder="¿Qué esta pasando?">
                </textarea>
                {imageURL && (
                    <div className="img-container">
                        <button onClick={() => setImageURL(null)}>x</button>
                        <img src={imageURL} />  
                    </div>
                )}
                <Button disabled={isButtonDisabled} background="black">Nettear</Button>
            </form>
        </section>

        <style jsx>{`

            section {
                height: 100vh;
                width: 100%;
                overflow-y: auto;
            }
            form {
                width: 100%;
                padding: 1rem;
            }
            textarea {
                margin: 3rem 0;
                border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? "3px dashed cyan" : "3px solid transparent"};
                padding: 1rem;
                font-family: 'Poppins', sans-serif;
                font-size: 1.8rem;
                width: 100%;
                height: 300px;
            }   

            .img-container {
                position: relative;
            }

            img {
                width: 100%;
                border-radius: 10px;
                height: auto;
            } 
            button {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: black;
                color: white;
                font-size: 20px;
                border-radius: 50%;
                border: none;
                padding: 1rem 1.6rem;
                cursor: pointer;
            }

        `}</style>

        </>
    )
}

export default ComposeTweet