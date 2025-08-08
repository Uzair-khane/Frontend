<template>
  <div class="px-4 py-10">
    <!-- Responsive Course Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">

      <!-- HTML -->
      <nuxt-link to="/courses/html" class="w-full max-w-[300px]">
        <div class="h-[200px] bg-gradient-to-tl from-white to-blue-300 flex flex-col justify-center items-center rounded-2xl hover:cursor-pointer hover:text-white transition duration-300 ease-in-out shadow-lg">
          <img src="/html.png" class="w-[60px] h-[50px] -mt-8" alt="HTML" />
          <h1 class="text-xl text-gray-800 pt-5">HTML</h1>
          <p class="text-sm text-gray-600 pt-3 text-center px-4">Learn the structure of the web.</p>
        </div>
      </nuxt-link>

      <!-- CSS -->
      <nuxt-link to="/courses/css" class="w-full max-w-[300px]">
        <div class="h-[200px] bg-gradient-to-tl from-white to-indigo-300 flex flex-col justify-center items-center rounded-2xl hover:cursor-pointer hover:text-white transition duration-300 ease-in-out shadow-lg">
          <img src="/css.png" class="w-[60px] h-[50px] -mt-8" alt="CSS" />
          <h1 class="text-xl text-gray-800 pt-5">CSS</h1>
          <p class="text-sm text-gray-600 pt-3 text-center px-4">Style your websites beautifully.</p>
        </div>
      </nuxt-link>

      <!-- JavaScript -->
      <nuxt-link to="/courses/javascript" class="w-full max-w-[300px]">
        <div class="h-[200px] bg-gradient-to-tl from-white to-yellow-300 flex flex-col justify-center items-center rounded-2xl hover:cursor-pointer hover:text-white transition duration-300 ease-in-out shadow-lg">
          <img src="/js.png" class="w-[50px] h-[40px] -mt-8" alt="JavaScript" />
          <h1 class="text-xl text-gray-800 pt-5">JavaScript</h1>
          <p class="text-sm text-gray-600 pt-3 text-center px-4">Make your websites interactive.</p>
        </div>
      </nuxt-link>

      <!-- Tailwind CSS -->
      <nuxt-link to="/courses/tailwind" class="w-full max-w-[300px]">
        <div class="h-[200px] bg-gradient-to-tl from-white to-cyan-300 flex flex-col justify-center items-center rounded-2xl hover:cursor-pointer hover:text-white transition duration-300 ease-in-out shadow-lg">
          <img src="/tailwind.png" class="w-[60px] h-[50px] -mt-8" alt="Tailwind" />
          <h1 class="text-xl text-gray-800 pt-5">Tailwind CSS</h1>
          <p class="text-sm text-gray-600 pt-3 text-center px-4">Utility-first CSS framework.</p>
        </div>
      </nuxt-link>

      <!-- Vue.js -->
      <nuxt-link to="/courses/vue" class="w-full max-w-[300px]">
        <div class="h-[200px] bg-gradient-to-tl from-white to-green-300 flex flex-col justify-center items-center rounded-2xl hover:cursor-pointer hover:text-white transition duration-300 ease-in-out shadow-lg">
          <img src="/vue.png" class="w-[60px] h-[50px] -mt-8" alt="Vue.js" />
          <h1 class="text-xl text-gray-800 pt-5">Vue.js</h1>
          <p class="text-sm text-gray-600 pt-3 text-center px-4">Progressive JavaScript framework.</p>
        </div>
      </nuxt-link>

      <!-- Nuxt.js -->
      <nuxt-link to="/courses/nuxt" class="w-full max-w-[300px]">
        <div class="h-[200px] bg-gradient-to-tl from-white to-emerald-300 flex flex-col justify-center items-center rounded-2xl hover:cursor-pointer hover:text-white transition duration-300 ease-in-out shadow-lg">
          <img src="/nuxt.webp" class="w-[60px] h-[50px] -mt-8" alt="Nuxt.js" />
          <h1 class="text-xl text-gray-800 pt-5">Nuxt.js</h1>
          <p class="text-sm text-gray-600 pt-3 text-center px-4">Vue framework for building web apps.</p>
        </div>
      </nuxt-link>

    </div>
  </div>
</template>

<script setup>
// No JavaScript needed
</script>
