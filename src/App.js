import { Routes, Route, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";
import { connect } from "react-redux";
import { useEffect } from "react";

// Styles
import "./stylesheets/index.css";
import "./stylesheets/application.scss";
// Layout
import MainLayout from "./layouts/MainLayout";
// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

const App = (props) => {
	const { setCurrentUser, currentUser } = props;

	useEffect(() => {
		const authListener = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snapshot) => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			}

			// if the user is not logged in, userAuth will return null anyway
			setCurrentUser(userAuth);
		});

		return () => {
			authListener();
		};
	}, [setCurrentUser]);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<MainLayout>
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
							<MainLayout>
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
							<MainLayout>
								<Login />
							</MainLayout>
						)
					}
				></Route>
				<Route
					path="/recovery"
					element={
						currentUser ? (
							<Navigate to="/" replace />
						) : (
							<MainLayout>
								<Recovery />
							</MainLayout>
						)
					}
				></Route>
				<Route
					path="/dashboard"
					element={
						currentUser ? (
							<Navigate to="/" replace />
						) : (
							<MainLayout>
								<Dashboard />
							</MainLayout>
						)
					}
				></Route>
			</Routes>
		</div>
	);
};

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
