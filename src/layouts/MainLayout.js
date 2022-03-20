import Header from "./../components/Header";
import Footer from "./../components/Footer";

const MainLayout = (props) => {
	return (
		<>
			<Header {...props} />
			<main className="min-h-screen">{props.children}</main>
			<Footer />
		</>
	);
};

export default MainLayout;
