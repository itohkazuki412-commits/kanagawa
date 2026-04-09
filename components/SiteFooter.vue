<script setup lang="ts">
import { siteData } from '~/data/site';
</script>

<template>
  <footer class="bg-[#080808] pb-28 pt-10 text-white md:pb-32">
    <div class="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
      <div class="grid gap-8 border-t border-white/8 pt-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p class="text-[12px] font-semibold">{{ siteData.company.name }}</p>
          <p class="mt-3 text-[12px] font-light leading-7 text-white/56">
            {{ siteData.company.address }}<br />
            TEL. {{ siteData.company.telDisplay }}<br />
            MAIL. {{ siteData.company.mail }}
          </p>
        </div>
        <p class="text-[10px] font-light uppercase tracking-[0.18em] text-white/28 md:self-end md:text-right">
          {{ siteData.company.copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>
