<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
    <!-- Header -->
    <header class="bg-white py-4">
      <h1 class="text-xl font-bold text-center mt-16">🤖 Experience Your AI Tutor</h1>
    </header>

    <!-- Subheading -->
    <section class="container mx-auto px-4 py-6 text-center">
      <h2 class="text-3xl font-bold mb-4 mt-8">Ask Anything from AI</h2>
    </section>

    <!-- Chat Area -->
    <section class="bg-gray-100 flex-1 rounded-t-3xl py-6 px-4">
      <div class="max-w-3xl mx-auto bg-gray-300 flex flex-col h-[500px] border border-gray-300 rounded-xl overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatContainer">
          <div v-for="(msg, i) in messages" :key="i" :class="msg.role === 'user' ? 'text-right' : 'text-left'">
            <div :class="msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'"
              class="p-3 rounded-lg inline-block max-w-[80%] whitespace-pre-line">
              <p>{{ msg.content }}</p>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="border-t border-gray-300 p-4 bg-white">
          <form @submit.prevent="sendMessage">
            <div class="flex items-center gap-2">
              <input
                v-model="userInput"
                type="text"
                placeholder="Ask your question..."
                class="flex-1 p-3 bg-slate-200 rounded-lg border border-gray-300 outline-none"
              />
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
const userInput = ref('')
const messages = ref([
  { role: 'assistant', content: "Hello! I'm your AI tutor. Ask me anything. 👋" }
])
const chatContainer = ref(null)
const config = useRuntimeConfig()
const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  const question = userInput.value
  messages.value.push({ role: 'user', content: question })
  userInput.value = ''
  messages.value.push({ role: 'assistant', content: 'Typing...' })
  scrollToBottom()

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.public.GROQ_API_KEY}`
       
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          { role: 'system', content: 'You are a helpful AI tutor.' },
          ...messages.value.filter(m => m.role !== 'assistant' || m.content !== 'Typing...')
        ]
      })
    })

    const data = await res.json()

    // Remove "Typing..." placeholder
    messages.value.pop()

    // Add real AI response
    const reply = data.choices?.[0]?.message?.content || '⚠️ No response from AI.'
    messages.value.push({
      role: 'assistant',
      content: reply
    })

    scrollToBottom()
  } catch (error) {
    messages.value.pop()
    messages.value.push({ role: 'assistant', content: '❌ Error getting response. Try again.' })
    console.error("Groq API Error:", error)
  }
}

</script>

<style scoped>
/* Optional Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 3px;
}
</style>
