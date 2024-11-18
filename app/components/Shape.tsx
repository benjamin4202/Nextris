"use client"

import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useLoader } from '@react-three/fiber'
import { HexColorPicker } from "react-colorful";
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';


const Shape = (props: ThreeElements['mesh']) => {
  const [meshColor, setMeshColor] = useState('#bad4ce');
  const [knotTexture, setKnotTexture] = useState('/rusty-metal.jpg')
  const [knotYRotation, setknotYRotation] = useState(0);
  const [buttonText, setButtonText] = useState("SPIN");

  function Knot(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const texture = useLoader(TextureLoader, knotTexture);

    useFrame((state) => (meshRef.current.rotation.y += knotYRotation))

    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={[2, 2, 2]}
      >
        <torusKnotGeometry args={[1.4, 0.2, 256, 256]} />
        <meshStandardMaterial map={texture} roughnessMap={texture} color={meshColor} />
      </mesh>
    );
  }

  function handleToggleRotateY() {
    if(knotYRotation > 0){
      setknotYRotation(0)
      setButtonText("SPIN")
    }else{
      setknotYRotation(0.01)
      setButtonText("RESET")
    }
  }

  return (
    <div className="flex justify-center">
      <div style={{ width: "1000px", height: "900px"}}>
        <Canvas flat linear id="canvas">
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <OrbitControls />
          <Knot position={[0, 0, -3]} />
          <Knot position={[0, 0, -7]} />
          <Knot position={[0, 0, 11]} />
        </Canvas>
      </div>
      <div className="facet-panel">
        <h3 className="text-left">Color</h3>
        <hr className="hr-fade"/>
        <HexColorPicker className="pt-1" color={meshColor} onChange={setMeshColor} />
        <div className="pt-8 pb-8">
          <h3 className="text-left">Texture</h3>
          <hr className="hr-fade" />
          <button className="metal-bttn" onClick={() => setKnotTexture('/rusty-metal.jpg')} />
          <button className="wood-bttn" onClick={() => setKnotTexture('/wood.jpg')} />
          <button className="denim-bttn" onClick={() => setKnotTexture('/denim.jpg')} />
          <button className="snow-bttn" onClick={() => setKnotTexture('/snow.jpg')} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-left">Rotation</h3>
          <hr className="hr-fade" />
        <button className="btn btn-gradient-border" onClick={handleToggleRotateY}>{buttonText}</button>
        </div>
        <div className="text-xs">
          <p className="pt-8 pb-8">* Use the mouse wheel or track pad<br/> to zoom in and out.</p>
          <p>* Use the mouse to click and drag<br /> to rotate the knots.</p>
        </div>
      </div>
  </div>);
}

export default Shape;
