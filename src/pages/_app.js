import { styles, config } from "@/styles/styles";
import { CameraShake, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Experience from "../../components/Experience";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Canvas
				style={{ ...styles }}
				gl={{ antialias: false }}
				camera={{ position: [0, 0.5, 3], fov: 75 }}
			>
				<Perf position="bottom-left" />

				<ScrollControls pages={3} distance={2.5} damping={0.005}>
					<Experience />
				</ScrollControls>

				<CameraShake {...config} />
			</Canvas>
			<Component {...pageProps} />
		</>
	);
}
