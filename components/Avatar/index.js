
const Avatar = ({ src, alt, email }) => {

    return (
        <>
            <img src={src} alt={alt} width={50} height={50}/>
            <p>{email}</p>
            <style jsx>{`
                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                }    
                img + p {
                    margin-left: 2rem;
                }
                p {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.8rem;
                }
            `}</style>
        </>
    )
}

export default Avatar