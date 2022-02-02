import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import { useRouter } from "next/router"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import { deleteComment } from "firebase/client"
import Delete from "components/Icons/Delete"
import useCurrentUser from "hooks/useCurrentUser"
import useCustomAlerts from "hooks/useCustomAlerts"

const Comment = ({ userName, avatar, content, createdAt, img, uid, id, originalNettId}) => {

    const timeAgo = useTimeAgo(createdAt)
    const createdAtFormated = useDateTimeFormat(createdAt)

    // sacar el uid para pasarselo como parametro al link

    const router = useRouter()
    const currentUser = useCurrentUser()
    const { toast, optionsAlertMessage } = useCustomAlerts()


    const handleClickProfile = (e) => {
        e.preventDefault()
        if(uid === currentUser.userId){
            router.push('/profile')
        } else {
            router.push(`/userprofile/${uid}`)
        }        
    }

    const handleClickDeleteComment = () => {
        optionsAlertMessage.fire({
            text: 'Segur@ que quieres eliminar este comentario?',
            color: 'black'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteComment(originalNettId, id).then(() => {
                    toast.fire({
                        text: 'Comentario eliminado',
                        color: 'black',
                        icon: 'success'
                      })
                })
            } 
          })
    }    
    return (
        <>
        <article>
            <div className="comment-container">               
                <Avatar onClick={handleClickProfile} src={avatar} alt={userName} width="35px" height="35px"/>
                <div>
                    <header>
                        <h5 onClick={handleClickProfile}>{userName}</h5>
                        <span></span>
                        <time title={createdAtFormated}>{timeAgo}</time>
                    </header>
                    <p>{content}</p>
                    {img && <img src={img}/>}
                </div>
                {uid === currentUser.userId && (
                    <span className="delete-icon" onClick={handleClickDeleteComment}>
                        <Delete width="2rem" height="2rem"/>
                    </span>
                )}
               
            </div>
        </article>

        <style jsx>{`
            article {
                display: flex;
                align-items: flex-end;
                padding: 1rem 1rem 1rem 3rem;
                width: 100%;
                height: fit-content;
                font-size: 1.8rem;
            }
            .comment-container {
                border: 1px solid #80808073;
                border-radius: 8px;
                width: 100%;
                padding: 1rem;
                display: flex;
                position: relative;
            }

            .avatar-image {
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
            }
            header {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                column-gap: 1rem;
                margin-bottom: .7rem;
            }
            h5 {
                font-weight: 600;
                font-size: 1.7rem;
                cursor: pointer;
                font-family: 'Poppins', sans-serif;
            }

            time {
                font-size: 1.4rem;
                color: grey;
            }

            p {
                font-family: 'Poppins',sans-serif;
                font-size: 1.6rem;
                padding: 0.2rem 0.7rem;
                background: #80808045;
                border-radius: 8px;
                width: 100%;
            }
            
            small {
                color: grey;
                font-size: 1.6rem;
            }
            img {
                width: 100%;
                height: auto;
                border-radius: 10px;
                margin-top: 1rem;
            }
            a {
                text-decoration: none;
                color: grey;
                font-size: 1.4rem;
            }
            span {
                width: 3px;
                height: 3px;
                background: grey;
                border-radius: 50%;
                border: none;
            }

            .delete-icon {
                position: absolute;
                top: .5rem;
                right: 2rem;
                background: none;
                cursor: pointer;
                width: fit-content;
                height: fit-content;
            }

        `}</style>
        </>
    )
}

export default Comment