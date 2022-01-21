import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import { useRouter } from "next/router"
import Link from "next/link"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import { useState, useEffect } from "react"
import useUser from "hooks/useUser"
import { addFavs, addStateFavIcon, deleteFavIcon, deleteFavs, getNettComments, getStateFavIcon, getUserFavsDocId } from "firebase/client"
import Comments from "components/Icons/Comments"
import useCurrentUser from "hooks/useCurrentUser"

const Devit = ({ userName, avatar, content, createdAt, img, id, uid}) => {

    const timeAgo = useTimeAgo(createdAt)
    const createdAtFormated = useDateTimeFormat(createdAt)

    const [lenghtComments , setLenghtComments] = useState([])
    const [fav, setFav] = useState(false)
    const [nettFavId, setNettFavId] = useState([])

    console.log("este es el nett favId")
    console.log(nettFavId)

    const user = useUser()
    const currentUser = useCurrentUser()
    console.log("este es el current user")
    console.log(currentUser)

    // sacar el uid para pasarselo como parametro al link

    // *** aqui mandamos a llamar la subcoleccion "comments" para mostrar su .lenght en un icono de comentarios
    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getNettComments( id,  newComments => {
                setLenghtComments(newComments)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

// ************************************ prueba icon Fav state +++++++++++++++++++

    useEffect(() => {
        if (fav) {
            // SI LOGRO COLOCAR AL NETT EN SU SUBCOLECCION FAVORITES UN BOLEANO PUEDO FILTRAR EN LA LISTA DE FAVORITOS POR ESTE VALOR BOOLEANO
            addFavs({
                avatar,
                content,
                img,
                currentUserId: currentUser.userId , 
                nettUserId: uid,
                userName,
                createdAt,
                originalNettId: id
            })
            // .then((doc) => setNettFavId(doc.id) )
            console.log("agregando fav")
        } else {
            if(nettFavId.length){
                deleteFavs(nettFavId[0].id)
                //en nettFavId podria almacenar el id traido de firebase para asi eliminarlo
            // este nettFavId es el que puedo utilizar para colocar el estado true del corazon y que permanezca asi para el current User que le dio me gusta
                console.log("favNett eliminado")
            }

        }
        // ya tengo el id de docuemnto en fav, ahora puedo usar este id (nettFavId) para eliminar dicho documento de la coleccion favorites

    }, [fav])


    // hacer de esta logica un componente que reciba como parametro el id del Nett en cuestion para que funcione ya que es necesario para los useEffect, ademas lo bueno de que sea un componente es que tambien puede recibir un onClick que cambie su Icono, por tanto entonces este componente recibira 2 parametros, el id del Nett en cuestion y el onClick para cambiar el icono;
    // const estrellaState = estrellaIcon[0].fav ? true : false
    const [favIcon, setFavIcon] = useState(false)
    // DE alguna manera podria hacer que , si ya tengo un doc Fav , hacer uso de su booleano true para establecer como state del icono algo talvez como lo siguiente;
    //   const [favIcon, setFavIcon] = useState(estrellaIcon.lenght ? estrellaIcon.[0].fav : false)

    
    const [estrellaIcon, setEstrellaIcon] = useState([])

    console.log("este es el contenido GET de estrella")
    console.log(estrellaIcon)
    
    if(estrellaIcon.length) {

        console.log(estrellaIcon[0].id)
        const mapingEstrella = estrellaIcon.map( doc => doc.id)
        console.log("con maping")
        console.log(mapingEstrella)
        const filterEstrella = estrellaIcon.filter( doc => doc.id)
        console.log(filterEstrella)
    }

    const handleClickIconStatus = () => {
        setFavIcon(!favIcon)
        setFav(!fav) 
        //--> si agrego tambien este cambio de estado al hacer click cada operacion seguira teniendo su estado pero se activaran al tiempo, cada uno con su useEffect por su parte , uno para agregar la info y otro para persistir el icono
    }

    useEffect(() => {
        if(favIcon){
            addStateFavIcon({
                fav: true
            }, id, `${id}${currentUser.userId}` )
        } else {
            if(estrellaIcon.length){
                // deleteFavIcon(id, "favId")
                deleteFavIcon(id, `${id}${currentUser.userId}`)
//************// URGENTE: Aqui tendria que cambiar este ID del favIcon, ya que es generico, y cunado otro usuario le de fav al mismo Nett este se sobreescribira borrando la info del otro usuario que le dio fav al nett
            }
            null
        }
        
    }, [favIcon])

    useEffect(() => {
        if (estrellaIcon.length){
            setFavIcon(true)
            setFav(true)
        }
    }, [estrellaIcon])

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getStateFavIcon(id, stateIcon => {
                setEstrellaIcon(stateIcon)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getUserFavsDocId( id ,favsNetts => {
                setNettFavId(favsNetts)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    // talves deberia tambien traer los favs nets aqui por su id especifico para despues borrarlo

    const showEstrellaIcon = estrellaIcon.length ? "🔥" : "🌚"



// +++++++++++++++++++++++++++++++++++++++++ fin prueba fav State ++++++++++++++++++++++++

    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(`/status/${id}`)
    }

    const handleClickProfile = (e) => {
        e.preventDefault()
        router.push(`/userprofile/${uid}`) //este uid que pasamos como parametro es el sacaremos de la data de cada docuemneto
        
    }

    const commentsNumber = lenghtComments.length > 0 ? lenghtComments.length : null
    
    
    return (
        <>
        <article>
            <Avatar onClick={handleClickProfile} src={avatar} alt={userName} />
            <div>
                <header>
                    <Link href={`/userprofile/${uid}`}>
                        <a>
                            <h5>{userName}</h5>
                        </a>
                    </Link>
                    <span></span>
                    <Link href={`/status/${id}`}>
                        <a>
                            <time title={createdAtFormated}>{timeAgo}</time>
                        </a>
                    </Link>
                </header>
                <p onClick={handleClick}>{content}</p>
                {img && <img src={img}/>}
                <div className="comment-fav_container">
                    <span onClick={handleClick} className="comments-icon">
                        <Comments  width="2.5rem" height="2.5rem" />
                        {commentsNumber}  
                    </span>
                    <i onClick={handleClickIconStatus}>
                        {favIcon ? showEstrellaIcon : showEstrellaIcon}
                    </i>  
                </div>
            </div>
        </article>

        <style jsx>{`
            article {
                display: flex;
                align-items: flex-start;
                padding: 1rem 1.5rem;
                width: 100%;
                height: fit-content;
                font-size: 1.8rem;
                border-bottom: 1px solid #80808057;
            }

            .avatar-image {
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
            }
            header {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                column-gap: 1rem;
                margin-bottom: 1.5rem;
            }
            h5 {
                font-weight: 600;
                font-size: 1.9rem;
                cursor: pointer;
                font-family: 'Poppins', sans-serif;
            }

            p {
                font-family: 'Poppins', sans-serif;
                font-size: 1.7rem;
                margin-bottom: 1rem;
            }
            
            small {
                color: grey;
                font-size: 1.6rem;
            }
            img {
                width: 100%;
                height: auto;
                border-radius: 10px;
                margin-top: 1rem;
            }
            a {
                text-decoration: none;
                color: grey;
                font-size: 1.4rem;
                font-family: 'Poppins', sans-serif;

            }
            span {
                width: 3px;
                height: 3px;
                background: grey;
                border-radius: 50%;
                border: none;
            }

            .comments-icon {
                background: #80808045;
                padding: 5px;
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
                font-size: 1.6rem;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                width: fit-content;
                height: fit-content;
                gap: 1rem;
                cursor: pointer;
            }

            i {
                cursor: pointer;
            }

            .comment-fav_container {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }

        `}</style>
        </>
    )
}

export default Devit