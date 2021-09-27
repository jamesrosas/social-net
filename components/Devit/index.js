import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import { useRouter } from "next/router"
import Link from "next/link"

const Devit = ({ userName, avatar, content, createdAt, img, id}) => {

    const timeAgo = useTimeAgo(createdAt)

    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(`/status/${id}`)
    }
    
    return (
        <>
        <article onClick={handleClick}>
            <Avatar src={avatar} alt={userName}/>
            <div>
                <header>
                    <h5>{userName}</h5>
                    <Link href={`/status/${id}`}>
                        <a>
                            <small>{timeAgo}</small>
                        </a>
                    </Link>
                </header>
                <p>{content}</p>
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
            h5 {
                margin-bottom: 1rem;
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
            }

        `}</style>
        </>
    )
}

export default Devit