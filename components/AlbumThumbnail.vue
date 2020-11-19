<template>
  <button class="album-thumbnail">
    <img :src="image" alt="" class="album-thumbnail__image">
  </button>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
.album-thumbnail {
  width: 363px;
  height: 363px;
  position: relative;
  z-index: 11;
}

.album-thumbnail__image {
  width: 100%;
}
</style>
