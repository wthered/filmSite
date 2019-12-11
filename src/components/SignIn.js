import React from 'react';
import axios from 'axios';
import auth from "./auth";
// import {Redirect} from 'react-router-dom';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			success: false
		};
		this.onchange=this.onChange.bind(this);
		this.onSubmit=this.onSubmitForm.bind(this);
	}

	// componentDidMount() {
	// 	console.log("Sign In Component did mount");
	// }

	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	console.log(this.state);
	// }

	async onSubmitForm(e) {
		e.preventDefault();
		console.log("Login Function");
		let bodyFormData = new FormData();
		bodyFormData.set('username', this.state.username);
		bodyFormData.set('password', this.state.password);
		axios({
			method: 'post',
			url: 'http://www.pliassas.gr/react/auth.php',
			data: bodyFormData,
			headers: {'Content-Type': 'multipart/form-data' }
		})
			.then( (response) => {
				//handle success
				console.log(response.data);
				this.setState({
					success: response.data.success
				});
				auth.authendicated = response.data.success;
			}).catch(err => {
				console.error(err);
			}).finally(() => {
			if(auth.isAuthenticated()) {
				this.props.history.push('/home');
			}
		})
	};

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		return (
			<form className="col s12" onSubmit={this.onSubmit}>
				<div className={"row"}>
					<h3 className={"center"}>Login Form</h3>
					<div className={"center red black-text"}>Enter your credentials here</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input id={"username"} placeholder="Username" name="username" type="text" className="validate" value={this.state.username} onChange={this.onchange} />
						<label htmlFor="username">&nbsp;</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input id={"password"} placeholder={"Password"} name={"password"} type="password" className="validate" value={this.state.password} onChange={this.onchange} />
						<label htmlFor="password">&nbsp;</label>
					</div>
				</div>
				<button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
			</form>
		);
	}

}

export default SignIn;
