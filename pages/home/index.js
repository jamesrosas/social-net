import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"

const Timeline = () => {

    const [timeline, setTimeline] = useState([])

    const user = useUser()

    const getDta = async() => {
        const response = await fetch('http://localhost:3000/api/statuses/home_timeline')
        const data = await response.json()
        setTimeline(data)
    }

    useEffect(() => {
        user &&
            getDta()
        // fetch("http://localhost:3000/api/statuses/home_timeline")
        //     .then(res => res.json())
        //     .then(setTimeline)
    }, [user])

    return (
        <>
            <header>
                <p>Incio</p>
            </header>
            <section>
                {timeline.map( devit => {
                    return (
                        <Devit key={devit.id} userName={devit.name} image={devit.avatar} description={devit.description} />
                    )
                })}
                {!timeline && (
                    <div className="loader">
                        <span></span>
                    </div>
                )}
            </section>
            <nav></nav>

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