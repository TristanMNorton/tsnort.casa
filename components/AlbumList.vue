<template>
  <aside
    class="
      album-list
      w-20
      p-8
    "
  >
    <ul
      class="
        album-list__list
        overflow-y-scroll
        h-full
        pb-32
      "
    >
      <li
        v-for="(album, index) in allAlbums"
        :key="album.id"
        class="
          mb-2
        "
      >
        <button
          class="
            text-left
            text-lg
          "
          @click="dispatchSelectedAlbum(album.id, index)"
        >
          {{ artistString(album) }} - {{ album.title }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState(['allAlbums'])
  },

  methods: {
    artistString (album) {
      const { artists } = album

      if (artists.length === 1) {
        const [artist] = artists
        return artist.name
      }

      if (artists.length > 1) {
        const allArtistNames = artists.map(artist => artist.name)
        return allArtistNames.join(', ')
      }

      if (artists.length < 1) {
        return 'Unknown'
      }
    },

    dispatchSelectedAlbum (id, index) {
      const payload = {
        id,
        index
      }
      this.$store.dispatch('updateSelectedAlbum', payload)
    }
  }

}
</script>

<style>
.album-list {
  position: relative;
  width: 400px;
  min-width: 400px;
  overflow: hidden;
  padding-right: 0 !important;
}

.album-list::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-image: linear-gradient(to bottom, transparent 10%, #e3e2df 48%);
  pointer-events: none;
}

.album-list__list {
  margin-right: -17px;
  padding-right: 17px;
}
</style>
