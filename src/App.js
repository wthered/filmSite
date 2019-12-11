import React from 'react';
import MaterNav from "./components/MaterNav";
import Autocomplete from "./components/AutoCompleteText";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import notFound from "./pages/notFound";
import mainPage from "./pages/MainPage";
import Home from "./components/Home";
import Logout from "./components/Logout";
import SignIn from "./components/SignIn";


class App extends React.Component {
	render() {
		return (
			<div className={"container"}>
				<BrowserRouter>
					<div className={"row"}>
						<MaterNav/>
						<Autocomplete/>
						<Switch>
							<Route exact path={"/"} component={mainPage}/>
							<Route exact path={"/sign-in"} component={SignIn} />
							<Route exact path={"/home"} component={Home} />
							<Route exact path={"/logout"} component={Logout} />
							<Route path={"*"} component={notFound} />
						</Switch>
					</div>
				</BrowserRouter>
				<div className={"row"}>
					<Footer/>
				</div>
			</div>
		)
	}
}

export default App;
