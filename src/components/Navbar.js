import { Link } from "react-router-dom";
import { auth } from "./../firebase/utils";

const Navbar = (props) => {
	const { currentUser } = props;

	return (
		<nav className="bg-red-400 p-2 text-white flex justify-between">
			<h2>Grupo M2</h2>

			{currentUser && (
				<ul className="inline-flex items-center space-x-6">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<span onClick={() => auth.signOut()}>Log Out</span>
					</li>
				</ul>
			)}

			{!currentUser && (
				<ul className="inline-flex items-center space-x-6">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
					<li>
						<Link to="login">Login</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

Navbar.defaultProps = {
	currentUser: null,
};

export default Navbar;
