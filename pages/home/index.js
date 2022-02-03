import Devit from "components/Devit"
import CreateIcon from "components/Icons/Create"
import { signOut } from "firebase/client"
import useUser from "hooks/useUser"
import Link from "next/link"
import HomeIcon from "components/Icons/Home"
import Head from "next/head"
import { useRouter } from "next/router"
import Loader from "components/Loader"
import useGetNetts from "hooks/useGetNetts"
import Search from "components/Icons/Search"

const Timeline = () => {

    const user = useUser()
    const { allNetts } = useGetNetts()

    // console.log(user)

    const router = useRouter()

    const handleLogOut = () => {
        signOut().then( () => {
            router.replace('/')
        })
    }


    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <header>
                <ul>
                    <li>Social-net</li>
                    <li onClick={handleLogOut}>Logout</li>
                </ul>
            </header>
            <section>
                {allNetts.map( devit => {
                    return (
                        <Devit key={devit.id} id={devit.id} userName={devit.userName} avatar={devit.avatar} content={devit.content}  createdAt={devit.createdAt} img={devit.img} uid={devit.userId}/>
                    )
                })}
                {!allNetts.length && (
                    <div className="home-loader_container">
                        <Loader/>
                    </div>
                )}
                {allNetts.length > 0 && (
                    <span>Estás al día</span>
                )}
            </section>
            <footer>
                <nav>
                    <Link href="/"> 
                        <a>
                            <HomeIcon fill="cyan"  width={35} height={35}/>
                        </a>
                    </Link>
                    <Link href="/search"> 
                        <a title="Search User">
                            <Search width="3rem" height="3rem" stroke="cyan"/>
                        </a>
                    </Link>
                    <Link href="/compose/tweet"> 
                        <a title="Create Nett">
                            <CreateIcon stroke="#8a0891" width={35} height={35} />
                        </a>
                    </Link>
                    <Link href="/profile">
                        <a tile="Profile">
                            {user && (
                                <img className="icon-profile" src={user.avatar} alt={user.userName} width={35} height={35}></img>
                            )}
                        </a>
                    </Link>
                </nav>
            </footer>

            <style jsx>{`

                * {
                    font-family: 'Poppins', sans-serif;
                }

                header {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    position: sticky;
                    top: 0;
                    height: 50px;
                    width: 100%;
                    max-width: 500px;
                    border-bottom: 1px solid grey;
                    font-size: 18px;
                }
                header ul {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                header ul li{
                    list-style: none;
                    color: white;
                    background: black;
                    width: fit-content;
                    height: fit-content;
                    padding: 2px 8px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                section {
                    padding-top: 10px;
                    padding-bottom: 10px;
                    background: #fff;
                    /* height: fit-content; */
                    overflow: auto;
                    height: 100vh;
                }
                section::-webkit-scrollbar{
                    width: 5px;
                    background-color: #ffffff;
                }
                section::-webkit-scrollbar-thumb{
                    background: rgb(0 0 0 / 30%);
                    border-radius: 20%;
                }

                span {
                    width: 100%;
                    padding: 1.8rem .5rem .5rem .5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: grey;
                    font-size: 1.5rem;
                }

                footer {
                    width: 100%;
                }

                nav {
                    position: sticky;
                    bottom: 0;
                    height: 50px;
                    width: 100%;
                    max-width: 500px;
                    border-top: 1px solid grey;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }

                nav a {
                    padding: 0 1rem;
                }

                nav a:hover{
                    background: #dedede9c;
                    border-radius: 40px;
                }

                header, footer {
                    z-index: 20;
                    /* background-image: linear-gradient(101deg, #d200dd 20%, cyan); */
                    background-image: linear-gradient(101deg, #d200ddb3 20%, cyan);
                }

                .icon-profile{
                    border-radius: 50%;
                    border: none;
                    object-fit: cover;
                    border: 0.5px solid white;
                }

                .home-loader_container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                @keyframes rotate {
                    from {
                        transform: rotate(0)
                    }
                    to {
                        transform: rotate(360deg)
                    }
                }

                @media (max-width: 415px){
                    section{
                        margin: 45px 0;
                        padding-bottom: 55px;
                    }
                    span {
                        margin-bottom: -2.5rem;
                        padding-top: 2.5rem;
                        width: 100vw;
                    }

                    header {
                        position: fixed;
                    }

                    nav {
                        position: fixed;
                        background-image: linear-gradient(101deg, #d200ddb3 20%, cyan);
                        backdrop-filter: blur(2px);
                    }
                }
            `}</style>
        </>
    )
}


export default Timeline