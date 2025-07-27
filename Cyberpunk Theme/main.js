import './src/style.css';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {RGBShiftShader} from 'three/examples/jsm/shaders/RGBShiftShader.js';
import gsap from 'gsap';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3.5;


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialias: true,
    alpha:true,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Setup postprocessing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Add RGB shift effect
const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms.amount.value = 0.0010; // Adjust this value to control the intensity
composer.addPass(rgbShiftPass);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

let model;

new RGBELoader()
    .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/sunny_country_road_1k.hdr', function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        // Set as scene background
        // scene.background = envMap;

        // Set as environment map for reflections
        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();

        const loader = new GLTFLoader();

        loader.load('./DamagedHelmet.gltf', (gltf) => {
                // Add the model to the scene
                model = gltf.scene;
                scene.add(model);
                console.log('GLTF model loaded successfully');
            }, undefined,
            (error) => {
                console.error('An error occurred loading the GLTF model:', error);
            })

    });

    window.addEventListener("mousemove",(e)=>
    {
        if(model)
        {
            const rotationX = (e.clientX/window.innerWidth - .5) * (Math.PI * .25);
            const rotationY = (e.clientY/window.innerHeight - .5) * (Math.PI * .25); 
            gsap.to(model.rotation, {
                y: rotationX,
                x: rotationY,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });

    window.addEventListener("resize",()=>{
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    });

function animate() {
    window.requestAnimationFrame(animate);
    composer.render(); // Use composer instead of renderer
}

animate()