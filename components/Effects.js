import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Effects() {
	return (
		<EffectComposer
			resolutionScale={2048}
			renderPriority={1}
			multisampling={0}
			autoClear
			disableNormalPass
		>
			<Bloom
				blendFunction={BlendFunction.ADD}
				mipmapBlur
				radius={0.25}
				levels={3}
				luminanceSmoothing={0}
				luminanceThreshold={0}
			/>
			<ChromaticAberration
				blendFunction={BlendFunction.MULTIPLY}
				offset={[0.0012, 0.0009]}
			/>
			<ToneMapping
				adaptive
				resolution={1024}
				middleGrey={0.5}
				adaptationRate={0.1}
				blendFunction={BlendFunction.ALPHA}
			/>
		</EffectComposer>
	);
}
