import * as THREE from 'three';

// Define Neuron and Connection classes
export class Neuron {
    position: THREE.Vector3;

    constructor(position: THREE.Vector3) {
        this.position = position;
    }
}

export class Connection {
    from: Neuron;
    to: Neuron;

    constructor(from: Neuron, to: Neuron) {
        this.from = from;
        this.to = to;
    }
}

export class Network {
    neurons: Neuron[];
    connections: Connection[];

    constructor() {
        this.neurons = [];
        this.connections = [];
    }

    // Function to generate neurons and connections
    generateNeuronsAndConnections(neuronCount: number, neuronSpacing: number) {
        const range = neuronSpacing * Math.sqrt(neuronCount);

        // Generate neurons with random positions
        for (let i = 0; i < neuronCount; i++) {
            const x = THREE.MathUtils.randFloat(-range / 2, range / 2);
            const y = THREE.MathUtils.randFloat(-range / 2, range / 2);
            const z = THREE.MathUtils.randFloat(-range / 2, range / 2);
            const position = new THREE.Vector3(x, y, z);
            this.neurons.push(new Neuron(position));
        }

        // Generate connections between neurons (to the 3 closest neurons)
        for (let i = 0; i < this.neurons.length; i++) {
            const currentNeuron = this.neurons[i];
            const closestNeurons = this.findClosestNeurons(currentNeuron, 3); // Find 3 closest neurons

            closestNeurons.forEach(closest => {
                if (closest !== currentNeuron) { // Avoid connecting to itself
                    this.connections.push(new Connection(currentNeuron, closest));
                }
            });
        }
    }

    // Helper function to find the closest neurons to a given neuron
    private findClosestNeurons(neuron: Neuron, count: number): Neuron[] {
        const sortedNeurons = this.neurons
            .filter(n => n !== neuron) // Exclude current neuron
            .sort((a, b) => neuron.position.distanceTo(a.position) - neuron.position.distanceTo(b.position));

        return sortedNeurons.slice(0, count);
    }
}
