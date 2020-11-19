<template>
  <div>
    <transition name="fade">
      <div v-if="allAlbums" class="layout">
        <Header />
        <main
          class="
            flex
            h-full
          "
        >
          <AlbumList />
          <div class="dashboard">
            <AlbumSlider />
            <AlbumInfo v-if="selectedAlbumId" />
          </div>
        </main>
      </div>
    </transition>
    <transition name="fade">
      <LoadingScreen v-if="!allAlbums" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AlbumList from '../components/AlbumList'
import AlbumSlider from '../components/AlbumSlider'
import AlbumInfo from '../components/AlbumInfo'
import Header from '../components/global/Header'
import LoadingScreen from '../components/LoadingScreen'

export default {

  components: {
    Header,
    AlbumList,
    AlbumSlider,
    AlbumInfo,
    LoadingScreen
  },

  computed: {
    ...mapState(['selectedAlbumId', 'allAlbums'])
  },

  mounted () {
    this.$store.dispatch('getAllAlbums')
  },

  head () {
    return {
      bodyAttrs: {
        class: 'record-collection'
      }
    }
  }

}
</script>

<style>
.layout {
  color: #282828;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.layout > * {
  position: relative;
  z-index: 2;
}

.dashboard {
  width: calc(100% - 400px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
