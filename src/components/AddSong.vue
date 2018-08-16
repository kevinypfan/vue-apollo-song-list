<template>
  <form id="add-song" @submit.prevent="submitForm">
    <div class="field">
      <label>title:</label>
      <input type="text" v-model="title" />
    </div>
    <div class="field">
      <label>singer:</label>
      <select v-model="singerId" >
        <option>Select singer</option>
        <option v-if="!singers" disabled>Loading singers</option>
        <option v-else v-for="singer in singers" :key="singer.id" :value="singer.id">{{`${singer.firstName} ${singer.lastName}`}}</option>
        <option value="other">其他</option>
      </select>
      <template v-if="singerId === 'other'">
        <div className="field">
          <label>firstName:</label>
          <input type="text" v-model="firstName" />
        </div>
        <div className="field">
          <label>lastName:</label>
          <input type="text" v-model="lastName" />
        </div>
      </template>
    </div>
    <button>+</button>
  </form>
</template>

<script>
import { GET_SINGERS, ADD_SONG, GET_SONGS } from '../queries/graphql'

export default {
  data: () => ({
    singerId: 'Select singer',
    firstName: '',
    lastName: '',
    title: '',
    singers: null
  }),
  apollo: {
    singers: {
      query: GET_SINGERS
    }
  },
  methods: {
    submitForm () {
      this.$apollo.mutate({
        mutation: ADD_SONG,
        variables: {
          singerId: this.singerId,
          firstName: this.firstName,
          lastName: this.lastName,
          title: this.title
        },
        refetchQueries: [{ query: GET_SONGS }]
      })
    }
  }
}
</script>
