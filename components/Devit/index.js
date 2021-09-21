import Avatar from "components/Avatar"

const Devit = ({ userName, image, description}) => {
    return (
        <>
        <article>
            <Avatar src={image} alt={userName}/>
            <div>
                <h5>{userName}</h5>
                <p>{description}</p>
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

        `}</style>
        </>
    )
}

export default Devit