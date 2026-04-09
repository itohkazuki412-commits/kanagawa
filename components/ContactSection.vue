<script setup lang="ts">
import { reactive } from 'vue';
import { siteData } from '~/data/site';

const form = reactive({
  name: '',
  phone: '',
  email: '',
  note: '',
});

const submitForm = () => {
  const subject = 'JLS合同会社 採用サイトからのお問い合わせ';
  const body = [
    `お名前: ${form.name || '未入力'}`,
    `電話番号: ${form.phone || '未入力'}`,
    `メール: ${form.email || '未入力'}`,
    '',
    'お問い合わせ内容',
    form.note || '未入力',
  ].join('\n');

  window.location.href = `mailto:${siteData.company.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
</script>

<template>
  <section id="contact" class="bg-bgSecondary py-24 text-white md:py-32">
    <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
      <SectionTitle
        eyebrow="CONTACT"
        :light="true"
        copy="応募のご相談や働き方の確認は、電話・LINE・フォームから受け付けています。"
      >
        応募・お問い合わせ
      </SectionTitle>

      <div class="mt-12 grid gap-4 md:grid-cols-2">
        <a
          data-reveal
          :href="`tel:${siteData.company.tel}`"
          class="inline-flex min-h-[68px] items-center justify-between rounded-[24px] bg-white px-6 py-5 text-black transition hover:-translate-y-0.5 hover:bg-white/92"
        >
          <span>
            <span class="block text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">Phone</span>
            <span class="mt-2 block text-[17px] font-semibold">{{ siteData.company.telDisplay }}</span>
          </span>
          <span class="text-[11px] font-bold uppercase tracking-[0.16em]">{{ siteData.contact.phoneLabel }}</span>
        </a>
        <a
          data-reveal
          style="--reveal-delay: 60ms"
          :href="siteData.contact.lineUrl"
          class="inline-flex min-h-[68px] items-center justify-between rounded-[24px] bg-accentLine px-6 py-5 text-white transition hover:-translate-y-0.5 hover:brightness-110"
        >
          <span>
            <span class="block text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">Line</span>
            <span class="mt-2 block text-[17px] font-semibold">{{ siteData.contact.lineLabel }}</span>
          </span>
          <span class="text-[11px] font-bold uppercase tracking-[0.16em]">相談する</span>
        </a>
      </div>

      <form
        id="contact-form"
        data-reveal
        style="--reveal-delay: 120ms"
        class="mt-12"
        @submit.prevent="submitForm"
      >
        <div class="grid gap-7 md:grid-cols-2">
          <label class="block">
            <span class="text-[10px] font-medium uppercase tracking-[0.22em] text-white/34">Name</span>
            <input
              v-model="form.name"
              type="text"
              placeholder="お名前"
              class="mt-4 w-full border-0 border-b border-white/14 bg-transparent pb-4 text-[14px] font-light text-white outline-none transition placeholder:text-white/22 focus:border-white/35"
            />
          </label>
          <label class="block">
            <span class="text-[10px] font-medium uppercase tracking-[0.22em] text-white/34">Phone</span>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="電話番号"
              class="mt-4 w-full border-0 border-b border-white/14 bg-transparent pb-4 text-[14px] font-light text-white outline-none transition placeholder:text-white/22 focus:border-white/35"
            />
          </label>
          <label class="block md:col-span-2">
            <span class="text-[10px] font-medium uppercase tracking-[0.22em] text-white/34">Email</span>
            <input
              v-model="form.email"
              type="email"
              placeholder="メールアドレス"
              class="mt-4 w-full border-0 border-b border-white/14 bg-transparent pb-4 text-[14px] font-light text-white outline-none transition placeholder:text-white/22 focus:border-white/35"
            />
          </label>
          <label class="block md:col-span-2">
            <span class="text-[10px] font-medium uppercase tracking-[0.22em] text-white/34">Message</span>
            <textarea
              v-model="form.note"
              rows="4"
              placeholder="ご希望の働き方やご質問があればご記入ください"
              class="mt-4 w-full resize-none border-0 border-b border-white/14 bg-transparent pb-4 text-[14px] font-light leading-8 text-white outline-none transition placeholder:text-white/22 focus:border-white/35"
            />
          </label>
        </div>

        <div class="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p class="text-[10px] font-light tracking-[0.12em] text-white/30">
            {{ siteData.contact.formNote }}
          </p>
          <button
            type="submit"
            class="inline-flex min-h-[50px] items-center justify-center rounded-full bg-white px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-white/92"
          >
            送信する
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
