import { useState } from "react";
import { useParams } from "react-router-dom";
import commentApi from "../../api/comment-api";
import { useGetOneGames } from "../../hooks/useGames";

export default function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useGetOneGames(gameId);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');

    const commentSubmittHandler = async (e) => {
        e.preventDefault();

        const newComment = await commentApi.create(gameId, username, comment);

        setGame(oldState => ({
            ...oldState,
            comments: {
                ...oldState.comments,
                [newComment._id]: newComment,
            }
        }));

        setUsername('');
        setComment('');
    };

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
                        {Object.keys(game.comments || {}).length > 0
                            ? Object.values(game.comments).map(coment => (

                                <li key={coment._id} className="comment">
                                    <p>{coment.username}: {coment.text}</p>
                                </li>
                            ))
                            : <p className="no-comment">No comments.</p>
                        }
                    </ul>
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {/* <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div> */}
            </div>

            {/* <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={commentSubmittHandler}>
                    <input
                        type="text"
                        placeholder="Pesho"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    ></textarea>

                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};