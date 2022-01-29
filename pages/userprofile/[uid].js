import { useRouter } from "next/router"
import BackNav from "components/BackNav"
import Devit from "components/Devit"
import { useState, useEffect } from "react"
import { getUserComments } from "firebase/client"
import useUser from "hooks/useUser"
import NettImage from "components/NettImage"


const UserProfilePage = (props) => {

    const router = useRouter()
    if(router.isFallback) return "loading...."  
    // *isFallbarck lo sacamos de router es y gracias al cual junto con el true en el fallback de getStaticPaths, podemos hacer que cada ruta dinamica cree el estatico de dicho documento cuando este se solicite, de manera que asi se creearan de manera automatica todas nuestras rutas dinamicas.
   
    const user = useUser()
    const [commentsData, setCommentsData] = useState([])

    console.log("este es el contenido de commentsData: ", commentsData )

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getUserComments( props.uid,  newComments => {
                setCommentsData(newComments)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    return (
        <>
            <BackNav href="/home" />
            <section>
                <div className="list-netts_container">
                    {props.mapeo.length && (
                        <>
                            <div className="avatar-section">
                                <div className="profile-photo_container">
                                    <NettImage src={props.mapeo[0].avatar} />
                                </div>
                                <h3>{props.mapeo[0].userName}</h3>
                            </div>
                            <div className="tab-container">
                                <p className="tab-section">Netts</p>
                            </div>
                        </>
                    )}
                    {props.mapeo.map( post => {
                        return (
                            <>
                                <Devit key={post.id} id={post.id} userName={post.userName} avatar={post.avatar} content={post.content}  createdAt={post.createdAt} img={post.img} uid={post.userId}/>
                            </>
                        )
                    })}
                    {!props.mapeo.length && commentsData.length && (
                        <>
                            <div className="avatar-section">
                                <div className="profile-photo_container">
                                    <NettImage src={commentsData[0].avatar} />
                                </div>
                                <h3>{commentsData[0].userName}</h3>
                            </div>
                            <div className="tab-container">
                                <p className="tab-section">Netts</p>
                            </div>
                            <div className="no-netts_container">
                                <p>{commentsData[0].userName} no ha publicado nada aún :/</p>
                                <img src="https://i.postimg.cc/s2N6Czyg/nonetts.gif" width={200} />
                            </div>
                        </>
                    )}   
                </div>
            </section>

            <style jsx>{`
                section {
                    height: 100%;
                    width: 100%;
                    overflow: clip;
                }

                .avatar-section {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 200PX;
                }

                h3 {
                    font-size: 18px;
                    font-family: 'Poppins', sans-serif;
                    margin-top: 1rem;
                }

                .avatar-profile {
                    margin: 0 auto;
                    border-radius: 50%;
                    object-fit: cover;
                    width: 100px;
                    height: 100px;
                }
                .tab-container {
                    width: 100%;
                    height: fit-content;
                    border-bottom: 1.5px solid black;
                    display: flex;
                    padding-left: 0.5rem;
                    margin-bottom: 2.5rem;
                }
                .tab-section {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.6rem;
                    margin: 0 1rem;
                    border-top: 1.5px solid black;
                    border-left: 1.5px solid black;
                    border-right: 1.5px solid black; 
                    border-radius: 8px 8px 0 0;
                    width: fit-content;
                    padding: 0 5px;
                    font-weight: 500;
                    background: white;
                    transform: scale(1.14);
                }

                .list-netts_container {
                    grid-area: list;
                    border: 1px solid red;
                    overflow: auto;
                    width: 100%;
                    height: 100%;
                }
                .list-netts_container::-webkit-scrollbar{
                    width: 5px;
                    background-color: #ffffff;
                }
                .list-netts_container::-webkit-scrollbar-thumb{
                    background: rgb(0 0 0 / 30%);
                    border-radius: 20%;
                }

                .profile-photo_container{
                    width: 150px;
                    height: 150Px;
                    border-radius: 50%;
                    overflow: clip;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .no-netts_container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.6rem;
                    text-align: center;
                }
                .no-netts_container img {
                    margin-left: 3rem;
                    margin-top: 2rem;
                }

            `}</style>
        </>
    )
}

// ******** with getStaticProps ************************************************

// export async function getStaticPaths () {

//     return {
//         paths: [{ params: { uid : 'z54xPDq2Q5fyqxKQ5mT95qD27Ff2' } }],
//         fallback: true
//     }
// }

// export async function getStaticProps (context) {
//     const { params } = context
//     const { uid } = params

//     console.log(uid)

//     return firestore
//         .collection('netters')
//         .where("userId", "==", uid)
//         .onSnapshot( ({docs}) => {

//             const mapeo = docs.map(doc => {
//                 const data = doc.data()
//                 const id = doc.id
//                 const { createdAt} = data

//                 return {
//                     ...data,
//                     id,
//                     createdAt: +createdAt.toDate()
//                 }
//             })

//             return { props: mapeo}

//             })

// }

// ******** with gerServerSideProps **********************************************

export async function getServerSideProps (context) {
    const { params, res } = context
    const { uid } = params

    const apiResponse = await fetch(`http://localhost:3000/api/userprofiledata/${uid}`)
    if (apiResponse.ok) {
        const props = await apiResponse.json()
        return { props } 
    } 
    if (res) {
        res.writeHead(301, { Location: "/home" }).end()
    }
}

// en getServerSideProps params hace las veces de lo que hace query en getIntialProps





export default UserProfilePage