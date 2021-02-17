<template>
  <div id="layout--event">
    <img src="/images/event/bg_web_event_01.png" class="event__image web" />
    <img src="/images/event/bg_mob_event_01.png" class="event__image mobile" />
    <Nuxt />
  </div>
</template>

<style scoped>
#layout--event {
}

.event__image {
  width: 100%;
}

.event__image.web {
  display: block;
}
.event__image.mobile {
  display: none;
}

@media (min-width: 320px) and (max-width: 480px) {
  .event__image.web {
    display: none;
  }
  .event__image.mobile {
    display: block;
  }
}
</style>