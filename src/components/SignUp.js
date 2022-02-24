import { Component } from "react";
import { auth, handleUserProfile } from "../firebase/utils";
// Components
import Button from "./forms/Button";
import FormInput from "./forms/FormInput";

const initialState = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
	errors: [],
};

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			const err = ["Passwords don't match"];
			this.setState({ errors: err });
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await handleUserProfile(user, { displayName });

			this.setState({
				...initialState,
			});
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { displayName, email, password, confirmPassword, errors } =
			this.state;
		return (
			<div>
				<div>
					<div>
						<h2>Sign Up form</h2>
					</div>

					{errors.length > 0 && (
						<ul>
							{errors.map((error, index) => {
								return <li key={index}>{error}</li>;
							})}
						</ul>
					)}

					<div>
						<form onSubmit={this.handleSubmit}>
							<FormInput
								type="text"
								name="displayName"
								value={displayName}
								placeholder="Full name"
								onChange={this.handleChange}
							/>
							<FormInput
								type="email"
								name="email"
								value={email}
								placeholder="Email"
								onChange={this.handleChange}
							/>
							<FormInput
								type="password"
								name="password"
								value={password}
								placeholder="Password"
								onChange={this.handleChange}
							/>
							<FormInput
								type="password"
								name="confirmPassword"
								value={confirmPassword}
								placeholder="Confirm Password"
								onChange={this.handleChange}
							/>
							<Button type="submit">Sign Up</Button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default SignUp;
