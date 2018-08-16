<template>
  <div>
    <ul id="song-list">
      <div v-if="$apollo.loading">Loading songs...</div>
      <li v-else v-for="song in songs" :key="song.id" @click="selected = song.id">
        <span>{{song.votes}}</span>
        {{song.title}}
      </li>
    </ul>
    <SongDetail :songId="selected" />
  </div>
</template>

<script>
import { GET_SONGS } from '../queries/graphql'
import SongDetail from './SongDetail.vue'

export default {
  components: {
    SongDetail
  },
  data: () => ({
    songs: null,
    selected: 0
  }),
  apollo: {
    songs: {
      query: GET_SONGS
    }
  }
}
</script>

<style>
</style>
