import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

const MainLayout = (props) => {
	return (
		<>
			<Navbar />
			<main className="min-h-screen">{props.children}</main>
			<Footer />
		</>
	);
};

export default MainLayout;
