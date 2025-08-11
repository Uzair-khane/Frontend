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
    title: "Introduction to Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=1ENJDp-n02A&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=1&t=54s&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "How to Install Nuxt 3 and Create Project in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=FIfP5Px99ZM&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=2&t=1s&pp=iAQB"
  },
  {
    title: "Fix Error Failed to download template from registry fetch failed Nuxt JS Project",
    video: "https://www.youtube.com/watch?v=b3QVXjgbHTA&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=3&pp=iAQB"
  },
  {
    title: "Nuxt 3 Directory Structure (Hindi)",
    video: "https://www.youtube.com/watch?v=_uvcn8dUxPg&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=4&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "View in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=ZPTcJTnQ-_M&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=5&pp=iAQB"
  },
  {
    title: "app vue File in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=ZvAfmjx3sBs&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=6&pp=iAQB"
  },
  {
    title: "Pages in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=-8PWfRmdMNU&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=7&t=1075s&pp=iAQB"
  },
  {
    title: "Layout in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=mvci25Rdbq4&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=8&t=2052s&pp=iAQB"
  },
  {
    title: "Component in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=mv5I_tM2PoU&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=9&t=918s&pp=iAQB"
  },
  {
    title: "Client only and Server only Components in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=YTk7KvNtKLw&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=10&t=248s&pp=iAQB"
  },
  {
    title: "How to use CSS JavaScript Images and SVG in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=PxIGdRbK8mg&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=11&t=322s&pp=iAQB"
  },
  {
    title: "How to use Tailwind CSS in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=WhqTMnzthHg&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=12&t=102s&pp=iAQB"
  },
  {
    title: "Navigation and NuxtLink in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=ukJD3Tbn9RU&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=13&t=954s&pp=iAQB"
  },
  {
    title: "Route and Dynamic Route in Nuxt 3 (Hindi)",
    video: "https://www.youtube.com/watch?v=pkTRMGHzBlE&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=14&t=1068s&pp=iAQB"
  },
  {
    title: "Routing with NuxtLink in Nuxt 3",
    video: "https://www.youtube.com/watch?v=8cdRt6hXJFA&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=15&t=135s&pp=iAQB"
  },
  {
    title: "Route Middleware in Nuxt3",
    video: "https://www.youtube.com/watch?v=SIpc6stymvw&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=16&t=371s&pp=iAQB"
  },
  {
    title: "Composables in Nuxt 3",
    video: "https://www.youtube.com/watch?v=_3wzc31McUM&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=17&pp=iAQB"
  },
  {
    title: "State Management useState in Nuxt 3",
    video: "https://www.youtube.com/watch?v=Vqm6e7V_E1k&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=18&pp=iAQB"
  },
  {
    title: "How to Install and Config Pinia in Nuxt 3",
    video: "https://www.youtube.com/watch?v=G6veYPXeFsI&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=19&t=518s&pp=iAQB"
  },
  {
    title: "Page Transitions and Layout Transitions in Nuxt 3",
    video: "https://www.youtube.com/watch?v=TFxzs634Fbk&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=20&pp=iAQB"
  },
  {
    title: "SEO and Meta in Nuxt 3",
    video: "https://www.youtube.com/watch?v=kMMh1YNcEs8&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=21&pp=iAQB"
  },
  {
    title: "Plugins in Nuxt 3",
    video: "https://www.youtube.com/watch?v=GecRidhVu9A&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=22&pp=iAQB"
  },
  {
    title: "Content Module in Nuxt 3",
    video: "https://www.youtube.com/watch?v=lZ41VrXww6s&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=23&pp=iAQB"
  },
  {
    title: "Utils in Nuxt 3",
    video: "https://www.youtube.com/watch?v=EW9WsUgwO8g&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=24&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "Fetch API Data using useFetch and useLazyFetch in Nuxt 3",
    video: "https://www.youtube.com/watch?v=LkKmZFCDQm0&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=25&pp=iAQB"
  },
  {
    title: "Fetch API Data using useAsyncData and useLazyAsyncData in Nuxt 3",
    video: "https://www.youtube.com/watch?v=CQEw6RMRTxs&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=26&pp=iAQB"
  },
  {
    title: "Server in Nuxt 3",
    video: "https://www.youtube.com/watch?v=8JJjGTLALzk&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=27&pp=iAQB"
  },
  {
    title: "Error Handling in Nuxt 3",
    video: "https://www.youtube.com/watch?v=E20MspWrkg8&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=28&pp=iAQB"
  },
  {
    title: "Connect MongoDB to Nuxt 3 Application",
    video: "https://www.youtube.com/watch?v=b2Vwmax--0s&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=29&pp=iAQB"
  },
  {
    title: "How to Secure Nuxt Application",
    video: "https://www.youtube.com/watch?v=e2G1IpM65LE&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=30&t=22s&pp=iAQB"
  },
  {
    title: "Nuxt 3 App Deployment Basic Guide",
    video: "https://www.youtube.com/watch?v=EpDkOZSt34Q&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=31&pp=iAQB"
  },
  {
    title: "Nuxt Config File",
    video: "https://www.youtube.com/watch?v=7LB__P58T48&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=32&pp=iAQB"
  },
  {
    title: "Learn Nuxt Modules",
    video: "https://www.youtube.com/watch?v=o8oOn-1MBe8&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=33&pp=iAQB"
  },
  {
    title: "What to do after Learning Nuxt 3",
    video: "https://www.youtube.com/watch?v=Z_u-xRSRjZ8&list=PLbGui_ZYuhihr7r33VW4RykfezZcsnFjM&index=34&pp=iAQB"
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