
const Button = ({children, onClick, disabled}) => {
    return (
        <>
            <button disabled={disabled} onClick={onClick}>
                {children}
            </button>
            <style jsx>{`
                button {
                    width: fit-content;
                    border-radius: 10px;
                    background-color: white;
                    padding: 1rem 2rem;
                    color: black;
                    font-family: 'Poppins', sans-serif;
                    font-size: 18px;
                    font-weight: 500;
                    border: 2px solid black;
                    display: flex;
                    align-items: center;
                    margin: 0 auto;
                    justify-content: space-between;
                    gap: 1.5rem;
                    cursor: pointer;
                }
                button[disabled]{
                    pointer-events: none;
                    opacity: .2;
                }
                button:hover {
                    opacity: .7;
                }

                button + button{
                    margin: 2rem auto 0 auto;
                }
                

            `}</style>
        </>
    )
    
}

export default Button;