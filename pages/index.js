import GitHubIcon from 'components/Icons/GitHub'
import Loader from 'components/Loader'
import useUser, { USER_STATES } from 'hooks/useUser'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'
import Button from '../components/Button/index'
import { loginWithGitHub, loginWithGoogle } from '../firebase/client'
import GoogleIcon from 'components/Icons/Google'
import AnimateLogo from 'components/AnimateLogo'


export default function Home() {

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClickGitHub = () => {
    loginWithGitHub().catch( err => {
      console.log(err)
    })
  }

  const handleClickGoogle = () => {
    loginWithGoogle().catch( err => {
      console.log(err)
    })
  }
  
  return (
    <>
        <Head>
          <title>Social Net</title>
          <meta name="description" content="welcome to your social-net" />
          <link rel="icon" href="/favicon-web.png" />
        </Head>
        <section>
          <AnimateLogo/>
          <h1>Welcome to social-net</h1>
          { user === USER_STATES.NOT_LOGGED && (
            <>
              <Button onClick={handleClickGitHub}>
                <GitHubIcon fill="black" width={24} height={24}/>
                Login with GitHub
              </Button>  
              <Button onClick={handleClickGoogle}>
                <GoogleIcon width={24} height={24}/>
                Login with Google
              </Button>
            </>
          )}
          { user === USER_STATES.NOT_KNOWN && (
              <Loader/>
          )}
        </section>
        
      <style jsx>{`

        h1 {
          font-family:'Poppins', sans-serif;
          font-size: 17px;
          font-weigth: 600;
          margin-bottom: 4rem;
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