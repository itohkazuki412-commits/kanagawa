<script setup lang="ts">
import { siteData } from '~/data/site';

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 60;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onMounted(() => {
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
  window.removeEventListener('scroll', updateScrollState);
  window.removeEventListener('keydown', handleKeydown);
});

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="
      isScrolled || isMenuOpen
        ? 'border-b border-white/10 bg-[rgba(8,8,8,0.95)] backdrop-blur-[20px]'
        : 'bg-transparent'
    "
  >
    <div class="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-5 md:h-[60px] md:px-8 lg:px-10">
      <a href="#top" class="flex items-center gap-3">
        <span
          class="grid h-7 w-7 place-items-center rounded-sm border border-white/35 text-[11px] font-extrabold tracking-[0.22em] text-white"
        >
          JLS
        </span>
        <span class="grid gap-0.5">
          <strong class="text-[13px] font-semibold leading-none text-white">{{ siteData.company.name }}</strong>
          <span class="text-[9px] font-medium uppercase tracking-[0.28em] text-white/48">
            {{ siteData.company.subName }}
          </span>
        </span>
      </a>

      <nav class="hidden items-center gap-7 lg:flex">
        <a
          v-for="item in siteData.navigation"
          :key="item.href"
          :href="item.href"
          class="text-[10px] font-medium uppercase tracking-[0.2em] text-white/78 transition hover:text-white"
        >
          {{ item.label }}
        </a>
        <a
          href="#contact"
          class="inline-flex min-h-[38px] items-center justify-center rounded-full bg-white px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-white/92"
        >
          応募
        </a>
      </nav>

      <button
        type="button"
        class="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/6 text-white transition hover:bg-white/10 lg:hidden"
        :aria-expanded="isMenuOpen"
        aria-label="メニューを開く"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span
          class="absolute h-px w-5 bg-white transition-all duration-500"
          :class="isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-[6px]'"
        />
        <span
          class="absolute h-px w-5 bg-white transition-all duration-300"
          :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
        />
        <span
          class="absolute h-px w-5 bg-white transition-all duration-500"
          :class="isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[6px]'"
        />
      </button>
    </div>

    <Transition name="menu-fade">
      <button
        v-if="isMenuOpen"
        type="button"
        class="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] lg:hidden"
        aria-label="メニューを閉じる"
        @click="closeMenu"
      />
    </Transition>

    <Transition name="menu-panel">
      <aside
        v-if="isMenuOpen"
        class="fixed inset-y-0 right-0 z-50 w-[280px] border-l border-white/10 bg-bgSecondary px-6 pb-8 pt-24 text-white shadow-2xl lg:hidden"
      >
        <nav class="flex flex-col gap-3">
          <a
            v-for="(item, index) in siteData.navigation"
            :key="item.href"
            :href="item.href"
            class="rounded-2xl border border-white/8 px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82 transition hover:border-white/18 hover:bg-white/[0.04]"
            :style="{ transitionDelay: `${index * 60}ms` }"
            @click="closeMenu"
          >
            {{ item.label }}
          </a>
        </nav>
        <a
          href="#contact"
          class="mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-white text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-white/92"
          @click="closeMenu"
        >
          応募する
        </a>
      </aside>
    </Transition>
  </header>
</template>
