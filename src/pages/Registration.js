import { Component } from "react";
import { Link } from "react-router-dom";

class Registration extends Component {
	render() {
		return (
			<div>
				<h2>Register now</h2>
				<Link to="/">Back to home</Link>
			</div>
		);
	}
}

export default Registration;
