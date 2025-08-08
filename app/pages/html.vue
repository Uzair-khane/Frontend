<template>
  <div>
    <Header />
  </div>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow-md py-4 px-6">
      <h1 class="text-2xl font-bold text-center">HTML Course - Learn Step by Step</h1>
    </header>

    <!-- Course Topics -->
    <section class="container mx-auto px-4 py-10">
      <div
        v-for="(topic, index) in topics"
        :key="index"
        class="mb-10 bg-white rounded-xl shadow-md p-6"
      >
        <h2 class="text-xl font-semibold mb-2">{{ topic.title }}</h2>

        <!-- Check if it's YouTube or direct video -->
        <div v-if="isYouTube(topic.video)" class="w-full aspect-video mb-4">
          <iframe
            :src="topic.video"
            class="w-full  rounded-md"
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

        <p class="text-gray-700 -mt-36">{{ topic.description }}</p>

        <button
          class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="completeTopic(index)"
        >
          ✅ Mark as Complete
        </button>
      </div>

      <!-- Quiz Section -->
      <div class="bg-blue-50 p-6 rounded-xl shadow-md">
        <h2 class="text-xl font-semibold mb-4">🧠 Quiz Time!</h2>
        <p class="text-gray-700 mb-4">What does HTML stand for?</p>

        <ul class="space-y-2">
          <li
            v-for="(option, i) in quiz.options"
            :key="i"
            @click="selectOption(i)"
            class="p-2 border rounded cursor-pointer hover:bg-blue-100"
            :class="{
              'bg-green-200': quiz.answered && i === quiz.correctIndex,
              'bg-red-200': quiz.answered && i === quiz.selected && i !== quiz.correctIndex
            }"
          >
            {{ option }}
          </li>
        </ul>

        <p v-if="quiz.answered" class="mt-4 font-medium">
          {{ quiz.selected === quiz.correctIndex ? '✅ Correct!' : '❌ Wrong. Try again!' }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '~/components/Header.vue'

const topics = ref([
  {
    title: '1. What is HTML?',
    video: 'https://www.youtube.com/embed/5sxtZ10Vf3s', // YouTube embed link
    description: `HTML (HyperText Markup Language) is the basic language used to create webpages.

It tells the web browser what to show — like headings, paragraphs, images, links, etc.
Think of HTML as the skeleton of a webpage — it gives the structure, but not the style (style comes from CSS).`,
    completed: false,
  },
  // 2nd topic 
   {
    title: '1. What is HTML?',
    video: 'https://www.youtube.com/embed/5sxtZ10Vf3s', // YouTube embed link
    description: `HTML (HyperText Markup Language) is the basic language used to create webpages.

It tells the web browser what to show — like headings, paragraphs, images, links, etc.
Think of HTML as the skeleton of a webpage — it gives the structure, but not the style (style comes from CSS).`,
    completed: false,
  },



])

function completeTopic(index) {
  topics.value[index].completed = true
  alert(`Marked "${topics.value[index].title}" as complete.`)
}

const quiz = ref({
  options: [
    'HyperText Machine Language',
    'HyperText Markup Language',
    'HighText Main Language',
    'Home Tool Markup Language',
  ],
  correctIndex: 1,
  selected: null,
  answered: false,
})

function selectOption(index) {
  quiz.value.selected = index
  quiz.value.answered = true
}

function isYouTube(url) {
  return url.includes('youtube.com') || url.includes('youtu.be')
}
</script>

<style scoped>
video {
  max-height: 250px;
}
.aspect-video {
  position: relative;
  padding-bottom: 50.25%;
  height: 0;
}
.aspect-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
}
</style>
