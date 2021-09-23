import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

const Devit = ({ userName, avatar, content, createdAt}) => {

    const timeAgo = useTimeAgo(createdAt)
    
    return (
        <>
        <article>
            <Avatar src={avatar} alt={userName}/>
            <div>
                <header>
                    <h5>{userName}</h5>
                    <small>{timeAgo}</small>
                </header>
                <p>{content}</p>
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

        `}</style>
        </>
    )
}

export default Devit