const FormInput = ({ handleChange, label, ...otherProps }) => {
	return (
		<div>
			{label && <label>{label}</label>}

			<input onChange={handleChange} {...otherProps} />
		</div>
	);
};

export default FormInput;
