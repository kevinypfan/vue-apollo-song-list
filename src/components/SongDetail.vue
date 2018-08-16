<template>
  <div id="song-details">
    <div v-if="!song">No song selected...</div>
    <div v-else id="list-container">
      <div>
        <h2>
          {{song.title}}
          <span>
            <button @click="upvoteHandler(song.id)">Like</button>
            {{song.votes}}
          </span>
        </h2>
      </div>
      <p>{{`${song.singer.firstName} ${song.singer.lastName}`}}</p>
      <p>All songs by this singer:</p>
      <ul class="other-songs">
        <li v-if="song.singer.songs" v-for="item in song.singer.songs" :key="item.id">
          <div id="list-container">
            {{item.title}}<span><button @click="upvoteHandler(item.id)">Like</button> {{item.votes}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { GET_SONG_BY_ID, UPVOTE_SONG } from '../queries/graphql'

export default {
  props: ['songId'],
  data: () => ({
    song: null
  }),
  apollo: {
    song: {
      query: GET_SONG_BY_ID,
      variables () {
        return {
          id: this.songId
        }
      },
      update (data) {
        return data.song
      }
    }
  },
  methods: {
    upvoteHandler (songId) {
      this.$apollo.mutate({
        mutation: UPVOTE_SONG,
        variables: {
          songId
        }
      })
    }
  }
}
</script>
