<template>
  <div>
    <Nav />
  </div>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class=" py-4 px-6">
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
   <template>
    <div
      class="w-full mx-auto p-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-2xl mt-14"
    >
      <h2
        class="text-3xl font-extrabold mb-8 text-center text-indigo-800 drop-shadow-md"
      >
        Tailwind Css Quiz
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
const questions = [
  {
    question: "What is Tailwind CSS?",
    options: [
      "A CSS framework based on utility classes",
      "A JavaScript library",
      "A CSS preprocessor",
      "A UI design tool"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you apply a background color using Tailwind?",
    options: [
      "bg-red-500",
      "background-red",
      "color-bg-red",
      "red-bg"
    ],
    correctIndex: 0,
  },
  {
    question: "What does the class 'p-4' do?",
    options: [
      "Applies padding of 1rem (16px)",
      "Applies margin of 4px",
      "Applies padding of 4px",
      "Applies padding of 4rem"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class sets the text color to blue-600?",
    options: [
      "text-blue-600",
      "color-blue-600",
      "text-color-blue-600",
      "blue-text-600"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you center text horizontally?",
    options: [
      "text-center",
      "center-text",
      "text-align-center",
      "align-center"
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'mx-auto' do?",
    options: [
      "Sets horizontal margin to auto for centering",
      "Sets horizontal padding to auto",
      "Adds margin to left only",
      "Adds margin to right only"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you make an element flex container?",
    options: [
      "flex",
      "flexbox",
      "display-flex",
      "d-flex"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class applies a rounded border?",
    options: [
      "rounded",
      "border-radius",
      "radius-rounded",
      "round-border"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add shadow to an element?",
    options: [
      "shadow",
      "box-shadow",
      "shadow-box",
      "shadow-effect"
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'hover:bg-gray-200' do?",
    options: [
      "Changes background to gray-200 on hover",
      "Changes text color to gray-200 on hover",
      "Removes background on hover",
      "Changes border color on hover"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you set width to full (100%)?",
    options: [
      "w-full",
      "width-full",
      "full-width",
      "w-100"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class sets the font weight to bold?",
    options: [
      "font-bold",
      "text-bold",
      "bold-font",
      "fw-bold"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you apply margin top of 6 (1.5rem)?",
    options: [
      "mt-6",
      "margin-top-6",
      "top-margin-6",
      "m-top-6"
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'grid-cols-3' do?",
    options: [
      "Creates a grid with 3 columns",
      "Creates 3 rows in grid",
      "Creates 3 grids",
      "Adds 3 columns padding"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you hide an element?",
    options: [
      "hidden",
      "display-none",
      "invisible",
      "hide"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you make text uppercase?",
    options: [
      "uppercase",
      "text-upper",
      "text-uppercase",
      "upper"
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'space-x-4' do?",
    options: [
      "Adds horizontal spacing of 1rem between children",
      "Adds vertical spacing between children",
      "Adds margin right 4",
      "Adds padding left 4"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you apply a border of 2 pixels?",
    options: [
      "border-2",
      "border-width-2",
      "b-2",
      "bw-2"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class sets the height to 16 (4rem)?",
    options: [
      "h-16",
      "height-16",
      "h-full",
      "height-full"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you make text italic?",
    options: [
      "italic",
      "text-italic",
      "font-italic",
      "text-it"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the class for applying a transition effect?",
    options: [
      "transition",
      "animate",
      "ease",
      "transform"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you set the maximum width to small?",
    options: [
      "max-w-sm",
      "max-width-small",
      "max-sm",
      "mw-sm"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class sets display to inline-block?",
    options: [
      "inline-block",
      "inline",
      "block-inline",
      "block"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add padding only on the left?",
    options: [
      "pl-4",
      "padding-left-4",
      "p-left-4",
      "pl"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class sets the font size to extra large?",
    options: [
      "text-xl",
      "font-xl",
      "text-extra-large",
      "txt-xl"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you apply a flex column layout?",
    options: [
      "flex flex-col",
      "flex-column",
      "flex-col",
      "flex-col-layout"
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'justify-center' do?",
    options: [
      "Centers flex items horizontally",
      "Centers flex items vertically",
      "Aligns items to start",
      "Aligns items to end"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class applies a text shadow?",
    options: [
      "shadow",
      "text-shadow",
      "shadow-text",
      "text-shadow-md"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you make an element sticky to the top?",
    options: [
      "sticky top-0",
      "fixed top-0",
      "absolute top-0",
      "relative top-0"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class applies a cursor pointer on hover?",
    options: [
      "cursor-pointer",
      "hover-pointer",
      "pointer-cursor",
      "hover-cursor"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you set opacity to 50%?",
    options: [
      "opacity-50",
      "opacity-0.5",
      "opacity-half",
      "op-50"
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'z-10' do?",
    options: [
      "Sets z-index to 10",
      "Sets zoom level to 10",
      "Sets width to 10",
      "Sets height to 10"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add space between rows in a grid?",
    options: [
      "gap-y-4",
      "space-y-4",
      "row-gap-4",
      "grid-gap-4"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class sets a fixed width of 64 (16rem)?",
    options: [
      "w-64",
      "width-64",
      "w-fixed-64",
      "fixed-w-64"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you make an element hidden on small screens only?",
    options: [
      "sm:hidden",
      "hidden-sm",
      "hide-sm",
      "hide-on-sm"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class applies italic font style?",
    options: [
      "italic",
      "font-italic",
      "text-italic",
      "text-it"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you apply a smooth transition for background color?",
    options: [
      "transition-colors duration-300",
      "transition-bg duration-300",
      "bg-transition duration-300",
      "color-transition duration-300"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class adds a blue border?",
    options: [
      "border-blue-500",
      "blue-border",
      "border-color-blue",
      "border-primary"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add a hover effect for text color red-600?",
    options: [
      "hover:text-red-600",
      "text-hover-red-600",
      "hover-red-text",
      "hover-color-red-600"
    ],
    correctIndex: 0,
  },
  {
    question: "What does 'overflow-hidden' do?",
    options: [
      "Hides overflow content",
      "Shows scrollbars",
      "Clips overflow with scroll",
      "Shows overflow content"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you apply a responsive margin of 8 on medium screens?",
    options: [
      "md:m-8",
      "m-md-8",
      "margin-md-8",
      "m-8-md"
    ],
    correctIndex: 0,
  },
  {
    question: "Which class makes text bold and uppercase?",
    options: [
      "font-bold uppercase",
      "bold uppercase",
      "text-bold uppercase",
      "font-heavy uppercase"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you add vertical padding of 2?",
    options: [
      "py-2",
      "padding-y-2",
      "p-vertical-2",
      "pv-2"
    ],
    correctIndex: 0,
  },
];

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
