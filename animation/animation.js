import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight
} from 'three'
import random from 'canvas-sketch-util/random'

/**
 * @function animation
 */
export default function animation () {
  const { canvas } = this.$refs
  const scene = new Scene()
  const camera = new PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 4000)

  const light = new DirectionalLight('#f1faee', 0.8)
  light.position.set(2, 2, 2).normalize()
  scene.add(light)

  const ambientLight = new AmbientLight('#f1faee')
  ambientLight.position.set(-2, -2, -2).normalize()
  scene.add(ambientLight)

  camera.position.z = 10
  camera.position.x = -5
  camera.position.y = -2

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(innerWidth, innerHeight)

  const spheres = createSpheres(scene, camera)

  function animate () {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    light.position.x = Math.sin(1 / 6000)
    camera.rotation.z += 0.001
    updateSpheres(spheres, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  })

  if (typeof canvas.dataset.reveal === 'undefined') {
    canvas.dataset.reveal = 'true'
  }
}

/**
 * @function createSpheres
 * @param  {Object} scene  https://threejs.org/docs/#api/en/scenes/Scene
 * @param  {Object} camera https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
 * @return {Array} array of randomly place spheres
 */
function createSpheres (scene, camera) {
  const array = []

  for (let i = 0; i <= 100; i++) {
    const geometry = new SphereGeometry(1.5, 36, 36)
    const material = new MeshPhongMaterial({ color: '#e3e2df' })
    const sphere = new Mesh(geometry, material)

    const randomPosX = random.gaussian(-(camera.getFilmWidth() / 8), camera.getFilmWidth() / 8)
    const randomPosY = random.gaussian(-(camera.getFilmHeight() / 8), camera.getFilmHeight() / 8)
    const randomPosZ = random.gaussian(camera.position.z + 10, camera.position.z + 40)
    const randomScale = random.gaussian(0, 1)
    sphere.speed = (Math.random() * (0.01 - 0.001) + 0.001)

    sphere.material.transparent = true

    sphere.position.x = randomPosX
    sphere.position.y = randomPosY
    sphere.position.z = randomPosZ
    sphere.scale.x = randomScale
    sphere.scale.y = randomScale
    sphere.scale.z = randomScale
    sphere.material.opacity = 1 - randomScale

    scene.add(sphere)
    array.push(sphere)
  }

  return array
}

/**
 * @function updateSpheres
 * @param  {Array} sphere objects collection of generated spheres
 * @param  {Object} camera  https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
 */
function updateSpheres (spheres, camera) {
  for (let i = 0; i < spheres.length; i++) {
    if (spheres[i].scale.x <= 1) {
      spheres[i].scale.x = spheres[i].scale.x + 0.0007
      spheres[i].scale.y = spheres[i].scale.y + 0.0007
      spheres[i].scale.z = spheres[i].scale.z + 0.0007
      spheres[i].position.z = spheres[i].position.z + spheres[i].speed
      spheres[i].material.opacity = spheres[i].material.opacity - 0.0007
    } else {
      setNewSphereStart(spheres[i], camera)
    }
  }
}

/**
 * @function setNewSphereStart
 * @param  {Object} sphere https://threejs.org/docs/#api/en/geometries/SphereGeometry
 * @param  {Object} camera https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
 */
function setNewSphereStart (sphere, camera) {
  const randomPosX = random.gaussian(-(camera.getFilmWidth() / 8), camera.getFilmWidth() / 8)
  const randomPosY = random.gaussian(-(camera.getFilmHeight() / 8), camera.getFilmHeight() / 8)
  const randomPosZ = random.gaussian(camera.position.z + 10, camera.position.z + 40)

  sphere.position.x = randomPosX
  sphere.position.y = randomPosY
  sphere.position.z = randomPosZ
  sphere.scale.x = 0
  sphere.scale.y = 0
  sphere.scale.z = 0
  sphere.material.opacity = 1
}
