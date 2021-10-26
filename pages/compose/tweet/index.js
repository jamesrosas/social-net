import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import { addNett, uploadImage } from "firebase/client"
import { useRouter } from "next/router"
import Avatar from "components/Avatar"
import BackNav from "components/BackNav"
import Loader from "components/Loader"


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
    const [loadImage, setLoadImage] = useState(false)

    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        if (task) {
          const onProgress = () => {
              console.log('cargando imagen...')
              setLoadImage(true)
          }
          const onError = () => {}
          const onComplete = () => {
            console.log('onComplete')
            setLoadImage(false)
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
        <BackNav href="/home" />
        <section>
            {user && (
                <div className="avatar-container">
                    <Avatar src={user.avatar}/>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange} 
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                placeholder="¿Qué esta pasando?">
                </textarea>
                {loadImage && (
                    <div className="img-container">
                        <p>Cargando imagen...</p>
                        <Loader />
                    </div>
                )}
                {imageURL && (
                    <div className="img-container">
                        <button onClick={() => setImageURL(null)}>x</button>
                        <img src={imageURL} />  
                    </div>
                )}
                <div className="button-container"> 
                    <Button disabled={isButtonDisabled} background="black">Nettear</Button>
                </div>
            </form>
        </section>

        <style jsx>{`

            section {
                height: 100vh;
                width: 100%;
                overflow-y: auto;
                display: flex;
                align-items: flex-start;
                padding: 2rem;
            }

            .avatar-container {
                padding-top: 1.5rem;
                display: flex;
                justify-content: center;
                margin-right: -2rem;
            }

            form {
                width: 100%;
                padding: 1rem 0 1rem 1rem;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }
            textarea {
                border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? "3px dashed cyan" : "3px solid #d3d3d347"};
                padding: 1rem;
                font-family: 'Poppins', sans-serif;
                font-size: 1.8rem;
                width: 100%;
                height: 300px;
                border-radius: 10px;
                resize: none;
            }   

            .img-container {
                position: relative;
                background-color: #dedede;
                width: 100%;
                min-height: 140px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-top: 1rem;
            }
            .img-container p{
                font-family: 'Poppins', sans-serif;
                font-size: 1.6rem;
                color: grey;
                margin-top: 1rem;
                padding-top: 2rem;
                margin-bottom: -1rem;
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

            .button-container {
                width: fit-content;
                display: flex;
                margin-left: 1.8rem;
                margin-top: 1.8rem;
            }

        `}</style>

        </>
    )
}

export default ComposeTweet