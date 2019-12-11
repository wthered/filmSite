import React from "react";
import LatestMovies from "../components/LatestMovies";


class mainPage extends React.Component {
	render() {
		return (
			<div className={"col s12"}>
				<div className = 'card-panel teal lighten-2'>Latest Movies</div>
				<LatestMovies />
			</div>
		)
	}
}

export default mainPage;
