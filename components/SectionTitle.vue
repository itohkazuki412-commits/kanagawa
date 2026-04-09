<script setup lang="ts">
defineProps<{
  eyebrow: string;
  copy?: string;
  light?: boolean;
  delay?: number;
}>();
</script>

<template>
  <div
    data-reveal
    :style="{ '--reveal-delay': `${delay ?? 0}ms` }"
    class="max-w-[720px]"
  >
    <p
      class="text-[9px] font-medium uppercase tracking-[0.4em]"
      :class="light ? 'text-white/38' : 'text-[#bbbbbb]'"
    >
      {{ eyebrow }}
    </p>
    <h2
      class="mt-4 text-[22px] font-light leading-[1.25] tracking-[-0.03em] text-textPrimary md:text-[28px]"
      :class="light ? 'text-white' : 'text-textPrimary'"
    >
      <slot />
    </h2>
    <p
      v-if="copy"
      class="mt-5 text-[13px] font-light leading-[2.1] md:text-[14px]"
      :class="light ? 'text-white/72' : 'text-textSecondary'"
    >
      {{ copy }}
    </p>
  </div>
</template>
