import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from 'axios';


class Autocomplete extends Component {
	static propTypes = {
		suggestions: PropTypes.instanceOf(Array)
	};

	static defaultProps = {
		suggestions: []
	};

	constructor(props) {
		super(props);

		this.remoteURL = 'https://my.api.mockaroo.com/temp.json?key=9a523780';

		this.state = {
			// The active selection's index
			activeSuggestion: 0,
			// The suggestions that match the user's input
			filteredSuggestions: [],
			// Whether or not the suggestion list is shown
			showSuggestions: false,
			// What the user has entered
			userInput: "",
			// Remote data Array
			remoteData: []
		};
	};

	componentDidMount() {
		axios.get('https://my.api.mockaroo.com/temp.json?key=9a523780')
			.then(res => {
				this.setState({
					remoteData: res.data
				});
				// console.log(res.data);
			})
			.catch(err => {
				console.error(err);
			})
	}


	// Event fired when the input value is changed
	onChange = e => {
		// let suggestions = this.props.suggestions;
		let suggestions;
		axios.get(this.remoteURL)
			.then(res => {
				// console.log(res.data);
				this.setState({
					remoteData: res.data
				});
			});

		const userInput = e.currentTarget.value;
		suggestions = this.state.remoteData;

		// Filter our suggestions that don't contain the user's input
		const filteredSuggestions = suggestions.filter(
			suggestion => suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
		);

		// Update the user input and filtered suggestions, reset the active
		// suggestion and make sure the suggestions are shown
		this.setState({
			activeSuggestion: 0,
			filteredSuggestions: filteredSuggestions,
			showSuggestions: true,
			userInput: e.currentTarget.value,
			remoteData: suggestions
		});
	};

	// Event fired when the user clicks on a suggestion
	handleClick = e => {
		// Update the user input and reset the rest of the state
		this.setState({
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			userInput: e.currentTarget.innerText
		});
	};

	render() {
		const {
			onChange,
			// handleClick,
			onKeyDown,
			state: {
				// activeSuggestion,
				filteredSuggestions,
				showSuggestions,
				userInput
			}
		} = this;

		let suggestionsListComponent;

		if (showSuggestions && userInput) {
			if (filteredSuggestions.length) {
				suggestionsListComponent = (
					<ul className={"collection"}>
						{filteredSuggestions.map(suggestion => {
							return (
								<li className={"collection-item avatar"} key={suggestion.id} onClick={this.handleClick}>
									<img src={"https://via.placeholder.com/150"} alt="" className="circle" />
									<span className="title">{suggestion.name} {suggestion.last}</span>
									<p>{suggestion.birthday}</p>
								</li>
							);
						})}
					</ul>
				);
			} else {
				suggestionsListComponent = (
					<div className="no-suggestions">
						<em>No suggestions, you're on your own!</em>
					</div>
				);
			}
		}

		return (
			<Fragment>
				<input className={"AutoCompleteInput"} type="text" onChange={onChange} onKeyDown={onKeyDown} value={userInput}
				placeholder={"Search Film Title"}/>
				{suggestionsListComponent}
			</Fragment>
		);
	}
}

export default Autocomplete;
