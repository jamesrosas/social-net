import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button/index'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGithub } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <>
      <div className="home-container">
        <Head>
          <title>Social Network</title>
          <meta name="description" content="welcome to your social-net" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main id="log-section">
          <Image src="/vercel.svg" alt="social-net logo" width={300} height={300} />
          <h1>Welcome to social-net</h1>
          <Button background="black">
            <img src="/github-brands.svg" alt="github logo" width={24}/>
            Login with GitHub
          </Button>
        </main>
      </div>

      <style jsx>{`
      
        .home-container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #80808029;
        }

        main#log-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 500px;
          height: 100vh;
          max-height: 825px;
          background-color: white;
          box-shadow: 2px 2px 6px rgba(128, 128, 128, 0.733);
        }  

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