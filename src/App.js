import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import PrimarySearchAppBar from './components/Navigation';


class App extends Component {
	render() {
		return (
			<div className={"container"}>
				<BrowserRouter>
					<div className="App">
						<PrimarySearchAppBar />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}


export default App;
