<script setup lang="ts">
import { siteData } from '~/data/site';
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-[rgba(8,8,8,0.96)] backdrop-blur-[16px]">
    <div class="mx-auto grid max-w-[880px] grid-cols-2 gap-3 px-4 py-3 md:px-6">
      <a
        :href="`tel:${siteData.company.tel}`"
        class="inline-flex min-h-[50px] items-center justify-center rounded-full bg-white text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-white/92"
      >
        電話で応募
      </a>
      <a
        :href="siteData.contact.lineUrl"
        class="inline-flex min-h-[50px] items-center justify-center rounded-full bg-accentLine text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:brightness-110"
      >
        LINE応募
      </a>
    </div>
  </div>
</template>
