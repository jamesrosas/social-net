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
    // console.log(user)

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


// Netters (collection "netters") *******************************************************
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

export const deleteNett = (nettId) => {
    return db   
        .collection("netters")
        .doc(nettId)
        .delete()
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

//****************************************************************************** */


// con esta funcion quiero guardar en una nueva coleccion llamada "biographies" lo que cada usuario quiera colocar en  su seccion de bigrafia de su perfil. Lo que podria hacer es un hook que haga el fetch de esta biografia y usando esto filtrarlo por el uid que ya poseeria la cloeccion, y asi traer el contenido correspondiente;
export const addBiography = ({ content, userId }) => {
    return db.collection('biographies').add({
        content,
        userId
    })
}

// Comments  (subcollection "comments" of "netters" collection) *******************************************************
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
export const getUserComments = (uid, callback) => {
    return db
        .collectionGroup("comments")
        .where("userId", "==", uid)
        .onSnapshot(({docs}) => {
            const mapeo = docs.map(doc => {
                // console.log("mapeo con onSnapshot", doc.data())
                const data = doc.data()
                const id = doc.id

                return {
                    ...data,
                    id
                }
            })

            callback(mapeo)
        })
}

export const deleteComment = (originalNettId, commentId) => {
    return db   
        .collection("netters")
        .doc(originalNettId)
        .collection("comments")
        .doc(commentId)
        .delete()
}

//**************************************************************** */


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
        const forNetters = await db.collection("netters")
            .where("userId", "==", userId)
            .get()
    
        forNetters.forEach( doc => {
            transaction.update(doc.ref,{avatar: ifAvatarUrl, userName: ifUserName})
        })
    }).then(callback).catch(() => alert("ups algo no fue bien , intenta mas tarde"))

    db.runTransaction(async transaction => {
        const forComments = await db.collectionGroup("comments")
            .where("userId", "==", userId)
            .get()
    
        forComments.forEach( doc => {
            transaction.update(doc.ref,{avatar: ifAvatarUrl, userName: ifUserName})
        })
    })

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


// Favorites (collection "favorites")*******************************************************************
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

export const getUserFavIconId = (id ,callback) => {

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

export const getAllFavsNetts = (callback) => {

    return db
        .collection("favorites")
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

//**************************************************************************** */


// FavoriteIcon (subcollection "favs" of "netters" collection) ***********************
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

//******************************************************************* */
