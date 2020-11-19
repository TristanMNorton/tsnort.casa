<template>
  <div class="mainNav">
    <h1 class="title">
      Tristan Norton
    </h1>
    <NuxtLink to="/record-collection" class="link">
      Heady Jams
    </NuxtLink>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  text-align: left;
}

.mainNav {
  padding: 2rem;
}

.title {
  font-family: 'Cormorant Garamond', serif;
  display: block;
  font-weight: 300;
  font-size: 3rem;
  color: #35495e;
  letter-spacing: 1px;
}

.link {
  font-weight: 300;
  font-size: 1.25rem;
  color: #35495e;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
