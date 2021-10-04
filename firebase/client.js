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

export const loginWithGitHub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider()
    return firebase
        .auth()
        .signInWithPopup(githubProvider)
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

const mapDevitFromFirebaseToDevitObject = (doc) => {
    const data = doc.data()
    const id = doc.id
    const {createdAt} = data
                

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
// aqui en listenLatestDevits hacemos uso de onSnapshot() para escuhar todos los cambios en nuestra coleccion de docs, de manera que todos los devits que se creen se veran en tiempo real en nuestra home, con un limite 20 como establecimos con limit()


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
// con fetchLatestNetts estamos trayendo todos los devits que tenemos en la coleccion , y cada vez que refrequemos la home veremos los devits mas recientemente creados, pero no estamos viendo estos devits en tiempo rela en la home cuando son creados, como vimos es necesario refrescar la home. Por tanto este metodo ya no lo usariamos en nuestra home, en su lugar usariamos listenLatestdDevits() para asi poder ver desde la home en tiempo real los devits conforme se van creando.


export const uploadImage = (file) => {
    const ref = firebase.storage().ref(`ìmages/${file.name}`)
    const task = ref.put(file)
    return task
}
