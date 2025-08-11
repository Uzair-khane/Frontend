<template>
  <div>
    <Nav />
  </div>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow-md py-4 px-6">
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
</template>

<script setup>
import { ref, computed } from 'vue'

const topics = ref([
 {
    title: "Introduction to CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=SjXZqUzqZxg&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=1&t=34s&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "CSS Syntax (Hindi)",
    video: "https://www.youtube.com/watch?v=uqlZPRpajM0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=2&pp=iAQB"
  },
  {
    title: "Element Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=AG9fUJEguRc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=3&pp=iAQB"
  },
  {
    title: "Way of Inserting CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=IGiD8lOrqRs&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=4&pp=iAQB"
  },
  {
    title: "External Style Sheet in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=DILa2qn7qOU&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=5&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "How to link Web Page to External Style Sheet in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=HJVpaOra3Es&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=6&pp=iAQB"
  },
  {
    title: "Internal Style Sheet in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Bs7L-FyxY_A&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=7&pp=iAQB"
  },
  {
    title: "Inline Style in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=gG7zNZgDKv4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=8&pp=iAQB"
  },
  {
    title: "Multiple Style Sheet  or Priority of Style Sheets in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=CU0B_SP3EFQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=9&pp=iAQB"
  },
  {
    title: "Comment in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=blNnW3HE_vc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=10&pp=iAQB"
  },
  {
    title: "id Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=1nAvDBBwvuI&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=11&pp=iAQB"
  },
  {
    title: "Class Selector or Style Class in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=mphmF0M6KiE&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=12&pp=iAQB"
  },
  {
    title: "Universal Style Class in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=glBwjdmiJn0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=13&pp=iAQB"
  },
  {
    title: "Element Specific Style Class in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=CUq5djqDS1s&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=14&pp=iAQB"
  },
  {
    title: "How to use two or more classes in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=mTjI7t8FlPY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=15&pp=iAQB"
  },
  {
    title: "Grouping Selectors in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=-I1KUN7cg0Q&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=16&pp=iAQB"
  },
  {
    title: "Background Properties in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=5bXgwDBRhmc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=17&pp=iAQB"
  },
  {
    title: "background color property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=OHDi3sJisQk&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=18&pp=iAQB"
  },
  {
    title: "background image property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=FHPKrf_blso&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=19&pp=iAQB"
  },
  {
    title: "background repeat property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=bU40MEKEYok&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=20&pp=iAQB"
  },
  {
    title: "background position property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=6S3Lq4Vhu8o&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=21&pp=iAQB"
  },
  {
    title: "background attachment property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=scdR_BwZ-Lw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=22&pp=iAQB"
  },
  {
    title: "background shorthand property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=g6GHkVhPWjA&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=23&pp=iAQB"
  },
  {
    title: "background size property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=_ZAxYX4KOuc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=24&pp=iAQB"
  },
  {
    title: "background origin property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=nhN1BDNpjfw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=25&pp=iAQB"
  },
  {
    title: "background clip property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=YhNsKu3DewA&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=26&pp=iAQB"
  },
  {
    title: "How to set Multiple background Image in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=UjbnhbY3BGc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=27&pp=iAQB"
  },
  {
    title: "How to set Full Background Image in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=gZTAwmYD6gM&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=28&pp=iAQB"
  },
  {
    title: "Text Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=ro76ir0d3II&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=29&pp=iAQB"
  },
  {
    title: "How to change text color in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=IvX-mpAdOLw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=30&pp=iAQB"
  },
  {
    title: "How to change text direction in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=PF8diPLbIP4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=31&pp=iAQB"
  },
  {
    title: "How to align text in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=YMhLf1HlKWQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=32&pp=iAQB"
  },
  {
    title: "How to set letter space in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=DgVPFoqDPUE&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=33&pp=iAQB"
  },
  {
    title: "How to set line height in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=aHYSdeukuq8&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=34&pp=iAQB"
  },
  {
    title: "How to Underline, Overline and Line through text in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=suy5nLRULt0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=35&pp=iAQB"
  },
  {
    title: "How to indent text in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=tITFK9c80KE&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=36&pp=iAQB"
  },
  {
    title: "How to apply text shadow in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=laGsjPNABw4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=37&pp=iAQB"
  },
  {
    title: "How to change text case in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=XNVsoctti8E&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=38&pp=iAQB"
  },
  {
    title: "Vertical align in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=cAn0Gd4z6sE&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=39&pp=iAQB"
  },
  {
    title: "white space in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=20xwOxFlGGQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=40&pp=iAQB"
  },
  {
    title: "word spacing in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=MjNHL489U20&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=41&pp=iAQB"
  },
  {
    title: "text align last in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=_HNbUgTAFl4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=42&pp=iAQB"
  },
  {
    title: "word wrap in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Ya7ZbD-Fdtc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=43&pp=iAQB"
  },
  {
    title: "word break in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=3fVKkjJtrew&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=44&pp=iAQB"
  },
  {
    title: "Font Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=fhxrVQ2mClY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=45&pp=iAQB"
  },
  {
    title: "font-family property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=SNTIpVcG9LE&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=46&pp=iAQB"
  },
  {
    title: "font-size property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=DLu_mQWt9y0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=47&pp=iAQB"
  },
  {
    title: "font-stretch property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=CbNFgCqDKA0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=48&pp=iAQB"
  },
  {
    title: "font-style property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=U0PcE3Awo1c&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=49&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "font-variant Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=vor3Tlr9EMw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=50&pp=iAQB"
  },
  {
    title: "font-weight property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=kP9r0-gP6jY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=51&pp=iAQB"
  },
  {
    title: "font Shorthand property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=as83YGdb9w0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=52&pp=iAQB"
  },
  {
    title: "List Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=aN4YA4xJhnU&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=53&pp=iAQB"
  },
  {
    title: "list style image property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=1OgbF8Lytyo&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=54&pp=iAQB"
  },
  {
    title: "list style type property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=t16zP58df6Q&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=55&pp=iAQB"
  },
  {
    title: "list style position Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=f_R9IAqscwo&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=56&pp=iAQB"
  },
  {
    title: "list style property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=1BTrb06Dvwc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=57&pp=iAQB"
  },
  {
    title: "border style property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Urk-NVaavcM&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=58&pp=iAQB"
  },
  {
    title: "border width property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Jmy2CcodQlo&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=59&pp=iAQB"
  },
  {
    title: "border color property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=TirTl9oBIPM&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=60&pp=iAQB"
  },
  {
    title: "border property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Csra-p43zOU&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=61&pp=iAQB"
  },
  {
    title: "Table Properties in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=v9q_Ao-HUaQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=62&pp=iAQB"
  },
  {
    title: "Table border in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=_aqC9Du9q_A&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=63&pp=iAQB"
  },
  {
    title: "border collapse property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=YhiAOEyj5iY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=64&pp=iAQB"
  },
  {
    title: "border spacing property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=GuQ5aUFVysY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=65&pp=iAQB"
  },
  {
    title: "caption side property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=5OSFJ3N3Hfs&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=66&pp=iAQB"
  },
  {
    title: "empty cells property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=LfvBR4LgZj0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=67&pp=iAQB"
  },
  {
    title: "table layout property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=cHw1oGZaF6Q&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=68&pp=iAQB"
  },
  {
    title: "How to set Table Width and height in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=RsBa9GdhbuI&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=69&pp=iAQB"
  },
  {
    title: "How to set Table Padding in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=_rbYAMIZxPE&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=70&pp=iAQB"
  },
  {
    title: "How to set Table Color in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=I03nzk6FKtc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=71&pp=iAQB"
  },
  {
    title: "Display Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=VH48g079Hr0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=72&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "What is Block Level Element and Inline Element in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=fUwDHLYvOig&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=73&pp=iAQB"
  },
  {
    title: "inline, block, inline block and none in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=cGkZRL3muxY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=74&pp=iAQB"
  },
  {
    title: "Visibility Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=gIuhWeULKCU&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=75&pp=iAQB"
  },
  {
    title: "Difference between display none and visibility hidden in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=6_aDLUgl_JY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=76&pp=iAQB"
  },
  {
    title: "Link in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=4i1irbA8bQk&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=77&pp=iAQB"
  },
  {
    title: "Left, Right, Bottom, Top Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Y8FM1AhL8fI&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=78&pp=iAQB"
  },
  {
    title: "Position Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Hl62PS8aqa4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=79&pp=iAQB"
  },
  {
    title: "z-index property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=EvjTEl9e0H8&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=80&pp=iAQB"
  },
  {
    title: "overflow Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=FrLU64kM6x0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=81&pp=iAQB"
  },
  {
    title: "float and clear property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=queQlNTSARc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=82&pp=iAQB"
  },
  {
    title: "div and span in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Bh2sO-VgLi8&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=83&pp=iAQB"
  },
  {
    title: "Recap Element Selector, ID Selector, Class Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=bKsYu1w9W20&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=84&pp=iAQB"
  },
  {
    title: "Conflicts in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=LaFSPigw1KE&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=85&pp=iAQB"
  },
  {
    title: "Descendant ID Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=5oG-mfd3pAI&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=86&pp=iAQB"
  },
  {
    title: "Inheritance in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=SMGcZKZdlBg&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=87&pp=iAQB"
  },
  {
    title: "Descendant Class Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Hi_HWgFWuVI&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=88&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "Selector Priority in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=od-Mb2dfg4Q&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=89&pp=iAQB"
  },
  {
    title: "Important Declaration in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=lQWTnLNm-Ks&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=90&pp=iAQB"
  },
  {
    title: "Universal Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=UgX8gfErOGg&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=91&pp=iAQB"
  },
  {
    title: "Child Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Nw-TkxVenfw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=92&pp=iAQB"
  },
  {
    title: "Adjacent Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=gL0HdB9i4lk&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=93&pp=iAQB"
  },
  {
    title: "Sibling Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=WS1q3qlhA4A&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=94&pp=iAQB"
  },
  {
    title: "Pseudo Classes in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=SyT2hdINjR4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=95&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "First Child and Last Child in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=FPfacevtSqo&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=96&pp=iAQB"
  },
  {
    title: "first of type and last of type in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=UzFxfDEVBJo&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=97&pp=iAQB"
  },
  {
    title: "nth child in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=CYS2i0eoLc4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=98&pp=iAQB"
  },
  {
    title: "Content Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=VwsuNl9MeyI&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=99&pp=iAQB"
  },
  {
    title: "Pseudo Element in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=YWAZNZ4APoQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=100&pp=iAQB"
  },
  {
    title: "first letter and first line in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=fE7HGygWDpA&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=101&pp=iAQB"
  },
  {
    title: "Selection in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=eYH9blHUizw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=102&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "before and after in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=JrJp5JMWSIY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=103&pp=iAQB"
  },
  {
    title: "Margin Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=WX_v14Z4Q44&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=104&pp=iAQB"
  },
  {
    title: "Padding in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Eu5LjQBEypQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=105&pp=iAQB"
  },
  {
    title: "Difference between Margin and Padding in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=HcOY6VTJxTg&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=106&pp=iAQB"
  },
  {
    title: "Width and Height in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=qvv2j6GzFo0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=107&pp=iAQB"
  },
  {
    title: "min width and max width in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=VILObUeSzBw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=108&pp=iAQB"
  },
  {
    title: "min height and max height in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=6r1EzfFHiKc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=109&pp=iAQB"
  },
  {
    title: "Opacity with Image in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=5rW0OTgO9Lo&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=110&pp=iAQB"
  },
  {
    title: "Opacity with text in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=T4llMY7IETY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=111&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "border left style in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=tNPgMZs7rpQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=112&pp=iAQB"
  },
  {
    title: "border left width in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=dlwx9SMQ7Ek&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=113&pp=iAQB"
  },
  {
    title: "border left color in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=XRZ-_wyBpBM&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=114&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "border left in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=dRFUP7ZHFcs&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=115&pp=iAQB"
  },
  {
    title: "border right style in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=nJfAZJ5nYxs&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=116&pp=iAQB"
  },
  {
    title: "border right width in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=xfd-pDGodHQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=117&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "border right color in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=lRKRiwJqdrI&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=118&pp=iAQB"
  },
  {
    title: "border right in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=yQgPHJymxOY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=119&pp=iAQB"
  },
  {
    title: "border top style in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=xwQNxL0_d3M&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=120&pp=iAQB"
  },
  {
    title: "border top width in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=BnDUQZmgMik&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=121&pp=iAQB"
  },
  {
    title: "border top color in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=HdSwNbH9xuY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=122&pp=iAQB"
  },
  {
    title: "border top in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=hyoDW4t60O4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=123&pp=iAQB"
  },
  {
    title: "border bottom style in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=PPKQ6brSExw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=124&pp=iAQB"
  },
  {
    title: "border bottom width in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=HQvLQu6k5_o&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=125&pp=iAQB"
  },
  {
    title: "border bottom color in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=iiJ9PoLns6o&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=126&pp=iAQB"
  },
  {
    title: "border bottom in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=6pwvImPzI64&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=127&pp=iAQB"
  },
  {
    title: "border radius in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=88ol6gOD3FM&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=128&pp=iAQB"
  },
  {
    title: "border radius with image in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=MXIHLxgZ5BY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=129&pp=iAQB"
  },
  {
    title: "box shadow in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=PLtwqIlE5b4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=130&pp=iAQB"
  },
  {
    title: "box shadow with image in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=Rj0RYRk2w4U&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=131&pp=iAQB"
  },
  {
    title: "Transition in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=BHChX6_Vy9E&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=132&pp=iAQB"
  },
  {
    title: "Cursor Property in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=rKr7d6PCMU4&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=133&pp=iAQB"
  },
  {
    title: "Text decoration in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=dNKHYMp29CM&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=134&pp=iAQB"
  },
  {
    title: "Outline in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=iqLp-2hf_5A&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=135&pp=iAQB"
  },
  {
    title: "Outline offset in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=TUpWCmDUSJs&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=136&pp=iAQB"
  },
  {
    title: "Columns in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=MixdGkTgB3A&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=137&pp=iAQB"
  },
  {
    title: "Column rule in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=jk7gnNpsL4Y&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=138&pp=iAQB"
  },
  {
    title: "Column gap in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=BO0hfHPny3s&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=139&pp=iAQB"
  },
  {
    title: "Column-span in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=oNbYHPguwr0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=140&pp=iAQB"
  },
  {
    title: "Filter in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=dQqOmTuCvyU&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=141&pp=iAQB"
  },
  {
    title: "Box Model in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=RxGkUUJUolo&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=142&pp=iAQB"
  },
  {
    title: "Box Sizing in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=f4QaDG3f3H0&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=143&pp=iAQB"
  },
  {
    title: "Attribute Selector in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=kp45pKxXhGE&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=144&pp=iAQB"
  },
  {
    title: "What is FlexBox | Why do we need FlexBox in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=bxh3_erPKoI&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=145&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "Flexbox Properties in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=90RbkAyzZCs&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=146&pp=iAQB"
  },
  {
    title: "Display flex | inline flex in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=wtmR8C6bNf8&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=147&pp=iAQB"
  },
  {
    title: "Flex direction in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=NYeLryfA6bo&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=148&pp=iAQB"
  },
  {
    title: "Justify Content in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=hj5yFf2DNAg&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=149&pp=iAQB"
  },
  {
    title: "Align items in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=idbY-C9Qqyc&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=150&pp=iAQB"
  },
  {
    title: "Flex Wrap in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=4khT8gzxsbU&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=151&pp=iAQB"
  },
  {
    title: "Align Content in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=apQ_BWTo8Go&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=152&pp=iAQB"
  },
  {
    title: "Flex flow in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=j6dAGbDCPYw&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=153&pp=iAQB"
  },
  {
    title: "Order in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=mQahlEvIXKQ&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=154&pp=iAQB"
  },
  {
    title: "Align Self in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=VnIWs0DsEC8&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=155&pp=iAQB0gcJCa0JAYcqIYzv"
  },
  {
    title: "Flex Grow in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=1z1cvs9gbLU&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=156&pp=iAQB"
  },
  {
    title: "Flex Shrink in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=YZ0IJSvO1y8&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=157&pp=iAQB"
  },
  {
    title: "flex in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=yPq2A_0zHFM&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=158&pp=iAQB"
  },
  {
    title: "Media Query in CSS (Hindi)",
    video: "https://www.youtube.com/watch?v=_TnVbNxgm8k&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=159&pp=iAQB"
  },
  {
    title: "Final CSS | What Next | Thank You",
    video: "https://www.youtube.com/watch?v=um8D95Ms4bY&list=PLbGui_ZYuhiisW-k9eEON2vxGABv-PafB&index=160&pp=iAQB"
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
</script>