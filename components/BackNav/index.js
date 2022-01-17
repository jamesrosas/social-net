import Link from "next/link"

const BackNav = ({ href }) => {
    return (
        <>
            <nav>
                <Link href={href}>
                    <a>
                        <div>
                            <span></span>
                        </div>
                    </a>
                </Link>
            </nav>

            <style jsx>{`
                nav {
                    width: 100%;
                    height: 50px;
                    background-image: linear-gradient(101deg, #d200ddb3 20%, cyan);
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    position: sticky;
                    top: 0;
                }

                div {
                    width: 40px;
                    height: 35px;
                    position: relative;
                    padding: 5px;
                }

                span {
                    width: 30px;
                    height: 4px;
                    background: black;
                    border-radius: 10px;
                    position: absolute;
                    top: 1.5rem;
                }
                span::before{
                    content: "";
                    width: 20px;
                    height: 4px;
                    border-radius: 10px;
                    background: black;
                    transform: rotate(-30deg);
                    position: absolute;
                    bottom: .5rem;
                    left: -.2rem;
                }
                span::after{
                    content: "";
                    width: 20px;
                    height: 4px;
                    border-radius: 10px;
                    background: black;
                    transform: rotate(30deg);
                    position: absolute;
                    top: .5rem;
                    left: -.2rem;
                }

                nav a:hover{
                    background: #dedede9c;
                    border-radius: 10px;
                }
                
            `}</style>
        </>
    )
}

export default BackNav