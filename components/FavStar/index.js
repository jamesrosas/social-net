import useCurrentUser from "hooks/useCurrentUser"
import useUser from "hooks/useUser"
import { useState, useEffect } from "react"
import { addFavs, addStateFavIcon, deleteFavIcon, deleteFavs, getStateFavIcon, getUserFavsDocId } from "firebase/client"


const FavStar = ({nettId, avatar, content, img, nettUserId, userName, createdAt}) => {

    const [fav, setFav] = useState(false)
    const [nettFavId, setNettFavId] = useState([])
    const [favIcon, setFavIcon] = useState(false)
    // DE alguna manera podria hacer que , si ya tengo un doc Fav , hacer uso de su booleano true para establecer como state del icono algo talvez como lo siguiente;
    //   const [favIcon, setFavIcon] = useState(estrellaIcon.lenght ? estrellaIcon.[0].fav : false)
    const [estrellaIcon, setEstrellaIcon] = useState([])


    console.log("este es el nett favId")
    console.log(nettFavId)

    const user = useUser()
    const currentUser = useCurrentUser()

    useEffect(() => {
        if (fav) {
            addFavs({
                avatar,
                content,
                img,
                currentUserId: currentUser.userId , 
                nettUserId,
                userName,
                createdAt,
                originalNettId: nettId
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


    console.log("este es el contenido GET de estrella")
    console.log(estrellaIcon)

    const handleClickIconStatus = () => {
        setFavIcon(!favIcon)
        setFav(!fav) 
        //--> si agrego tambien este cambio de estado al hacer click cada operacion seguira teniendo su estado pero se activaran al tiempo, cada uno con su useEffect por su parte , uno para agregar la info y otro para persistir el icono
    }

    useEffect(() => {
        if(favIcon){
            addStateFavIcon({
                fav: true
            }, nettId, `${nettId}${currentUser.userId}` )
        } else {
            if(estrellaIcon.length){
                deleteFavIcon(nettId, `${nettId}${currentUser.userId}`)
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
            unsubscribe = getStateFavIcon(nettId, stateIcon => {
                setEstrellaIcon(stateIcon)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getUserFavsDocId( nettId ,favsNetts => {
                setNettFavId(favsNetts)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    const showEstrellaIcon = estrellaIcon.length ? "🔥" : "🌚"

    return (
        <>
            <i onClick={handleClickIconStatus}>
                {favIcon ? showEstrellaIcon : showEstrellaIcon}
            </i> 
        </>
    )
}

export default FavStar