import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  
   app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
          integrity:
            "sha512-RXf+QSDCUQs6xOxv7a7aIjNlsBd2zp8V2f1ZnYV5eS7n1c8J8MwC6wR5Yj9Hw5gQXhP0Zo8lU4ZJ5kLJskGy0g==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
    },
  },
  
  // 🔐 Environment variable support
  runtimeConfig: {
    public: {
   
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
 
});
