import axios from "axios";

const apiUrl = "http://127.0.0.1:8000"
const config = {
    headers: {
        Authorization: localStorage.getItem('token')
    }
}


export class Api {

    static invalidStateSession() {
        console.log("403 Unauthorized");
        localStorage.removeItem('token');
        this.logout();
    }

    static get(url) {
        return axios.get(apiUrl + url, config)
            .then(response => {
                return response;
            });
    }

    static post(url, body) {
        return axios.post(apiUrl + url, {withCredentials: true, body: body})
            .then(response => {
                return response;
            });
    }

    static delete(url) {
        return axios.delete(apiUrl + url, config)
            .then(response => {
                return response;
            });
    }

    static login(email, password) {
        console.log('logging');
        return axios.post("/login", {
            email: email,
            password: password,
        });
    }

    static register(email, name, password, surname, nationality, languages, dateOfBirth) {
        return axios.post("/create", {
            email: email,
            name: name,
            password: password,
            surname: surname,
            nationality: nationality,
            languages: languages,
            dateOfBirth: dateOfBirth,
            config
        });
    }

    static logout() {
        return axios.post("/logout");
    }

    static showUserInfo(id) {
        return this.get(`/api/user/show/${id}`);
    }

    static getAllMovies() {
        return this.get("/api/movie/getAll");
    }

    static getWatchedMoviesByUser(id) {
        return this.get(`/api/movie/get/${id}`);
    }

    static addWatchedMoviesByUser(userId, movieId, rating) {
        return axios.post("/api/movie/add", {
            userId: userId,
            movieId: movieId,
            rating: rating
        })
    }


    static getAllSeries() {
        return this.get("/api/series/getAll");
    }

    static getWatchedSeriesByUser(id) {
        return this.get(`/api/series/get/${id}`);
    }

    static addWatchedSeriesByUser(userId, seriesId, rating) {
        return axios.post("/api/series/add", {
            userId: userId,
            seriesId: seriesId,
            rating: rating
        })
    }

    static getAllUsers() {
        return axios.get("/api/user/get/all");
    }

    static addFriend(sender, receiver) {
        return axios.post("/api/user/add/friend", {
            sender: sender,
            receiver: receiver
        });
    }

    static getUserFriendRequests(id) {
        return axios.post("/api/user/get/friend/requests", {
            id: id
        });
    }

    static getUserFriends(id) {
        return axios.post("/api/user/get/friends", {
            id: id
        });
    }

    static deleteFriend(senderId, receiverId) {
        return axios.post("/api/user/delete/friend", {
            senderId: senderId,
            receiverId: receiverId
        });
    }

    static confirmFriendRequests(senderId, receiverId) {
        return axios.post("/api/user/confirm/friend", {
            senderId: senderId,
            receiverId: receiverId
        });
    }
}