<script setup lang="ts">
import Navigator from './components/Navigator.vue'
import { useData } from 'vitepress'
import { useAnimations } from './modules/animations'


// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
const { initTransition } = useAnimations()

function openLink(link: string) {
  const linkElement = document.createElement('a')
  linkElement.href = link
  linkElement.target = "_blank"
  document.body.appendChild(linkElement)
  linkElement.click()
  document.body.removeChild(linkElement)
}


</script>

<template>
  <div v-if="frontmatter.home" class="flex flex-col items-center  mt-80px pl-26px pr-26px">
    <div class="flex justify-center items-center flex-wrap gap-36px">
      <img :src="frontmatter.logo" alt="Acamera logo" width="180" height="180">
      <div class="flex flex-col justify-center gap-1rem pr-11px pl-11px">
        <h1 class="mb-0px">{{ site.title }}</h1>
        <h3 class="mt-0px
        mb-0px break-word">{{ site.description }}</h3>
      </div>
    </div>

    <div v-if="frontmatter.cards" class="flex justify-center gap-22px mt-45px flex-wrap">
      <div v-for="card in frontmatter.cards" class="card">
        <div class="img-container">
          <img :src="card.icon">
        </div>
        <h4 class="mb-6px">{{ card.title }}</h4>
        <p>{{ card.text }}</p>
      </div>
    </div>

    <div v-if="frontmatter.buttons" class="flex mt-46px gap-26px flex-wrap justify-center">
      <button v-for="button in frontmatter.buttons" class="button" :class="button.class" @click="openLink(button.link)">{{
        button.text }}</button>
    </div>
    <a class="mt-26px mb-26px" href="/acamera/privacy-policy" @click="initTransition()">Privacy policy</a>
  </div>

  <div v-else class="w-100%">
    <Navigator />
    <div class="flex pr-26px pl-26px">
      <Content class="max-w-800px" />
    </div>

  </div>
</template>
