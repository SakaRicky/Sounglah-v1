import { Footer, Header, TranslationBox } from "./components";
import classes from './App.module.scss';
import Hero from "@/pages/Hero";
import { Title } from "@mantine/core";


function App() {

	return (
		<div className={classes.body}>
			<Header />
			
			<main className={classes.main}>
				<Hero />
				<div className={classes.container} style={{marginTop: "4rem"}}>
					<Title ta="center" fz="3rem" fw="800">SoungLah Translator</Title>
					<p>
						Just give it a source text and choose the language you want it to be
						translated.
					</p>
					<TranslationBox />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;