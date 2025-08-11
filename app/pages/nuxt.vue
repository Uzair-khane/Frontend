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
    
    <div
      class="w-full mx-auto p-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-2xl mt-14"
    >
      <h2
        class="text-3xl font-extrabold mb-8 text-center text-indigo-800 drop-shadow-md"
      >
        Nuxt js  Quiz
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

      <div v-if="currentQuestion < questions.length">
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
const questions = [
  {
    question: "Which Nuxt 3 hook is used to fetch data server-side?",
    options: [
      "useAsyncData()",
      "useFetch()",
      "onMounted()",
      "setup()"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you access runtime config in Nuxt 3 Composition API?",
    options: [
      "useRuntimeConfig()",
      "useConfig()",
      "this.$config",
      "process.env"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the purpose of useFetch() in Nuxt 3?",
    options: [
      "Fetch data and auto-handle SSR and client hydration",
      "Fetch only on client",
      "Make API calls outside components",
      "Manage Vuex state"
    ],
    correctIndex: 0,
  },
  {
    question: "Which file defines global middleware in Nuxt 3?",
    options: [
      "middleware/*.js or .ts",
      "plugins/*.js",
      "pages/*.vue",
      "components/*.vue"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a composable in Nuxt 3?",
    options: [
      "Create a function in composables/ folder",
      "Create a plugin",
      "Create a middleware",
      "Create a Vue component"
    ],
    correctIndex: 0,
  },
  {
    question: "What command starts a Nuxt 3 development server?",
    options: [
      "npm run dev",
      "npm start",
      "nuxt build",
      "nuxt generate"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you define a page route in Nuxt 3?",
    options: [
      "By creating a Vue file in pages/ folder",
      "By registering routes manually",
      "Using router.js file",
      "Using components/"
    ],
    correctIndex: 0,
  },
  {
    question: "How to access query parameters in Nuxt 3 Composition API?",
    options: [
      "const route = useRoute(); route.query",
      "this.$route.query",
      "useRouter()",
      "fetch()"
    ],
    correctIndex: 0,
  },
  {
    question: "Which Nuxt 3 composable is used to programmatically navigate?",
    options: [
      "useRouter()",
      "useRoute()",
      "navigate()",
      "router.push()"
    ],
    correctIndex: 0,
  },
  {
    question: "Where do you define global CSS in Nuxt 3?",
    options: [
      "In nuxt.config.ts under css array",
      "In assets/css folder only",
      "Inside each component",
      "In layouts"
    ],
    correctIndex: 0,
  },
  {
    question: "How can you access the Nuxt app instance inside setup()?",
    options: [
      "const nuxtApp = useNuxtApp()",
      "this.$nuxt",
      "useApp()",
      "import Nuxt from 'nuxt'"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the purpose of useState() in Nuxt 3?",
    options: [
      "Define reactive, global state shared across components",
      "Manage local component data",
      "Access Vuex store",
      "Use Vue data option"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create server API routes in Nuxt 3?",
    options: [
      "Add .ts/.js files inside server/api folder",
      "Use middleware",
      "Use plugins",
      "Create pages/api/"
    ],
    correctIndex: 0,
  },
  {
    question: "How can you fetch data only on the client side in Nuxt 3?",
    options: [
      "Pass { server: false } to useFetch()",
      "Use useAsyncData()",
      "Fetch inside setup() only",
      "Fetch in mounted() hook"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you register plugins in Nuxt 3?",
    options: [
      "Create files in plugins/ folder and add to nuxt.config.ts",
      "Register in main.js",
      "Add to package.json",
      "Use components/ folder"
    ],
    correctIndex: 0,
  },
  {
    question: "What is Nitro in Nuxt 3?",
    options: [
      "Server engine for API routes and SSR",
      "Vue state management",
      "CSS framework",
      "CLI tool"
    ],
    correctIndex: 0,
  },
  {
    question: "Which file configures Nuxt 3 project settings?",
    options: [
      "nuxt.config.ts",
      "package.json",
      "index.vue",
      "middleware.js"
    ],
    correctIndex: 0,
  },
  {
    question: "How to use environment variables in Nuxt 3?",
    options: [
      "Access via useRuntimeConfig()",
      "Directly via process.env",
      "Import from .env file",
      "Use global variables"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the difference between useFetch and useAsyncData?",
    options: [
      "useAsyncData caches results, useFetch is simpler fetch wrapper",
      "useFetch caches results, useAsyncData does not",
      "Both are identical",
      "useFetch only runs client-side"
    ],
    correctIndex: 0,
  },
  {
    question: "Which Nuxt 3 feature automatically generates routes?",
    options: [
      "File system routing via pages/",
      "Manual routing file",
      "Vue Router config",
      "Middleware"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you lazy-load components in Nuxt 3?",
    options: [
      "Use defineAsyncComponent() or auto-imported components",
      "Import normally",
      "Use Vue Router",
      "Use plugins"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you enable TypeScript support in Nuxt 3?",
    options: [
      "It is enabled by default",
      "Install a plugin",
      "Configure in nuxt.config.ts",
      "Install ts-loader"
    ],
    correctIndex: 0,
  },
  {
    question: "How can you add middleware to a page in Nuxt 3?",
    options: [
      "Add middleware property in page's script block",
      "Add to nuxt.config.ts",
      "Use plugins",
      "Use layouts"
    ],
    correctIndex: 0,
  },
  {
    question: "Which composable is used to register global components in Nuxt 3?",
    options: [
      "No need, auto-import works by default",
      "useComponent()",
      "registerComponent()",
      "globalComponents()"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you define page layouts in Nuxt 3?",
    options: [
      "Create Vue files inside layouts/ folder",
      "Inside components/",
      "Inside pages/",
      "Use plugins/"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create dynamic routes in Nuxt 3?",
    options: [
      "Use filename with [param].vue in pages/",
      "Define in router.js",
      "Use props",
      "Create in middleware"
    ],
    correctIndex: 0,
  },
  {
    question: "Which Nuxt composable provides access to the current route?",
    options: [
      "useRoute()",
      "useRouter()",
      "useLink()",
      "usePage()"
    ],
    correctIndex: 0,
  },
  {
    question: "How to handle server middleware in Nuxt 3?",
    options: [
      "Add files in server/middleware/",
      "Add to plugins/",
      "Use components/",
      "Add in middleware/"
    ],
    correctIndex: 0,
  },
  {
    question: "Which file controls app-level middleware in Nuxt 3?",
    options: [
      "middleware/global.js",
      "middleware/index.js",
      "plugins/middleware.js",
      "server/middleware.js"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create static sites with Nuxt 3?",
    options: [
      "Use nuxt generate command",
      "Use nuxt build only",
      "Use nuxt export",
      "Use nuxt build --static"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add meta tags in Nuxt 3 pages?",
    options: [
      "Use useHead() composable",
      "Add in nuxt.config.ts",
      "Add manually in HTML",
      "Use plugins"
    ],
    correctIndex: 0,
  },
  {
    question: "Which composable handles global state in Nuxt 3?",
    options: [
      "useState()",
      "useStore()",
      "usePinia()",
      "useGlobal()"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a plugin in Nuxt 3?",
    options: [
      "Create a file in plugins/ and register it in nuxt.config.ts",
      "Create middleware/",
      "Create composables/",
      "Create a component"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the default rendering mode in Nuxt 3?",
    options: [
      "SSR (Server-Side Rendering)",
      "SPA (Single Page Application)",
      "Static Site Generation",
      "CSR (Client Side Rendering)"
    ],
    correctIndex: 0,
  },
  {
    question: "How can you disable SSR for a specific page?",
    options: [
      "Set ssr: false in the page's definePageMeta",
      "Use client-only component",
      "Remove page from pages/",
      "Disable in nuxt.config.ts"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a composable for shared logic?",
    options: [
      "Create a function in composables/ folder",
      "Create a plugin",
      "Use middleware",
      "Use layouts"
    ],
    correctIndex: 0,
  },
  {
    question: "What is Nitro in Nuxt 3?",
    options: [
      "The server engine for API and SSR",
      "A CSS framework",
      "A Vue plugin",
      "A state management library"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add global middleware in Nuxt 3?",
    options: [
      "Create a middleware file and add it to nuxt.config.ts middleware array",
      "Add middleware in pages/",
      "Add middleware in layouts/",
      "Add middleware in plugins/"
    ],
    correctIndex: 0,
  },
  {
    question: "Which command builds the Nuxt 3 project for production?",
    options: [
      "npm run build",
      "npm run dev",
      "npm run generate",
      "npm run start"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you handle API routes in Nuxt 3?",
    options: [
      "Create files in server/api/",
      "Create components in components/api/",
      "Use Vuex actions",
      "Use middleware"
    ],
    correctIndex: 0,
  },
  {
    question: "How to access cookies in Nuxt 3 server-side?",
    options: [
      "Access via event.node.req.headers.cookie in server handlers",
      "Use document.cookie",
      "Use useCookies composable",
      "Not supported"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you define global components in Nuxt 3?",
    options: [
      "Components in components/ are auto-imported globally",
      "Register in main.js",
      "Register in plugins/",
      "Define in nuxt.config.ts"
    ],
    correctIndex: 0,
  },
  {
    question: "Which file do you edit to customize the Nuxt 3 app template?",
    options: [
      "app.vue",
      "index.vue",
      "nuxt.config.ts",
      "main.js"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add transitions between pages in Nuxt 3?",
    options: [
      "Use the <Transition> component wrapping <NuxtPage>",
      "Add CSS animations manually",
      "Use plugins",
      "Use middleware"
    ],
    correctIndex: 0,
  },
  {
    question: "How to handle authentication in Nuxt 3?",
    options: [
      "Use composables, middleware and server API routes",
      "Use Vuex only",
      "Use plugins only",
      "No built-in support"
    ],
    correctIndex: 0,
  },
  {
    question: "Which composable do you use to set page meta tags dynamically?",
    options: [
      "useHead()",
      "useMeta()",
      "useMetaTags()",
      "useTitle()"
    ],
    correctIndex: 0,
  },
  {
    question: "How can you define global CSS variables in Nuxt 3?",
    options: [
      "Define them in global CSS or SCSS files imported in nuxt.config.ts",
      "Use inline styles",
      "Use plugins",
      "Use layouts"
    ],
    correctIndex: 0,
  }
]



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