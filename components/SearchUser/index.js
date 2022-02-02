import useGetNetts from "hooks/useGetNetts"
import { useMemo, useState } from "react"
import Link from "next/link"
import AnimateLogo from "components/AnimateLogo"

const SearchUser = () => {

    const [ inputSearch, setinputSearch] = useState("")

    const { allNetts } = useGetNetts()

    //con esta constante creamos un nuevo array basado en allNetts , el cual nos devolvera en cada indice el nombre del usuario una unica vez sin volverlo a repetir, lo cual nos sirve para mostrar en los resultados el nombre del user que se esta buscando una unica vez;
    const onlyOneResult = [...new Set(allNetts.map( doc =>  doc.userName  ))]

    console.log("onlyOneResult", onlyOneResult)

    const filterOnlyOne = useMemo(() => onlyOneResult.filter( dta => {
            return dta.toLowerCase().includes(inputSearch.toLowerCase())
        })
    , [onlyOneResult, inputSearch])
    
    
    const filterAllNetts = useMemo(() => allNetts.filter( dta => {
        return dta.userName.toLowerCase().includes(inputSearch.toLowerCase())
    })
    , [allNetts, inputSearch])
    
    console.log("filter", filterAllNetts)

    console.log("esta es la info de allNetts =>", allNetts)

    const handleChangeInputSearch = (e) => {
        setinputSearch(e.target.value)
    }

    return (
        <div className="search-container">  
            <form>
                <input value={inputSearch} onChange={handleChangeInputSearch} placeholder="Buscar usuario" autoFocus/>
            </form>
            <div className="logo-container">
                <AnimateLogo/>
            </div>
            <div className="results-container">
                {inputSearch.length > 0 && filterOnlyOne.map( nameUser => {
                    return (
                        <div id="result-search_container" key={nameUser}>
                            {filterAllNetts.map( doc => {
                                if(doc.userName === nameUser){
                                    return (
                                        <Link href={`/userprofile/${doc.userId}`}>
                                            <a>
                                                <div className="link-container">
                                                    <img src={doc.avatar} width={35} height={35}/>
                                                    <p>{nameUser}</p>
                                                </div>
                                            </a>
                                        </Link>   
                                    )
                                }
                            })}      
                        </div>
                    )
                })} 
            </div>
                 
            <style jsx>{`

               .search-container {
                   display: flex;
                   align-items: center;
                   position: relative;
                   width: 100%;
                   height: 100%;
               }
               form {
                width: 100%;
                position: absolute;
                top: 2rem;
                left: 0;
                display: flex;
               } 

               input {
                width: 80%;
                border-radius: 8px;
                padding: 8px;
                margin: 0 auto;
                border: 1px solid grey;
                font-size: 1.8rem;
               }
                
               .logo-container {
                   opacity: 0.4;
                   width: 100%;
                   height: fit-content;
               }

               .results-container{
                   width: 100%;
                   height: 85%;
                   position: absolute;
                   top: 7rem;
                   left: 0;
                   overflow: auto;
               }

               #result-search_container {
                   width: 96%;
                   height: 50px;
                   padding: 20px; 
                   background: #8080801c;
                   position: relative;
                   border-radius: 5px;
                   overflow: clip;
                   margin: .3rem auto;
                   backdrop-filter: blur(20px);
               }
               .link-container {
                   position: absolute;
                   top: 0;
                   left: 0;
                   width: 100%;
                   height: 100%;
                   padding: 5px;
                   display: flex;
                   align-items: center;
                   gap: 1rem;
               }

               .link-container p{
                   text-decoration: none;
                   font-family:'Poppins', sans-serif;
                   font-size: 1.8rem;
                   color: black;
                   font-weight: 600;
               }
               .link-container img {
                   border-radius: 50%;
                   object-fit: cover;
               }
            
            `}</style>
        </div>
    )
}

export default SearchUser