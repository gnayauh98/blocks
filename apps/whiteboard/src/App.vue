<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <blocks-whiteboard ref="blockWhiteboard" />
  </div>
</template>

<style scoped>
.wrapper {
  width:100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

blocks-whiteboard {
  width: 80%;
  height: 80%;
  border: 1px dashed blue;
}
</style>
