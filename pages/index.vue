<script setup lang="ts">
import { siteData } from '~/data/site';

type LoadingPhase = 'loading' | 'fading' | 'ready' | 'error';

const loadingPhase = useState<LoadingPhase>('page-loading-phase', () => 'loading');
const preloadAssets = [
  ...siteData.heroSlides.map((slide) => slide.image),
  siteData.about.image,
  siteData.workImage.image,
  ...siteData.voices.map((voice) => voice.image),
];
const loaderPhase = computed<'loading' | 'fading' | 'error'>(() =>
  loadingPhase.value === 'ready' ? 'fading' : loadingPhase.value,
);

let maxWaitTimer: number | undefined;
let readyTimer: number | undefined;
let fadeTimer: number | undefined;

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });

const startLoading = async () => {
  const startedAt = performance.now();
  let timedOut = false;
  loadingPhase.value = 'loading';

  maxWaitTimer = window.setTimeout(() => {
    timedOut = true;
    loadingPhase.value = 'error';
  }, 9000);

  await Promise.allSettled(preloadAssets.map((src) => preloadImage(src)));

  if (timedOut) {
    return;
  }

  if (maxWaitTimer) {
    window.clearTimeout(maxWaitTimer);
  }

  readyTimer = window.setTimeout(() => {
    loadingPhase.value = 'fading';
    fadeTimer = window.setTimeout(() => {
      loadingPhase.value = 'ready';
    }, 500);
  }, Math.max(0, 1500 - (performance.now() - startedAt)));
};

const reloadPage = () => {
  window.location.reload();
};

useSeoMeta({
  title: siteData.meta.title,
  description: siteData.meta.description,
  ogTitle: siteData.meta.title,
  ogDescription: siteData.meta.description,
  ogType: 'website',
});

useReveal();

onMounted(() => {
  if (loadingPhase.value === 'ready') {
    return;
  }

  void startLoading();
});

onBeforeUnmount(() => {
  if (maxWaitTimer) {
    window.clearTimeout(maxWaitTimer);
  }

  if (readyTimer) {
    window.clearTimeout(readyTimer);
  }

  if (fadeTimer) {
    window.clearTimeout(fadeTimer);
  }
});
</script>

<template>
  <div class="bg-white text-textPrimary">
    <PageLoading
      v-if="loadingPhase !== 'ready'"
      :phase="loaderPhase"
      @reload="reloadPage"
    />
    <SiteHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <WorkStyleSection />
      <IncomeSimulatorSection />
      <VoiceSection />
      <FlowSection />
      <FaqSection />
      <ContactSection />
    </main>
    <SiteFooter />
    <FixedFooterCta />
  </div>
</template>
