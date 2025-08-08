<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow-md py-4 px-6">
      <h1 class="text-2xl font-bold text-center">📘 HTML Course - Learn Step by Step</h1>
    </header>

    <!-- Course Topics -->
    <section class="container mx-auto px-4 py-10">
      <div v-for="(topic, index) in topics" :key="index" class="mb-10 bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-2">{{ topic.title }}</h2>
        <video class="w-full rounded-md mb-4" controls :src="topic.video" />

        <p class="text-gray-700">{{ topic.description }}</p>

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

const topics = ref([
  {
    title: '1. What is HTML?',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'HTML is the standard markup language for creating Web pages.',
    completed: false,
  },
  {
    title: '2. HTML Elements',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'HTML elements are the building blocks of HTML pages.',
    completed: false,
  },
  {
    title: '3. HTML Attributes',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Attributes provide additional information about HTML elements.',
    completed: false,
  },
  {
    title: '4. HTML Headings',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'HTML headings are defined with the <h1> to <h6> tags.',
    completed: false,
  },
  {
    title: '5. HTML Paragraphs',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'HTML paragraphs are defined with the <p> tag.',
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
</script>

<style scoped>
video {
  max-height: 300px;
}
</style>
