// Packages
import { Routes, Route } from "react-router-dom";
// Styles
import "./stylesheets/index.css";
import "./stylesheets/application.scss";
// Layout
import MainLayout from "./layouts/MainLayout";
// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

const firebaseConfig = {
	apiKey: "AIzaSyCQAvrQmbKQ4mJ5si8uGNRFVeYzzr7RLqM",
	authDomain: "grupo-m2-16aad.firebaseapp.com",
	projectId: "grupo-m2-16aad",
	storageBucket: "grupo-m2-16aad.appspot.com",
	messagingSenderId: "198086792162",
	appId: "1:198086792162:web:ac0e85494eb2393def5fbb",
	measurementId: "G-Z3GYPMXGHM",
};

function App() {
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
						<MainLayout>
							<Registration />
						</MainLayout>
					}
				></Route>
				<Route
					path="/login"
					element={
						<MainLayout>
							<Login />
						</MainLayout>
					}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
