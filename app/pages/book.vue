<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
    <h1 class="text-4xl font-extrabold text-center mb-10 text-gray-800 drop-shadow-lg">
      📚 My Learning Library
    </h1>

    <!-- Books Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="book in books" 
        :key="book.title" 
        class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
      >
        <!-- Book Image with Overlay -->
        <div class="relative">
          <img :src="book.image" alt="Book Cover" class="w-full h-52 object-cover" />
          <span class="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
            {{ book.category }}
          </span>
        </div>

        <!-- Book Info -->
        <div class="p-5">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ book.title }}</h2>
          <p class="text-gray-600 text-sm leading-relaxed">{{ book.description }}</p>

          <!-- Buttons -->
          <div class="mt-5 flex gap-3">
            <a 
              :href="book.download" 
              download 
              class="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 active:scale-95 transition flex items-center justify-center gap-2"
            >
              Download
            </a>
            <a 
              :href="book.viewOnline" 
              target="_blank" 
              class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 active:scale-95 transition flex items-center justify-center gap-2"
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
    download: "/javascript.pdf",
    viewOnline: "/javascript.pdf"
  },
  {
    title: "Vue.js Essentials",
    category: "Vue.js",
    description: "Learn Vue.js and create powerful web applications.",
    image: "vue.jpg",
    download: "/vue.pdf",
    viewOnline: "/vue.pdf"
  },
  {
    title: "Nuxt.js Complete Guide",
    category: "Nuxt.js",
    description: "Build server-side rendered apps with Nuxt.js.",
    image: "nuxt..jpg",
    download: "/nuxt..pdf",
    viewOnline: "/nuxt..pdf"
  }
]
</script>
