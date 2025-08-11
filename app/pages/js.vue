<template>
  <div>
    <Nav />
  </div>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="py-8 px-6">
      <h1 class="text-2xl font-bold text-center">
        HTML Course - Learn Step by Step
      </h1>
    </header>

    <!-- Course Topics -->
    <section class="container mx-auto px-4 py-10">
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
          style="height: 500px"
        ></video>

        <button
          class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          @click="completeTopic(index)"
          :class="{ 'bg-gray-400': topic.completed }"
          :disabled="topic.completed"
        >
          {{ topic.completed ? "✅ Completed" : "Mark as Complete" }}
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
        Javascript Quiz
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
import { ref, computed } from "vue";

const topics = ref([
  {
    title: "Introduction to JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=3qti7Vof_7Q&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=1&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Download Core JavaScript Notes",
    video:
      "https://www.youtube.com/watch?v=QPt9tSS7lkQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=2&pp=iAQB",
  },
  {
    title: "JavaScript and Java Same (Hindi) ?",
    video:
      "https://www.youtube.com/watch?v=0R2DDAezJkU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=3&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Advantage and Disadvantage of JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=m9BHZ7Q6vOY&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=4&pp=iAQB",
  },
  {
    title: "Inline a way of Adding JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=yhXx_5W9UFM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=5&pp=iAQB",
  },
  {
    title: "External a Way of Adding JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=z3Tu8auxxAg&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=6&pp=iAQB",
  },
  {
    title: "Script Tag in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=S8YTc8264cY&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=7&pp=iAQB",
  },
  {
    title: "How to link more than one External JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=h363IcdV5kM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=8&pp=iAQB",
  },
  {
    title: "How to use Inline and External together in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=7xsLaPgmMWY&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=9&pp=iAQB",
  },
  {
    title: "write Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=gOKP5NlEh3g&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=10&t=239s&pp=iAQB",
  },
  {
    title: "alert Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=CEYWfebzIsw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=11&t=102s&pp=iAQB",
  },
  {
    title: "Identifier in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=nyWgiOtfy4c&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=12&pp=iAQB",
  },
  {
    title: "Variables in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=l1z2RK7PBjI&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=13&pp=iAQB",
  },
  {
    title: "Reserved Keywords in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=oCAMDrQ-B8Y&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=14&pp=iAQB",
  },
  {
    title: "Data type in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=VpE7eJrDTn0&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=15&pp=iAQB",
  },
  {
    title: "Declaring and Initializing Variable in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=v48jV_ljup4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=16&t=3s&pp=iAQB",
  },
  {
    title: "Comments in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=bq5V0UnHFno&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=17&t=170s&pp=iAQB",
  },
  {
    title: "JavaScript Operators (Hindi)",
    video:
      "https://www.youtube.com/watch?v=YArf9ghat4o&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=18&pp=iAQB",
  },
  {
    title: "Arithmetic Operators in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=NFPqTr7jmdA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=19&t=22s&pp=iAQB",
  },
  {
    title: "Relational or Comparison Operator in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=wFB-ywsNPwg&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=20&t=4s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Logical Operators in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=z8ixkLDNuQw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=21&t=1s&pp=iAQB",
  },
  {
    title: "Bitwise Operators in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=q0Ej7nXve2E&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=22&pp=iAQB",
  },
  {
    title: "Assignment Operators in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=zIQKbpmdKa4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=23&t=1s&pp=iAQB",
  },
  {
    title: "prompt method Getting input from user in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=25IHm8yJyI4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=24&pp=iAQB",
  },
  {
    title: "Which one is good approach to write JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=R0l8Sv2o8DE&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=25&t=66s&pp=iAQB",
  },
  {
    title: "if Statement in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=9Ph4ETWhxio&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=26&pp=iAQB",
  },
  {
    title: "if else statement in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=QkzSi_eQ-JQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=27&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Else If Statement in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ZZ2cXmHlhNo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=28&t=133s&pp=iAQB",
  },
  {
    title: "Switch Statement in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=OMByWcUPPBw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=29&t=587s&pp=iAQB",
  },
  {
    title: "for Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=nI04WsUnc98&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=30&t=900s&pp=iAQB",
  },
  {
    title: "Nested for Loop in Javascript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=7X-fg-qVl2U&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=31&t=385s&pp=iAQB",
  },
  {
    title: "While Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=N1AkUCoGRSA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=32&t=6s&pp=iAQB",
  },
  {
    title: "Nested While Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=97y07qZdudw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=33&t=1s&pp=iAQB",
  },
  {
    title: "Do While Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=a929l5ufa3E&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=34&pp=iAQB",
  },
  {
    title: "Nested Do While Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Kya2VHVQqPw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=35&pp=iAQB",
  },
  {
    title: "Break and Continue in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ON4QBOcundM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=36&t=289s&pp=iAQB",
  },
  {
    title: "Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=iKIYxOy68DI&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=37&pp=iAQB",
  },
  {
    title: "How to Create and Call Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=NBIHn-9HjO4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=38&t=484s&pp=iAQB",
  },
  {
    title: "How Function Call Works in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=wWn4SfCGc4c&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=39&t=122s&pp=iAQB",
  },
  {
    title: "Function with Parameter in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=2g8E8kuaX3o&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=40&t=1s&pp=iAQB",
  },
  {
    title: "Function Argument Missing in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=V3KRTVnF2f4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=41&pp=iAQB",
  },
  {
    title: "Arguments Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=MJfX8pUQ4MQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=42&t=541s&pp=iAQB",
  },
  {
    title: "Too Many Function Arguments in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=PaOHqE0odfU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=43&t=63s&pp=iAQB",
  },
  {
    title: "Default Parameter in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=YQ7vDGjlz08&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=44&t=76s&pp=iAQB",
  },
  {
    title: "Rest Parameter in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=QMBhUC0_sis&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=45&pp=iAQB",
  },
  {
    title:
      "Difference between Rest Parameter and Arguments Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=2Cn5dSYoGPs&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=46&pp=iAQB",
  },
  {
    title: "Return Statement in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Xuau7dXQ2Dc&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=47&pp=iAQB",
  },
  {
    title: "Variable Scope in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=08JPORvNqCI&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=48&t=1231s&pp=iAQB",
  },
  {
    title: "Block Scope in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=kDP5IGB3_34&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=49&pp=iAQB",
  },
  {
    title: "Variable Hoisting in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=WooWDj9q188&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=50&t=1106s&pp=iAQB",
  },
  {
    title: "Closure in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=YvBfk1U2c98&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=51&t=514s&pp=iAQB",
  },
  {
    title: "Function Expression in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Hh8PnVqjpb8&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=52&pp=iAQB",
  },
  {
    title: "Anonymous Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=1ve_KUCOq98&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=53&pp=iAQB",
  },
  {
    title: "Passing Anonymous Function as Argument in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=PwSFk9JSL2s&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=54&pp=iAQB",
  },
  {
    title: "Returning Anonymous Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=DC1ZUU_Ve7w&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=55&t=326s&pp=iAQB",
  },
  {
    title: "Arrow Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=--_zlohOpXE&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=56&t=1361s&pp=iAQB",
  },
  {
    title: "Immediately Invoked Function Expression in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=pjo0DSuHQzc&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=57&pp=iAQB",
  },
  {
    title: "typeof Operator in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=weXsGSQlqgs&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=58&pp=iAQB",
  },
  {
    title: "Undefined in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=JoB4_yKyuK4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=59&pp=iAQB",
  },
  {
    title: "Null in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=yH8ayoezcLA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=60&pp=iAQB",
  },
  {
    title: "Difference between Undefined and Null in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=G0K7EtQt724&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=61&pp=iAQB",
  },
  {
    title: "var let and const Keywords in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=JeavA1sRfVU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=62&t=147s&pp=iAQB",
  },
  {
    title: "What is Object Oriented Programming (Hindi)",
    video:
      "https://www.youtube.com/watch?v=J6WBLSde7nQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=63&pp=iAQB",
  },
  {
    title: "What is Encapsulation (Hindi)",
    video:
      "https://www.youtube.com/watch?v=FshQqituMes&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=64&pp=iAQB",
  },
  {
    title: "What is Abstraction (Hindi)",
    video:
      "https://www.youtube.com/watch?v=I4UdFeXykpo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=65&pp=iAQB",
  },
  {
    title: "What is Inheritance (Hindi)",
    video:
      "https://www.youtube.com/watch?v=bAOUGGxbGdY&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=66&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "What is Polymorphism (Hindi)",
    video:
      "https://www.youtube.com/watch?v=BQZ9EwoX5Ss&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=67&pp=iAQB",
  },
  {
    title: "Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=OvckIHvfaoY&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=68&pp=iAQB",
  },
  {
    title: "Object Literal in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=LNS8Tzssa1A&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=69&pp=iAQB",
  },
  {
    title: "Object Constructor in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=3pMUsoVkufA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=70&t=323s&pp=iAQB",
  },
  {
    title: "Accessing Object Properties in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=8N2dHopzQDQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=71&pp=iAQB",
  },
  {
    title: "Accessing Object Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=e13bAMeLQ4E&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=72&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Adding Object Properties and Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=b19B4KyvqEE&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=73&t=25s&pp=iAQB",
  },
  {
    title: "Deleting Properties in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=oMoeesBWDCM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=74&pp=iAQB",
  },
  {
    title: "Factory Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=kGENG1L-a_g&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=75&t=170s&pp=iAQB",
  },
  {
    title: "Constructor in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=U7wgCc9aTSk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=76&t=40s&pp=iAQB",
  },
  {
    title: "How to Check Properties exists in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=2RYa6POw4Lw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=77&pp=iAQB",
  },
  {
    title: "for in Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=fBfcSfH0VsE&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=78&pp=iAQB",
  },
  {
    title: "Ways of Creating Objects in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=uJ8mN67njVU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=79&pp=iAQB",
  },
  {
    title: "Constructor as a Class in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=N1IPXjLrIdw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=80&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Private Properties and Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=L0mI79Rs7Og&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=81&pp=iAQB",
  },
  {
    title: "Access Private Property from Outside in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=SJYdtKIudrA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=82&pp=iAQB",
  },
  {
    title: "Prototype in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=kCb8HVgMzMo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=83&pp=iAQB",
  },
  {
    title:
      "How to iterate Instance and Prototype Member using for in Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Lpaclbgw7mA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=84&pp=iAQB",
  },
  {
    title: "Prototype Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=e0qolSoZ1gE&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=85&pp=iAQB",
  },
  {
    title: "How Prototype Works in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=HzK69hfrD54&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=86&pp=iAQB",
  },
  {
    title: "Prototype Inheritance in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=r4fVgSxt2Ew&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=87&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "One Super and Two SubClasses in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=oBwOtxrhNlU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=88&pp=iAQB",
  },
  {
    title: "Method Overriding in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=xtWbg0iJqvA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=89&pp=iAQB",
  },
  {
    title: "MultiLevel Inheritance in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=cr71MI_e5-o&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=90&pp=iAQB",
  },
  {
    title: "Composition or Mixins in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=oJFeRL6v8s4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=91&pp=iAQB",
  },
  {
    title: "ES 6 Class in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=XCakvEbEdms&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=92&pp=iAQB",
  },
  {
    title: "Default Constructor in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=P_vEZ1TRtKc&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=93&pp=iAQB",
  },
  {
    title: "Parameterized Constructor in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=TQG7pOFMAZE&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=94&pp=iAQB",
  },
  {
    title: "Class Expression in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=PlMxA8a0pgI&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=95&pp=iAQB",
  },
  {
    title: "Class Hoisting in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=jWpuR9PLjNo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=96&pp=iAQB",
  },
  {
    title: "Inheritance in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=5vfnOlzUR_c&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=97&pp=iAQB",
  },
  {
    title: "Super Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=DMa1G5sf5Lg&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=98&pp=iAQB",
  },
  {
    title: "Method Overriding in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=17FFsjyZlGU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=99&pp=iAQB",
  },
  {
    title: "Static Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=h4AwVIBsWLo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=100&pp=iAQB",
  },
  {
    title: "Array in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=R5BDSRJ_dWQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=101&pp=iAQB",
  },
  {
    title:
      "Declaration and Initialization of Array using Array Literal in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=noJVBbZckEs&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=102&t=784s&pp=iAQB",
  },
  {
    title:
      "Declaration and Initialization of Array using Array Constructor in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=icyKAfPcnxo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=103&t=93s&pp=iAQB",
  },
  {
    title: "Array Important Points in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=AFd3dLFhRMQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=104&pp=iAQB",
  },
  {
    title: "Accessing Array Element in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=wjIaRhTPkZ4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=105&pp=iAQB",
  },
  {
    title: "Modifying Array Element in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=nEbTxlyGsmU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=106&t=214s&pp=iAQB",
  },
  {
    title: "Removing Array Element in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=VSU5PhxlU-0&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=107&pp=iAQB",
  },
  {
    title: "Array Length Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=GBH7S4r3ngk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=108&pp=iAQB",
  },
  {
    title: "Iteration of Array using for Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=B3P5NcKa4ZU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=109&t=895s&pp=iAQB",
  },
  {
    title: "forEach Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=SfxwYaPBUp0&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=110&pp=iAQB",
  },
  {
    title: "for of Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=cZajpcmcTjQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=111&pp=iAQB",
  },
  {
    title: "How to get input from user in Array JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=1Zf0gi3AHcs&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=112&t=515s&pp=iAQB",
  },
  {
    title: "MultiDimensional Array in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=yo2ZmVvALBo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=113&t=27s&pp=iAQB",
  },
  {
    title: "How to Create Empty 2D Array in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=yWsLB4TtH1k&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=114&pp=iAQB",
  },
  {
    title: "How to get Input from user in 2D Array JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=whd6z1BGh_M&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=115&t=17s&pp=iAQB",
  },
  {
    title: "concat Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=oIdH3prC3KM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=116&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "join Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=a63hzNhm-YI&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=117&t=149s&pp=iAQB",
  },
  {
    title: "reverse Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=5uLhHSu8_uw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=118&pp=iAQB",
  },
  {
    title: "Slice Method with Array in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=aFOlfQ6rAeo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=119&t=217s&pp=iAQB",
  },
  {
    title: "toString Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=gRxzl6tsExk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=120&pp=iAQB",
  },
  {
    title: "ArrayisArray Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=JAi7oYlkavM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=121&pp=iAQB",
  },
  {
    title: "splice Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=y80-jW_NsJM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=122&t=545s&pp=iAQB",
  },
  {
    title: "indexOf Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=LQtIUkr2Khk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=123&t=19s&pp=iAQB",
  },
  {
    title: "fill Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=4uJQ7soud4M&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=124&t=102s&pp=iAQB",
  },
  {
    title: "unshift Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=fYgU5cHwBMQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=125&pp=iAQB",
  },
  {
    title: "push Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=t0T8g5xwLDA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=126&pp=iAQB",
  },
  {
    title: "shift Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=EuKMuyncZPI&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=127&pp=iAQB",
  },
  {
    title: "pop Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=X0lz2lA29X0&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=128&pp=iAQB",
  },
  {
    title: "Boolean in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=DVaarHWj-e4&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=129&t=76s&pp=iAQB",
  },
  {
    title: "String in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=zf-PIBFoAIk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=130&t=797s&pp=iAQB",
  },
  {
    title: "String Concatenation in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=_Z63cDQygwk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=131&t=315s&pp=iAQB",
  },
  {
    title: "Escape Notations in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=GGm5JpEbnWk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=132&pp=iAQB",
  },
  {
    title:
      "Template Literal Difference between Double quote Single quote and Back Tick in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=2-MW8KGfIxw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=133&t=980s&pp=iAQB",
  },
  {
    title: "Tagged Template in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=x1mlWPHTnA8&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=134&t=216s&pp=iAQB",
  },
  {
    title: "String Length Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=x4-FY-WowgQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=135&pp=iAQB",
  },
  {
    title: "charAt Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=23h6fXW1UD8&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=136&pp=iAQB",
  },
  {
    title: "charCodeAt Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=I1mGAZ2hbzA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=137&pp=iAQB",
  },
  {
    title: "toUpperCase and toLowerCase Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=BA12Voa566g&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=138&pp=iAQB",
  },
  {
    title: "trim Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=q903QUrgW84&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=139&pp=iAQB",
  },
  {
    title: "replace Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=2yDszkKox7M&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=140&pp=iAQB",
  },
  {
    title: "split Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=pw-abDbp_IU&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=141&t=204s&pp=iAQB",
  },
  {
    title: "indexOf Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=eJwwGIKWoOw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=142&pp=iAQB",
  },
  {
    title: "search Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=uTA3nuFS3oA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=143&pp=iAQB",
  },
  {
    title: "slice Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=bWncqsSk4To&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=144&t=87s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "substring Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=PHgmq2tV1wo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=145&pp=iAQB",
  },
  {
    title: "substr Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=n1meScCNEvc&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=146&pp=iAQB",
  },
  {
    title: "Numbers in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=6JB-QW0tywM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=147&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Number with String in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=w32yyMCrNXE&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=148&pp=iAQB",
  },
  {
    title: "NaN in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=_Oh8gNi_0HM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=149&pp=iAQB",
  },
  {
    title: "NaN is not equal to Anything in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=rkN4_wAPtiQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=150&pp=iAQB",
  },
  {
    title: "isNaN Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=cAzosYB5u8A&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=151&t=1s&pp=iAQB",
  },
  {
    title: "Infinity and Negative Infinity in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ggia7REiUfg&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=152&pp=iAQB",
  },
  {
    title: "toString Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=X5CXb39IIvA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=153&t=2s&pp=iAQB",
  },
  {
    title: "toExponential Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=LNX_wQVUELc&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=154&pp=iAQB",
  },
  {
    title: "toFixed Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=wWT3XmxIJTc&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=155&pp=iAQB",
  },
  {
    title: "toPrecision Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Yy3yIw1uhEA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=156&pp=iAQB",
  },
  {
    title: "isInteger Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=hOnPMtbkgmQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=157&t=17s&pp=iAQB",
  },
  {
    title: "isSafeInteger Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ICv7OYUcqsw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=158&pp=iAQB",
  },
  {
    title: "Number Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=zDoCinTZs0o&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=159&pp=iAQB",
  },
  {
    title: "parseInt Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=cwuaWpzC40E&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=160&t=1s&pp=iAQB",
  },
  {
    title: "parseFloat Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=4NzVzUOPBAs&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=161&t=3s&pp=iAQB",
  },
  {
    title: "Math in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=rzLypk9t5xo&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=162&t=119s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Min and Max Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=j_OoJT_AWR8&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=163&pp=iAQB",
  },
  {
    title: "floor Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=B5eilyKcnGk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=164&t=2s&pp=iAQB",
  },
  {
    title: "round Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=AWL2fA_lZ2o&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=165&t=1s&pp=iAQB",
  },
  {
    title: "How to Generate Random Number in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=7JPAUEVybyk&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=166&t=149s&pp=iAQB",
  },
  {
    title: "Date in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=MZ3LKI-4AAw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=167&pp=iAQB",
  },
  {
    title: "Create Date Object using Date ( ) in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=0cydoeQejoA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=168&pp=iAQB",
  },
  {
    title: "Create Date Object using Date (millisecond) JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=vpPHLeZdVBE&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=169&pp=iAQB",
  },
  {
    title:
      "Create Date Object using Date (y m d h min s ms) in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=xIziOQ0k9Ys&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=170&t=63s&pp=iAQB",
  },
  {
    title: "Create Date Object using Date (dateString) in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=yRQKle2wh3Q&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=171&pp=iAQB",
  },
  {
    title: "ISO Date in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=EHxidbfL_SM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=172&t=164s&pp=iAQB",
  },
  {
    title: "Short Date in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=GjMP0gr0JUQ&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=173&pp=iAQB",
  },
  {
    title: "Long Date in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ZnSKA6Jgh04&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=174&pp=iAQB",
  },
  {
    title: "Set Date Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=10VHgDDDsZ0&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=175&pp=iAQB",
  },
  {
    title: "Get Date Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=-_D5PhPsSFs&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=176&t=51s&pp=iAQB",
  },
  {
    title: "Retrieve Month Name and Day Name in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=PUe0Derf7LI&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=177&t=49s&pp=iAQB",
  },
  {
    title: "How to Format Date and Time in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Ii24tY9FsUw&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=178&pp=iAQB",
  },
  {
    title: "How to Convert Date to String in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=fa9DrzSpsCM&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=179&pp=iAQB",
  },
  {
    title: "Core JavaScript Completed What Next",
    video:
      "https://www.youtube.com/watch?v=7npOSYkGEKA&list=PLbGui_ZYuhiiaQjuOfvgx_-gzVBlCxrk0&index=180&pp=iAQB",
  },
  {
    title: "Introduction to Advance JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=eezTCf0EXXs&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=1&t=38s&pp=iAQB",
  },
  {
    title: "Download Advance JavaScript Notes",
    video:
      "https://www.youtube.com/watch?v=mlXdi45I7is&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=2&pp=iAQB",
  },
  {
    title: "What is Document Object Model in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=9vpvFQrv95o&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=3&pp=iAQB",
  },
  {
    title: "Document Tree in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=qaVoECrGqV0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=4&t=694s&pp=iAQB",
  },
  {
    title: "getElementById Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=4cWPdDeF1Bk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=5&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "getElementsByTagName Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=PYCbtTXeIzU&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=6&pp=iAQB",
  },
  {
    title: "getElementsByTagName More Specific Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=-GkwpdZvgQA&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=7&t=18s&pp=iAQB",
  },
  {
    title:
      "getElementsByTagName Method with Length Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=yDys33B5wlQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=8&pp=iAQB",
  },
  {
    title: "getElementsByTagName Method with Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=L8QEHTxlDLo&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=9&t=99s&pp=iAQB",
  },
  {
    title: "getElementsByClassName Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=tS4YgUeggd0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=10&t=7s&pp=iAQB",
  },
  {
    title: "getElementsByClassName More Specific Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=YnQXKA-rvj4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=11&pp=iAQB",
  },
  {
    title:
      "getElementsByClassName Method with Length Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=dv5V0CDi6T4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=12&t=227s&pp=iAQB",
  },
  {
    title: "getElementsByClassName Method with Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=wLj8EsRDarg&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=13&t=434s&pp=iAQB",
  },
  {
    title: "querySelector Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=3pfRgPGENqw&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=14&t=702s&pp=iAQB",
  },
  {
    title: "querySelectorAll Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=7JF2lw9shCw&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=15&t=673s&pp=iAQB",
  },
  {
    title: "querySelectorAll  More Specific Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=WEyd9_hWNY0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=16&t=357s&pp=iAQB",
  },
  {
    title: "querySelectorAll Method with Length Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=9dkW5l-cCuQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=17&pp=iAQB",
  },
  {
    title: "querySelectorAll Method with Loop in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=z-5c0yo4srM&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=18&pp=iAQB",
  },
  {
    title: "Web Page Properties in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=thxWOb3VNbA&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=19&t=761s&pp=iAQB",
  },
  {
    title: "Properties of Node Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=yctJyyUGo_s&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=20&t=1426s&pp=iAQB",
  },
  {
    title: "Properties of Attribute Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=hSt4DUaV5vM&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=21&t=703s&pp=iAQB",
  },
  {
    title:
      "Difference between Node of an Element and Element Node of an Element in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=vSklePhgJF4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=22&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "DOM Traversal in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=XIDdgZtuFFI&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=23&pp=iAQB",
  },
  {
    title: "parentNode and parentElement in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=5Ur1V-aGbFY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=24&t=196s&pp=iAQB",
  },
  {
    title: "childNodes and children in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=JRjh_rKE6j4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=25&t=740s&pp=iAQB",
  },
  {
    title: "firstChild and firstElementChild in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=49aTQFDGwhk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=26&t=74s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "lastChild and lastElementChild in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=V6FBNMjOIUM&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=27&t=11s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "previousSibling and previousElementSibling in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=qSUPQltCE_c&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=28&t=198s&pp=iAQB",
  },
  {
    title: "nextSibling and nextElementSibling in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=8Yst37oIp4g&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=29&t=141s&pp=iAQB",
  },
  {
    title: "How to Create Element Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=NRWfpJ_uZW4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=30&pp=iAQB",
  },
  {
    title: "How to Create Text Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=cjIMIUyT9_0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=31&pp=iAQB",
  },
  {
    title: "How to Create Comment Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=uL01l6IJJgY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=32&pp=iAQB",
  },
  {
    title: "What is Document Fragment in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=kUA9GMHmxdY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=33&pp=iAQB",
  },
  {
    title: "How to Create Document Fragment in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=M43zfD8pz9g&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=34&t=105s&pp=iAQB",
  },
  {
    title: "How to Append Element Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Ba1LNjH-iCA&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=35&t=109s&pp=iAQB",
  },
  {
    title: "How to Append Text Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=0gWbAPufYmU&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=36&t=106s&pp=iAQB",
  },
  {
    title: "How to Append Comment Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=D2dpFC62SDE&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=37&t=2s&pp=iAQB",
  },
  {
    title:
      "How to Append Element Node Text Node and Comment Node Together in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Ks57_HcxwH0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=38&t=349s&pp=iAQB",
  },
  {
    title: "Example of Document Fragment in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=BZZLYPCpVos&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=39&pp=iAQB",
  },
  {
    title: "normalize Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=7ue7ouUt4HU&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=40&t=246s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "insertBefore Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=k729kNQkabs&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=41&t=733s&pp=iAQB",
  },
  {
    title: "insertAdjacentElement Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=8dt-DGgIk_4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=42&t=71s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "insertAdjacentHTML Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=BrnSlZwE8UU&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=43&t=4s&pp=iAQB",
  },
  {
    title: "insertAdjacentText Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=FLTZGXt7JBg&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=44&t=1s&pp=iAQB",
  },
  {
    title: "innerHTML in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=1VaCyH885z4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=45&pp=iAQB",
  },
  {
    title: "outerHTML in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=g1IugRGPviw&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=46&pp=iAQB",
  },
  {
    title: "innerText in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=uZJfAklF2Ys&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=47&pp=iAQB",
  },
  {
    title: "write and writeln Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=iqUS5yi15Ls&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=48&pp=iAQB",
  },
  {
    title: "How to Copy Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=CjPexxUi-fk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=49&pp=iAQB",
  },
  {
    title: "How to Remove Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=3hpRmgBhz2A&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=50&pp=iAQB",
  },
  {
    title: "How to Replace Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=thJ5I9PKEXs&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=51&t=373s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Modifying Text Nodes Length Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=D7oxKQ63Eus&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=52&pp=iAQB",
  },
  {
    title: "Modifying Text Nodes Data Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=56HDR5pzgFs&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=53&t=2s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "How to Append Data in Text Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=j7KXlM8cBCk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=54&pp=iAQB",
  },
  {
    title: "How to Delete Data in Text Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=j6WQWVLsclQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=55&pp=iAQB",
  },
  {
    title: "How to Insert Data in Text Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=gqmhwtKNfFk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=56&pp=iAQB",
  },
  {
    title: "How to Replace Data in Text Node in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Owkael0SnSQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=57&pp=iAQB",
  },
  {
    title: "How to Split Text in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=IWfQDaLqMW4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=58&t=137s&pp=iAQB",
  },
  {
    title: "substringData Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=8zXCLpeCaP0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=59&pp=iAQB",
  },
  {
    title:
      "Difference between HTML Attribute and DOM Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=prNAgsHQmU0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=60&t=39s&pp=iAQB",
  },
  {
    title: "Attributes Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=HpQ-YeRqpJs&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=61&pp=iAQB",
  },
  {
    title: "setAttribute and getAttribute Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=qyNt2tObrKs&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=62&t=343s&pp=iAQB",
  },
  {
    title: "removeAttribute and hasAttribute Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=F2CEq-jfyrI&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=63&pp=iAQB",
  },
  {
    title: "HTML DOM Mapping in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=wYkINI0fzrY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=64&t=87s&pp=iAQB",
  },
  {
    title: "CSS DOM Mapping in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=bSpOfzhkDUM&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=65&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "CSSStyleDeclaration Object Style Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=xWPxOgyb_UU&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=66&pp=iAQB",
  },
  {
    title: "Dynamic Style Manipulation in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=YSs5fC8VDm8&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=67&pp=iAQB",
  },
  {
    title: "DOMTokenList in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=IbZ1wYfBNzw&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=68&pp=iAQB",
  },
  {
    title: "classList Property in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=dLgSijbfx08&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=69&pp=iAQB",
  },
  {
    title:
      "CSSStyleDeclaration Object Properties and Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=3vBP0H7PH9E&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=70&pp=iAQB",
  },
  {
    title:
      "What is Computed Style and getComputedStyle Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=kQpGz8qnelM&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=71&pp=iAQB",
  },
  {
    title: "HTMLTableElement and Its Properties in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=NnpA2soZp6g&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=72&t=796s&pp=iAQB",
  },
  {
    title: "createCaption and deleteCaption Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ifo2351dn4I&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=73&pp=iAQB",
  },
  {
    title: "createTHead and deleteTHead Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=SrrD2YO81Rk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=74&pp=iAQB",
  },
  {
    title: "createTFoot and deleteTFoot Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=nhsFHkPQcJc&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=75&pp=iAQB",
  },
  {
    title: "insertRow and deleteRow Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=yVGYJaVZW0I&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=76&t=2s&pp=iAQB",
  },
  {
    title: "HTML Table Section Element in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=FL5IMhSisIA&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=77&t=27s&pp=iAQB",
  },
  {
    title: "HTML Table Row Element in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=-24L2BbpSYE&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=78&pp=iAQB",
  },
  {
    title: "textContent in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=QQdlgXZUKM0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=79&pp=iAQB",
  },
  {
    title: "Difference between textContent and innerHTML in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=CQe_U9okg34&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=80&pp=iAQB",
  },
  {
    title: "DOM CSS Selector in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=3lf7hpHWqtI&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=81&pp=iAQB",
  },
  {
    title: "Event in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=8inFPcc3uz4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=82&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Event Handler in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=6-n_oQXQ96Y&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=83&pp=iAQB",
  },
  {
    title: "Event Binding with HTML Attribute in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Jl69fHRtxWk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=84&pp=iAQB",
  },
  {
    title: "Event Binding with JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=VtE5ti-Llvk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=85&t=110s&pp=iAQB",
  },
  {
    title: "Overwriting Event Handler in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=nIORcDd2J5U&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=86&t=59s&pp=iAQB",
  },
  {
    title: "addEventListener in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=u3_QLFWmKiA&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=87&pp=iAQB",
  },
  {
    title: "removeEventListener in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=jGf2_t-yX6U&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=88&pp=iAQB",
  },
  {
    title: "DOM Event Flow or Event Propagation in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=_3sWh5WgmFw&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=89&t=269s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Event Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=HDqi-mcz57s&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=90&t=161s&pp=iAQB",
  },
  {
    title:
      "What is the Difference between target and current target in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=8FoeDEH7FX0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=91&t=92s&pp=iAQB",
  },
  {
    title:
      "Event Methods stopPropagation and stopImmediatePropagation in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=qB_9rF32EaI&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=92&t=168s&pp=iAQB",
  },
  {
    title: "How to prevent Element default behavior in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=_cN7H2bWKZQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=93&t=9s&pp=iAQB",
  },
  {
    title: "Mouse Event in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=V0I-UewsdrE&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=94&t=273s&pp=iAQB",
  },
  {
    title: "Focus Event in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Z9A5qHjxjxI&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=95&t=6s&pp=iAQB",
  },
  {
    title: "Key Events in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=tdLUI3bsQ4A&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=96&t=20s&pp=iAQB",
  },
  {
    title: "Text Event in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=4cui4jaMH-0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=97&pp=iAQB",
  },
  {
    title: "Window Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=qc_rJbZOTcA&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=98&t=433s&pp=iAQB",
  },
  {
    title: "Dialog boxes in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=H8HJCzhiixI&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=99&t=587s&pp=iAQB",
  },
  {
    title: "open and close Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=07BYO2dCYAE&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=100&t=621s&pp=iAQB",
  },
  {
    title: "print Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ENRzpPFXdeQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=101&pp=iAQB",
  },
  {
    title: "focus and blur Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=K2NPlz0sjF8&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=102&pp=iAQB",
  },
  {
    title: "Moving Window in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=8OFqe1ri-vo&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=103&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title: "Resizing Window in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=_fABS7LBNZo&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=104&pp=iAQB",
  },
  {
    title: "Scrolling Window in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=EIwhwljez6g&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=105&pp=iAQB",
  },
  {
    title: "Location Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=m0Ga7CocAIE&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=106&t=627s&pp=iAQB",
  },
  {
    title: "History Object in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=BPdgBfJ-wsw&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=107&t=190s&pp=iAQB",
  },
  {
    title: "setTimeout and clearTimeout Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=365Js5l0LpY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=108&t=579s&pp=iAQB",
  },
  {
    title: "setInterval and clearInterval Methods in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=QE6lgZ9sbd8&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=109&t=154s&pp=iAQB",
  },
  {
    title: "Window Events in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=hdR5YoV3edg&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=110&pp=iAQB",
  },
  {
    title: "Form Handling in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=7b77qxHZtEk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=111&pp=iAQB",
  },
  {
    title: "Accessing Forms in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=zn5YYoGUtjQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=112&t=547s&pp=iAQB",
  },
  {
    title: "Accessing Form Fields in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Syrpg_TmqOU&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=113&t=442s&pp=iAQB",
  },
  {
    title: "Form Validation in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ROWiB4LNfYw&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=114&t=6s&pp=iAQB",
  },
  {
    title: "What is Cookie and How it works (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ueh7WzP8KRQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=115&t=826s&pp=iAQB",
  },
  {
    title: "Cookies in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=pqHQEtY8dsw&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=116&t=6s&pp=iAQB",
  },
  {
    title: "How to Set Cookies into Client System using JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Pl7p-gPGH5c&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=117&pp=iAQB",
  },
  {
    title: "How to set Cookies max age in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=O58vTkz_BpY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=118&t=425s&pp=iAQB",
  },
  {
    title: "How to set expires date for cookie in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=-Mi3cC-yBx4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=119&t=3s&pp=iAQB",
  },
  {
    title: "How to set cookie domain path and secure in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=bTVLtg7zfu8&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=120&t=26s&pp=iAQB",
  },
  {
    title: "How to Replace and Append Cookie in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=G8qrmHIiDIc&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=121&t=278s&pp=iAQB",
  },
  {
    title: "How to Read Cookies in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=IRLXrVX12Oc&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=122&pp=iAQB",
  },
  {
    title: "How to Delete Cookie in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Q2ClLmlZb-o&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=123&pp=iAQB",
  },
  {
    title: "How to Update Cookie in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=TrXVASuYyY8&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=124&pp=iAQB",
  },
  {
    title: "Cookies Security issues in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=XTfaBn8KlV0&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=125&pp=iAQB",
  },
  {
    title: "Local Storage in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Xf0hPx9VoVs&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=126&pp=iAQB",
  },
  {
    title: "Session Storage in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=W_ZlFonDCmk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=127&t=438s&pp=iAQB",
  },
  {
    title: "Exception Handling in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=oqyi4YDKRvk&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=128&t=556s&pp=iAQB",
  },
  {
    title: "Strict Mode in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=pPKDimOYwK4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=129&t=79s&pp=iAQB0gcJCa0JAYcqIYzv",
  },
  {
    title:
      "How to check Browser Cookie Enabled or Disabled in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=XmNRntzRYBg&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=130&t=97s&pp=iAQB",
  },
  {
    title: "Callback Function in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=ec26pgfnYPM&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=131&t=943s&pp=iAQB",
  },
  {
    title: "map Method in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=d-XvHchmoVY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=132&t=328s&pp=iAQB",
  },
  {
    title: "Array Destructuring in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=mQeX6vjvBPY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=133&t=387s&pp=iAQB",
  },
  {
    title: "Object Destructuring in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=2P-d94bRlQ4&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=134&pp=iAQB",
  },
  {
    title: "Module Import Export in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=YEA8ekByboM&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=135&t=325s&pp=iAQB",
  },
  {
    title: "Spread Operator in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=xdgqeBl-7og&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=136&t=6s&pp=iAQB",
  },
  {
    title: "Promise and Async Await in JavaScript (Hindi)",
    video:
      "https://www.youtube.com/watch?v=V2NeK5UT5Oc&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=137&t=31s&pp=iAQB",
  },
  {
    title: "JavaScript Best Practice (Hindi)",
    video:
      "https://www.youtube.com/watch?v=Dp4teKbICrQ&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=138&pp=iAQB",
  },
  {
    title: "Advance JavaScript Completed Now What Next",
    video:
      "https://www.youtube.com/watch?v=wWPPGekzISY&list=PLbGui_ZYuhihZ-pDxNZuQ7xOQ8IS2z3XI&index=139&pp=iAQB",
  },
]);

