import GitHubIcon from 'components/Icons/GitHub'
import Loader from 'components/Loader'
import useUser, { USER_STATES } from 'hooks/useUser'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Button from '../components/Button/index'
import { loginWithGitHub, loginWithGoogle, signUpWithEmailAndPassword, signInWithEmailAndPassword, signOut , sendEmailToResetPassword} from '../firebase/client'
import GoogleIcon from 'components/Icons/Google'
import AnimateLogo from 'components/AnimateLogo'
import LoginModal from 'components/LoginModal'
import useCustomAlerts from 'hooks/useCustomAlerts'
import Show from 'components/Icons/Show'
import Hide from 'components/Icons/Hide'

export default function Home() {

  const user = useUser()
  const router = useRouter()
  const { singleAlertMessage } = useCustomAlerts()

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const [email, setEmail] = useState("")
  const [pass , setPass] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClickSignUp = () => {
    setModal(!modal)
  }
  const handleClickSignIn = () => {
    setModal2(!modal2)
  }

  const handleChangeEmail = (e) => {
      setEmail(e.target.value)
  }

  const handleChangeUser = (e) => {
      setUserName(e.target.value)
  }

  const handleChangePass = (e) => {
    setPass(e.target.value)
  }

  const handleSubmitSignUp = (e) => {
    e.preventDefault()
    // console.log(email, pass)
    signUpWithEmailAndPassword(email, pass, userName)
      .then(() => {
        singleAlertMessage.fire({
          text: 'Te hemos enviado un email para verificar tu cuenta',
          color: '#05b605',
          icon: "info"
        })
        setEmail("")
        setPass("")
        setUserName("")
      }).catch(({message}) => singleAlertMessage.fire({
        text: message,
        icon: "info",
        color: '#ff0000'
      }))
      // aqui puedo usar una condicional para que si el message.includes("is alredy used") entonces muestre un mensaje diceindo lo mismo pero en español.
      // aqui se deberia lanzar un popUp que diga que "esta direccion de correo ya esta siendo usada por otra cuenta"
  }

  const handleSubmitSignIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(email, pass)
      .then(result => {
        if(!result.user.emailVerified){
          singleAlertMessage.fire({
            text: 'Primero debes verificar tu email',
            icon: "info",
            color: '#ff0000'
          })
          signOut()
        }
      })
      .catch(() => setErrorMessage(true))
  } 

  const handleClickResetPass = () =>{
      sendEmailToResetPassword(email)
        .then(() => singleAlertMessage.fire({
          text: 'Te hemos enviado un email para reestablecer tu contraseña',
          color: '#05b605',
          icon: "info"
        }))
  }

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

  const [ showPass, setShowPass] = useState(false)

  const handleClickShowPass = () => {
    setShowPass(!showPass)
  }

  const [ showPassSignUp, setShowPassSignUp] = useState(false)

  const handleClickShowPassSignUp = () => {
    setShowPassSignUp(!showPassSignUp)
  }
  
  return (
    <>
        <Head>
          <title>Social Net</title>
          <meta name="description" content="welcome to social-net" />
          <link rel="icon" href="/favicon-web.png" />
        </Head>
        <section>
          <AnimateLogo/>
          <h1>Welcome to social-net</h1>
          { user === USER_STATES.NOT_LOGGED && (
            <>
              <Button onClick={handleClickSignIn} invertColor={true}>
                Sign In
              </Button>
              <Button onClick={handleClickSignUp}>
                Sing Up
              </Button>
              <LoginModal modalClass={modal2 ? 'modal modalOn' : 'modal'} onClick={handleClickSignIn}>
                <form onSubmit={handleSubmitSignIn}>
                  <input placeholder='Email' value={email} onChange={handleChangeEmail} pattern="^[a-z0-9_]+(\.[a-z0-9_]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required></input>
                  <div id="input-pass_container">
                    <input  placeholder='Password' value={pass} onChange={handleChangePass} type={showPass ? "text" : "password"} required></input>
                    <span id="show-pass_icon" onClick={handleClickShowPass}>
                      {showPass
                       ?  <Hide width="2.5rem" height="2.5rem"/>
                       :  <Show width="2.5rem" height="2.5rem"/>
                      }
                    </span>
                  </div>
                  {errorMessage && (
                    <>
                      <p className='error'>Email o contraseña erroneos!</p>
                      <p className ="reset-pass" onClick={handleClickResetPass}>
                        ¿Olvidaste tu contraseña? Da click aquí
                      </p>
                    </>
                  )}
                  <Button>ingresar</Button>
                  <p className="reset-pass" onClick={handleClickSignUp}>Aun no tienes cuenta? Registrate aquí</p>
                </form>
              </LoginModal>
              <LoginModal modalClass={modal ? 'modal modalOn' : 'modal'} onClick={handleClickSignUp}>
                <form onSubmit={handleSubmitSignUp}>
                  <input placeholder='Email' value={email} onChange={handleChangeEmail} pattern="^[a-z0-9_]+(\.[a-z0-9_]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required></input>
                  <input placeholder='Username' maxLength="15" value={userName} onChange={handleChangeUser} pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+[a-z0-9_]+(\.[a-z0-9_]+$" required></input>
                  <div id="input-pass_container">
                    <input placeholder='Password' value={pass} onChange={handleChangePass} type={showPassSignUp ? "text" : "password"}  required></input>
                    <span id="show-pass_icon" onClick={handleClickShowPassSignUp}>
                      {showPassSignUp
                       ?  <Hide width="2.5rem" height="2.5rem"/>
                       :  <Show width="2.5rem" height="2.5rem"/>
                      }
                    </span>
                  </div>
                  <Button>
                    Registrarse
                  </Button>
                </form>
                <p className='login-with'>or</p>
                <Button onClick={handleClickGitHub}>
                  <GitHubIcon fill="black" width={24} height={24}/>
                  Login with GitHub
                </Button>  
                <Button onClick={handleClickGoogle}>
                  <GoogleIcon width={24} height={24}/>
                  Login with Google
                </Button>
              </LoginModal>
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
          overflow: clip;
          position: relative;
        }
        img {
          margin-right: 1rem;
        }

        form {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
        }
        input {
          width: 90%;
          outline: none;
          border-radius: 5px;
          padding: 8px 5px;
          font-size: 18px;
          margin: 0 auto 1rem auto;
          border: 1px solid black;
        }
        #input-pass_container {
          width: 100%;
          height: fit-content;
          position: relative;
          /* border: 1px solid red; */
          display: flex;
        }
        #show-pass_icon {
          position: absolute;
          top: 0;
          right: 2rem;
          cursor: pointer;
          /* border: 1px solid red; */
          height: 45px;
          display: flex;
          justify-content: center;
          width: 40px;
          align-items: center;

        }

        .error {
          color: red;
          background: pink;
          padding: 5px;
          border: 1px solid red;
          border-radius: 5px;
          font-size: 1.5rem;
          width: fit-content;
          margin: 1rem auto;
          font-family:'Poppins', sans-serif;
        }
        .reset-pass{
          font-family:'Poppins', sans-serif;
          font-size: 1.5rem;
          text-decoration: underline;
          color: #00ffff;
          width: fit-content;
          margin: 0.5rem auto;
          background: black;
          border-radius: 5px;
          padding: 0 5px;
          cursor: pointer;
        }
        .login-with {
          font-family:'Poppins', sans-serif;
          font-size: 1.6rem;
          color: white;
          background: black;
          padding: 0px 162px;
          margin-bottom: 1rem;
          border-radius: 8px;
          border-radius: 8px 8px 60px 60px;
        }
        
      `}</style>
    </>
  )
}