
const Avatar = ({ src, alt, email }) => {

    return (
        <div>
            <img src={src} alt={alt} />
            <p>{email}</p>
            <style jsx>{`
                div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }    
                img + p {
                    margin-left: 2rem;
                }
                p {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.8rem;
                }
            `}</style>
        </div>
    )
}

export default Avatar