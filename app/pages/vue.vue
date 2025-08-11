<template>
  <div>
    <Nav />
  </div>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow-md py-4 px-6">
      <h1 class="text-2xl font-bold text-center">HTML Course - Learn Step by Step</h1>
    </header>

    <!-- Course Topics -->
    <section class="container mx-auto px-4 py-10 ">
      <div
        v-for="(topic, index) in visibleTopics"
        :key="index"
        class="mb-10 bg-white rounded-xl shadow-md p-6"
      >
        <h2 class="text-xl font-semibold mb-2">{{ topic.title }}</h2>
        <p class="text-gray-600 mb-4">{{ topic.description }}</p>

        <!-- YouTube or direct video -->
       <div v-if="isYouTube(topic.video)" class="w-full mb-4 h-[500px]">
  <iframe
    :src="getEmbedUrl(topic.video)"
    class="w-full h-full rounded-md"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

<video
  v-else
  class="w-full rounded-md mb-4"
  controls
  :src="topic.video"
  style="height: 500px;"
></video>


        <button
          class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          @click="completeTopic(index)"
          :class="{ 'bg-gray-400': topic.completed }"
          :disabled="topic.completed"
        >
          {{ topic.completed ? '✅ Completed' : 'Mark as Complete' }}
        </button>
      </div>

      <!-- Add More Button -->
      <div class="text-center mt-8" v-if="visibleTopics.length < topics.length">
        <button
          @click="loadMore"
          class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Load More ({{ remainingTopics }} remaining)
        </button>
      </div>
    </section>
  </div>
  <!-- quiz  -->
</template>

<script setup>
import { ref, computed } from 'vue'

