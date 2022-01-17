import Close from "components/Icons/Close"

const ProfileModal = ({children, onClick, modalClass}) => {
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
                    height: 100%;
                    position: absolute;
                    background: white;
                    backdrop-filter: blur(8px);
                    bottom: -100%;
                    left: 0;
                    border: black 2px solid;
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
                    z-index: 10;
                    width: fit-content;
                    height: fit-content;
                }
            `}</style>
        </>
    )
}

export default ProfileModal