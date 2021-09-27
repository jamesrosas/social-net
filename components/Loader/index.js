
const Loader = () => {
    return (
        <>
        <div>
            <span></span>
        </div>
        <style jsx>{`
            div {
                width: 100%;
                display: flex;
                justify-content: center;
                margin: 3rem 0;
            } 
            span {
                width: 50px;
                height: 50px;
                border: 3px solid grey;
                border-left-color: black;
                border-radius: 50%;
                animation: loader 600ms infinite ease-in-out;
            }
            @keyframes loader {
                from {
                    transform: rotate(0)
                }
                to {
                    transform: rotate(360deg)
                }
            }

        `}</style>
        </>
    )
}

export default Loader
