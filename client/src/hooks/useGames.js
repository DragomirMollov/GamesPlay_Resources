import { useEffect, useState } from 'react';
import gamesAPI from '../api/games-api';

/* eslint-disable style/indent */
export function useGetAllGames() {
    const [games, setGames] = useState([]);

    // useEffect(() => {
    //     gamesAPI.getAll()
    //         .then(result => setGames(result));
    // }, []);

    useEffect(() => {
        (async () => {
            const result = await gamesAPI.getAll();

            setGames(result);
        })();
    }, []);

    return [games, setGames];
};
