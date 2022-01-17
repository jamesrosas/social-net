import { useRouter } from "next/router"
import BackNav from "components/BackNav"
import Devit from "components/Devit"


const UserProfilePage = (props) => {

    const router = useRouter()
    if(router.isFallback) return "loading...."  
    // *isFallbarck lo sacamos de router es y gracias al cual junto con el true en el fallback de getStaticPaths, podemos hacer que cada ruta dinamica cree el estatico de dicho documento cuando este se solicite, de manera que asi se creearan de manera automatica todas nuestras rutas dinamicas.
    // console.log(props)

    const imgAvatar = props.mapeo[0].avatar
    const nameUser = props.mapeo[0].userName

    return (
        <>
            <BackNav href="/home" />
            <section>
                <div className="list-netts_container">
                    <div className="avatar-section">
                        <img className="avatar-profile" src={imgAvatar} ></img>
                        <h3>{nameUser}</h3>
                    </div>
                    {props.mapeo.map( post => {
                        return (
                            <>
                                <Devit key={post.id} id={post.id} userName={post.userName} avatar={post.avatar} content={post.content}  createdAt={post.createdAt} img={post.img} uid={post.userId}/>
                            </>
                        )
                    })}
                    
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