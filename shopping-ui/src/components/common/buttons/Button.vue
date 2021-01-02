<template>
  <button
    :class="['btn-default', {
      'btn-default__large': size === 'xl',
      'btn-default__small': size !== 'xl'
    }]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    {{ name }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private readonly name!: string;
  @Prop() private size!: string;
  @Prop() private disabled!: boolean;
}
</script>


<style lang="postcss">
  .btn-default {
    @apply bg-yellow-400 text-white cursor-pointer ease-linear duration-150;
  }

  .btn-default__small {
    @apply px-3 py-1;
  }

  .btn-default__large {
    @apply w-full font-bold text-xl py-2 px-6;
  }

  .btn-default:disabled {
  @apply bg-gray-300 cursor-not-allowed;
  }

  .btn-default:disabled:hover {
  @apply bg-gray-300 cursor-not-allowed;
  }

  .btn-default:hover {
    @apply bg-yellow-500;
  }

  .btn-default:focus {
    @apply outline-none;
  }
</style>