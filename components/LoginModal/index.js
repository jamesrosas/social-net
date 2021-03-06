import Close from "components/Icons/Close"

const LoginModal = ({children, onClick, modalClass}) => {
    return (
        <>
            <div className={modalClass}>
                <span onClick={onClick}>
                    <Close width="3.5rem" height="3.5rem"/>
                </span>
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
                    border-radius: 25px 25px 0 0;
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
                    position: absolute;
                    right: 6px;
                    top: 6px;
                    cursor: pointer;
                    width: fit-content;
                    height: fit-content;
                }
            `}</style>
        </>
    )
}

export default LoginModal