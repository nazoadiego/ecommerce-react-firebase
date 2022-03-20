import { useState } from "react";
// Components
import AuthWrapper from "./forms/AuthWrapper";
import Button from "./forms/Button";
import FormInput from "./forms/FormInput";
// Firebase
import { auth } from "../firebase/utils";

const EmailPassword = () => {
	const [email, setEmail] = useState("");
	const [notification, setNotification] = useState("");
	const [errors, setErrors] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const config = {
				url: "http://localhost:3000/login",
			};

			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					const notice = ["Your password has been sent!"];
					setNotification(notice);
				})
				.catch(() => {
					const err = ["Email not found. Please try again"];
					setErrors(err);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const configAuthWrapper = { headline: "Email Password" };

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div>
				{notification && <h6 className="text-green-600">{notification}</h6>}
				{errors && <h6 className="text-red-600">{errors}</h6>}

				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						handleChange={(e) => setEmail(e.target.value)}
					/>

					<Button type="submit">Email Password</Button>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default EmailPassword;
