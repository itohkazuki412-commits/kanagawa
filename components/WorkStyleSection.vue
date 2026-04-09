<script setup lang="ts">
import { siteData } from '~/data/site';
</script>

<template>
  <section id="work-style" class="bg-bgAlt py-24 md:py-32">
    <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
      <SectionTitle
        eyebrow="WORK STYLE"
        copy="宅配案件を中心に、1日の流れや募集条件が分かるように整理しています。現在は宅配案件のみ募集中です。"
      >
        毎日の流れと、
        <strong class="font-bold">募集要項</strong>
      </SectionTitle>

      <div class="mt-12 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div data-reveal style="--reveal-delay: 80ms">
          <div class="border-t border-[#d8d8d8]">
            <div
              v-for="item in siteData.timeline"
              :key="item.time"
              class="grid gap-4 border-b border-[#d8d8d8] py-5 md:grid-cols-[84px_1fr]"
            >
              <p class="text-[13px] font-semibold tracking-[0.08em] text-textPrimary">{{ item.time }}</p>
              <div>
                <p class="text-[15px] font-semibold text-textPrimary">{{ item.title }}</p>
                <p class="mt-2 text-[13px] font-light leading-8 text-textSecondary md:text-[14px]">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          data-reveal
          style="--reveal-delay: 140ms"
          class="overflow-hidden rounded-[30px]"
        >
          <img
            :src="siteData.workImage.image"
            :alt="siteData.workImage.alt"
            class="h-[240px] w-full object-cover md:h-[420px]"
          />
        </div>
      </div>

      <div
        data-reveal
        style="--reveal-delay: 180ms"
        class="mt-12 grid gap-px bg-borderLight md:mt-16 md:grid-cols-2"
      >
        <div
          v-for="item in siteData.requirements"
          :key="item.label"
          class="bg-white px-6 py-6 md:px-7"
        >
          <p class="text-[10px] font-medium uppercase tracking-[0.22em] text-textMuted">{{ item.label }}</p>
          <p class="mt-3 text-[14px] font-light leading-8 text-textPrimary md:text-[15px]">
            {{ item.value }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
