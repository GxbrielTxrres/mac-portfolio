import { Float, shaderMaterial, Text } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useRef } from "react";

const ImgShader = shaderMaterial(
	{
		albumTexture: undefined,
		time: 0,
		distortionScale: undefined,
		uTimeSpeed: undefined,
		uScalar: undefined,
	},
	`uniform float time;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

void main() {
  
  vUv = uv;

  vec3 pos = position;
// float distortion = snoise(uv * (abs(tan(1.0 * (time * 0.25)))) + (time * 0.25)) * 0.2;
// pos.x += cos(uv.x * 10.0 + time * 2.0) * 0.1;





  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,
	`
uniform sampler2D albumTexture;
uniform float time;
uniform float distortionScale;
uniform float uTimeSpeed;
uniform float uScalar;

varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    float distortion = snoise(vUv * (abs(tan(distortionScale * (time * uTimeSpeed))) * 2.0) + (time * 0.25)) * uScalar;
    vec2 distortedUV = vec2(
        vUv.x + distortion,
        vUv.y + distortion
      );

      vec4 distortedColor = texture2D(albumTexture, distortedUV);
   
  gl_FragColor = distortedColor;
}`,
);

extend({ ImgShader });

export const ImageShader = forwardRef((props, ref) => {
	const { position, scalar, ...otherProps } = props;
	useFrame((delta) => {
		ref.current.children[0].material.uniforms.time.value += delta;
	});

	return (
		<group scale={0} ref={ref}>
			<mesh position={position}>
				<planeGeometry args={[1, 1, 32, 32]} />
				<imgShader time={0} {...otherProps} />
				<Text position={[0, -0.8, 0]} fontSize={0.25}>
					MOST DOPE
				</Text>
			</mesh>
		</group>
	);
});

ImageShader.displayName = "ImageShader";

export default ImageShader;
