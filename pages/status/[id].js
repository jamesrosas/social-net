import Devit from "components/Devit"
import { firestore } from "firebase/admin"
import { useRouter } from "next/router"


const NettPage = (props) => {

    const router = useRouter()
    if(router.isFallback) return "loading...."
    console.log(props)

    return (
        <>
            <div>
                <Devit {...props}/>
            </div>
            <style jsx>{`
                div {
                    width: 100%;
                    height: 100vh;
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </>
    )
}

export async function getStaticPaths () {

    return {
        paths: [{ params: { id : 'sOog4Gm4g64m3JwxaOsh' } }],
        fallback: true
    }
}

export async function getStaticProps (context) {
    const { params } = context
    const { id } = params

    return firestore
        .collection('netters')
        .doc(id)
        .get()
        .then( doc => {
            const data = doc.data()
            const id = doc.id
            const {createdAt} = data
                
            const props = {
                ...data,
                id,
                createdAt: +createdAt.toDate()
            }
            return { props }

        })
        .catch(() => {
            return { props: {} }
        })
    
}

// ******** with gerServerSideProps **********************************************

// export async function getServerSideProps (context) {
//     const { params, res } = context
//     const { id } = params

//     const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
//     if (apiResponse.ok) {
//         const props = await apiResponse.json()
//         return { props } 
//     } 
//     if (res) {
//         res.writeHead(301, { Location: "/home" }).end()
//     }
// }


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