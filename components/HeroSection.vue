<script setup lang="ts">
import { siteData } from '~/data/site';

const activeIndex = ref(0);
let slideTimer: number | undefined;

onMounted(() => {
  slideTimer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % siteData.heroSlides.length;
  }, 5000);
});

onBeforeUnmount(() => {
  if (slideTimer) {
    window.clearInterval(slideTimer);
  }
});
</script>

<template>
  <section id="top" class="relative isolate min-h-screen overflow-hidden bg-bgPrimary text-white">
    <div class="absolute inset-0">
      <div
        v-for="(slide, index) in siteData.heroSlides"
        :key="slide.image"
        class="hero-slide"
        :class="{ 'is-active': activeIndex === index }"
      >
        <img :src="slide.image" :alt="slide.alt" />
      </div>
      <div class="hero-overlay" />
    </div>

    <div class="relative z-10 mx-auto flex min-h-screen max-w-[1280px] items-end px-5 pb-[100px] pt-28 md:items-center md:px-8 md:pb-20 lg:px-10">
      <div class="max-w-[720px]">
        <p class="text-[9px] font-medium uppercase tracking-[0.4em] text-white/30">
          {{ siteData.hero.label }}
        </p>
        <h1 class="mt-5 text-[28px] font-light leading-[1.16] tracking-[-0.03em] md:text-[clamp(36px,4.5vw,56px)]">
          {{ siteData.hero.titleLead }}
          <span class="block font-bold">{{ siteData.hero.titleStrong }}</span>
        </h1>
        <p class="mt-6 max-w-[640px] text-[13px] font-light leading-[2.1] text-white/78 md:text-[14px]">
          {{ siteData.hero.description }}
        </p>

        <div class="mt-8 grid max-w-[620px] gap-px overflow-hidden rounded-[24px] bg-white/10 sm:grid-cols-3">
          <div
            v-for="metric in siteData.heroMetrics"
            :key="metric.label"
            class="bg-black/28 px-5 py-4 backdrop-blur-sm"
          >
            <p class="text-[9px] font-medium uppercase tracking-[0.28em] text-white/34">{{ metric.label }}</p>
            <p class="mt-2 text-[18px] font-semibold tracking-[-0.03em] md:text-[20px]">{{ metric.value }}</p>
          </div>
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            :href="siteData.hero.primaryCta.href"
            class="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-white/92"
          >
            {{ siteData.hero.primaryCta.label }}
            <span class="ml-3 text-sm">→</span>
          </a>
          <a
            :href="siteData.hero.secondaryCta.href"
            class="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/22 px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.04]"
          >
            {{ siteData.hero.secondaryCta.label }}
            <span class="ml-3 text-sm">→</span>
          </a>
        </div>
      </div>
    </div>

    <div class="absolute bottom-10 left-5 z-10 flex gap-2 md:left-8 lg:left-10">
      <button
        v-for="(slide, index) in siteData.heroSlides"
        :key="`${slide.image}-${index}`"
        type="button"
        class="hero-indicator"
        :class="{ 'is-active': activeIndex === index }"
        :aria-label="`スライド ${index + 1} を表示`"
        @click="activeIndex = index"
      />
    </div>
  </section>
</template>
