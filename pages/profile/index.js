import BackNav from "components/BackNav"
import { updateUserProfile, uploadImage } from "firebase/client"
import useUser from "hooks/useUser"
import { useState, useEffect, useRef } from "react"
import Devit from "components/Devit"
import Loader from "components/Loader"
import { getAllUserPosts } from "firebase/client"
import ProfileModal from "components/ProfileModal"
import Button from "components/Button"
import Camera from "components/Icons/Camera"
import Pencil from "components/Icons/Pencil"
import Check from "components/Icons/Check"
import Close from "components/Icons/Close"
import useFavsNetts from "hooks/useFavsNetts"
import Link from "next/link"
import NettImage from "components/NettImage"
import useCustomAlerts from "hooks/useCustomAlerts"


const Profile = () => {

    const user = useUser()
    const { toast } = useCustomAlerts()
    const { favsUserTimeline } = useFavsNetts()

    const [userTimeline , setUserTimeline] = useState([])
    const [modalProfile, setModalProfile] = useState(false)
    const [editName, setEditName] = useState(false)
    const [newName, setNewName] = useState("")
    const [laodAvatar, setLoadAvatar] = useState(false)
    const [imageInput, setImageInput] = useState("")
    const [imageUrlStorage, setImageUrlStorage] = useState("")
    const [completeImgAvatar, setCompleteImgAvatar] = useState("")
    const [task, setTask] = useState(null)
    const [showFavs, setShowFavs] = useState(false)    
    const [inputFileValue, setInputFileValue] = useState(null)

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getAllUserPosts( newDevits => {
                 setUserTimeline(newDevits)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])


    useEffect(() => {
        if (task) {
          const onProgress = () => {
              console.log('cargando imagen...')
              setLoadAvatar(true)
          }
          const onError = () => {}
          const onComplete = () => {
            console.log('onComplete')
            task.snapshot.ref.getDownloadURL()
                .then((url) => {
                    setImageUrlStorage(url)
                    setLoadAvatar(false)
                    console.log(url)
                })
                .then(() => {
                })
                .catch(({message}) => console.log(message))
            console.log("foto actualizada")
          }
          task.on("state_changed", onProgress, onError, onComplete)
        }
      }, [task])
    // con este useEffect ya logre obtener la url de la imagen subida y asi mostrarla , por ende puedo hacer uso de esta url para usarla como url de imagen en el metodo de updateProfile() de firebase, y asi actulizar la imagen de avatar del usuario.

    const handleClickEditName = () => {
        setEditName(!editName)
        setNewName(null)
        setModalProfile(false)
    }
    const handleChangeUserName = (e) => {
        setNewName(e.target.value)
    }

    const handleSubmitUserName = (e) => {
        e.preventDefault()
        updateUserProfile({name: newName}, () => {
            toast.fire({
                text:"Username Actualizado",
                icon: "success"
            })
            setEditName(false)
        })
        // console.log("nombre actualizado")
    }

    // usar este mismo metodo en el boton "foto +" de createNett
    const handleChangeInputFile = (e) => {
        const file = e.target.files[0]
        console.log(e.target)
        console.log(e.target.files[0])
        setImageInput(file)

        if (file){
            const reader = new FileReader()
            reader.onload = (e) => {
                setInputFileValue(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmitInputFile = (e) => {
        e.preventDefault()
        const task = uploadImage(imageInput)
        console.log("subido?")
        setTask(task)
        // junto con el handleChangeInputFile y este handleSubmitInputFile ya pudimos subir una imagen al storage, haciendo uso del metodo uploadImage(), entonces de esta manera ya con esta imagen en el storage firestore le asigna un url, la cual tenemos que traer para colocar como url de imagen en el updateProfile() de firebase. Puedo usar el mismo metodo que se usa en el dragAndDrop de publicar nett para mostrar la imagen.
    }



    // APARENTEMENTE YA ESTA FUNCIONANDO LA ACTUALIZACION DEL AVATAR, LA VECEZ QUE NO SE ACTULIZABA LA IMAGEN SE PUEDE DEBER A QUE FIREBASE SE ESTA DEMORANDO EN EJECUTAR DICHO PROCESO;
    const handleClickUpdateImg = () => {
        updateUserProfile({avatarUrl: imageUrlStorage}, () => {
            toast.fire({
                text:"Avatar actualizado",
                icon: "success"
            })
            setImageUrlStorage(null)
            setInputFileValue(null)
            setImageInput(null)
            setModalProfile(false)
        })
        // console.log("ejecutando actualizacion de avatar")
        // console.log(user)
    }

    useEffect(() => {
        if(imageUrlStorage){
            setCompleteImgAvatar(imageUrlStorage)
        }
    },[imageUrlStorage])

    const handleClickCancel = () => {
        setImageUrlStorage(null)
        setInputFileValue(null)
        setImageInput(null)
        setCompleteImgAvatar(null)
    }

// para listar todos los netters que ha publicado;
// traer la coleccion y filtrarla con el metodo where("userId", "==", user.uid) de firebase

    const handleClickModalProfile = () => {
        setModalProfile(!modalProfile)
        setNewName(user ? user.username : "")
        setEditName(false)
    }

    const Form = useRef()

    useEffect(() => {
        if(!inputFileValue){
            Form.current.reset()
        }
    }, [inputFileValue])


    return (
        <>
            <BackNav href="/" />
            <section>
                <div className="avatar-section">
                    {user && (
                        <>
                            <div className="avatar-container">
                                <div className="profile-photo_container">
                                    <NettImage src={completeImgAvatar ? completeImgAvatar : user.avatar} />
                                </div>
                                {/* <img className="avatar-img" src={completeImgAvatar ? completeImgAvatar : user.avatar} alt={newName ? newName :user.username} width={180} height={180}/> */}
                                <span  className="icon-camera_container" onClick={handleClickModalProfile} >
                                    <Camera width="2.2rem" height="2.2rem"/>
                                </span>
                            </div>
                            <div className="update-name_container">
                                <p className="userName">{newName ? newName : user.username}</p>
                                <span className="icon-pencil_container" onClick={handleClickEditName}>
                                    <Pencil width="1.3rem" height="1.3rem"/>
                                </span>
                                {editName && (
                                    <div className="update-name_input">
                                        <form onSubmit={handleSubmitUserName}>
                                            <input maxLength="15" value={newName} autoFocus onChange={handleChangeUserName} placeholder={user.username}></input>
                                            <div className="btn-container">
                                                <button type="submit">
                                                    <Check width="3.5rem" height="3.5rem"/>
                                                </button>
                                                <button type="text" onClick={handleClickEditName}>
                                                    <Close width="3.5rem" height="3.5rem"/>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}        
                            </div>
                        </>
                    )}
                </div>
                <div className="posts-section">
                    <div className="tab-container">
                        <p className={showFavs ? "tab-section" : "tab-section dark"} onClick={() => setShowFavs(false)}>Tus Netts</p>
                        <p className={showFavs ? "tab-section dark" : "tab-section"} onClick={() => setShowFavs(true)}>Favs</p>
                    </div>
                    {showFavs 
                        ?
                        <article className="user-timeline">
                            {favsUserTimeline.map( posts => {
                                return (
                                    <Devit key={posts.id} id={posts.originalNettId} userName={posts.userName} avatar={posts.avatar} content={posts.content}  createdAt={posts.createdAt} img={posts.img} uid={posts.nettUserId}/>
                                    // cambiar el userId que pasamos al parametro uid por el nettUserId
                                )
                            })}
                            {!favsUserTimeline.length && (
                                <div className="loader-user_container">
                                    <p>no tienes favs todavia</p>
                                </div>
                            )}
                        </article>
    
                        :
                        <article className="user-timeline">
                            {userTimeline.map( posts => {
                                return (
                                    <Devit key={posts.id} id={posts.id} userName={posts.userName} avatar={posts.avatar} content={posts.content}  createdAt={posts.createdAt} img={posts.img} uid={posts.userId}/>
                                )
                            })}
                            {!userTimeline.length && (
                                <div className="loader-user_container">
                                    <span>Crea tu primer post  
                                        <Link href="/compose/tweet">
                                            <a>
                                                <p>aqui</p>
                                            </a>
                                        </Link>
                                    </span>
                                </div>
                            )}
                        </article>
                    }
                    <ProfileModal modalClass={modalProfile ? 'modal modalOn' : 'modal'} onClick={handleClickModalProfile}>
                        <p className="message-avatar">Escoje una imagen como tu avatar</p>
                        <form ref={Form} onSubmit={handleSubmitInputFile}>
                            <div className="input-file_container">
                                <p className="input-message">seleccionar imagen</p>                 
                                <input className ="input-file" type="file" onChange={handleChangeInputFile} ></input> 
                            </div>
                            {inputFileValue && (
                                <div className="avatar-preview_container">
                                    <img className="img-preview" src={inputFileValue} />
                                    {imageInput && (
                                        <div className="upload-buttons_container">
                                            <Button type="submit">subir imagen</Button>
                                            <Button onClick={() => {
                                                setInputFileValue(null)
                                            }} invertColor={true}>
                                                cancel
                                            </Button>
                                            {/* <button type="reset">
                                                reset
                                            </button> */}
                                        </div>
                                    )}
                                </div>
                            )}
                            
                        </form>
                        {laodAvatar && (
                            <div className="avatar-loader_container">
                                <p className="loading-p">cargando imagen...</p>
                                <Loader/>
                            </div>
                        )}
                        {imageUrlStorage && (
                            <div className="avatar-loader_container">
                                <div className="image-container">
                                    <img className="image-uploaded" src={imageUrlStorage}></img>
                                </div>
                                <div className="upload-buttons_container">
                                    <Button onClick={handleClickUpdateImg}>Actualizar</Button>
                                    <Button invertColor={true} onClick={handleClickCancel}>Cancel</Button>
                                </div>
                            </div>
                        )}
                    </ProfileModal>
                </div>
            </section>

            <style jsx>{`
                section {
                    height: 100%;
                    width: 100%;
                    position: relative;
                    overflow: clip;
                    display: grid;
                    grid-template: 35% 65% / 100%;
                    grid-template-areas: "avatar"
                                         "posts";
                }

                .avatar-section {
                    grid-area: avatar;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .profile-photo_container{
                    width: 150px;
                    height: 150Px;
                    border-radius: 50%;
                    overflow: clip;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                }
                .posts-section {
                    grid-area: posts;
                    /* border: 1px solid blue; */
                    position: relative;
                    padding-bottom: 2rem;
                    width: 100%;
                }
                .tab-container {
                    width: 100%;
                    height: fit-content;
                    border-bottom: 1.5px solid black;
                    display: flex;
                    padding-left: 0.5rem;
                }
                .tab-section {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.6rem;
                    margin: 0 1rem;
                    border-top: 1.5px solid black;
                    border-left: 1.5px solid black;
                    border-right: 1.5px solid black; 
                    border-radius: 8px 8px 0 0;
                    width: fit-content;
                    padding: 0 5px;
                    font-weight: 500;
                    background: #d1cfcf;
                    transition: 200ms;
                    opacity: .9;
                }
                .dark {
                    background: white;
                    color: black;
                    transform: scale(1.25);
                    opacity: 1;
                }

                .avatar-container {
                    position: relative;
                    width: fit-content;
                    /* border: 1px solid red; */
                    margin: 1rem auto 0 auto;
                }

                .avatar-img{
                    border-radius: 50%;
                    object-fit: cover;
                    border: 1px solid grey;
                    width: 150px;
                    height: 150px;
                }

                .icon-camera_container{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: white;
                    border-radius: 50%;
                    width: 45px;
                    height: 45px;
                    border: 1px solid grey;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: 350ms;
                }
                .icon-pencil_container{
                    background: white;
                    border-radius: 50%;
                    padding: 5px;
                    border: 1px solid grey;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: 350ms;
                }
                .icon-camera_container:active , .icon-pencil_container:active {
                    transform: scale(0.8);
                    filter: invert(1);
                }

                .update-name_container {
                    width: 100%;
                    height: 50px;
                    /* border: 1px solid red; */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                }

                .userName{
                    width: fit-content;
                    margin: 0 1rem 0 3rem;
                    font-family: 'Poppins', sans-serif;
                    font-size: 2rem;
                    font-weight: 600;
                }

                .update-name_input {
                    padding: 5px;
                    /* border: 1px solid red; */
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: white;
                }
                .update-name_input form input {
                    font-family: 'Poppins', sans-serif;
                    outline: none;
                    border: none;
                    font-size: 2rem;
                    text-align: center;
                    width: 200px;
                    border-bottom: 1px black solid;
                }
                .update-name_input form .btn-container{         
                    border: none;
                    background: none;
                    position: absolute;
                    top: 0.05rem;
                    bottom: 0;
                    right: 0;
                    width: fit-content;
                    height: fit-content;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                } 
                
                .update-name_input form button {
                    border: none;
                    background: none;
                    cursor: pointer;
                }
                .update-name_input form button:nth-child(2) {
                    border: none;
                    background: none;
                    margin: 0 1rem;
                }

                .message-avatar {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.7rem;
                    margin-bottom: 4rem;
                }

                .loader-user_container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.7rem;
                }

                .loader-user_container span {
                    width: fit-content;
                    margin: 0 auto;
                    text-align: center;
                }

                .user-timeline {
                    width: 100%;
                    overflow: auto;
                    height: 100%;
                    width: 100%;
                    padding: 2rem 0;

                }
                .user-timeline::-webkit-scrollbar{
                    width: 5px;
                    background-color: #ffffff;
                }
                .user-timeline::-webkit-scrollbar-thumb{
                    background: rgb(0 0 0 / 30%);
                    border-radius: 20%;
                }

                .input-file_container {
                    width: 200px;
                    height: 60px;
                    background: white;
                    border: 2px solid black;
                    border-radius: 8px;
                    font-family: 'Poppins', sans-serif;
                    font-size: 16px;
                    /* padding: 1rem; */
                    position: relative;
                    cursor: pointer;
                }
                .input-file_container:active{
                    filter: invert(1);
                }
                .input-message {
                    position: absolute;
                    left: 16px;
                    top: 16px;
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

                .avatar-preview_container {
                    background: white;
                    position: absolute;
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

                .loading-p {
                    font-size: 18px;
                    font-family: 'Poppins', sans-serif;
                }

                .avatar-loader_container {
                    background: white;
                    width: 100%;
                    height: 90%;
                    padding: 1rem;
                    overflow: clip;
                    margin: 0 auto;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .image-container {
                    width: 90%;
                    height: 80%;
                    object-fit: cover;
                    border-radius: 8px;
                    overflow: clip;
                }

                .image-uploaded {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .upload-buttons_container {
                    display: flex;
                    align-items: space-evenly;
                    width: 100%;
                }

                @media (min-height: 800px){
                    section {
                    height: 100%;
                    position: relative;
                    overflow: clip;
                    display: grid;
                    grid-template: 30% 70% / 100%;
                    grid-template-areas: "avatar"
                                         "posts";
                }
                }
                @media (min-width: 500px){
                    section {
                    height: 100%;
                    position: relative;
                    overflow: clip;
                    display: grid;
                    grid-template: 34% 66% / 100%;
                    grid-template-areas: "avatar"
                                         "posts";
                }
                }

            `}</style>
        </>
    )
}

export default Profile