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
					path="/registration"
					element={
						<MainLayout>
							<Registration />
						</MainLayout>
					}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
