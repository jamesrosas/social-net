import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCZ2O8zwUSZ9eJLA8U5O-rk_pRC01miVrQ",
    authDomain: "social-net-d1a2e.firebaseapp.com",
    projectId: "social-net-d1a2e",
    storageBucket: "social-net-d1a2e.appspot.com",
    messagingSenderId: "248723772228",
    appId: "1:248723772228:web:03218a21d041131aa13d11",
    measurementId: "G-EPJLWHEFEN"
  };


firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()


const mapUserFromFirebaseAuth = (user) => {
    const { displayName, email, photoURL, uid} = user
    console.log(user)

    return {
        avatar: photoURL,
        username: displayName,
        email,
        uid
    }
}

export const onAuthStateChanged = (onChange) => {
    return firebase
        .auth()
        .onAuthStateChanged(user => {
            const normalizedUser = user ?
            mapUserFromFirebaseAuth(user) :  null
            onChange(normalizedUser)
        })
}
// ESTE ES EL BLOQUE YA FUNCIONA;
// export const signUpWithEmailAndPassword = (email, pass, userName) => {
//     return firebase
//         .auth()
//         .createUserWithEmailAndPassword(email,pass)
//         .then(() => {
//             const usuario = firebase.auth().currentUser
//             usuario.updateProfile({
//                 displayName: userName,
//                 photoURL: "https://i.postimg.cc/d3f6FXDs/default-user.png"
//             })
//         })
// }


// ESTE ES EL BLOQUE PARA PROBAR LA VERIFICACION DE LA CUENTA POR EMAIL;
//ya funciona la verificacion de correo ahora solo falta mejorara la UX, ya que cuando me registro si me envia el correo de verificacion,pero en la app solo veo el formulario lleno y no me esta saliendo ningun mensaje de que necesito verificar para poder ingresar a la cuenta( por supuesto tambien tengo que hacer real esto en las reglas de seguridad de la consola de firebase para que asi solamente puedan ingresar los usuarios verificados)
// EN LA CLASE 8 DEL CURSO FIREBASE PARA LA WEB VEMOS LO DEL CORREO DE VERIFICACION

export const signUpWithEmailAndPassword = (email, pass, userName) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email,pass)
        .then(() => {
                    const usuario = firebase.auth().currentUser

                    usuario.updateProfile({
                        displayName: userName,
                        photoURL: "https://i.postimg.cc/d3f6FXDs/default-user.png"
                    })

                    const redirect = {
                        url: "https://social-net-phi.vercel.app"
                    }

                    usuario.sendEmailVerification(redirect)

                    firebase.auth().signOut()

                })
}


export const signInWithEmailAndPassword = (email, pass) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
            
}

export const sendEmailToResetPassword = (email) => {

    const redirect = {
        url: "https://social-net-phi.vercel.app"
    }
    
    return firebase
        .auth()
        .sendPasswordResetEmail(email, redirect)
}

export const loginWithGitHub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider()
    return firebase
        .auth()
        .signInWithPopup(githubProvider)
}

export const loginWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        
}

export const signOut = () => {
    return firebase
        .auth()
        .signOut()
}

export const addNett = ({avatar, content, userId, userName, img}) => {
    return db.collection('netters').add({
        avatar,
        content,
        img,
        userId,
        userName,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0
    })
}

// con esta funcion quiero guardar en una nueva coleccion llamada "biographies" lo que cada usuario quiera colocar en  su seccion de bigrafia de su perfil. Lo que podria hacer es un hook que haga el fetch de esta biografia y usando esto filtrarlo por el uid que ya poseeria la cloeccion, y asi traer el contenido correspondiente;
export const addBiography = ({ content, userId }) => {
    return db.collection('biographies').add({
        content,
        userId
    })
}

export const addComment = ({ content }, nettId) => {

    const currentUser = firebase.auth().currentUser

    return db
        .collection('netters')
        .doc(nettId)
        .collection('comments')
        .add({
            avatar: currentUser.photoURL,
            content,
            userId: currentUser.uid,
            userName: currentUser.displayName,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        })
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
    const data = doc.data()
    const id = doc.id
    const {createdAt} = data     
    
    //tengo que hacer uso del userId , el cual saco de data , para de esta manera filtrar los post de un usuario en especifico y asi mostrarlos en su perfil

    return {
        ...data,
        id,
        createdAt: +createdAt.toDate()
    }
}

export const listenLatestDevits = (callback) => {
    return db.collection('netters')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .onSnapshot( ({docs}) => {
            const newDevits = docs.map( doc => mapDevitFromFirebaseToDevitObject(doc))
            callback(newDevits)
        })
}

export const getAllUserPosts = (callback) => {
    const currentUser = firebase.auth().currentUser

    return db.collection('netters')
        .where("userId", "==", currentUser.uid )
        .orderBy('createdAt', 'desc')
        .onSnapshot( ({docs}) => {
            const newDevits = docs.map( doc => mapDevitFromFirebaseToDevitObject(doc))
            callback(newDevits)
        })
}

