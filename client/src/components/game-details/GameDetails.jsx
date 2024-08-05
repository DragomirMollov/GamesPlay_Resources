import { useParams } from "react-router-dom";
import { useGetOneGames } from "../../hooks/useGames";
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCreateComment, useGetAllComents } from "../../hooks/useComments";

const initialValues = {
    comment: '',
};

export default function GameDetails() {
    const { gameId } = useParams();
    const [comments, serComments] = useGetAllComents(gameId);
    const createComment = useCreateComment();
    const [game] = useGetOneGames(gameId);
    const { isAuthenticated } = useAuthContext();
    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, ({ comment }) => {
        createComment(gameId, comment);
    });

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.map(coment => (
                                <li key={coment._id} className="comment">
                                    <p>Username: {coment.text}</p>
                                </li>
                            ))
                        }
                    </ul>
                    
                    {comments.length === 0 && <p className="no-comment">No comments.</p>}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {/* <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div> */}
            </div>

            {/* <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            {isAuthenticated && (
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={submitHandler}>
                        <textarea
                            name="comment"
                            placeholder="Comment......"
                            onChange={changeHandler}
                            value={values.comment}
                        ></textarea>

                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}


        </section>
    );
};