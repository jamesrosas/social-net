import BackNav from "components/BackNav"
import { updateUserProfile, uploadImage } from "firebase/client"
import useUser from "hooks/useUser"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import Devit from "components/Devit"
import Loader from "components/Loader"
import { getAllUserPosts, listenLatestDevits } from "firebase/client"

const Profile = () => {

    const user = useUser()

    const [userTimeline , setUserTimeline] = useState([])
    const [newName, setNewName] = useState("")
    const [imageInput, setImageInput] = useState("")
    const [imageUrlStorage, setImageUrlStorage] = useState("")
    const [task, setTask] = useState(null)

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
          }
          const onError = () => {}
          const onComplete = () => {
            console.log('onComplete')
            task.snapshot.ref.getDownloadURL()
                .then((url) => {
                    setImageUrlStorage(url)
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


    const handleChangeUserName = (e) => {
        setNewName(e.target.value)
    }

    const handleSubmitUserName = (e) => {
        e.preventDefault()
        updateUserProfile({name: newName}, () => Swal.fire("actualización completada") )
        console.log("nombre actualizado")
    }

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

    // esta es la funcion que debe contener el boton ok de sweetalert cuando se muestre la imagen a subir;
    const handleSubmitInputFile = (e) => {
        e.preventDefault()
        const task = uploadImage(imageInput)
        console.log("subido?")
        setTask(task)
        // junto con el handleChangeInputFile y este handleSubmitInputFile ya pudimos subir una imagen al storage, haciendo uso del metodo uploadImage(), entonces de esta manera ya con esta imagen en el storage firestore le asigna un url, la cual tenemos que traer para colocar como url de imagen en el updateProfile() de firebase. Puedo usar el mismo metodo que se usa en el dragAndDrop de publicar nett para mostrar la imagen.
    }



    // APARENTEMENTE YA ESTA FUNCIONANDO LA ACTUALIZACION DEL AVATAR, LA VECEZ QUE NO SE ACTULIZABA LA IMAGEN SE PUEDE DEBER A QUE FIREBASE SE ESTA DEMORANDO EN EJECUTAR DICHO PROCESO;
    const actualizarImg = () => {
        updateUserProfile({avatarUrl: imageUrlStorage}, () => Swal.fire("actualización completada") )
        console.log("ejecutando actualizacion de avatar")
        console.log(user)
    }

// para listar todos los netters que ha publicado;
// traer la coleccion y filtrarla con el metodo where("userId", "==", user.uid) de firebase

    return (
        <>
            <BackNav href="/" />
            <section>
                {user && (
                    <>
                        <div className="avatar-container">
                            <img className="avatar-img" src={imageUrlStorage ? imageUrlStorage : user.avatar} alt={newName ? newName :user.username} width={180} height={180}/>
                            <span  className="icon-container">
                                <FontAwesomeIcon icon={faCamera} size="xs" />
                            </span>
                        </div>
                        <p className="userName">{newName ? newName :user.username}</p>         
                    </>
                )}
                <form onSubmit={handleSubmitUserName}>
                    <p>update username</p>
                    <input value={newName} onChange={handleChangeUserName}></input>
                    <button>update</button>
                </form>
                <form onSubmit={handleSubmitInputFile}>
                    <input type="file" onChange={handleChangeInputFile}></input>
                    {imageUrlStorage && (
                        <img src={imageUrlStorage} width={50} height={50}></img>
                    )}
                    <button>subir imgInput</button>
                </form>
                {imageUrlStorage && (    
                        <button onClick={actualizarImg}>update img</button>
                )}
                {inputFileValue && (
                    <img className="img-preview" src={inputFileValue} width={200} height={200} />
                )}
                <h3>Tus Netts</h3>
                <article>
                    {userTimeline.map( posts => {
                        return (
                            <Devit key={posts.id} id={posts.id} userName={posts.userName} avatar={posts.avatar} content={posts.content}  createdAt={posts.createdAt} img={posts.img}/>
                        )
                    })}
                    {userTimeline.lenght === 0 && (
                        <Loader/>
                    )} 
                </article>
            </section>

            <style jsx>{`
                section {
                    height: 100%;
                    overflow: clip;
                }

                .avatar-container {
                    position: relative;
                    width: fit-content;
                    border: 1px solid red;
                    margin: 2rem auto;
                }

                .avatar-img{
                    border-radius: 50%;
                    object-fit: cover;
                    border: 1px solid grey;
                }

                .icon-container{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: grey;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    border: 1px solid red;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }

                .userName{
                    width: fit-content;
                    margin: 0 auto;
                    font-family: 'Poppins', sans-serif;
                    font-size: 2rem;
                }

                form {
                    padding: 5px;
                    border: 1px solid red;
                }

                .img-preview {
                    object-fit: cover;
                    margin: 0 auto;
                }

                article {
                    width: 100%;
                    overflow: auto;
                    height: 45%;
                }

            `}</style>
        </>
    )
}

export default Profile