const AnimateLogo = () => {
    return (
        <>  
            <div>
                <span className="violet"></span>
                <span className="cyan"></span>
                <span>
                    <p>Social</p>
                    <p>Net</p>
                </span>
            </div>

            <style jsx>{`

                div {
                    position: relative;
                    width: 20rem;
                    height: 20rem;
                    margin: 2rem auto;
                    transform: rotate(40deg);
                }
                span {
                    width: 10rem;
                    height: 15rem;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-family: monospace;
                    font-size: 25px;
                    margin: 2rem auto;
                    background: black;
                    position: absolute;
                    left: 5rem;
                    z-index: 20;
                }

                p {
                    transform: rotate(-39deg);
                    z-index: 10;
                }
                p:nth-child(2){
                    margin-left: 2rem;
                }

                .violet{
                    width: 10rem;
                    height: 15rem;
                    background: #ffe6fc;
                    box-shadow: 0px 0px 12px 4px violet, 0px 0px 20px 12px #fccbf6 ;
                    border-radius: 50%;
                    display: flex;
                    position: absolute;
                    left: 5rem;
                    animation: rotationViolet 3.5s infinite ease-in-out;
                    
                }

                @keyframes rotationViolet {
                    0% {
                        transform: rotate(1deg);
                        opacity: 0;
                    }
                   
                    20% {
                        transform: rotate(25deg);
                        opacity: 1;
                    }
                    85%{
                        opacity: 1;
                    }
                    90% {
                        transform: rotate(330deg);
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(360deg);
                        opacity: 0;
                    }  
                }

                .cyan{
                    width: 10rem;
                    height: 15rem;
                    box-shadow: 0px 0px 12px 4px cyan, 0px 0px 20px 12px #00ffff70;
                    background: #bcffff;
                    border-radius: 50%;
                    display: flex;
                    position: absolute;
                    left: 5rem;
                    animation:  rotationCyan 3.5s infinite ease-in-out;
                }

                @keyframes rotationCyan {
                    0% {
                        transform: rotate(-1deg); 
                        opacity: 0;
                    }
                   
                    20% {
                        transform: rotate(-25deg); 
                        opacity: 1;
                    }
                    85%{
                        opacity: 1;
                    }
                    90% {
                        transform: rotate(-330deg); 
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(-360deg); 
                        opacity: 0;
                    }  
                }

            `}</style>
        </>
    )
}

export default AnimateLogo