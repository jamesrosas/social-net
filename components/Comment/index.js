import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import { useRouter } from "next/router"
import Link from "next/link"
import useDateTimeFormat from "hooks/useDateTimeFormat"

const Comment = ({ userName, avatar, content, createdAt, img, uid}) => {

    const timeAgo = useTimeAgo(createdAt)
    const createdAtFormated = useDateTimeFormat(createdAt)

    // sacar el uid para pasarselo como parametro al link

    const router = useRouter()


    const handleClickProfile = (e) => {
        e.preventDefault()
        router.push(`/userprofile/${uid}`) //este uid que pasamos como parametro es el sacaremos de la data de cada docuemneto
        
    }
    
    return (
        <>
        <article>
            <div className="comment-container">               
                <Avatar onClick={handleClickProfile} src={avatar} alt={userName} width="35px" height="35px"/>
                <div>
                    <header>
                        <Link href={`/userprofile/${uid}`}>
                            <a>
                                <h5>{userName}</h5>
                            </a>
                        </Link>
                        <span></span>
                        <time title={createdAtFormated}>{timeAgo}</time>
                    </header>
                    <p>{content}</p>
                    {img && <img src={img}/>}
                </div>
            </div>
        </article>

        <style jsx>{`
            article {
                display: flex;
                align-items: flex-end;
                padding: 1rem 1rem 1rem 3rem;
                width: 100%;
                height: fit-content;
                font-size: 1.8rem;
            }
            .comment-container {
                border: 1px solid #80808073;
                border-radius: 8px;
                width: 100%;
                padding: 1rem;
                display: flex;
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
                margin-bottom: .7rem;
            }
            h5 {
                font-weight: 600;
                font-size: 1.7rem;
                cursor: pointer;
                font-family: 'Poppins', sans-serif;
            }

            time {
                font-size: 1.4rem;
                color: grey;
            }

            p {
                font-family: 'Poppins',sans-serif;
                font-size: 1.6rem;
                padding: 0.2rem 0.7rem;
                background: #80808045;
                border-radius: 8px;
                width: 100%;
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

        `}</style>
        </>
    )
}

export default Comment