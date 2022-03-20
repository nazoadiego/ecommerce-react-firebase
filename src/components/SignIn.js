import { Link } from "react-router-dom";
import { signInWithGoogle, auth } from "./../firebase/utils";
import { useState } from "react";

// Components
import Button from "./forms/Button";
import FormInput from "./forms/FormInput";
import AuthWrapper from "./forms/AuthWrapper";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const configAuthWrapper = { headline: "Log In" };

	const resetForm = () => {
		setEmail("");
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth.signInWithEmailAndPassword(email, password);
			resetForm();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div>
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type="submit">Log in</Button>
					<Button onClick={signInWithGoogle}>Sign in with Google</Button>

					<Link to="/recovery">Reset password</Link>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
