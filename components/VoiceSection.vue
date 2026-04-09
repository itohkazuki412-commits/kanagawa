<script setup lang="ts">
import { siteData } from '~/data/site';
</script>

<template>
  <section id="voice" class="bg-white py-24 md:py-32">
    <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
      <SectionTitle
        eyebrow="VOICE"
        copy="本番では自社スタッフの写真とコメントへ差し替えやすい構成にしています。"
      >
        スタッフの声で見る、
        <strong class="font-bold">働くイメージ</strong>
      </SectionTitle>

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(voice, index) in siteData.voices"
          :key="voice.name"
          data-reveal
          :style="{ '--reveal-delay': `${index * 70}ms` }"
          class="overflow-hidden rounded-[28px] bg-bgAlt"
        >
          <div class="relative h-[180px] overflow-hidden md:h-[200px]">
            <img :src="voice.image" :alt="voice.alt" class="h-full w-full object-cover" />
            <div class="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div class="px-6 py-6">
            <p class="text-[11px] font-medium uppercase tracking-[0.18em] text-textMuted">{{ voice.role }}</p>
            <h3 class="mt-2 text-[16px] font-semibold text-textPrimary">{{ voice.name }}</h3>
            <p class="mt-4 text-[13px] font-light leading-8 text-textSecondary md:text-[14px]">
              {{ voice.quote }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
