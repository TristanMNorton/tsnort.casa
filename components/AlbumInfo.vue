<template>
  <div v-if="albumInfo" class="album-info pr-8">
    <h2 class="text-4xl">
      {{ albumInfo.title }}
    </h2>
    <h3 class="text-2xl mb-4">
      {{ artistString }}
    </h3>
    <div class="bio">
      <p>{{ albumInfo.notes }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {

  data () {
    return {
      albumInfo: null,
      indexedAlbums: {}
    }
  },

  computed: {
    ...mapState(['selectedAlbumId']),

    artistString () {
      const { artists } = this.albumInfo

      if (artists.length === 1) {
        const [artist] = artists
        return artist.name
      }

      if (artists.length > 1) {
        const allArtistNames = artists.map(artist => artist.name)
        return allArtistNames.join(', ')
      }

      return 'Unknown'
    }
  },

  watch: {
    selectedAlbumId () {
      this.getAlbumInfo()
    }
  },

  mounted () {
    this.getAlbumInfo()
  },

  methods: {
    getAlbumInfo () {
      if (this.indexedAlbums && typeof this.indexedAlbums[this.selectedAlbumId] !== 'undefined') {
        this.albumInfo = this.indexedAlbums[this.selectedAlbumId]
        return
      }

      axios.get(`https://api.discogs.com/releases/${this.selectedAlbumId}`, {
        headers: {
          Authorization: 'Discogs token=aorlvvcIpLUWwpNjhTpNLEXNbyIBEDlxZeCFtFVh'
        }
      }).then((res) => {
        this.albumInfo = res.data
        this.indexedAlbums[this.selectedAlbumId] = res.data
      })
    }
  }

}
</script>