const topics = ref([
 {
    title: "Introduction to Vue JS (Hindi)",
    video: "https://www.youtube.com/watch?v=Cb7w_Wk56IE&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=1&t=30s&pp=iAQB"
  },
  {
    title: "Visual Studio Code Crash Course (Hindi)",
    video: "https://www.youtube.com/watch?v=jMmgvzHKXgw&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=2&t=20s&pp=iAQB"
  },
  {
    title: "NPM Crash Course (Hindi)",
    video: "https://www.youtube.com/watch?v=xD3V3Uf9HPI&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=3&t=1862s&pp=iAQB"
  },
  {
    title: "Create Vue JS Project using Vue Vite or Vue CLI (Hindi)",
    video: "https://www.youtube.com/watch?v=gyG4qEjjDHk&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=4&pp=iAQB"
  },
  {
    title: "Download Vue JS Study Material (Hindi)",
    video: "https://www.youtube.com/watch?v=c-K1ke6naaI&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=5&t=11s&pp=iAQB"
  },
  {
    title: "Vue JS Project Directory Structure (Hindi)",
    video: "https://www.youtube.com/watch?v=UtZArb71gmI&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=6&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "Options API and Composition API in Vue JS (Hindi)",
    video: "https://www.youtube.com/watch?v=kAwOW-4ISRU&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=7&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "Component and Single File Component in Vue JS (Hindi)",
    video: "https://www.youtube.com/watch?v=wwZHUawKB7Q&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=8&t=2417s&pp=iAQB"
  },
  {
    title: "Text Interpolation in Vue JS (Hindi)",
    video: "https://www.youtube.com/watch?v=iVWoEm1X760&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=9&pp=iAQB"
  },
  {
    title: "Attribute Binding v-bind (Hindi)",
    video: "https://www.youtube.com/watch?v=a2E95XhxiuY&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=10&t=730s&pp=iAQB"
  },
  {
    title: "Reactivity using reactive and ref in Vue JS (Hindi)",
    video: "https://www.youtube.com/watch?v=dJKH8n3PhbQ&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=11&t=610s&pp=iAQB"
  },
  {
    title: "Reactivity Utilities isRef isReactive unref toRef toRefs in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=XXc10z16k6U&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=12&t=878s&pp=iAQB"
  },
  {
    title: "Method and Computed Property in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=OsDK8wbSk8s&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=13&t=1803s&pp=iAQB"
  },
  {
    title: "Binding Inline CSS Style using Style Binding in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=gzupwzMCtNU&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=14&t=1184s&pp=iAQB"
  },
  {
    title: "HTML class Attribute Binding in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=FfjjWIGxduo&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=15&t=1621s&pp=iAQB"
  },
  {
    title: "How to use CSS in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=wgNnGjjHzR8&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=16&t=2050s&pp=iAQB"
  },
  {
    title: "Conditional Rendering in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=YfV3AIoIvUY&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=17&t=1704s&pp=iAQB"
  },
  {
    title: "List Rendering v for in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=C68pyWuTuZI&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=18&t=668s&pp=iAQB"
  },
  {
    title: "Event Handling in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=L980_Atgz08&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=19&t=2293s&pp=iAQB"
  },
  {
    title: "Form in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=0x9ad6HSaqU&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=20&t=1524s&pp=iAQB"
  },
  {
    title: "Props and Prop Validation in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=xFFewMKeVhs&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=21&pp=iAQB"
  },
  {
    title: "Component Event in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=BdZFZO_mQXU&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=22&t=396s&pp=iAQB"
  },
  {
    title: "Slot and Named Slot in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=4Ca5XoGON4U&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=23&t=2766s&pp=iAQB"
  },
  {
    title: "Fallthrough Attribute in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=MPZt2ZpUgzE&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=24&t=700s&pp=iAQB"
  },
  {
    title: "Provide and Inject in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=5PidaOFeEz4&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=25&t=2029s&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "Lifecyle Hooks in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=9Q35mssPNJY&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=26&pp=iAQB"
  },
  {
    title: "Watchers in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=SvFtXoTuVJE&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=27&t=1378s&pp=iAQB"
  },
  {
    title: "Template ref in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=TCPiMKMXESs&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=28&t=25s&pp=iAQB"
  },
  {
    title: "Async Component in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=7o9EDcPbFFY&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=29&t=377s&pp=iAQB"
  },
  {
    title: "Composables in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=9SCE_HAxQRE&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=30&t=856s&pp=iAQB"
  },
  {
    title: "Custom Directive in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=56XDOho9RVQ&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=31&t=153s&pp=iAQB"
  },
  {
    title: "Custom Plugin in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=lWTJZ6ODfgs&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=32&t=921s&pp=iAQB"
  },
  {
    title: "Transition and Animation in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=FoHbYOOVg8Y&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=33&t=234s&pp=iAQB"
  },
  {
    title: "Dynamic Component in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=HFzTJJP8qYM&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=34&t=328s&pp=iAQB"
  },
  {
    title: "Cache Component using KeepAlive in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=RgLnRASAcFQ&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=35&t=120s&pp=iAQB"
  },
  {
    title: "Teleport in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=LluRGLb5fJk&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=36&t=10s&pp=iAQB"
  },
  {
    title: "Suspense in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=MuniA3-TKjI&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=37&t=21s&pp=iAQB"
  },
  {
    title: "How to use Images in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=iF1lkzQzgZc&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=38&t=145s&pp=iAQB"
  },
  {
    title: "How to use URL or Links in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=jc1J8sNUZNM&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=39&pp=iAQB"
  },
  {
    title: "How to Make API Call in Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=6OvtRSORI3g&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=40&t=344s&pp=iAQB"
  },
  {
    title: "How to Build Production Code in Vue (Hindi)",
    video: "https://www.youtube.com/watch?v=mPzXryOCGYg&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=41&pp=iAQB"
  },
  {
    title: "What you should do after learning Vue Js (Hindi)",
    video: "https://www.youtube.com/watch?v=M-aLTb4xkJc&list=PLbGui_ZYuhih5ItBhn2cTncaS24_Kgeui&index=42&pp=iAQB0gcJCa0JAYcqIYzv"
  }
])

const topicsToShow = ref(5)

const visibleTopics = computed(() => {
  return topics.value.slice(0, topicsToShow.value)
})

const remainingTopics = computed(() => {
  return topics.value.length - topicsToShow.value
})

function isYouTube(url) {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

function getEmbedUrl(url) {
  const videoId = url.split('v=')[1]?.split('&')[0]
  return `https://www.youtube.com/embed/${videoId}`
}

function completeTopic(index) {
  topics.value[index].completed = true
}

function loadMore() {
  // Show 5 more topics, but don't exceed the total number of topics
  topicsToShow.value = Math.min(topicsToShow.value + 5, topics.value.length)
}
</script>