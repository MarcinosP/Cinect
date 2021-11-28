import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearchSeries(query, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [series, setSeries] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setSeries([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        let myUrl =
        query.length == 0
            ? "https://data-imdb1.p.rapidapi.com/series/order/byRating/"
            : `https://data-imdb1.p.rapidapi.com/series/idbyTitle/${query}/`;

        axios({
            method: "GET",
            url: myUrl,
            params: { page_size: "100", q: query, page: pageNumber },
            headers: {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "660967386fmsh651b062d09a33c4p19cd73jsn494fc351a8b8",
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setSeries((prevSeries) => {
                    return [...new Set([...prevSeries, ...res.data.results])];
                });
                setHasMore(res.data.results.length > series.length + 1);
                setLoading(false);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                setError(true);
            });
        return () => cancel();
    }, [query, pageNumber]);

    return { loading, error, series, hasMore };
}
