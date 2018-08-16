<template>
  <ul v-if="noticeData">
    <li v-for="(item, index) in noticeData" :key="item.index">新通知 {{item.id}} {{index}}</li>
  </ul>
</template>
<script>
export default {
  props: ['noticeData']
}
</script>
