import React from "react";
import axios from 'axios';


class LatestMovies extends React.Component {
	componentDidMount() {
		let latestFilmList = [];
		this.setState({
			latestFilms: latestFilmList
		})
	}

	getLatestMovies() {
		console.log("Getting list of latest Films");
		axios.get('https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json')
			.then(res => {
				console.log(res.data);
				return res.data;
			})
			.catch(err => {
				console.error(err);
				return [
					{title: "The Shawshank Redemption", rank: 1,id: "tt0111161"},
					{title: "The Godfather", "rank": 2, id: "tt0068646"},
					{title: "The Godfather: Part II", "rank": 3, id: "tt0071562"},
					{title: "Pulp Fiction", "rank": 4, id: "tt0110912"},
					{title: "The Good, the Bad and the Ugly", rank: 5, id: "tt0060196"}
					];
			});
	}

	render() {
		let latestFilms = this.getLatestMovies();
		const listItems = latestFilms.map(
			(film) =>
				<div key={film.id} className={"col m3"}>{film.title}</div>
			);

		return (
			<div className={"row"}>
				{listItems}
			</div>
		);
	}
}

export default LatestMovies
