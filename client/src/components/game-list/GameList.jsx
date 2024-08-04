import { useGetAllGames } from '../../hooks/useGames';
import GameListItem from './game-list-item/GameListItem';

export default function GameList() {
    const [games] = useGetAllGames();

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0
                ? games.map(game => <GameListItem key={game._id} {...game} />)
                : <h3 className="no-articles">No games yet</h3>
            }
        </section>
    );
};



// useEffect(() => {
//     const neshto = async () => {
//         const result = await gamesAPI.getAll()

//         setGames(result);
//     }
//     neshto();
// },[]);

// useEffect(() => {
//     (async () => {
//         const result = await gamesAPI.getAll()

//         setGames(result);
//     })();
// },[]);

// useEffect(() => {
//     (async () => {
//         const result = await gamesAPI.getAll()

//         setGames(result);
//     })();
//     gamesAPI.getAll().then(result => setGames(result));
// },[]);