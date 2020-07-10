import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Alert } from 'antd';
function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {
        
        axios.post('/api/favorite/favoriteNumber', variables)
        .then(res => {
            if (res.data.success) {
                setFavoriteNumber(res.data.favoriteNumber)
            } else {
                alert('숫자 정보를 가져오는데 실패 하였습니다.')
            }
        });

        axios.post('/api/favorite/favorited', variables)
        .then(res => {
            if (res.data.success) {
                setFavorited(res.data.favorited)
            } else {
                alert('정보를 가져오는데 실패 하였습니다.')
            }
        });
    
    }, [])

    const onClickFavorite = () => {
        if (Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
            .then(res => {
                if (res.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                } else {
                    alert("Favorite 리스트에서 삭제 실패하였습니다.")
                }
            })
        } else {
            axios.post('/api/favorite/addToFavorite', variables)
            .then(res => {
                if (res.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                } else {
                    alert("Favorite 리스트에서 추가 실패하였습니다.")
                }
            })
        }

        setFavorited(!Favorited)

    }



    return (
        <div style={{display:'flex', justifyContent:'flex-end'}}>
            <button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorite"} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
