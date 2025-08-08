<template>
  <div>
    <!-- Header -->
    <header
      class="flex  justify-between items-center py-6 px-6 md:px-10 bg-white shadow-md relative"
    >
      <div class="flex items-center gap-2">
        <img src="~/assets/Log.jpg" alt="Logo" class="h-10 w-10" />
        <span class="font-bold text-xl text-gray-800">Eduction AI</span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="space-x-6 hidden md:flex">
<nuxt-link to="/html" class="text-gray-700 font-medium hover:text-blue-600"> 
    HTML
  </nuxt-link>
  <a href="/courses/css" class="text-gray-700 font-medium hover:text-blue-600">
    CSS
  </a>
  <a href="/courses/javascript" class="text-gray-700 font-medium hover:text-blue-600">
    JavaScript
  </a>
  <a href="/courses/tailwind" class="text-gray-700 font-medium hover:text-blue-600">
    Tailwind CSS
  </a>
  <a href="/courses/vue" class="text-gray-700 font-medium hover:text-blue-600">
    Vue.js
  </a>
  <a href="/courses/nuxt" class="text-gray-700 font-medium hover:text-blue-600">
    Nuxt.js
  </a>
</nav>


      <!-- CTA Button -->
      <nuxt-link to="/signin">
        <button
          class="hidden md:block bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Get Started
        </button>
      </nuxt-link>

      <!-- Hamburger Menu Button -->
      <button class="md:hidden" @click="toggleMenu">
        <span v-if="!menuOpen">
          <!-- Hamburger icon -->
          <svg
            class="w-7 h-7 text-gray-800"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </span>
        <span v-else>
          <!-- Close icon -->
          <svg
            class="w-7 h-7 text-gray-800"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </button>

      <!-- Mobile Menu -->
      <div
        v-if="menuOpen"
        class="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden z-50"
      >
    
  <nuxt-link to="/html" class="text-gray-700 font-medium hover:text-blue-600"> 
    HTML
  </nuxt-link>
  <a href="/courses/css" class="text-gray-700 font-medium hover:text-blue-600">
    CSS
  </a>
  <a href="/courses/javascript" class="text-gray-700 font-medium hover:text-blue-600">
    JavaScript
  </a>
  <a href="/courses/tailwind" class="text-gray-700 font-medium hover:text-blue-600">
    Tailwind CSS
  </a>
  <a href="/courses/vue" class="text-gray-700 font-medium hover:text-blue-600">
    Vue.js
  </a>
  <a href="/courses/nuxt" class="text-gray-700 font-medium hover:text-blue-600">
    Nuxt.js
  </a>


        <nuxt-link to="/signin">
          <button
            class="md:block bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </nuxt-link>
      </div>
    </header>

    <!-- Hero Section -->
    <section class=" ">
    <div
  class="bg-[url('/hero.png')] bg-cover bg-center   text-center h-[850px] w-full"
>
      <div class="grid-cols-1 text-left ml-12 pt-16 ">
          <h1
          class="text-4xl md:text-5xl font-bold  pt-16  text-white leading-snug"
        >
          Unlock Your Potential 
          <span class="block md:inline"> <br />Become a Frontend Hero</span>
        </h1>
        <p class="text-white/80 mt-6 text-lg text ">
          Master HTML, CSS, JS, <br>and more Courses: HTML, CSS, JavaScript,<br>
          Tailwind CSS, Vue.js, Nuxt.js

          <br />
        </p>
      </div>

        <div class="mt-8 flex items-start ml-12 gap-6 flex-wrap">
          <!-- get started button  -->
          <nuxt-link to="/signin">
            <button
              class="bg-blue-500 hover:cursor-pointer text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition"
            >
              Start Learning Now
            </button>
          </nuxt-link>
          <a href="">
            <button
              class="border border-blue-500 text-blue-500 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition hover:cursor-pointer"
            >
              Explore More Features
            </button>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>
