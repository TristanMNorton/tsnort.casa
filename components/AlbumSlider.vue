<template>
  <div
    class="
      album-slider
      mb-16
    "
  >
    <swiper
      v-if="allAlbums && allAlbums.length > 1"
      ref="albumSwiper"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="(album, index) in allAlbums"
        :key="album.id"
      >
        <AlbumThumbnail
          :id="album.id"
          :image="album.cover_image"
          :index="index"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SwiperCore, { EffectCoverflow } from 'swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import AlbumThumbnail from './AlbumThumbnail'

import 'swiper/swiper-bundle.css'

SwiperCore.use([EffectCoverflow])

export default {

  components: {
    Swiper,
    SwiperSlide,
    AlbumThumbnail
  },

  data () {
    return {
      swiperOptions: {
        slidesPerView: 5,
        loop: true,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }
      }
    }
  },

  computed: {
    ...mapState(['allAlbums', 'selectedAlbumIndex'])
  },

  watch: {
    selectedAlbumIndex (index) {
      this.updateSliderIndex(index)
    }
  },

  methods: {
    updateSliderIndex (index) {
      const newIndex = index + 3

      this.$refs.albumSwiper.$swiper.slideTo(newIndex)
    }
  }

}
</script>

<style>
.swiper-slide {
  opacity: 0.2;
  transition: opacity 500ms;
}

.swiper-slide-next + .swiper-slide {
  opacity: 1;
}
</style>
