import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import axios from 'axios';
import auth from "./auth";


class MaterNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			token: ''
		};
		sessionStorage.setItem('token', this.state.token || '');
	}

	componentDidMount() {
		console.log("Navigation Bar just mounted");
		console.log(sessionStorage.getItem('token'));
		// axios.get('http://www.pliassas.gr/react/index.php')
		// 	.then(res => {
		// 		console.log(res.data);
		// 	})
		// 	.catch(err => {
		// 		console.error(err);
		// 	});
		let bodyFormData = new FormData();
		bodyFormData.set('sessionToken', sessionStorage.getItem('token'));
		axios.post('http://www.pliassas.gr/react/token.php', bodyFormData)
			.then(function (response) {
				//handle success
				console.log(response.data);
			})
			.catch(tokenError => {
				//handle error
				console.error(tokenError);
			});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("Navigation Bar did update");
		// console.log(sessionStorage.getItem('token'));
	}

	render() {
		if(!auth.isAuthenticated()) {
			return (
				<nav>
					<div className="cyan nav-wrapper">
						<a href="/" className="brand-logo">That Film</a>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><NavLink to="/sign-in" className="waves-effect waves-light btn">Sign In</NavLink></li>
							<li><NavLink to="/sign-up" className="waves-effect waves-light btn">Sign Up</NavLink></li>
						</ul>
					</div>
				</nav>
			)
		} else {
			return (
				<nav>
					<div className="cyan nav-wrapper">
						<a href="/" className="brand-logo">That Film</a>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li>{this.state.username}</li>
							<li><NavLink to={"/logout"}>Logout</NavLink></li>
						</ul>
					</div>
				</nav>
			)
		}
	}
}

export default withRouter(MaterNav);
