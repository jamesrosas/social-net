
const Layout = ({children}) => {
    return (
        <>
        <div className="container">
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
                background-color: #80808029;
            }   
            main {
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
                position: relative;
            } 
            @media (min-width: 500px){
                main {
                    height: fit-content;
                }
            }
        `}</style>
        </>
    )
}

export default Layout