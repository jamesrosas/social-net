import Devit from "components/Devit"
// import { firestore } from "firebase/admin"
import { useRouter } from "next/router"
import BackNav from "components/BackNav"
import { useState, useEffect } from "react"
import { getNettComments } from "firebase/client"
import useUser from "hooks/useUser"
import Comment from "components/Comment"
import AddComment from "components/AddComment"


const NettPage = (props) => {

    const [listComments, setListComments] = useState([])

    // console.log(listComments)

    const user = useUser()

    // despues de crear un comentario , atraves de un useEffect se ejecutara la funcion para traer los docs de la subcoleccion "comments" lo cual guardaremos en un useState para despues mapearlo en el jsx
    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getNettComments( props.id,  newComments => {
                setListComments(newComments)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    const router = useRouter()
    if(router.isFallback) return "loading...."  
    // *isFallbarck lo sacamos de router es y gracias al cual junto con el true en el fallback de getStaticPaths, podemos hacer que cada ruta dinamica cree el estatico de dicho documento cuando este se solicite, de manera que asi se creearan de manera automatica todas nuestras rutas dinamicas.
    // console.log(props)

    

    // console.log("este es el id del nett, el mismo de la url")
    // console.log(props.id)

    return (
        <>  
            <header>
                <BackNav href="/home" />
            </header>
            <section className="nett-view_container">
                <Devit {...props} uid={props.userId}/>
                <div>
                    <span>
                        Comments: {listComments.length}  
                    </span>
                    {listComments.map((nettComment) => {
                        return (
                            <Comment key={nettComment.id} id={nettComment.id} userName={nettComment.userName} avatar={nettComment.avatar} content={nettComment.content}  createdAt={nettComment.createdAt} uid={nettComment.userId} originalNettId={props.id}/>
                        )
                    })} 
                </div>
            </section>
            <AddComment idNett={props.id}/>

            <style jsx>{`

                header {
                    width: 100%;
                }
                .nett-view_container {
                    width: 100%;
                    height: 100vh;
                    font-family: 'Poppins', sans-serif;
                    position: relative;
                    overflow: auto;
                }
                .nett-view_container::-webkit-scrollbar{
                    width: 5px;
                    background-color: #ffffff;
                }
                .nett-view_container::-webkit-scrollbar-thumb{
                    background: rgb(0 0 0 / 30%);
                    border-radius: 20%;
                }

                div {
                    width: 100%;
                    padding-top: 4.5rem;
                    position: relative;
                }

                span {
                    background: #00c4ff40;
                    border-radius: 8px;
                    padding: 5px;
                    font-size: 1.5rem;
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
           
                }
               

            `}</style>
        </>
    )
}

// ******** with getStaticProps ************************************************

// export async function getStaticPaths () {

//     return {
//         paths: [{ params: { id : 'sOog4Gm4g64m3JwxaOsh' } }],
//         fallback: true
//     }
// }

// export async function getStaticProps (context) {
//     const { params } = context
//     const { id } = params

//     return firestore
//         .collection('netters')
//         .doc(id)
//         .get()
//         .then( doc => {
//             const data = doc.data()
//             const id = doc.id
//             const {createdAt} = data
//             // const {createdAt, userName, avatar, content} = data

//             // const props = {
//             //     userName,
//             //     avatar,
//             //     content,
//             //     id,
//             //     createdAt: +createdAt.toDate()
//             // }

//             console.log(data)
//             console.log(doc)
//             console.log(data.userId)

//             const props = {
//                 ...data,
//                 id,
//                 createdAt: +createdAt.toDate()
//             }
                
//             return { props }

//         })
//         .catch(() => {
//             return { props: {} }
//         })
    
// }

// ******** with gerServerSideProps **********************************************

export async function getServerSideProps (context) {
    const { params, res } = context
    const { id } = params

    const apiResponse = await fetch(`https://social-net-phi.vercel.app/api/devits/${id}`)
    if (apiResponse.ok) {
        const props = await apiResponse.json()
        return { props } 
    } 
    if (res) {
        res.writeHead(301, { Location: "/home" }).end()
    }
}

// en getServerSideProps params hace las veces de lo que hace query en getIntialProps


// ******* with getInitialProps **************************************************

// NettPage.getInitialProps = (context) => {
//     const { query, res } = context
//     const { id } = query

//     return fetch(`http://localhost:3000/api/devits/${id}`).then(apiResponse => {
//                 if (apiResponse.ok) return apiResponse.json()
//                 if (res) {
//                     res.writeHead(301, { Location: "/home" }).end()
//                 }
//             })
// }

// el parametro Context que recibe getInitialProps es un objeto que contiene algunas keys, de las cuales usaremos en este momento la que llamamos query con la cual podremos hacer el tema de rutas dinamicas, y la cual equivale a la url completa donde esta udicada la pagina que hace las veces de ruta dinamica, y de esta key query entonces como sabemos que es la url , recuperamos a ID que es en si nuestra ruta dinamica y/o archvio que tenemos como ruta dinamica en nuestro proyecto es decir [id].js , entonces de la query para recuperar dicha ruta dinamica lo hacemsos atraves del nombre que le dimos al archvio de rutas dinamicas que en este caso como vemos es id, por eso tenemos que  const {id} = query porque id es el segmento de la ruta que hemos creado nosotros


export default NettPage