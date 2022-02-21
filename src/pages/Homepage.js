import { Link } from "react-router-dom";

const Homepage = () => {
	return (
		<div>
			<h2>Homepage</h2>
			<Link to="/registration">Register</Link>
		</div>
	);
};

export default Homepage;
