import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import { useRouter } from "next/router"
import Link from "next/link"
import useDateTimeFormat from "hooks/useDateTimeFormat"

const Devit = ({ userName, avatar, content, createdAt, img, id, uid}) => {

    const timeAgo = useTimeAgo(createdAt)
    const createdAtFormated = useDateTimeFormat(createdAt)

    // sacar el uid para pasarselo como parametro al link

    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(`/status/${id}`)
    }

    const handleClickProfile = (e) => {
        e.preventDefault()
        router.push(`/userprofile/${uid}`) //este uid que pasamos como parametro es el sacaremos de la data de cada docuemneto
        
    }
    
    return (
        <>
        <article>
            <Avatar src={avatar} alt={userName} />
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
                {img && <img src={img}/>}
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

export default Devit