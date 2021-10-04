import GitHubIcon from 'components/Icons/GitHub'
import Loader from 'components/Loader'
import useUser, { USER_STATES } from 'hooks/useUser'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Button from '../components/Button/index'
import { loginWithGitHub } from '../firebase/client'


export default function Home() {

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch( err => {
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
          { user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHubIcon fill="white" width={24} height={24}/>
              Login with GitHub
            </Button>    
          )}
          { user === USER_STATES.NOT_KNOWN && (
              <Loader/>
          )}
        </section>
        
      <style jsx>{`

        h1 {
          font-family:'Poppins', sans-serif;
          font-size: 28px;
          font-weigth: 600;
          margin-bottom: 2rem;
          text-align: center;
        }

        section {
          height: 100vh;
          width: 100%;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        img {
          margin-right: 1rem;
        }
      `}</style>
    </>
  )
}