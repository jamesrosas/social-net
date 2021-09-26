
const Button = ({children, background, onClick, disabled}) => {
    return (
        <>
            <button disabled={disabled} onClick={onClick}>
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
                    margin: 0 auto;
                }
                button[disabled]{
                    pointer-events: none;
                    opacity: .2;
                }
                button:hover {
                    opacity: .5;
                }
                

            `}</style>
        </>
    )
    
}

export default Button;