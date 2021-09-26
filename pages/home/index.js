import Devit from "components/Devit"
import CreateIcon from "components/Icons/Create"
import { fetchLatestNetts } from "firebase/client"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import Link from "next/link"
import HomeIcon from "components/Icons/Home"
import Head from "next/head"

const Timeline = () => {

    const [timeline, setTimeline] = useState([])

    const user = useUser()

    const getDta = async() => {
        const response = await fetch('http://localhost:3000/api/statuses/home_timeline')
        const data = await response.json()
        setTimeline(data)
    }

    useEffect(() => {
        user && fetchLatestNetts().then(timeline => {
            setTimeline(timeline)
            console.log(timeline)
        })
            // getDta()
        
    }, [user])

    return (
        <>
            <Head>
                <title>Inicio / Home</title>
            </Head>
            <header>
                <p>Incio</p>
            </header>
            <section>
                {timeline.map( devit => {
                    return (
                        <Devit key={devit.id} id={devit.id} userName={devit.userName} avatar={devit.avatar} content={devit.content} userId={devit.userId} createdAt={devit.createdAt} img={devit.img}/>
                    )
                })}
                {!timeline && (
                    <div className="loader">
                        <span></span>
                    </div>
                )}
            </section>
            <nav>
                <Link href="/"> 
                    <a>
                        <HomeIcon fill="darkcyan"  width={35} height={35}/>
                    </a>
                </Link>
                <Link href="/compose/tweet"> 
                    <a>
                        <CreateIcon stroke="darkcyan" width={35} height={35} />
                    </a>
                </Link>
            </nav>

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
                }

                section {
                    padding-top: 10px;
                    padding-bottom: 10px;
                    background: #fff;
                    /* height: fit-content; */
                    overflow: auto;
                    height: 100vh;
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
                    background: #dedede;
                    border-radius: 10px;
                }

                header, nav {
                    z-index: 20;
                    background: #ebfcff;
                }

                .loader {
                    width: 100%;
                    height: 100vh;
                }

                span {
                    width: 30px;
                    height: 30px;
                    background-color: blue;
                    animation: rotate infinite 1s ease-in-out;
                }
                @keyframes rotate {
                    from {
                        transform: rotate(0)
                    }
                    to {
                        transform: rotate(360deg)
                    }
                }
            `}</style>
        </>
    )
}


export default Timeline