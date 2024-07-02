import React, { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './Network.module.scss';
import { Network } from '@/exports/neural';


interface NeuralNetworkProps {
  neuronCount?: number; // Number of neurons
  mouseSensitivity?: number; // Mouse sensitivity factor
  neuronSpacing?: number; // Spacing between neurons
  neuronSize?: number; // Size of neurons
  initialCameraPosition?: THREE.Vector3; // Initial camera position
  renderConnections?: boolean; // Whether to render connections or not
  lineColor?: string; // Color of connections (in hex or color name)
  sphereColor?: string; // Color of spheres (in hex or color name)
}

const NeuralNetwork: FC<NeuralNetworkProps> = ({
  neuronCount = 100,
  mouseSensitivity = 0.000042,
  neuronSpacing = 10,
  neuronSize = 0.3,
  initialCameraPosition = new THREE.Vector3(0, 0, 15),
  renderConnections = true, // Default to true, render connections by default
  lineColor = '#ffffff', // Default line color (white)
  sphereColor = '#ffffff', // Default sphere color (white)
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(initialCameraPosition); // Initial camera position

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Set background to transparent
    rendererRef.current = renderer;

    if (containerRef.current.children.length === 0) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const network = new Network();
    network.generateNeuronsAndConnections(neuronCount, neuronSpacing);

    const neuronsMeshes: THREE.Mesh[] = []; // To store references to neuron meshes

    network.neurons.forEach(neuron => {
      const geometry = new THREE.SphereGeometry(neuronSize, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(sphereColor) });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(neuron.position);
      scene.add(sphere);
      neuronsMeshes.push(sphere); // Store mesh reference
    });

    if (renderConnections) {
      network.connections.forEach(connection => {
        const from = connection.from.position;
        const to = connection.to.position;

        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(from.x, from.y, from.z),
          new THREE.Vector3(to.x, to.y, to.z)
        ]);

        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(lineColor),
          transparent: true,
          opacity: 0.1
        });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      });
    }

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { clientWidth, clientHeight } = containerRef.current!;
      mouseX = (event.clientX - clientWidth / 2) * mouseSensitivity; // Adjust sensitivity here
      mouseY = (event.clientY - clientHeight / 2) * mouseSensitivity; // Adjust sensitivity here
    };

    const handleNeuronHover = (event: MouseEvent) => {
      const intersects = getIntersectingNeurons(event);
      if (intersects.length > 0) {
        const hoveredNeuron = intersects[0].object as THREE.Mesh & { scale: THREE.Vector3 } & { material: THREE.MeshBasicMaterial };
        hoveredNeuron.scale.set(neuronSize * 1.2, neuronSize * 1.2, neuronSize * 1.2); // Scale up on hover
        const initialColor = hoveredNeuron.material.color.getHex();
        const blinkColor = new THREE.Color('rgb(var(--primary-rgb))').getHex();

        let counter = 0;
        const blinkInterval = setInterval(() => {
          if (counter % 2 === 0) {
            hoveredNeuron.material.color.set(blinkColor);
          } else {
            hoveredNeuron.material.color.set(initialColor);
          }
          counter++;
          if (counter === 6) { // Blink 3 times
            clearInterval(blinkInterval);
            hoveredNeuron.material.color.set(initialColor); // Restore initial color
          }
        }, 250); // Blink duration

        hoveredNeuron.scale.set(neuronSize, neuronSize, neuronSize); // Restore scale after blink
      }
    };

    const getIntersectingNeurons = (event: MouseEvent) => {
      const { clientWidth, clientHeight } = containerRef.current!;
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      return raycaster.intersectObjects(neuronsMeshes, true); // Check for intersection with neuron meshes
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleNeuronHover); // Add listener for neuron hover
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      scene.rotation.x += (mouseY - scene.rotation.x) * 0.1; // Adjust damping factor here (0.1)
      scene.rotation.y += (mouseX - scene.rotation.y) * 0.1; // Adjust damping factor here (0.1)

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleNeuronHover); // Remove neuron hover listener
      window.removeEventListener('resize', handleResize);
    };
  }, [neuronCount, mouseSensitivity, neuronSpacing, neuronSize, initialCameraPosition, renderConnections, lineColor, sphereColor]);

  return <div className={styles.networkContainer} ref={containerRef}></div>;
};

export default NeuralNetwork;
