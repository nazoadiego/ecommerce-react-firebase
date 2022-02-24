// Packages
import { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
// Styles
import "./stylesheets/index.css";
import "./stylesheets/application.scss";
// Layout
import MainLayout from "./layouts/MainLayout";
// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

const initialState = {
	currentUser: null,
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};
	}

	authListener = null;

	componentDidMount() {
		this.authListener = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snapshot) => {
					this.setState({
						currentUser: {
							id: snapshot.id,
							...snapshot.data(),
						},
					});
				});
			}

			this.setState({
				...initialState,
			});
		});
	}

	componentWillUnmount() {
		this.authListener();
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div className="App">
				<Routes>
					<Route
						path="/"
						element={
							<MainLayout currentUser={currentUser}>
								<Homepage />
							</MainLayout>
						}
					></Route>
					<Route
						path="/register"
						element={
							currentUser ? (
								<Navigate to="/" replace />
							) : (
								<MainLayout currentUser={currentUser}>
									<Registration />
								</MainLayout>
							)
						}
					></Route>
					<Route
						path="/login"
						element={
							currentUser ? (
								<Navigate to="/" replace />
							) : (
								<MainLayout currentUser={currentUser}>
									<Login />
								</MainLayout>
							)
						}
					></Route>
				</Routes>
			</div>
		);
	}
}

export default App;
