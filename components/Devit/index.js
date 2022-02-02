import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import { useRouter } from "next/router"
import Link from "next/link"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import { useState, useEffect } from "react"
import useUser from "hooks/useUser"
import { deleteFavs, deleteNett, getNettComments } from "firebase/client"
import Comments from "components/Icons/Comments"
import FavStar from "components/FavStar"
import useCurrentUser from "hooks/useCurrentUser"
import Delete from "components/Icons/Delete"
import NettImage from "components/NettImage"
import useFavsNetts from "hooks/useFavsNetts"
import useCustomAlerts from "hooks/useCustomAlerts"

const Devit = ({ userName, avatar, content, createdAt, img, id, uid}) => {

    const timeAgo = useTimeAgo(createdAt)
    const createdAtFormated = useDateTimeFormat(createdAt)
    const user = useUser()
    const currentUser = useCurrentUser()
    const { allfavNetts } = useFavsNetts()
    const { optionsAlertMessage, toast } = useCustomAlerts()
    const router = useRouter()

    const [lenghtComments , setLenghtComments] = useState([])

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


    const handleClick = (e) => {
        e.preventDefault()
        router.push(`/status/${id}`)
    }

    const handleClickProfile = (e) => {
        e.preventDefault()
        if(uid === currentUser.userId){
            router.push('/profile')
        } else {
            router.push(`/userprofile/${uid}`)
        }
        
        //este uid que pasamos como parametro es el sacaremos de la data de cada docuemneto
        
    }

    // prueba de eliminacion conjunta del nettOriginal y su favNett correspondiente*******

    // console.log("este es el contenido de allFavNetts: ", allfavNetts)

    const handleClickDeleteNett = () => {
        optionsAlertMessage.fire({
            text: 'Segur@ que quieres eliminar este Nett?',
            color: 'black'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteNett(id).then(() => {
                    toast.fire({
                        text: 'Nett eliminado',
                        color: 'black',
                        icon: 'success'
                      })
                    })
                allfavNetts.forEach( doc => {
                    if(doc.id.includes(id)){
                        deleteFavs(doc.id)
                    }
                })
                
            } 
          })
    }

    const commentsNumber = lenghtComments.length > 0 ? lenghtComments.length : null
     
    return (
        <>
        <article>
            <Avatar onClick={handleClickProfile} src={avatar} alt={userName} />
            <div>
                <header>
                    <h5 onClick={handleClickProfile}>{userName}</h5>
                    <span></span>
                    <Link href={`/status/${id}`}>
                        <a>
                            <time title={createdAtFormated}>{timeAgo}</time>
                        </a>
                    </Link>
                </header>
                <p onClick={handleClick}>{content}</p>
                {img && <NettImage src={img} />}
                <div className="comment-fav_container">
                    <span onClick={handleClick} className="comments-icon">
                        <Comments  width="2.5rem" height="2.5rem" />
                        {commentsNumber}  
                    </span>
                    <FavStar nettId={id} avatar={avatar} content={content} img={img} createdAt={createdAt} userName={userName} nettUserId={uid}/>
                </div>
            </div>
            { uid === currentUser.userId && (
                <span className="delete-icon" onClick={handleClickDeleteNett}>
                    <Delete width="2rem" height="2rem"/>
                </span>
            )}
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
                position: relative;
            }

            div {
                width: 100%;
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
                min-width: 100%;
                height: auto;
                min-height: 200px;
                border-radius: 10px;
                margin-top: 1rem;
                background: #80808073;
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

            .delete-icon {
                position: absolute;
                top: 1rem;
                right: 0.5rem;
                width: fit-content;
                height: fit-content;
                background: none;
                cursor: pointer;
            }

        `}</style>
        </>
    )
}

export default Devit