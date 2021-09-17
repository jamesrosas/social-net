
const Button = ({children, background}) => {
    return (
        <>
            <button>
                {children}
            </button>
            <style jsx>{`
                button {
                    width: fit-content;
                    border-radius: 10px;
                    background-color: ${background};
                    padding: 1rem 2rem;
                    color: white;
                    font-family: 'Poppins', sans-serif;
                    font-size: 18px;
                    font-weight: 500;
                    border: none;
                    display: flex;
                    align-items: center;
                }
                button:hover {
                    opacity: .5;
                }

            `}</style>
        </>
    )
    
}

export default Button;