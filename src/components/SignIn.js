import { Component } from "react";
import { signInWithGoogle, auth } from "./../firebase/utils";
// Components
import Button from "./forms/Button";
import FormInput from "./forms/FormInput";

const initialState = {
	email: "",
	password: "",
};

class SignIn extends Component {
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
		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({
				...initialState,
			});
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { email, password } = this.state;

		return (
			<div>
				<div>
					<h2>Log In form</h2>
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
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
						<Button type="submit">Log in</Button>
						<Button onClick={signInWithGoogle}>Sign in with Google</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default SignIn;
