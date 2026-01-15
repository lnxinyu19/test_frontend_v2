<template>
  <NuxtLoadingIndicator color="green" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <EDialog />
  <ELoading v-if="isLoading" />
</template>

<script setup lang="ts">
const { isLoading } = useLoading()
</script>
