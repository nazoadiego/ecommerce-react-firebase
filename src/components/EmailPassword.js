import { Component } from "react";
// Components
import AuthWrapper from "./forms/AuthWrapper";
import Button from "./forms/Button";
import FormInput from "./forms/FormInput";
// Firebase
import { auth } from "../firebase/utils";

const initialState = {
	email: "",
	notification: "",
	errors: "",
};

class EmailPassword extends Component {
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
		const { email } = this.state;
		try {
			const config = {
				url: "http://localhost:3000/login",
			};

			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					const notice = ["Your password has been sent!"];
					this.setState({ notification: notice });
				})
				.catch(() => {
					const err = ["Email not found. Please try again"];
					this.setState({ errors: err });
				});
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { email, notification, errors } = this.state;
		const configAuthWrapper = { headline: "Email Password" };

		return (
			<AuthWrapper {...configAuthWrapper}>
				<div>
					{notification && <h6 className="text-green-600">{notification}</h6>}
					{errors && <h6 className="text-red-600">{errors}</h6>}

					<form onSubmit={this.handleSubmit}>
						<FormInput
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={this.handleChange}
						/>

						<Button type="submit">Email Password</Button>
					</form>
				</div>
			</AuthWrapper>
		);
	}
}

export default EmailPassword;
