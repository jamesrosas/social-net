import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import { useRouter } from "next/router"
import Link from "next/link"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import { useState, useEffect } from "react"
import useUser from "hooks/useUser"
import { getNettComments } from "firebase/client"
import Comments from "components/Icons/Comments"

const Devit = ({ userName, avatar, content, createdAt, img, id, uid}) => {

    const timeAgo = useTimeAgo(createdAt)
    const createdAtFormated = useDateTimeFormat(createdAt)

    const [lenghtComments , setLenghtComments] = useState([])

    const user = useUser()

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
                <span onClick={handleClick} className="comments-icon">
                    <Comments  width="2.5rem" height="2.5rem" />
                    {commentsNumber}
                </span>
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

        `}</style>
        </>
    )
}

export default Devit