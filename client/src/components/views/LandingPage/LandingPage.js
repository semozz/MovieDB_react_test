//import { response } from 'express';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        
        fetchMovies(CurrentPage)
        
    }, [])

    const fetchMovies = (page) => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page + 1}`;
        console.log(endpoint)

        fetch(endpoint).then(response => response.json())
        .then(response => {
            console.log(response.results)

            if (page == 0)
            {
                setMovies(response.results)
                setMainMovieImage(response.results[0])
            }
            else
            {
                setMovies([...Movies, ...response.results])
            }

            setCurrentPage(page + 1)
        })
    }

    const loadMoreItems = () => {
        return fetchMovies(CurrentPage)
    }

    return (
        <>
            <div style={{ width: '100%', margin: 0 }}>
                {/*Main Image*/}
                {MainMovieImage && 
                    <MainImage 
                        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                        title = {MainMovieImage.original_title}
                        description = {MainMovieImage.overview}
                    />
                }

                <div style={{ width: '85%', margin: '1rem auto' }}>

                    <h2>Movies by latest</h2>
                    <hr></hr>

                    {/*Movie Grid Card*/}
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key = {index}>
                                <GridCards
                                    isMovie = {true}
                                    image = {movie.poster_path ? 
                                        `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                    movieId = {movie.id}
                                    movieName = {movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                    
                    </Row>

                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreItems}>Load More</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
