<template>
  <div>
    <Nav />
  </div>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="py-4 px-6">
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
    <template>
    <div
      class="w-full mx-auto p-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-2xl mt-14"
    >
      <h2
        class="text-3xl font-extrabold mb-8 text-center text-indigo-800 drop-shadow-md"
      >
        Vue Js Quiz
      </h2>

      <!-- Progress Bar -->
      <div
        class="w-full bg-indigo-200 rounded-full h-3 mb-8 overflow-hidden shadow-inner"
      >
        <div
          class="h-3 w-full bg-indigo-600 rounded-full transition-all duration-500"
          :style="{
            width: ((currentQuestion + 1) / questions.length) * 100 + '%',
          }"
        ></div>
      </div>

      <div v-if="currentQuestion <= questions.length">
        <p
          class="mb-3 text-sm text-indigo-700 font-semibold tracking-wide uppercase"
        >
          Question {{ currentQuestion + 1 }} of {{ questions.length }}
        </p>
        <p class="mb-6 text-xl font-semibold text-gray-900 leading-relaxed">
          {{ questions[currentQuestion].question }}
        </p>

        <div class="space-y-4">
          <label
            v-for="(option, idx) in questions[currentQuestion].options"
            :key="idx"
            class="block cursor-pointer rounded-lg border border-gray-300 p-4 hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-300 flex items-center select-none"
            :class="{
              'border-green-500 bg-green-100 text-green-900 font-semibold':
                showResult && idx === questions[currentQuestion].correctIndex,
              'border-red-500 bg-red-100 text-red-900 font-semibold':
                showResult &&
                selectedOption === idx &&
                idx !== questions[currentQuestion].correctIndex,
            }"
          >
            <input
              type="radio"
              :value="idx"
              v-model="selectedOption"
              :disabled="showResult"
              class="mr-4 w-5 h-5 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span class="flex-1">{{ option }}</span>
          </label>
        </div>

        <div class="mt-8 flex justify-between items-center">
          <button
            @click="checkAnswer"
            :disabled="selectedOption === null || showResult"
            class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors duration-300"
          >
            Submit
          </button>
          <button
            v-if="showResult && isCorrect"
            @click="nextQuestion"
            class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            Next
          </button>
        </div>

        <p
          v-if="showResult && !isCorrect"
          class="mt-6 text-red-600 font-bold text-center text-lg animate-pulse"
        >
          ❌ Try Again!
        </p>
      </div>

      <div v-else class="text-center">
        <h3 class="text-3xl font-extrabold mb-6 text-indigo-900 drop-shadow-md">
          🎉 Congratulations! You completed the quiz.
        </h3>
        <button
          @click="restartQuiz"
          class="px-8 py-4 bg-indigo-700 text-white rounded-lg font-bold hover:bg-indigo-800 transition-colors duration-300"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  </template>
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
const questions = [
  {
    question: "What is the Composition API in Vue.js?",
    options: [
      "An alternative to Options API for organizing code",
      "A Vue router plugin",
      "A state management library",
      "A CSS framework"
    ],
    correctIndex: 0,
  },
  {
    question: "Which function is used to create reactive state in Composition API?",
    options: [
      "reactive()",
      "ref()",
      "computed()",
      "watch()"
    ],
    correctIndex: 1,
  },
  {
    question: "What does the 'ref' function return?",
    options: [
      "A reactive reference object",
      "A plain JavaScript object",
      "A DOM element",
      "A Promise"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you access the value of a ref variable?",
    options: [
      "Using .value property",
      "Directly as a variable",
      "Using $value",
      "Using getValue() method"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the purpose of 'reactive' function?",
    options: [
      "Make an object deeply reactive",
      "Make a primitive reactive",
      "Create a computed property",
      "Trigger side effects"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you define a computed property in Composition API?",
    options: [
      "Using computed() function",
      "Using ref() function",
      "Using watch() function",
      "Using reactive() function"
    ],
    correctIndex: 0,
  },
  {
    question: "Which function watches reactive data and executes a callback on change?",
    options: [
      "watch()",
      "watchEffect()",
      "computed()",
      "ref()"
    ],
    correctIndex: 0,
  },
  {
    question: "What is 'watchEffect' used for?",
    options: [
      "Automatically tracks dependencies and reruns effect",
      "Manually watches a single property",
      "Defines a reactive state",
      "Creates a ref variable"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you return multiple reactive variables from setup()?",
    options: [
      "Return an object with variables",
      "Return an array",
      "Use global variables",
      "Return a string"
    ],
    correctIndex: 0,
  },
  {
    question: "Where is the Composition API primarily used in a Vue component?",
    options: [
      "Inside the setup() function",
      "Inside methods object",
      "Inside data object",
      "Inside mounted hook"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you import Composition API functions in Vue 3?",
    options: [
      "import { ref, reactive } from 'vue'",
      "import Vue from 'vue'",
      "import { ref } from 'vue-composition-api'",
      "import { reactive } from '@vue/reactivity'"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the main difference between ref and reactive?",
    options: [
      "ref tracks primitives, reactive tracks objects",
      "ref tracks objects, reactive tracks primitives",
      "Both track primitives",
      "Both track objects"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a reactive array?",
    options: [
      "Using reactive([])",
      "Using ref([])",
      "Using computed([])",
      "Using watch([])"
    ],
    correctIndex: 1,
  },
  {
    question: "Can you destructure a reactive object directly?",
    options: [
      "No, destructuring loses reactivity",
      "Yes, destructuring preserves reactivity",
      "Only for arrays",
      "Only inside computed"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you keep reactivity after destructuring?",
    options: [
      "Use toRefs()",
      "Use reactive() again",
      "Use computed()",
      "Use watch()"
    ],
    correctIndex: 0,
  },
  {
    question: "What is 'toRefs' used for?",
    options: [
      "Convert reactive object properties to refs",
      "Create a ref array",
      "Watch a reactive object",
      "Create a computed property"
    ],
    correctIndex: 0,
  },
  {
    question: "What lifecycle hook replaces 'created' in Composition API?",
    options: [
      "onBeforeMount() or setup()",
      "onCreated()",
      "mounted()",
      "setup()"
    ],
    correctIndex: 3,
  },
  {
    question: "Which function runs code when the component is mounted?",
    options: [
      "onMounted()",
      "mounted()",
      "created()",
      "setup()"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you run cleanup code before a component unmounts?",
    options: [
      "Use onBeforeUnmount() lifecycle hook",
      "Use onUnmounted()",
      "Use mounted()",
      "Use setup()"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the syntax to define a reactive object with nested properties?",
    options: [
      "const state = reactive({ nested: { count: 0 } })",
      "const state = ref({ nested: { count: 0 } })",
      "const state = computed(() => ({}))",
      "const state = reactive([])"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you watch a reactive property deeply?",
    options: [
      "Set { deep: true } in watch options",
      "Set { immediate: true }",
      "Use watchEffect()",
      "Use computed()"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the difference between watch and watchEffect?",
    options: [
      "watch watches specific sources, watchEffect tracks dependencies automatically",
      "Both are the same",
      "watchEffect watches specific properties, watch tracks automatically",
      "Neither watches reactive data"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you define props in Composition API?",
    options: [
      "Define props parameter in setup(props)",
      "Use this.props inside setup",
      "Props are not available in setup",
      "Use $props inside setup"
    ],
    correctIndex: 0,
  },
  {
    question: "How to emit an event from setup()?",
    options: [
      "Use the second context parameter: setup(props, { emit })",
      "Use this.$emit inside setup",
      "Use global event bus",
      "Cannot emit from setup"
    ],
    correctIndex: 0,
  },
  {
    question: "Which hook runs before the component updates?",
    options: [
      "onBeforeUpdate()",
      "onUpdated()",
      "beforeUpdate()",
      "updated()"
    ],
    correctIndex: 0,
  },
  {
    question: "How to access template refs in Composition API?",
    options: [
      "Use ref() and the 'ref' attribute in template",
      "Use this.$refs",
      "Use document.querySelector",
      "Refs are not available"
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'shallowReactive' do?",
    options: [
      "Creates a reactive object without deep reactivity",
      "Creates a deep reactive object",
      "Creates a reactive ref",
      "Creates a computed property"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you import lifecycle hooks in Vue 3?",
    options: [
      "import { onMounted, onBeforeUnmount } from 'vue'",
      "import Vue from 'vue'",
      "import { mounted, unmounted } from 'vue'",
      "No import needed"
    ],
    correctIndex: 0,
  },
  {
    question: "Which function is used to create a reactive Map?",
    options: [
      "reactive(new Map())",
      "ref(new Map())",
      "computed(() => new Map())",
      "watch(() => new Map())"
    ],
    correctIndex: 0,
  },
  {
    question: "What does the 'expose' function do in setup()?",
    options: [
      "Expose internal methods to template or parent component",
      "Expose props",
      "Expose events",
      "Expose data globally"
    ],
    correctIndex: 0,
  },
  {
    question: "How can you type reactive data with TypeScript?",
    options: [
      "Use generics like ref<Type>() or reactive<Type>()",
      "No typing is possible",
      "Use interfaces only",
      "Use @Prop decorators"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you share reactive state between components in Composition API?",
    options: [
      "Use composables (functions returning reactive data)",
      "Use Vuex only",
      "Use props and events",
      "Cannot share reactive state"
    ],
    correctIndex: 0,
  },
  {
    question: "Which function can pause and resume watchers?",
    options: [
      "watch with a cleanup function",
      "watchEffect with pause()",
      "No built-in pause",
      "watch with immediate"
    ],
    correctIndex: 2,
  },
  {
    question: "How do you import the Composition API in Vue 2?",
    options: [
      "import VueCompositionApi from '@vue/composition-api'",
      "import { ref } from 'vue'",
      "Not supported",
      "import Vue from 'vue'"
    ],
    correctIndex: 0,
  },
  {
    question: "Which function triggers side effects reactively without returning value?",
    options: [
      "watchEffect()",
      "watch()",
      "computed()",
      "ref()"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the default behavior of watch regarding immediate execution?",
    options: [
      "Does NOT run callback immediately",
      "Runs immediately",
      "Runs twice",
      "Depends on reactive source"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a reusable logic in Composition API?",
    options: [
      "Create a composable function returning reactive state",
      "Use mixins",
      "Use filters",
      "Use directives"
    ],
    correctIndex: 0,
  },
  {
    question: "Can you use Composition API with TypeScript?",
    options: [
      "Yes, it works very well with TS",
      "No, only Options API supports TS",
      "Only with decorators",
      "Only for Vue 2"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you define multiple reactive refs in setup()?",
    options: [
      "Declare multiple const variables with ref()",
      "Use a single reactive object",
      "Use computed properties",
      "Use watch"
    ],
    correctIndex: 0,
  },
  {
    question: "Which lifecycle hook is called after DOM updates?",
    options: [
      "onUpdated()",
      "onMounted()",
      "onBeforeUpdate()",
      "onBeforeMount()"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you handle side effects in Composition API?",
    options: [
      "Use watch or watchEffect",
      "Use methods",
      "Use data",
      "Use lifecycle hooks only"
    ],
    correctIndex: 0,
  },
  {
    question: "Can you define props validation in Composition API?",
    options: [
      "Yes, define props option in defineComponent",
      "No, only in Options API",
      "Only via TypeScript interfaces",
      "Only with mixins"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the purpose of 'getCurrentInstance()'?",
    options: [
      "Access internal component instance for advanced use",
      "Get DOM element",
      "Get reactive data",
      "Get computed properties"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you expose methods or refs to parent components?",
    options: [
      "Use expose() function inside setup()",
      "Return from setup()",
      "Use props",
      "Use global event bus"
    ],
    correctIndex: 0,
  },
  {
    question: "How to define emits in Composition API?",
    options: [
      "Define emits option in defineComponent",
      "Use emit() only",
      "Use props",
      "Emits are not supported"
    ],
    correctIndex: 0,
  },
  {
    question: "Which API replaces 'this' in Composition API?",
    options: [
      "You don’t use 'this', use refs and reactive variables directly",
      "Use this as usual",
      "Use proxy",
      "Use bind(this)"
    ],
    correctIndex: 0,
  },
  {
    question: "What does the 'toRaw' function do?",
    options: [
      "Returns the original non-reactive object",
      "Creates reactive object",
      "Creates ref object",
      "Creates computed property"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you make reactive data readonly?",
    options: [
      "Use readonly() function",
      "Use const variables",
      "Use ref() with immutable flag",
      "Use Object.freeze()"
    ],
    correctIndex: 0,
  },
  {
    question: "Which method is used to stop watching?",
    options: [
      "Call stop() on the watcher returned by watch()",
      "Call dispose()",
      "Call unsubscribe()",
      "No way to stop watchers"
    ],
    correctIndex: 0,
  },
  {
    question: "How to handle errors in async Composition API functions?",
    options: [
      "Use try/catch blocks inside async setup or composables",
      "Use errorCaptured hook",
      "Use global error handler only",
      "Use error props"
    ],
    correctIndex: 0,
  },
  {
    question: "Can you use Composition API in Vue 2 projects?",
    options: [
      "Yes, with @vue/composition-api plugin",
      "No, only Vue 3 supports it",
      "Yes, natively",
      "No, use mixins instead"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you share state between unrelated components?",
    options: [
      "Use provide/inject API or composables",
      "Use props",
      "Use events",
      "Use watchers"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the difference between provide and inject?",
    options: [
      "provide shares data from ancestor, inject receives it in descendants",
      "inject shares data, provide receives it",
      "Both are the same",
      "Neither share data"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you use 'provide' in setup()?",
    options: [
      "Call provide(key, value) function inside setup()",
      "Return provide from setup()",
      "Use provide option in component",
      "Use Vuex"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you use 'inject' in setup()?",
    options: [
      "Call inject(key) inside setup()",
      "Return inject from setup()",
      "Use inject option in component",
      "Use Vuex"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you watch multiple sources in Composition API?",
    options: [
      "Pass an array of sources to watch()",
      "Call watch() multiple times",
      "Use watchEffect()",
      "Use computed()"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the purpose of 'nextTick' in Composition API?",
    options: [
      "Wait until DOM updates are finished",
      "Wait until reactive data updates",
      "Pause execution",
      "Schedule setTimeout"
    ],
    correctIndex: 0,
  },
  {
    question: "How to define multiple refs inside reactive object?",
    options: [
      "Use toRefs() on reactive object",
      "Use ref() inside reactive",
      "Use reactive() inside ref",
      "Not possible"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add event listeners inside setup()?",
    options: [
      "Use onMounted() to add listeners and onBeforeUnmount() to remove",
      "Add directly in template",
      "Use watch()",
      "Use directives"
    ],
    correctIndex: 0,
  },
  {
    question: "Can Composition API be mixed with Options API?",
    options: [
      "Yes, both can be used in same component",
      "No, only one API allowed",
      "Only with special plugins",
      "Not recommended"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you define emits type in TypeScript with Composition API?",
    options: [
      "Use defineEmits<Type>() helper",
      "Use PropTypes",
      "Use interface",
      "Use Vue.extend"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the purpose of 'useSlots()' in Composition API?",
    options: [
      "Access slots passed to a component",
      "Emit events",
      "Define reactive state",
      "Watch changes"
    ],
    correctIndex: 0,
  },
  {
    question: "Which function is used to define component in Composition API with TS?",
    options: [
      "defineComponent()",
      "createComponent()",
      "new Component()",
      "Vue.extend()"
    ],
    correctIndex: 0,
  },
];


const currentQuestion = ref(0);
const selectedOption = ref(null);
const showResult = ref(false);
const isCorrect = ref(false);

function checkAnswer() {
  if (selectedOption.value === questions[currentQuestion.value].correctIndex) {
    isCorrect.value = true;
    showResult.value = true;
    alert("🎉 Congratulations! Correct answer.");

    currentQuestion.value++;
    selectedOption.value = null;
    showResult.value = false; // agle question ke liye reset
  } else {
    isCorrect.value = false;
    alert("Oops! Wrong answer. Try again.");
    // showResult ko false rakho takay options enable rahein
    showResult.value = false;
    selectedOption.value = null; // reset selection taaki dobara select kare
  }
}

function nextQuestion() {
  currentQuestion.value++;
  selectedOption.value = null;
  showResult.value = false;
  isCorrect.value = false;
}

function restartQuiz() {
  currentQuestion.value = 0;
  selectedOption.value = null;
  showResult.value = false;
  isCorrect.value = false;
}
</script>