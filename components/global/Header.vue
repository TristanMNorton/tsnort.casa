<template>
  <header
    class="
      p-6
      flex
      flex-row
      justify-between
    "
  >
    <h1
      class="
        text-4xl
      "
    >
      My Record Collection
      <span
        class="
          text-base
        "
      >
        ({{ albumCount }} records)
      </span>
    </h1>
    <h2>
      Powered by
      <a href="https://www.discogs.com" target="_blank">
        <img
          class="
            w-20
          "
          src="~/assets/discogs.png"
          alt=""
        >
      </a>
    </h2>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState(['allAlbums']),
    albumCount () {
      return this.allAlbums ? this.allAlbums.length : 0
    }
  }

}
</script>
