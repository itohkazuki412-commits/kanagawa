<script setup lang="ts">
import { siteData } from '~/data/site';
</script>

<template>
  <section id="flow" class="bg-bgAlt py-24 md:py-32">
    <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
      <SectionTitle
        eyebrow="FLOW"
        copy="応募から稼働開始までの流れを、できるだけシンプルにまとめています。"
      >
        応募から稼働までの
        <strong class="font-bold">4ステップ</strong>
      </SectionTitle>

      <div
        data-reveal
        style="--reveal-delay: 90ms"
        class="mt-12 grid gap-px bg-[#dddddd] sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="item in siteData.flowSteps"
          :key="item.no"
          class="bg-white px-6 py-7 md:px-7"
        >
          <p class="text-[28px] font-extralight tracking-[-0.04em] text-[#d1d1d1]">{{ item.no }}</p>
          <h3 class="mt-4 text-[15px] font-semibold text-textPrimary">{{ item.title }}</h3>
          <p class="mt-3 text-[13px] font-light leading-8 text-textSecondary md:text-[14px]">
            {{ item.body }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
