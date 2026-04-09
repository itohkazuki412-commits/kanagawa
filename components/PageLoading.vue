<script setup lang="ts">
const props = defineProps<{
  phase: 'loading' | 'fading' | 'error';
}>();

defineEmits<{
  reload: [];
}>();

const isError = computed(() => props.phase === 'error');
</script>

<template>
  <div class="loading-screen" :class="{ 'is-fading': phase === 'fading', 'is-error': isError }">
    <div class="flex flex-col items-center text-center text-white">
      <div class="relative h-[84px] w-[84px]">
        <svg class="h-full w-full -rotate-90" viewBox="0 0 84 84" aria-hidden="true">
          <circle class="loading-ring-track" cx="42" cy="42" r="34" />
          <circle class="loading-ring-progress" cx="42" cy="42" r="34" />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center text-[18px] font-extrabold tracking-[0.18em]">
          JLS
        </div>
      </div>
      <p class="mt-6 text-[9px] font-medium uppercase tracking-[0.5em] text-white/20">
        {{ isError ? 'SERVER ERROR' : 'LOADING' }}
      </p>
      <p class="mt-3 max-w-[320px] text-[12px] font-light leading-7 text-white/72">
        {{
          isError
            ? '読み込みに時間がかかっています。通信状況をご確認のうえ、再読み込みをお試しください。'
            : 'サイトを読み込んでいます。'
        }}
      </p>
      <button
        v-if="isError"
        type="button"
        class="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/20 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:border-white/40 hover:bg-white/8"
        @click="$emit('reload')"
      >
        再読み込み
      </button>
    </div>
  </div>
</template>
