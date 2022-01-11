import { firestore } from "firebase/admin"

export default (request, response) => {
    const { query } = request
    const { uid } = query

    firestore
        .collection('netters')
        .where("userId", "==", uid)
        .onSnapshot( ({docs}) => {
            // docs.map( doc => {
            //     const data = doc.data()
            //     const id = doc.id
            //     const {userName, content} = data
               
            //     console.log(data)
            //     console.log(data.userName)
            //     console.log(content)

            const mapeo = docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                const { createdAt} = data

                return {
                    ...data,
                    id,
                    createdAt: +createdAt.toDate()
                }
            })
            
            response.json({
                mapeo
            })
                // con este metodo estoy viendo todo los docs mapeados en consola
                // response.json(
                //     {
                //        docs
                //     }
                // )
            })
            
    
}