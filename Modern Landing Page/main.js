import './src/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 4;

// Add lighting for better model visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// HDRI Environment Setup
const rgbeLoader = new RGBELoader();
rgbeLoader('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/horn-koppe_spring_1k.hdr'); // Adjust path to your HDRI files

// Load HDRI environment map
rgbeLoader.load('environment.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    
    // Set as scene background
    scene.background = texture;
    
    // Set as environment map for reflections
    scene.environment = texture;
    
    // Optional: Adjust exposure for better visibility
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputEncoding = THREE.sRGBEncoding;
});




const renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector("#canvas"),
    antialias:true,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth,window.innerHeight);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// GLTF Loader
const loader = new GLTFLoader();

// Function to load GLTF model
function loadGLTFModel(modelPath) {
    loader.load(
        './models/scene.gltf', (gltf) => {
            // Add the model to the scene
            scene.add(gltf.scene);
            console.log('GLTF model loaded successfully');
        },
        function (xhr) {
            // Loading progress
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            // Error occurred
            console.error('An error occurred loading the GLTF model:', error);
        }
    );
}


function animate()
{
    window.requestAnimationFrame(animate);
    // mesh.rotation.x += 0.01; // This line was commented out in the original file
    controls.update(); // Update controls in animation loop
    renderer.render(scene,camera);
}

animate()