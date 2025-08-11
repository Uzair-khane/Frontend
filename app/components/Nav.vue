<template>
  <div>
    <!-- Header -->
    <header
      class="flex  justify-between items-center py-6 px-6 md:px-10 bg-white shadow-md relative " 
    >
      <div class="flex items-center gap-2">
        <img src="~/assets/Log.jpg" alt="Logo" class="h-10 w-10" />
        <span class="font-bold text-xl text-gray-800">Frontend Hero</span>
      </div>

      <!-- Desktop Navigation -->
<nav class="space-x-6 hidden md:flex">
  <nuxt-link to="/html" target="_blank" rel="noopener noreferrer" class="text-gray-700 font-medium hover:text-blue-600"> 
    HTML
  </nuxt-link>
  <nuxt-link to="/css" target="_blank" rel="noopener noreferrer" class="text-gray-700 font-medium hover:text-blue-600"> 
    CSS
  </nuxt-link>
  <nuxt-link to="/tailwind" target="_blank" rel="noopener noreferrer" class="text-gray-700 font-medium hover:text-blue-600"> 
    Tailwind CSS
  </nuxt-link>
  <nuxt-link to="/js" target="_blank" rel="noopener noreferrer" class="text-gray-700 font-medium hover:text-blue-600"> 
    JavaScript
  </nuxt-link>
  <nuxt-link to="/vue" target="_blank" rel="noopener noreferrer" class="text-gray-700 font-medium hover:text-blue-600"> 
    Vue.js
  </nuxt-link>
  <nuxt-link to="/nuxt" target="_blank" rel="noopener noreferrer" class="text-gray-700 font-medium hover:text-blue-600"> 
    Nuxt.js
  </nuxt-link>
</nav>



      <!-- CTA Button -->
      <nuxt-link to="/book">
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
 <nuxt-link to="/css" class="text-gray-700 font-medium hover:text-blue-600"> 
    Css
  </nuxt-link>
 <nuxt-link to="/js" class="text-gray-700 font-medium hover:text-blue-600"> 
    JavaScript
  </nuxt-link>
 <nuxt-link to="/tailwind" class="text-gray-700 font-medium hover:text-blue-600"> 
    tailwind Css
  </nuxt-link>
  <nuxt-link to="/vue" class="text-gray-700 font-medium hover:text-blue-600"> 
    Vue js
  </nuxt-link>
 <nuxt-link to="/nuxt" class="text-gray-700 font-medium hover:text-blue-600"> 
    Nuxt Js
  </nuxt-link>


        <nuxt-link to="/book">
          <button
            class="md:block bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </nuxt-link>
      </div>
    </header>

    
  
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>
