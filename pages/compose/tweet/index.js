import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import { addNett, uploadImage } from "firebase/client"
import { useRouter } from "next/router"
import Avatar from "components/Avatar"
import BackNav from "components/BackNav"
import Loader from "components/Loader"
import AddPhoto from "components/Icons/AddPhoto"


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
            //   console.log('cargando imagen...')
              setLoadImage(true)
          }
          const onError = () => {}
          const onComplete = () => {
            // console.log('onComplete')
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
            // primero debo subir la imagen al storage para asi obtener su URL y asi agregar dicha url al Nett
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
        // console.log(e.dataTransfer)
        // console.log(e.dataTransfer.files[0])
        const task = uploadImage(file)
        setTask(task)
    }
    
    const handleChangeFileInput = (e) => {
        const file = e.target.files[0]
        // console.log(e.target)
        // console.log(e.target.files[0])

        const task = uploadImage(file)
        setTask(task)

    }

    // console.log(task)
    
    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
    
    return (
        <>
        <BackNav href="/home" />
        <section>
            {user && (
                <div className="avatar-container">
                    <Avatar src={user.avatar} alt={user.userName}/>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <textarea maxLength="200"onChange={handleChange} 
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
                        <img src={imageURL} alt="preview-image"/>  
                    </div>
                )}
                <div className="input-img_container">
                    <span className="input-content">
                        <AddPhoto widht="4rem" height="4rem"/>
                    </span>                 
                    <input className ="input-file" type="file" onChange={handleChangeFileInput}></input> 
                </div>
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
                margin-left: -1rem;
                margin-top: -1rem;
            }

            form {
                width: 100%;
                /* padding: 1rem 0 1rem 1rem; */
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }
            textarea {
                border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? "3px dashed cyan" : "3px solid #d3d3d38a"};
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

            span {
                /* background: black; */
                color: white;
                font-size: 30px;
                cursor: pointer;
                /* padding: 5px 8px; */
                width: fit-content;
                border-radius: 5px;
                margin-top: 1rem;
            }

            .input-img_container {
                width: 60px;
                height: 60px;
                background: black;
                color: white;
                /* border: 2px solid black; */
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
                font-size: 16px;
                /* padding: 1rem; */
                position: relative;
                cursor: pointer;
                margin-top: 1rem;
            }
            .input-img_container:active{
                filter: invert(1);
            }
            .input-content {
                position: absolute;
                left: 16px;
                widht: fit-content;
                height: fit-content;
            }
            input[type="file"]{
                opacity: 0;
                height: 61px;
                width: 100%;
                cursor: pointer;
                padding: 2rem;
                positon: absolute;
                z-index: 10;
            }

            .img-preview_container {
                background: white;
                position: relative;
                display: flex;
                flex-direction: column;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 90%;
                padding: 1rem;
            }
            .img-preview {
                object-fit: contain;
                width: 90%;
                height: 80%;
                margin: 0 auto;
                border-radius: 8px;
            }

            .remove-img {
                position: absolute;
                top: .5rem;
                right: .5rem;
                width: fit-content;
                height: fit-content;
            }

            .button-container {
                width: fit-content;
                display: flex;
                /* margin-left: 1.8rem; */
                margin-top: 2rem;
            }

        `}</style>

        </>
    )
}

export default ComposeTweet