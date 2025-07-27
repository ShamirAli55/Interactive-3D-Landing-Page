# Interactive 3D Landing Page 🌐✨

An immersive 3D landing page built with **Three.js**, featuring real-time 3D models using **GLTFLoader**, interactive camera movement via **OrbitControls**, and stunning **RGB post-processing** effects. Perfect for portfolios, product intros, or futuristic web experiences.

---

## 📁 Folder Structure

```

Interactive-3D-Landing-Page/
│
├── index.html               # Main HTML file
├── script.js                # Three.js setup and animation logic
├── style.css                # Optional styling file (if used)
└── /assets                  # Fonts, icons, and other assets
      ├── /models                  # Folder containing GLTF/GLB 3D model

````

---

## 🛠️ Technologies Used

- [Three.js](https://threejs.org/) – WebGL framework for 3D rendering
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) – For loading `.glb` or `.gltf` models
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) – Allows mouse/touch camera movement
- [Postprocessing](https://threejs.org/examples/?q=rgb#webgl_postprocessing_rgb_halftone) – RGB shift, glitch, or other shader effects

---

## 📦 Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/Interactive-3D-Landing-Page.git
````

2. Open `index.html` in a browser (use Live Server or host locally).
3. Add your `.glb`/`.gltf` models to the `/models` folder.
4. Customize `script.js` to modify camera, lights, model behavior, or shaders.

---

## 🎨 Tips

* Keep your 3D models optimized (use Draco compression or limit poly count).
* Use OrbitControls for intuitive model inspection.
* Experiment with shaders like **RGBShift**, **Bloom**, or **GlitchPass** for visual punch.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Credits

* Model sources from [Sketchfab](https://sketchfab.com) & Three js examples.

```

