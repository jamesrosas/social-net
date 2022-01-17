
const Avatar = ({ src, alt, onClick, width, height}) => {

    return (
        <>  
            <picture onClick={onClick}>
                <img src={src} alt={alt} />
            </picture>
            <style jsx>{`
                picture{
                    width: fit-content;
                    height: fit-content;
                    cursor: pointer;
                    margin-right: 1rem;
                }

                img {
                    width: 50px;
                    height: 50px;
                    width: ${width};
                    height: ${height};
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