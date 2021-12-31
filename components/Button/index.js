import { useState } from "react";

const Button = ({children, onClick, disabled, invertColor}) => {

    const [invert, setInvert] = useState(invertColor)

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
                    border:  ${invert ? "2px solid grey" : "2px solid black"};
                    display: flex;
                    align-items: center;
                    margin: 1rem auto;
                    justify-content: space-between;
                    gap: 1.5rem;
                    cursor: pointer;
                    filter: ${invert ? "invert(1)" : "invert(0)"}
                }
                button[disabled]{
                    pointer-events: none;
                    opacity: .2;
                }
                button:hover {
                    opacity: .7;
                }

                button + button{
                    margin: 1rem auto 0 auto;
                }
                

            `}</style>
        </>
    )
    
}

export default Button;