import axios from 'axios'

export const state = () => ({
  allAlbums: null,
  selectedAlbumId: null,
  selectedAlbumIndex: null
})

export const mutations = {
  setAllAlbums (state, albums) {
    state.allAlbums = albums
  },

  setSelectedAlbum (state, payload) {
    state.selectedAlbumId = payload.id
    state.selectedAlbumIndex = payload.index
  }
}

export const actions = {
  getAllAlbums ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('https://api.discogs.com/users/avanttronic/collection/folders/0/releases', {
        headers: {
          Authorization: 'Discogs token=aorlvvcIpLUWwpNjhTpNLEXNbyIBEDlxZeCFtFVh'
        },
        params: {
          per_page: 500,
          sort: 'artist'
        }
      }).then((res) => {
        const { releases } = res.data
        const collection = releases.map((release) => {
          return {
            id: release.id,
            ...release.basic_information
          }
        })

        commit('setAllAlbums', collection)
        resolve()
      })
    })
  },

  updateSelectedAlbum ({ commit }, payload) {
    commit('setSelectedAlbum', payload)
  }
}
