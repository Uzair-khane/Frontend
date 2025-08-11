<template>
  <div>
    <Nav />
  </div>
  <div class="min-h-screen bg-gray-50 py-10 px-6 lg:px-20">
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 tracking-tight">
      My Learning Library
    </h1>

    <!-- Books Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div 
        v-for="book in books" 
        :key="book.title" 
        class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <!-- Book Image with Overlay -->
        <div class="relative">
          <img :src="book.image" alt="Book Cover" class="w-full h-52 object-cover" />
          <span class="absolute top-3 left-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
            {{ book.category }}
          </span>
        </div>

        <!-- Book Info -->
        <div class="p-5">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ book.title }}</h2>
          <p class="text-gray-600 text-sm mb-6">{{ book.description }}</p>

          <!-- Buttons -->
          <div class="flex gap-3">
            <a 
              :href="book.download" 
              download 
              class="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition duration-200 text-center"
            >
              Download
            </a>
            <a 
              :href="book.viewOnline" 
              target="_blank" 
              class="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 text-center"
            >
              View Online
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const books = [
  {
    title: "HTML and CSS for Beginners",
    category: "HTML",
    description: "Learn the basics of HTML and build your first webpage.",
    image: "/html.jpg",
    download: "/html.pdf",
    viewOnline: "/html.pdf"
  },
  {
    title: "Tailwind CSS Guide",
    category: "Tailwind",
    description: "Build modern UIs quickly with Tailwind CSS.",
    image: "/tailwind.png",
    download: "/tailwindc.pdf",
    viewOnline: "/tailwindc.pdf"
  },
  {
    title: "JavaScript Basics",
    category: "JavaScript",
    description: "Understand the fundamentals of JavaScript programming.",
    image: "/js.jpg",
    download: "/JavaScript.pdf",
    viewOnline: "./JavaScript.pdf"
  },
  {
    title: "Vue.js Essentials",
    category: "Vue.js",
    description: "Learn Vue.js and create powerful web applications.",
    image: "/vue.jpg",
    download: "/vue.pdf",
    viewOnline: "/vue.pdf"
  },
  {
    title: "Nuxt.js Complete Guide",
    category: "Nuxt.js",
    description: "Build server-side rendered apps with Nuxt.js.",
    image: "/nuxt.jpg",
    download: "/vue.pdf",
    viewOnline: "/vue.pdf"
  }
]
</script>
