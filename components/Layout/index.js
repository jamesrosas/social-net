import Head from "next/head"

const Layout = ({children}) => {
    return (
        <>
        <div className="container">
            <Head>
                <link rel="icon" href="/favicon-web.png" />
            </Head>
            <main>
                {children}
            </main>
        </div>

        <style jsx>{`
            .container {
                width: 100%;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background-image: url("/neon-background.jpg");
                background-size: cover;
                background-position: center;
                background-repeat>: no-repeat;
            }   
            main {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                max-width: 415px;
                height: 100vh;
                max-height: 825px;
                background-color: white;
                box-shadow: 2px 2px 6px rgba(128, 128, 128, 0.733);
                position: relative;
            } 
            @media (max-width: 500px){
                main {
                    height: 100vh;
                    max-height: 100vh;
                }
            }

            @media (min-width: 800px){
                main {
                    width: 400px;
                    height: 100vh;
                    max-height: 700px;
                }
            }


        `}</style>
        </>
    )
}

export default Layout