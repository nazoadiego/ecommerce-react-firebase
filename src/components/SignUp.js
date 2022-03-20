import { useState } from "react";
import { auth, handleUserProfile } from "../firebase/utils";
// Components
import AuthWrapper from "./forms/AuthWrapper";
import Button from "./forms/Button";
import FormInput from "./forms/FormInput";

const SignUp = () => {
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const resetForm = () => {
		setDisplayName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			const err = ["Passwords don't match"];
			setErrors(err);
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await handleUserProfile(user, { displayName });

			resetForm();
		} catch (err) {
			console.log(err);
		}
	};

	const configAuthWrapper = {
		headline: "Sign Up",
	};

	const errorsList = errors.map((error, index) => {
		return (
			<li key={index} className="text-red-400">
				{error}
			</li>
		);
	});

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div>
				{errors.length > 0 && <ul>{errorsList}</ul>}

				<form onSubmit={handleSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						placeholder="Full name"
						handleChange={(e) => setDisplayName(e.target.value)}
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						handleChange={(e) => setPassword(e.target.value)}
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						placeholder="Confirm Password"
						handleChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button type="submit">Sign Up</Button>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignUp;
