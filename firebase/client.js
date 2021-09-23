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

export const addNett = ({avatar, content, userId, userName}) => {
    return db.collection('netters').add({
        avatar,
        content,
        userId,
        userName,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0
    })
}

export const fetchLatestNetts = () => {
    return db.collection('netters')
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
            return snapshot.docs.map((doc) => {
                const data = doc.data()
                const id = doc.id
                const {createdAt} = data
                

                return {
                   ...data,
                   id,
                   createdAt: +createdAt.toDate()
                }
            })
        })
}
