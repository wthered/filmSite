import React from "react";
import auth from "./auth";


class Logout extends React.Component {
	render() {
		if(!auth.isAuthenticated()) {
			return (
				<div>
					<h1>Logout Page</h1>
				</div>
			)
		} else {
			return (
				<button onClick={() => {
					auth.logout(() => {
						this.props.history.push('/');
					})
				}}>Logout</button>
			)
		}
	}
}

export default Logout;
