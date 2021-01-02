<template>
  <div
    class="btn-icon"
    @click="$emit('click')"
  >
    <font-awesome-icon :icon="['fas', `${icon}`]" class="flex items-center" />
    <div
      v-if="notice"
      class="notice"
    >
      <span class="notice-number">
        {{ noticeNumber }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class Icon extends Vue {
    @Prop() private icon!: string;
    @Prop({ default: false }) private notice!: boolean;
    @Prop({ default: null }) private noticeNumber!: number;
  }
</script>

<style lang="postcss">
  .btn-icon {
    @apply bg-yellow-400 rounded-full h-14 w-14 flex items-center justify-center cursor-pointer ease-in-out duration-150 relative;
  }

  .btn-icon:hover {
    @apply bg-yellow-500 text-white;
  }

  .btn-icon:focus {
    @apply outline-none;
  }

  .notice {
    @apply flex justify-center items-center rounded-full bg-red-600 bottom-7 right-3 w-4 h-4 absolute;
  }

  .notice-number {
    @apply text-xs text-white font-bold;
  }
</style>