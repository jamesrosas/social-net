import Devit from "components/Devit"
import { useEffect, useState } from "react"

const Timeline = () => {

    const [timeline, setTimeline] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/statuses/home_timeline")
            .then(res => res.json())
            .then(setTimeline)
    }, [])

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
            </section>
            <nav></nav>

            <style jsx>{`

                header {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    position: fixed;
                    top: 0;
                    height: 50px;
                    width: 100%;
                    max-width: 500px;
                    border-bottom: 1px solid grey;
                }

                section {
                    padding-top: 70px;
                    padding-bottom: 60px;
                    background: #fff;
                    /* height: fit-content; */
                    overflow: auto;
                }

                nav {
                    position: fixed;
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

                @media (min-width: 500px) {
                    header {
                        top: 2rem;
                    }
                    nav {
                        bottom: 2rem;
                    }
                    section {
                        padding-top: 0;
                    }
                }
            `}</style>
        </>
    )
}


export default Timeline