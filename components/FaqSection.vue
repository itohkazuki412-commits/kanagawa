<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue';
import { siteData } from '~/data/site';

const openIndex = ref<number | null>(0);
const answerRefs = ref<HTMLElement[]>([]);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const setAnswerRef = (element: Element | ComponentPublicInstance | null, index: number) => {
  if (element instanceof HTMLElement) {
    answerRefs.value[index] = element;
  }
};

const getAnswerStyle = (index: number) => ({
  maxHeight: openIndex.value === index ? `${answerRefs.value[index]?.scrollHeight ?? 0}px` : '0px',
  opacity: openIndex.value === index ? '1' : '0',
});
</script>

<template>
  <section id="faq" class="bg-white py-24 md:py-32">
    <div class="mx-auto max-w-[980px] px-5 md:px-8 lg:px-10">
      <SectionTitle
        eyebrow="FAQ"
        copy="応募前によくいただく内容をまとめています。"
      >
        よくある質問
      </SectionTitle>

      <div data-reveal style="--reveal-delay: 80ms" class="mt-10 border-y border-[#e5e5e5]">
        <article
          v-for="(item, index) in siteData.faq"
          :key="item.question"
          class="border-b border-[#e5e5e5] last:border-b-0"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-6 px-0 py-6 text-left"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            <span class="text-[14px] font-semibold leading-8 text-textPrimary md:text-[15px]">
              {{ item.question }}
            </span>
            <span
              class="relative block h-5 w-5 flex-none transition duration-300"
              :class="openIndex === index ? 'rotate-45' : ''"
              aria-hidden="true"
            >
              <span class="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-textPrimary" />
              <span class="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-textPrimary" />
            </span>
          </button>
          <div
            class="faq-answer"
            :style="getAnswerStyle(index)"
          >
            <div
              :ref="(element) => setAnswerRef(element, index)"
              class="pb-6 pr-10 text-[13px] font-light leading-8 text-textSecondary md:text-[14px]"
            >
              {{ item.answer }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
