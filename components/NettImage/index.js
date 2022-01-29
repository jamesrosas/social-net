import Close from 'components/Icons/Close'
import Loader from 'components/Loader'
import { useState } from 'react'

const NettImage = ({src}) => {

    const [completeImage, setCompleteImage] = useState(false)

    const handleClickImageComplete = () => {
        setCompleteImage(!completeImage)
    }

    return (
        <>  
            <picture onClick={handleClickImageComplete}>
                <img src={src}/>
            </picture>
            {completeImage && (
                <div className='nett-image_modal'>
                        <Loader/>
                        <img id="img-modal" src={src}/>
                        <span onClick={handleClickImageComplete}>
                            <Close width="3rem" height="3rem"/>
                        </span>
                </div>
            )}
        
            <style jsx>{`

                picture {
                    cursor: pointer;
                    width: 100%;
                    min-width: 100%;
                    height: fit-content;
                    border-radius: 10px; 
                    margin-top: 1rem;
                    /* background: #80808073; */
                    overflow: clip;
                }
                #picture-modal {
                    border-radius: 0;

                }
                .nett-image_modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(0,0,123,0.4);
                    backdrop-filter: blur(6px);
                }

                img {
                    width: 100%;
                    object-fit: cover;
                    height: fit-content;
                    min-height: 170px;
                    /* background: #80808073; */
                    border-radius: 10px;
                }
                #img-modal {
                    border-radius: 0;
                    position: absolute;
                    margin: 0 auto;
                    object-fit: contain;
                }

                span {
                    position: absolute;
                    top: .5rem;
                    right: .5rem;
                    width: fit-content;
                    height: 30px;
                    /* border: 1px solid red; */
                    background: white;
                    border-radius: 50%;
                    cursor: pointer;
                }

                @media (min-width: 500px) {
                    .nett-image_modal {
                    position: fixed;
                    top: 5vh;
                    left: 20%;
                    width: 60%;
                    height: 90%;
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(0,0,123,0.4);
                    margin: 0 auto;
                    border-radius: 10px;
                    overflow: clip;
                    border: 1px solid white;
                    /* animation: jump 500ms 1 ease-in forwards; */
                    }
                    
                    #img-modal {
                    border-radius: 0;
                    width: fit-content;
                    height: 100%;
                    max-width: 100%;
                    position: absolute;
                    margin: 0 auto;
                    /* z-index: 10; */
                    }
                    
                
            `}</style>
        </>
    )
}

export default NettImage