const topicsToShow = ref(5);

const visibleTopics = computed(() => {
  return topics.value.slice(0, topicsToShow.value);
});

const remainingTopics = computed(() => {
  return topics.value.length - topicsToShow.value;
});

function isYouTube(url) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getEmbedUrl(url) {
  const videoId = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}`;
}

function completeTopic(index) {
  topics.value[index].completed = true;
}

function loadMore() {
  // Show 5 more topics, but don't exceed the total number of topics
  topicsToShow.value = Math.min(topicsToShow.value + 5, topics.value.length);
}
const questions = [
  {
    question: "What is JavaScript?",
    options: [
      "A programming language",
      "A markup language",
      "A database",
      "A stylesheet",
    ],
    correctIndex: 0,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Apple"],
    correctIndex: 1,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    correctIndex: 0,
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correctIndex: 3,
  },
  {
    question: "What is the output of 'typeof null'?",
    options: ["null", "object", "undefined", "boolean"],
    correctIndex: 1,
  },
  {
    question: "Which method converts JSON to a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.objectify()",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunc() {}",
      "function:myFunc() {}",
      "def myFunc() {}",
      "create function myFunc() {}",
    ],
    correctIndex: 0,
  },
  {
    question: "What will '2' + 2 return?",
    options: ["4", "'4'", "'22'", "Error"],
    correctIndex: 2,
  },
  {
    question: "What does '===' operator mean?",
    options: [
      "Equals value and type",
      "Equals value only",
      "Assignment operator",
      "None of the above",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you write an arrow function?",
    options: ["() => {}", "function() => {}", "func() -> {}", "lambda () {}"],
    correctIndex: 0,
  },

  // Questions 11 - 20
  {
    question: "Which of these is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    correctIndex: 3,
  },
  {
    question: "How do you create an array in JavaScript?",
    options: ["[]", "{}", "()", "<>"],
    correctIndex: 0,
  },
  {
    question: "Which method removes the last item from an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctIndex: 0,
  },
  {
    question: "Which method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctIndex: 0,
  },
  {
    question: "Which method removes the first item from an array?",
    options: ["shift()", "pop()", "push()", "unshift()"],
    correctIndex: 0,
  },
  {
    question: "Which method adds an item to the beginning of an array?",
    options: ["unshift()", "push()", "shift()", "pop()"],
    correctIndex: 0,
  },
  {
    question: "What is the output of 'console.log(0 == false)'?",
    options: ["true", "false", "undefined", "Error"],
    correctIndex: 0,
  },
  {
    question: "Which keyword is used to declare a constant?",
    options: ["const", "let", "var", "constant"],
    correctIndex: 0,
  },
  {
    question: "What will 'typeof NaN' return?",
    options: ["number", "NaN", "undefined", "object"],
    correctIndex: 0,
  },
  {
    question: "What is a closure?",
    options: [
      "A function with access to variables in outer scope",
      "A special variable type",
      "An object",
      "A loop",
    ],
    correctIndex: 0,
  },

  // Questions 21 - 50 (You can expand similarly)
  {
    question: "Which method is used to call a function immediately?",
    options: [
      "IIFE (Immediately Invoked Function Expression)",
      "call()",
      "apply()",
      "bind()",
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'this' keyword refer to inside a regular function?",
    options: [
      "The object that called the function",
      "Global object",
      "The function itself",
      "Undefined",
    ],
    correctIndex: 1,
  },
  {
    question: "How do you write a JavaScript object?",
    options: [
      "{ key: 'value' }",
      "[ key: 'value' ]",
      "( key: 'value' )",
      "< key: 'value' >",
    ],
    correctIndex: 0,
  },
  {
    question: "What is the output of 'console.log(typeof undefined)'?",
    options: ["undefined", "null", "object", "string"],
    correctIndex: 0,
  },
  {
    question: "What is event bubbling in JavaScript?",
    options: [
      "Event propagates from child to parent",
      "Event propagates from parent to child",
      "Event stops immediately",
      "Event is blocked",
    ],
    correctIndex: 0,
  },
  {
    question: "Which method converts a JavaScript object to a JSON string?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.toString()",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you handle exceptions in JavaScript?",
    options: [
      "try...catch",
      "if...else",
      "throw",
      "error handling is automatic",
    ],
    correctIndex: 0,
  },
  {
    question: "Which method can be used to add properties to an object?",
    options: [
      "object.property = value",
      "object.addProperty()",
      "object.insert()",
      "object.set()",
    ],
    correctIndex: 0,
  },
  {
    question: "What is hoisting in JavaScript?",
    options: [
      "Variables and functions are moved to the top of their scope",
      "Code execution order",
      "Error handling mechanism",
      "Memory allocation",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a class in JavaScript?",
    options: [
      "class MyClass {}",
      "function MyClass() {}",
      "class: MyClass {}",
      "create class MyClass {}",
    ],
    correctIndex: 0,
  },

  // Add questions 51 to 200 similarly below:
  {
    question: "What is the difference between var, let and const?",
    options: [
      "Scope and reassignment differences",
      "No difference",
      "All are constants",
      "All are global",
    ],
    correctIndex: 0,
  },
  {
    question: "What is a promise?",
    options: [
      "An object representing eventual completion or failure",
      "A function",
      "A variable",
      "A data type",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you handle asynchronous code in JavaScript?",
    options: ["Callbacks", "Promises", "Async/Await", "All of the above"],
    correctIndex: 3,
  },
  {
    question: "Which method schedules code to run after a specified delay?",
    options: ["setTimeout()", "setInterval()", "delay()", "sleep()"],
    correctIndex: 0,
  },
  {
    question: "Which method repeats code at specified intervals?",
    options: ["setInterval()", "setTimeout()", "repeat()", "loop()"],
    correctIndex: 0,
  },
  {
    question: "How do you convert a string to a number in JavaScript?",
    options: ["parseInt()", "Number()", "Unary plus (+)", "All of the above"],
    correctIndex: 3,
  },
  {
    question: "What is the difference between == and ===?",
    options: [
      "== compares value, === compares value and type",
      "No difference",
      "== compares type, === compares value",
      "Both compare reference",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you define default parameters in a function?",
    options: [
      "function fn(param=defaultValue) {}",
      "function fn(param?: defaultValue) {}",
      "function fn(default param) {}",
      "function fn(param) { param = defaultValue }",
    ],
    correctIndex: 0,
  },
  {
    question: "What are template literals?",
    options: [
      "Strings enclosed in backticks allowing embedded expressions",
      "Strings enclosed in quotes",
      "Multiline comments",
      "Variables",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you write multi-line strings in ES6?",
    options: [
      "Using template literals (`...`)",
      "Using + operator",
      "Using \\n only",
      "Using arrays",
    ],
    correctIndex: 0,
  },

  // ... continue with similar questions up to 200 ...

  {
    question: "How do you check if a variable is an array?",
    options: ["Array.isArray()", "typeof", "instanceof Array", "isArray()"],
    correctIndex: 0,
  },
  {
    question: "What is event delegation?",
    options: [
      "Attaching event listener to a parent to handle events for children",
      "Handling events individually",
      "Stopping event propagation",
      "None of the above",
    ],
    correctIndex: 0,
  },
  {
    question: "Which method merges two or more arrays?",
    options: ["concat()", "merge()", "combine()", "append()"],
    correctIndex: 0,
  },
  {
    question: "How do you deep clone an object in JavaScript?",
    options: [
      "Using JSON.parse(JSON.stringify(obj))",
      "Using Object.assign()",
      "Using spread operator",
      "All of the above",
    ],
    correctIndex: 0,
  },
  {
    question: "What does the 'new' keyword do?",
    options: [
      "Creates an instance of an object",
      "Declares a variable",
      "Creates a function",
      "Throws error",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you access the last element of an array 'arr'?",
    options: [
      "arr[arr.length - 1]",
      "arr.last()",
      "arr[-1]",
      "arr.lastIndex()",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Which array method transforms every element and returns a new array?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
    correctIndex: 0,
  },
  {
    question: "Which array method filters elements based on condition?",
    options: ["filter()", "map()", "reduce()", "find()"],
    correctIndex: 0,
  },
  {
    question: "What is the difference between 'null' and 'undefined'?",
    options: [
      "'null' is an assigned value; 'undefined' means variable declared but not assigned",
      "No difference",
      "'undefined' is a value",
      "'null' means missing variable",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you catch errors in asynchronous code?",
    options: [
      "Using .catch() with Promises",
      "Using try...catch",
      "Using async/await with try...catch",
      "All of the above",
    ],
    correctIndex: 3,
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
