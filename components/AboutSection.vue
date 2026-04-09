<script setup lang="ts">
import { siteData } from '~/data/site';
</script>

<template>
  <section id="about" class="bg-white py-24 md:py-32">
    <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
      <div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div
          data-reveal
          class="overflow-hidden rounded-[30px]"
          style="--reveal-delay: 60ms"
        >
          <img
            :src="siteData.about.image"
            :alt="siteData.about.alt"
            class="h-[200px] w-full object-cover md:h-[320px]"
          />
        </div>

        <div>
          <SectionTitle
            eyebrow="ABOUT"
            :copy="siteData.about.copy"
          >
            配送の全体像と、
            <strong class="font-bold">始めやすさ</strong>
          </SectionTitle>
        </div>
      </div>

      <div
        data-reveal
        style="--reveal-delay: 120ms"
        class="mt-12 grid gap-px bg-borderLight md:mt-16 md:grid-cols-3"
      >
        <div
          v-for="item in siteData.aboutStats"
          :key="item.label"
          class="bg-white px-6 py-7"
        >
          <p class="text-[30px] font-light tracking-[-0.04em] text-textPrimary md:text-[40px]">
            {{ item.value }}
          </p>
          <p class="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-textMuted">
            {{ item.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
