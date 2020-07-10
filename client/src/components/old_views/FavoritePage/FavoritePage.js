import React, { useEffect, useState } from 'react'
import './FavoritePage.css'
import axios from 'axios';
import { Popover } from "antd";
import { IMAGE_BASE } from '../../Config';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie();
    }, [])

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', 
        {userFrom: localStorage.getItem('userId')})
        .then(res => {
            if (res) {
                setFavorites(res.data.favorites)
            } else {
                alert("영화 정보를 가져오는것을 실패 하였습니다.");
            }
        })
    }

    const content = (
        <div>
            { Favorites.moviePost ? <img src={`${IMAGE_BASE}w500${Favorites.moviePost}`} /> : "no image"}
        </div>

    )

    const onClickDelete = (movieId, userFrom) => {        
        const variables = {
            movieId,
            userFrom
        }

        axios.post('/api/favorite/aremoveFromFavorite', variables)
        .then(res => {
            if (res) {
                fetchFavoredMovie();
            } else {
                alert("즐겨찾기 삭제에 실패 하였습니다.");
            }
        })
    }




    const renderCards = Favorites.map((favorite, index) => {
        return <tr key={index}>
            <Popover content={content} title ={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
                <td>{favorite.movieRunTime} mins</td>
                <td><button onClick={() => {onClickDelete(favorite.movieId, favorite.userFrom)}}>Delete</button></td>
        </tr>
    })




    return (
        <div>
            <h2> Favorite movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
