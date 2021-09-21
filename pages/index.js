import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Avatar from '../components/Avatar'
import Button from '../components/Button/index'
import { loginWithGitHub, onAuthStateChanged } from '../firebase/client'

export default function Home() {

  const [user, setUser] = useState(undefined)

  useEffect( () => {
    onAuthStateChanged(user => setUser(user))
  }, [])

  const handleClick = () => {
    loginWithGitHub().then( user => {
      setUser(user)
      console.log(user) 
    }).catch( err => {
      console.log(err)
    })
  }
// const hanldeClick = async() => {
//     try {
//       const user = await loginWithGitHub()
//       setUser(user)
//     } catch(err) {
//         console.log(err)
//     }
// } MISMO HANDLECLICK PERO CON ASYNC AWAIT EN LUGAR DE PROMESAS TRADICIONALES COMO LA ANTERIOR

  return (
    <>
        <Head>
          <title>Social Network</title>
          <meta name="description" content="welcome to your social-net" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section>
          <Image src="/vercel.svg" alt="social-net logo" width={300} height={300} />
          <h1>Welcome to social-net</h1>
          { user === null && (
            <Button onClick={handleClick} background="black">
              <img src="/github-brands.svg" alt="github logo" width={24}/>
              Login with GitHub
            </Button>    
          )}
          { user && user.avatar && (
              <Avatar src={user.avatar} alt={user.username} email={user.email}/>
          )}
        </section>
        
      <style jsx>{`

        h1 {
          font-family:'Poppins', sans-serif;
          font-size: 28px;
          font-weigth: 600;
          margin-bottom: 2rem;
        }
        img {
          margin-right: 1rem;
        }
      `}</style>
    </>
  )
}