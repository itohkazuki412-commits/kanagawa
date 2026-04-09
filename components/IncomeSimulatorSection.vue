<script setup lang="ts">
import { siteData } from '~/data/site';

const workingDays = ref(siteData.income.defaultDays);

const bonusAmount = computed(() => {
  if (workingDays.value >= siteData.income.bonuses[0].threshold) {
    return siteData.income.bonuses[0].amount;
  }

  if (workingDays.value >= siteData.income.bonuses[1].threshold) {
    return siteData.income.bonuses[1].amount;
  }

  return 0;
});

const monthlyIncome = computed(() => workingDays.value * siteData.income.dailyPay + bonusAmount.value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value);
</script>

<template>
  <section id="simulator" class="bg-bgSecondary py-24 text-white md:py-32">
    <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
      <div class="mx-auto max-w-[640px]">
        <SectionTitle
          eyebrow="INCOME SIMULATOR"
          :light="true"
          copy="稼働日数を動かしながら、月収の目安をその場で確認できます。"
        >
          日数に合わせて、
          <strong class="font-bold">月収の目安を確認</strong>
        </SectionTitle>

        <div
          data-reveal
          style="--reveal-delay: 80ms"
          class="mt-10 rounded-[30px] border border-white/8 bg-white/[0.03] p-6 md:p-8"
        >
          <div class="grid gap-px rounded-[24px] bg-white/10 sm:grid-cols-2">
            <div class="bg-black/24 px-5 py-5">
              <p class="text-[10px] font-medium uppercase tracking-[0.24em] text-white/36">日給</p>
              <p class="mt-3 text-[20px] font-light tracking-[-0.03em]">{{ formatCurrency(siteData.income.dailyPay) }}</p>
            </div>
            <div class="bg-black/24 px-5 py-5">
              <p class="text-[10px] font-medium uppercase tracking-[0.24em] text-white/36">稼働ボーナス</p>
              <p class="mt-3 text-[20px] font-light tracking-[-0.03em]">{{ formatCurrency(bonusAmount) }}</p>
            </div>
          </div>

          <div class="mt-8">
            <div class="flex items-end justify-between gap-4">
              <p class="text-[11px] font-medium uppercase tracking-[0.24em] text-white/42">稼働日数</p>
              <p class="text-[28px] font-light tracking-[-0.04em]">{{ workingDays }}日</p>
            </div>
            <input
              v-model="workingDays"
              class="income-range mt-4"
              type="range"
              :min="siteData.income.minDays"
              :max="siteData.income.maxDays"
            />
            <div class="mt-2 flex justify-between text-[10px] text-white/28">
              <span>{{ siteData.income.minDays }}日</span>
              <span>{{ siteData.income.maxDays }}日</span>
            </div>
          </div>

          <div class="mt-8 rounded-[24px] border border-white/8 bg-black/20 px-6 py-7 text-center md:px-8 md:py-8">
            <p class="text-[10px] font-medium uppercase tracking-[0.24em] text-white/36">想定月収</p>
            <p class="mt-4 text-[36px] font-extralight tracking-[-0.06em] md:text-[48px]">
              {{ formatCurrency(monthlyIncome) }}
            </p>
            <p class="mt-3 text-[11px] font-light leading-6 text-white/28">
              {{ siteData.income.note }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
