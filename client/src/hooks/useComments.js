/* eslint-disable style/indent */
import { useEffect, useState } from 'react';
import commentsAPI from '../api/comment-api';

export function useCreateComment() {
    const createHandler = (gameId, comment) => commentsAPI.create(gameId, comment);

    return createHandler;
};

export function useGetAllComents(gameId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAll(gameId);

            setComments(result);
        })();
    }, [gameId]);

    return [comments, setComments];
};
