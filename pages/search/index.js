import BackNav from "components/BackNav"
import SearchUser from "components/SearchUser"

const Search = () => {
    return (
        <>
            <BackNav href="/home"/>
            <div>
                <SearchUser/>
            </div>
            <style jsx>{`
                div {
                    width: 100%;
                    height: 100%;
                    position: relative;

                }    
                
            `}</style>
        </>
    )
}

export default Search