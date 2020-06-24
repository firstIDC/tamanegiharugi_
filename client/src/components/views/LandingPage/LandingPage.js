import React, { useEffect, useState } from 'react'
// import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY,IMAGE_BASE } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import { useStore } from 'react-redux';


function LandingPage(props) {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    let movieId = props.match.params.movieId;

    useEffect(() => {

        console.log(props.match)
        
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        
         fetchMovies(endpoint);
        
    }, [])

    
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1 }`
        fetchMovies(endpoint);
        
    }


    const fetchMovies = (point) => {
        fetch(point)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setMovies([...Movies, ...res.results])
                setMainMovieImage(res.results[0])
                setCurrentPage(res.page)
            })
    }



    return (
        <div style={{width:'100%',margin:'0'}}>
            
            {/* { Mainimage} */}
            { MainMovieImage && 
                <MainImage image={`${IMAGE_BASE}w1280${MainMovieImage.backdrop_path}`}
                            title={MainMovieImage.original_title}
                            text={MainMovieImage.overview}
                
                />
            }

            <div style={{width:'85%', margin : '1rem auto'}}>
            
                <h2>Movides by latest</h2>
                <hr />

                {/* {Movie Grid Cards} */}
            <Row gutter={[16,16]}>

                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <GridCards
                            image={movie.poster_path ?
                                `${IMAGE_BASE}w500${movie.poster_path}` : null }
                            movieId = {movie.id}
                             movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}

            </Row>

            </div>
        <div style={{display: 'flex' , justifyContent:'center' }}>
            <button onClick={loadMoreItems}>Load More</button>
        </div>

        </div>
    )
}

export default LandingPage
