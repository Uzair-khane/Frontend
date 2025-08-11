<template>
  <div>
    <Nav />
  </div>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow-md py-4 px-6">
      <h1 class="text-2xl font-bold text-center">Tailwind CSS Course - Learn Step by Step</h1>
    </header>

    <!-- Course Topics -->
    <section class="container mx-auto px-4 py-10">
      <div
        v-for="(topic, index) in topics"
        :key="index"
        class="mb-10 bg-white rounded-xl shadow-md p-6"
      >
        <h2 class="text-xl font-semibold mb-2">{{ topic.title }}</h2>

        <!-- YouTube or direct video -->
        <div v-if="isYouTube(topic.video)" class="w-full aspect-video mb-4">
          <iframe
            :src="getEmbedUrl(topic.video)"
            class="w-full rounded-md"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <video
          v-else
          class="w-full rounded-md mb-4"
          controls
          :src="topic.video"
        ></video>

        <p class="text-gray-700 mb-4">{{ topic.description }}</p>

        <button
          class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="completeTopic(index)"
          :disabled="topics[index].completed"
          :class="{ 'bg-gray-400 cursor-not-allowed': topics[index].completed }"
        >
          {{ topics[index].completed ? '✅ Completed' : 'Mark as Complete' }}
        </button>
      </div>

 
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const topics = ref([
  {
    title: '1. Tailwind CSS Crash Course',
    video: 'https://youtu.be/mVzY256R9fs?si=vmvy6B-if1_7rVsR',
 
    completed: false,
  },
  // Add more topics here as needed
])

function completeTopic(index) {
  topics.value[index].completed = true
  alert(`Marked "${topics.value[index].title}" as complete.`)
}



function isYouTube(url) {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

function getEmbedUrl(url) {
  let videoId = null;

  if (url.includes('youtu.be')) {
    videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
  } else if (url.includes('youtube.com')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v');
  }

  if (!videoId) return url;

  return `https://www.youtube.com/embed/${videoId}`;
}
</script>

<style scoped>
video {
  max-height: 250px;
}

.aspect-video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
}

.aspect-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
