import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd'

function MovieDetail(props) {
	console.log(props.match)
	let movieId = props.match.params.movieId;

	const [Movie, setMovie] = useState([])
	const [Casts, setCasts] = useState([])
	const [ActorToggle, setActorToggle] = useState(false)

	useEffect(() => {
	  
		const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    
        fetch(endpoint).then(response => response.json())
        .then(response => {
            
			setMovie(response);
		})

		const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        fetch(endpointCrew).then(response => response.json())
        .then(response => {
            console.log(response);
			setCasts(response.cast);
		})

	}, [])

	const toggleActorView = () => {
		setActorToggle(!ActorToggle);
	}
	
  return (
	<div>
		{ /* Header */ }
		<MainImage 
			image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
			title = {Movie.original_title}
			description = {Movie.overview}
		/>

		{ /* Body */ }
		<div style={{ width: '85%', margin: '1rem auto'}}>
			{ /* Movie Info */ }
			<MovieInfo
				movie={Movie}
			/>
			<br/>
			{ /* Actor Grid */ }
			<div style={{display: 'flex', justifyCotent: 'center', margin: '2rem'}}>
				<button onClick={toggleActorView}>Toggle Actor</button>
			</div>

			{ ActorToggle && 
				<Row gutter={[16, 16]}>
					{Casts && Casts.map((cast, index) => (
						<React.Fragment key = {index}>
							<GridCards
								isMovie = {false}
								image = {cast.profile_path ? 
									`${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
								movieName = {cast.name}
							/>
						</React.Fragment>
					))}
				</Row>
			}
			
		</div>
	</div>
  )
}

export default MovieDetail