export const getUserProfile = (uid , callback) => {

    return db.collection('netters')
        .where("userId", "==", uid )
        .orderBy('createdAt', 'desc')
        .onSnapshot( ({docs}) => {
            const newDevits = docs.map( doc => mapDevitFromFirebaseToDevitObject(doc))
            callback(newDevits)
        })
}

export const getNettComments = (nettId, callback) => {
    return db
        .collection('netters')
        .doc(nettId)
        .collection("comments")
        .orderBy('createdAt', 'asc')
        .onSnapshot( ({docs}) => {
            const newComments = docs.map( doc => mapDevitFromFirebaseToDevitObject(doc))
            callback(newComments)
        })
}

export const fetchLatestNetts = () => {
    return db.collection('netters')
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
            return snapshot.docs.map((doc) => {
                return mapDevitFromFirebaseToDevitObject(doc)
            })
        })
}

// esta funcion lo que esta haciendo es subir de una vez la imagen al storage de firebase, lo cual tendria que pasar solamente si el usuario le da publicar al netter y no antes como esta pasando por ahora
export const uploadImage = (file) => {
    const ref = firebase.storage().ref(`ìmages/${file.name}`)
    const task = ref.put(file)
    return task
}


export const updateUserProfile = ({name, avatarUrl}, callback) => {
    
    const currentUser = firebase.auth().currentUser
    
    const ifAvatarUrl = avatarUrl ? avatarUrl : currentUser.photoURL
    const ifUserName = name ? name : currentUser.displayName
    const userId = currentUser.uid

    currentUser.updateProfile({
        displayName: ifUserName,
        photoURL: ifAvatarUrl
    })
    
    db.runTransaction(async transaction => {
        const query = await db.collection("netters")
            .where("userId", "==", userId)
            .get()
    
        query.forEach( doc => {
            transaction.update(doc.ref,{avatar: ifAvatarUrl, userName: ifUserName})
        })
    }).then(callback)

}

export const getCurrentUser = (callback) => {
    const currentUser = firebase.auth().currentUser

    const data = {
        avatar: currentUser.photoURL,
        userName: currentUser.displayName,
        userId: currentUser.uid
    }

    callback(data)

}

export const addFavs = ({ avatar, content, img, currentUserId,nettUserId, userName, createdAt, originalNettId}) => {

    return db
        .collection('favorites')
        .doc(`${originalNettId}${currentUserId}`)
        .set({
            avatar,
            content,
            img,
            currentUserId,
            nettUserId,
            userName,
            createdAt,
            originalNettId: originalNettId
        })

        // quiero guardar en esta coleccion un doc al cual le de fav , para ello entonces copiaria toda la data del doc en cuestion , la cual tendria que recibir como parametro para poder adicionarla. tambien tengo que agregar la logica par cuando la estrella de fav este en amarrilo esta se agrege a la coleccion , pero si esta pagada pues se elimine de la coleccion
}

export const deleteFavs = (nettFavId) => {
    return db   
        .collection("favorites")
        .doc(nettFavId)
        .delete()
}

export const getUserFavsNetts = (callback) => {

    const currentUser = firebase.auth().currentUser

    return db
        .collection("favorites")
        .where("currentUserId", "==", currentUser.uid)
        .orderBy('createdAt', 'desc')
        .onSnapshot( ({docs}) => {
            const favsNetts = docs.map( doc => {
                const data = doc.data()
                const id = doc.id     
                
                return {
                    ...data,
                    id
                }
            })
            callback(favsNetts)
        })
}

export const getUserFavsDocId = (id ,callback) => {

    // const currentUser = firebase.auth().currentUser

    return db
        .collection("favorites")
        .where("originalNettId", "==", id)
        .onSnapshot( ({docs}) => {
            const favsNetts = docs.map( doc => {
                const data = doc.data()
                const id = doc.id     
                
                return {
                    ...data,
                    id
                }
            })
            callback(favsNetts)
        })
}

// ++++++++++++++++ test prueba para el state del favIcon

export const addStateFavIcon = ({ fav }, nettId, favIconId) => {

    const currentUser = firebase.auth().currentUser

    return db
        .collection('netters')
        .doc(nettId)
        .collection('favs')
        .doc(favIconId)
        .set({
            fav,
            userId: currentUser.uid     
        })
}

export const deleteFavIcon = (nettId, favIconId) => {
    return db   
        .collection('netters')
        .doc(nettId)
        .collection('favs')
        // .where("userId", "==", currentUser.uid) deberia colocar este filtro para eliminar solo los favs qeu coincidan con el currentUser ??
        .doc(favIconId)
        .delete()
}


export const getStateFavIcon = (nettId, callback) => {

    const currentUser = firebase.auth().currentUser

    return db
        .collection('netters')
        .doc(nettId)
        .collection("favs")
        .where("userId", "==", currentUser.uid)
        .onSnapshot( ({docs}) => {
            const stateIcon = docs.map( doc => {
                const data = doc.data()
                const id = doc.id     
                
                return {
                    ...data,
                    id
                }
            })
            callback(stateIcon)
        })
}
