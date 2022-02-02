import { useState, useEffect } from "react"
import {addComment , getCurrentUser } from "firebase/client"
import useUser from "hooks/useUser"
import Avatar from "components/Avatar"
import Send from "components/Icons/Send"


const AddComment = ({idNett}) => {

    const [comment, setComment] = useState("")
    const [commentUser, setCommentUser] = useState({})

    const user = useUser()

    useEffect(() => {
        let unsubscribe
        if (user) {
            unsubscribe = getCurrentUser( data => {
                setCommentUser(data)
            })
        }

        return () => unsubscribe && unsubscribe()
        
    }, [user])

    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }

    const handleSubmitComment = (e) => {
        e.preventDefault()
        addComment({
            content: comment
        }, idNett).then(() => setComment(""))
        // console.log("comentario hecho")
    }

    return (
        <>
            <form onSubmit={handleSubmitComment}>
                <Avatar src={commentUser.avatar} alt={commentUser.userName}  width="3.5rem" height="3.5rem"/>
                <textarea onChange={handleChangeComment} value={comment} placeholder="Agrega un comentario" autoFocus>
                </textarea>
                <button>
                    <Send width="4rem" height="4rem"/>
                </button>
            </form>

            <style jsx>{`
                form {
                    position: sticky;
                    bottom: 0;
                    width: 100%;
                    height: fit-content;
                    justify-content: space-between;
                    align-items: center;
                    display: flex;
                    /* border: 1px solid red; */
                    border-right: 2px solid black;
                    border-left: 2px solid black;
                    padding: 2rem 1rem;
                    background: white;
                    border-top: 2px solid black;
                    border-radius: 25px 25px 0 0;
                }

                textarea {
                    font-family: 'Poppins', sans-serif;
                    outline: none;
                    width: 71%;
                    font-size: 1.7rem;
                    border-radius: 8px;
                    border: 1px solid grey;
                    padding: 5px;
                    height: fit-content;
                    min-height: 80px;
                    resize: none;
                }
                textarea::-webkit-scrollbar{
                    width: 5px;
                    background-color: #ffffff;
                    border-radius: 8px;
                }
                textarea::-webkit-scrollbar-thumb{
                    background: rgb(0 0 0 / 30%);
                    border-radius: 20%;
                }

                button {
                    border: none;
                    background: none;
                    width: fit-content;
                    height: fit-content;
                }


            `}</style>
        
        </>
    )
}

export default AddComment