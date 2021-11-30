import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearchMovies(query, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setMovies([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        let myUrl = "https://data-imdb1.p.rapidapi.com/movie/order/byRating/";
        if (query.byYear.length > 0) {
            myUrl = `https://data-imdb1.p.rapidapi.com/movie/byYear/${query.byYear}/`;
        } else if (query.byRating == true) {
            myUrl = "https://data-imdb1.p.rapidapi.com/movie/order/byRating/";
        } else if (query.byPopularity == true) {
            myUrl = "https://data-imdb1.p.rapidapi.com/movie/order/byPopularity/";
        } else if (query.byGenre.length > 0) {
            myUrl = `https://data-imdb1.p.rapidapi.com/movie/byGen/${query.byGenre}/`;
        } else if (query.bySearchInput.length > 0) {
            myUrl = `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${query.bySearchInput}/`;
        }

        axios({
            method: "GET",
            url: myUrl,
            params: { page_size: "25", q: query, page: pageNumber },
            headers: {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "660967386fmsh651b062d09a33c4p19cd73jsn494fc351a8b8",
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setMovies((prevMovies) => {
                    return [...new Set([...prevMovies, ...res.data.results])];
                });
                setHasMore(res.data.count > movies.length);
                setLoading(false);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                setError(true);
            });
        return () => cancel();
    }, [query, pageNumber]);

    return { loading, error, movies, hasMore };
}
