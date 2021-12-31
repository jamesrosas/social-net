
const LoginModal = ({children, onClick, modalClass}) => {
    return (
        <>
            <div className={modalClass}>
                <span onClick={onClick}>x</span>
                {children}
            </div>

            <style jsx>{`
                .modal {
                    width: 100%;
                    height: 80%;
                    position: absolute;
                    background: linear-gradient(45deg, #00ffff00, #00ffffcc, #fa1ade94);
                    backdrop-filter: blur(8px);
                    bottom: -100%;
                    left: 0;
                    border: white 1px solid;
                    border-radius: 5px;
                    transition: 350ms;
                    padding: 15px;
                    padding-top: 50px;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    display: flex;
                }

                .modalOn {
                    bottom: 0;
                }

                span {
                    font-size: 20px;
                    color: white;
                    align-sefl: center;
                    font-family:'Poppins', sans-serif;
                    position: absolute;
                    right: 6px;
                    top: 6px;
                    cursor: pointer;
                    padding: 0px 10px;
                    background: black;
                    border-radius: 50%;
                }
            `}</style>
        </>
    )
}

export default LoginModal