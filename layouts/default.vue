<template>
  <div>
    <Nuxt class="app" />
    <canvas
      ref="canvas"
      width="400"
      height="400"
      class="canvas"
    />
  </div>
</template>

<script>
import animation from '../animation/animation'

export default {

  mounted () {
    this.animation()
  },

  methods: {
    animation
  }

}
</script>

<style>
html {
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 7000ms;
}

.canvas[data-reveal="true"] {
  opacity: 1;
}

.app {
  position: relative;
  z-index: 2;
}

#__layout > div {
  position: relative;
  min-height: 100vh;
}

#__layout > div::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e3e2df;
  opacity: 1;
  z-index: 1;
  mix-blend-mode: multiply;
  backdrop-filter: blur(1px);
  transition: background-color 500ms, backdrop-filter 4000ms;
}

body.record-collection #__layout > div::after {
  backdrop-filter: blur(10px);
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
