import { ChakraProvider } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
	const CLIENT_ID = '0d8e14b5b98d4e9d8bd2ac71e6ba88f3';
	const REDIRECT_URI = 'http://localhost:3000';
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
	const RESPONSE_TYPE = 'token';

	const [token, setToken] = useState(window.sessionStorage.getItem('token'));
	const [tracks, setTracks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [dataRecommendation, setDataRecommendation] = useState([]);
	const [display, setDisplay] = useState({
		recom: false,
		search: false,
	});

	useEffect(() => {
		const hash = window.location.hash;
		let getToken = window.sessionStorage.getItem('token');

		if (!getToken && hash) {
			getToken = hash
				.substring(1)
				.split('&')
				.find((element) => element.startsWith('access_token'))
				.split('=')[1];

			window.location.hash = '';
			window.sessionStorage.setItem('token', getToken);
			setToken(getToken);
		}
		if (token) {
			getGenres(token);
		}
	}, [token]);

	async function getRecommendation(genre) {
		let trackParameters = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		};
		await fetch(
			'https://api.spotify.com/v1/recommendations?&seed_genres=' +
				genre +
				'&limit=10',
			trackParameters
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.tracks);
				setDisplay({recom: true, search: false})
				setDataRecommendation(data.tracks);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	async function getGenres(token) {
		let genreParameters = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		};
		await fetch(
			'https://api.spotify.com/v1/recommendations/available-genre-seeds',
			genreParameters
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.genres);
				setGenres(data.genres);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	function logout() {
		setToken('');
		window.sessionStorage.removeItem('token');
	}

	async function search(input) {
		// Get track
		let trackParameters = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		};
		await fetch(
			'https://api.spotify.com/v1/search?q=' +
				input +
				'&type=track&limit=20',
			trackParameters
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.tracks.items);
				setDisplay({recom: false, search: true})
				setTracks(data.tracks.items);
			})
			.catch((error) => {
				console.log(error.message);
				setTracks([]);
			});
	}

	return (
		<ChakraProvider>
			{token ? (
				<Dashboard
					handleSearch={search}
					tracks={tracks}
					genres={genres}
					dataRecommendation={dataRecommendation}
					handleRecom={getRecommendation}
					display={display}
				/>
			) : (
				<Home
					clientId={CLIENT_ID}
					redirectUri={REDIRECT_URI}
					authEndpoint={AUTH_ENDPOINT}
					responseType={RESPONSE_TYPE}
				/>
			)}
		</ChakraProvider>
	);
}

export default App;
