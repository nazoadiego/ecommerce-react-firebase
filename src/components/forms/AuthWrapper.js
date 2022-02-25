const AuthWrapper = ({ headline, children }) => {
	return (
		<div className="flex flex-col items-center mt-44">
			{headline && <h2 className="mb-4">{headline}</h2>}
			{children}
		</div>
	);
};

export default AuthWrapper;
