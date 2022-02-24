const Button = ({ children, ...otherProps }) => {
	return (
		<button className="btn-blue" {...otherProps}>
			{children}
		</button>
	);
};

export default Button;
