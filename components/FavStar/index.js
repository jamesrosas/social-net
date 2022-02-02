import useCurrentUser from "hooks/useCurrentUser"
import useUser from "hooks/useUser"
import { useState, useEffect } from "react"
import { addFavs, addStateFavIcon, deleteFavIcon, deleteFavs, getStateFavIcon, getUserFavIconId } from "firebase/client"
import FavoriteOn from "components/Icons/FavoriteOn"
import Favorite from "components/Icons/Favorite"


const FavStar = ({nettId, avatar, content, img, nettUserId, userName, createdAt}) => {

    const [fav, setFav] = useState(false)
    const [nettFavId, setNettFavId] = useState([])
    const [favIcon, setFavIcon] = useState(false)
    const [estrellaIcon, setEstrellaIcon] = useState([])

    // console.log("este es el nett favId", nettFavId)

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
            // console.log("agregando fav")
        } else {
            if(nettFavId.length){
                deleteFavs(nettFavId[0].id)
                //en nettFavId podria almacenar el id traido de firebase para asi eliminarlo
                // console.log("favNett eliminado")
            }

        }
        // ya tengo el id de docuemnto en fav, ahora puedo usar este id (nettFavId) para eliminar dicho documento de la coleccion favorites

    }, [fav])


    // console.log("este es el contenido GET de estrella", estrellaIcon)

    const handleClickIconStatus = () => {
        setFavIcon(!favIcon)
        setFav(!fav) 
        //--> si agrego tambien este cambio de estado al hacer click cada operacion seguira teniendo su estado pero se activaran al tiempo, cada uno con un useEffect por su parte , uno para agregar la info y otro para persistir el icono
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
            unsubscribe = getUserFavIconId( nettId ,favsNetts => {
                setNettFavId(favsNetts)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    const showEstrellaIcon = estrellaIcon.length ? <FavoriteOn width="3rem" height="3rem"/> : <Favorite width="3rem" height="3rem"/>

    return (
        <>
            <span onClick={handleClickIconStatus}>
                {favIcon ? showEstrellaIcon : showEstrellaIcon}
            </span> 

            <style jsx>{`
                span {
                    cursor: pointer;
                }    
            `}</style>
        </>
    )
}

export default FavStar