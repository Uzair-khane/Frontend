<template>
  <div>
    <Nav />
  </div>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class=" py-8 px-6">
      <h1 class="text-2xl font-bold mt-5 ml-9 text-center">HTML Course - Learn Step by Step</h1>
    </header>

    <!-- Course Topics -->
    <section class="container mx-auto px-4 py-10  ">
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
   <template>
  <div class="w-full mx-auto p-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-2xl mt-14">
    <h2 class="text-3xl font-extrabold mb-8 text-center text-indigo-800 drop-shadow-md">
      HTML Quiz
    </h2>

    <!-- Progress Bar -->
    <div class="w-full bg-indigo-200 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
      <div
        class="h-3 w-full bg-indigo-600 rounded-full transition-all duration-500"
        :style="{ width: ((currentQuestion + 1) / questions.length) * 100 + '%' }"
      ></div>
    </div>

    <div v-if="currentQuestion < questions.length">
      <p class="mb-3 text-sm text-indigo-700 font-semibold tracking-wide uppercase">
        Question {{ currentQuestion + 1 }} of {{ questions.length }}
      </p>
      <p class="mb-6 text-xl font-semibold text-gray-900 leading-relaxed">
        {{ questions[currentQuestion].question }}
      </p>

      <div class="space-y-4">
        <label
          v-for="(option, idx) in questions[currentQuestion].options"
          :key="idx"
          class="block cursor-pointer rounded-lg border border-gray-300 p-4 hover:border-indigo-500 hover:bg-indigo-50
          transition-colors duration-300 flex items-center select-none
          "
          :class="{
            'border-green-500 bg-green-100 text-green-900 font-semibold': showResult && idx === questions[currentQuestion].correctIndex,
            'border-red-500 bg-red-100 text-red-900 font-semibold': showResult && selectedOption === idx && idx !== questions[currentQuestion].correctIndex
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
          class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold
            disabled:bg-indigo-300 disabled:cursor-not-allowed
            hover:bg-indigo-700 transition-colors duration-300"
        >
          Submit
        </button>
        <button
          v-if="showResult && isCorrect"
          @click="nextQuestion"
          class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold
            hover:bg-green-700 transition-colors duration-300"
        >
          Next
        </button>
      </div>

      <p v-if="showResult && !isCorrect" class="mt-6 text-red-600 font-bold text-center text-lg animate-pulse">
        ❌ Try Again!
      </p>
    </div>

    <div v-else class="text-center">
      <h3 class="text-3xl font-extrabold mb-6 text-indigo-900 drop-shadow-md">
        🎉 Congratulations! You completed the quiz.
      </h3>
      <button
        @click="restartQuiz"
        class="px-8 py-4 bg-indigo-700 text-white rounded-lg font-bold
          hover:bg-indigo-800 transition-colors duration-300"
      >
        Restart Quiz
      </button>
    </div>
  </div>
</template>

</template>

<script setup>
import { ref, computed } from 'vue'

const topics = ref([
  {
    title: "1. Introduction to HTML (Hindi)",
    description: "Learn the basics of HTML and how it forms the structure of web pages.",
    video: "https://www.youtube.com/watch?v=5sxtZ10Vf3s&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=1&pp=iAQB",
    completed: false
  },
  {
    title: "Download HTML Notes Codes and PPT",
    description: "Download all the resources needed for this HTML course including notes, code samples, and presentations.",
    video: "https://www.youtube.com/watch?v=iF_oRFX81Js&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=2&pp=iAQB",
    completed: false
  },
  {
    title: "2. Tags and Element in HTML (Hindi)",
    description: "Understand the difference between HTML tags and elements with practical examples.",
    video: "https://www.youtube.com/watch?v=vujvsK6xzK0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=3&t=81s&pp=iAQB",
    completed: false
  },
  {
    title: "3. Attributes in HTML (Hindi)",
    description: "Learn how to use attributes to provide additional information about HTML elements.",
    video: "https://www.youtube.com/watch?v=qX5ZHJy2u1w&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=4&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "4. HTML Tag in HTML (Hindi)",
    description: "Understand the root element of an HTML document and its importance.",
    video: "https://www.youtube.com/watch?v=r-jVRg62yWU&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=5&pp=iAQB",
    completed: false
  },
  {
    title: "5. Head Tag in HTML (Hindi)",
    description: "Learn about the head section of an HTML document and what it contains.",
    video: "https://www.youtube.com/watch?v=_dLTRiHm7B8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=6&pp=iAQB",
    completed: false
  },
  {
    title: "6. Title Tag in HTML (Hindi)",
    description: "Understand how to set the title of a web page that appears in browser tabs.",
    video: "https://www.youtube.com/watch?v=oGawEpkqOwI&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=7&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "7. Body Tag in HTML (Hindi)",
    description: "Learn about the body section where all visible content of a web page goes.",
    video: "https://www.youtube.com/watch?v=MxPaPGya01U&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=8&pp=iAQB",
    completed: false
  },
  {
    title: "8. How to Create a Simple HTML Page (Hindi)",
    description: "Step-by-step guide to creating your first HTML page from scratch.",
    video: "https://www.youtube.com/watch?v=J5ykGtDc2TY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=9&pp=iAQB",
    completed: false
  },
  {
    title: "9. Type of Tag in HTML (Hindi)",
    description: "Understand the different types of HTML tags - container tags and empty tags.",
    video: "https://www.youtube.com/watch?v=FtcmAvz08R4&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=10&pp=iAQB",
    completed: false
  },
  {
    title: "10. Version of HTML (Hindi)",
    description: "Learn about the evolution of HTML and its different versions over time.",
    video: "https://www.youtube.com/watch?v=LwoiwDi_rOo&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=11&pp=iAQB",
    completed: false
  },
  {
    title: "11. Introduction of HTML 5 (Hindi)",
    description: "Introduction to HTML5 and its new features compared to previous versions.",
    video: "https://www.youtube.com/watch?v=AKLlS0lQhhY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=12&pp=iAQB",
    completed: false
  },
  {
    title: "12. Features of HTML 5 (Hindi)",
    description: "Explore the key features and improvements introduced in HTML5.",
    video: "https://www.youtube.com/watch?v=RxyGPz51cxY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=13&pp=iAQB",
    completed: false
  },
  {
    title: "13. HTML 5 Doctype Declaration (Hindi)",
    description: "Learn about the simplified doctype declaration in HTML5.",
    video: "https://www.youtube.com/watch?v=ZW8qI1HvYJs&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=14&pp=iAQB",
    completed: false
  },
  {
    title: "14. How to Create Plain Text Web Page in HTML 5 (Hindi)",
    description: "Create a basic plain text web page using HTML5 structure.",
    video: "https://www.youtube.com/watch?v=DDrJ9hFgbns&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=15&pp=iAQB",
    completed: false
  },
  {
    title: "15. How to insert New Line or Line Break using br Tag in HTML (Hindi)",
    description: "Learn to use the line break tag to control text formatting.",
    video: "https://www.youtube.com/watch?v=NjScXPSyTWw&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=16&pp=iAQB",
    completed: false
  },
  {
    title: "16. How to write Headings using h Tag in HTML (Hindi)",
    description: "Understand the hierarchy of heading tags from h1 to h6.",
    video: "https://www.youtube.com/watch?v=1CoBHqSErzg&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=17&pp=iAQB",
    completed: false
  },
  {
    title: "17. How to Create Paragraph using p Tag in HTML (Hindi)",
    description: "Learn to structure your content using paragraph tags.",
    video: "https://www.youtube.com/watch?v=n2KcEJ7-dtY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=18&pp=iAQB",
    completed: false
  },
  {
    title: "18. Subscript and Superscript using sub and sup Tag in HTML (Hindi)",
    description: "Format text as subscript or superscript for mathematical or chemical formulas.",
    video: "https://www.youtube.com/watch?v=XfFecS5pefk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=19&pp=iAQB",
    completed: false
  },
  {
    title: "19. Horizontal Rule or Horizontal Line using hr Tag in HTML (Hindi)",
    description: "Add thematic breaks between sections with the horizontal rule tag.",
    video: "https://www.youtube.com/watch?v=mmuy3LAsh9I&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=20&pp=iAQB",
    completed: false
  },
  {
    title: "20. Align Attribute in HTML (Hindi)",
    description: "Control the alignment of elements using the align attribute.",
    video: "https://www.youtube.com/watch?v=DQrCeB1zEEg&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=21&pp=iAQB",
    completed: false
  },
  {
    title: "21. Bold using b Tag in HTML (Hindi)",
    description: "Make text bold using the b tag for visual emphasis.",
    video: "https://www.youtube.com/watch?v=jQvIzUx1TIU&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=22&pp=iAQB",
    completed: false
  },
  {
    title: "22. Italic using i Tag in HTML (Hindi)",
    description: "Italicize text using the i tag for stylistic purposes.",
    video: "https://www.youtube.com/watch?v=9ILkAkw4veo&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=23&pp=iAQB",
    completed: false
  },
  {
    title: "23. Strong and Emphasis Tag in HTML (Hindi)",
    description: "Understand semantic importance with strong and em tags.",
    video: "https://www.youtube.com/watch?v=XJtXoArBY88&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=24&pp=iAQB",
    completed: false
  },
  {
    title: "24. Blockquote and q Tag in HTML (Hindi)",
    description: "Properly format quotations and citations in your web pages.",
    video: "https://www.youtube.com/watch?v=3ZsI4xKe4RI&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=25&pp=iAQB",
    completed: false
  },
  {
    title: "25. Abbreviation and Acronyms Tag in HTML (Hindi)",
    description: "Mark up abbreviations and acronyms for better accessibility.",
    video: "https://www.youtube.com/watch?v=RPAG6XWnJ30&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=26&pp=iAQB",
    completed: false
  },
  {
    title: "26. Address tag in HTML (Hindi)",
    description: "Mark up contact information using the address tag.",
    video: "https://www.youtube.com/watch?v=N_zhQhtJC64&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=27&pp=iAQB",
    completed: false
  },
  {
    title: "27. ins and del tag in HTML (Hindi)",
    description: "Show inserted and deleted content in documents.",
    video: "https://www.youtube.com/watch?v=MJYTR0ZZUVc&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=28&pp=iAQB",
    completed: false
  },
  {
    title: "28. s Tag in HTML (Hindi)",
    description: "Mark text that is no longer correct or relevant.",
    video: "https://www.youtube.com/watch?v=c0QAid4zamw&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=29&pp=iAQB",
    completed: false
  },
  {
    title: "29. Meta Tag in HTML (Hindi)",
    description: "Understand metadata and its importance for SEO and browsers.",
    video: "https://www.youtube.com/watch?v=bY1fI64pNls&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=30&pp=iAQB",
    completed: false
  },
  {
    title: "30. Description of a Web page or name and content attribute in HTML (Hindi)",
    description: "Add meta descriptions for better search engine results.",
    video: "https://www.youtube.com/watch?v=cL8A4_yRwmg&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=31&pp=iAQB",
    completed: false
  },
  {
    title: "31. Write Keywords of Web Page for Search Engine in HTML (Hindi)",
    description: "Optimize your pages with meta keywords for search engines.",
    video: "https://www.youtube.com/watch?v=sDb2WBtytZY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=32&pp=iAQB",
    completed: false
  },
  {
    title: "32. Author of Web page in HTML (Hindi)",
    description: "Declare the author of a web page using meta tags.",
    video: "https://www.youtube.com/watch?v=iO9fK86W1r8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=33&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "33. Auto Refresh a Web Page in every 5 second HTML (Hindi)",
    description: "Automatically refresh your web page at set intervals.",
    video: "https://www.youtube.com/watch?v=Bv8MLDzjb40&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=34&pp=iAQB",
    completed: false
  },
  {
    title: "34. Pre Tag in HTML (Hindi)",
    description: "Preserve text formatting with the preformatted text tag.",
    video: "https://www.youtube.com/watch?v=YnVTAeKHBUE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=35&pp=iAQB",
    completed: false
  },
  {
    title: "35. Unordered List in HTML (Hindi)",
    description: "Create bullet-point lists with the ul and li tags.",
    video: "https://www.youtube.com/watch?v=G56inbH_a48&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=36&pp=iAQB",
    completed: false
  },
  {
    title: "36. Ordered List in HTML (Hindi)",
    description: "Create numbered lists with the ol and li tags.",
    video: "https://www.youtube.com/watch?v=NgKxebexbVc&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=37&pp=iAQB",
    completed: false
  },
  {
    title: "37. Definition List in HTML (Hindi)",
    description: "Structure definition lists with terms and descriptions.",
    video: "https://www.youtube.com/watch?v=ZPJ4H1H8okc&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=38&pp=iAQB",
    completed: false
  },
  {
    title: "38. Unordered Nested List in HTML (Hindi)",
    description: "Create hierarchical lists by nesting unordered lists.",
    video: "https://www.youtube.com/watch?v=eNI7DrwzgGQ&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=39&pp=iAQB",
    completed: false
  },
  {
    title: "39. Ordered Nested List in HTML (Hindi)",
    description: "Create hierarchical lists by nesting ordered lists.",
    video: "https://www.youtube.com/watch?v=1KB41WtvMfk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=40&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "40. Create Table in HTML (Hindi)",
    description: "Structure tabular data with table, tr, and td tags.",
    video: "https://www.youtube.com/watch?v=cZSTrSBTnL8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=41&pp=iAQB",
    completed: false
  },
  {
    title: "41. How to Create Table with border in HTML (Hindi)",
    description: "Add borders to your tables for better visual separation.",
    video: "https://www.youtube.com/watch?v=SwXYmM5N6EE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=42&pp=iAQB",
    completed: false
  },
  {
    title: "42. How to Align Table in HTML (Hindi)",
    description: "Control the alignment of tables on your web page.",
    video: "https://www.youtube.com/watch?v=aYVICkV5QuI&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=43&pp=iAQB",
    completed: false
  },
  {
    title: "43. How to Align Table Content in HTML (Hindi)",
    description: "Align content within table cells for better presentation.",
    video: "https://www.youtube.com/watch?v=eocE-kbk7h0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=44&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "44. How to Set Table Width in HTML (Hindi)",
    description: "Control the width of your tables for responsive design.",
    video: "https://www.youtube.com/watch?v=s-QExlxITRM&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=45&pp=iAQB",
    completed: false
  },
    {
    title: "45. How to Set Column Width in HTML (Hindi)",
    description: "Set specific widths for table columns.",
    video: "https://www.youtube.com/watch?v=9HHlZtzrI8U&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=46&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "46. How to Change Table Background Color in HTML (Hindi)",
    description: "Add background colors to tables for better visual appeal.",
    video: "https://www.youtube.com/watch?v=SuBQ2IVyr5o&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=47&pp=iAQB",
    completed: false
  },
  {
    title: "47. How to Change Table Cell Color in HTML (Hindi)",
    description: "Highlight specific table cells with background colors.",
    video: "https://www.youtube.com/watch?v=-DlqC7tcZ4o&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=48&pp=iAQB",
    completed: false
  },
  {
    title: "48. Table Cell Padding in HTML (Hindi)",
    description: "Add space inside table cells with padding.",
    video: "https://www.youtube.com/watch?v=Ewol0106P9M&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=49&pp=iAQB",
    completed: false
  },
  {
    title: "49. Table Cell Spacing in HTML (Hindi)",
    description: "Control spacing between table cells.",
    video: "https://www.youtube.com/watch?v=tevoN-EH6mk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=50&pp=iAQB",
    completed: false
  },
  {
    title: "50. Spanning Row in HTML (Hindi)",
    description: "Create cells that span multiple rows.",
    video: "https://www.youtube.com/watch?v=o0eJgxzZ6Xw&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=51&pp=iAQB",
    completed: false
  },
  {
    title: "51. Spanning Column in HTML (Hindi)",
    description: "Create cells that span multiple columns.",
    video: "https://www.youtube.com/watch?v=H0-1JZJUN4g&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=52&pp=iAQB",
    completed: false
  },
  {
    title: "52. Nested Table in HTML (Hindi)",
    description: "Place tables within tables for complex layouts.",
    video: "https://www.youtube.com/watch?v=epBQku5k0MY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=53&pp=iAQB",
    completed: false
  },
  {
    title: "53. Anchor Tag in HTML (Hindi)",
    description: "Create hyperlinks to connect web pages.",
    video: "https://www.youtube.com/watch?v=IK35oTxuQz8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=54&pp=iAQB",
    completed: false
  },
  {
    title: "54. Anchor Tag Attributes in HTML (Hindi)",
    description: "Learn various attributes that enhance link functionality.",
    video: "https://www.youtube.com/watch?v=7CppDt8MZsY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=55&pp=iAQB",
    completed: false
  },
  {
    title: "55. href Attribute in HTML (Hindi)",
    description: "Specify the destination of hyperlinks.",
    video: "https://www.youtube.com/watch?v=GP5E-fyno8Y&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=56&pp=iAQB",
    completed: false
  },
  {
    title: "56. download attribute in HTML (Hindi)",
    description: "Force links to download resources instead of navigating.",
    video: "https://www.youtube.com/watch?v=QfXIszyv_7Y&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=57&pp=iAQB",
    completed: false
  },
  {
    title: "57. media attribute in HTML (Hindi)",
    description: "Specify media types for linked resources.",
    video: "https://www.youtube.com/watch?v=rRbu0aUiM0s&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=58&pp=iAQB",
    completed: false
  },
  {
    title: "58. hreflang and type attribute in HTML (Hindi)",
    description: "Specify language and MIME type of linked resources.",
    video: "https://www.youtube.com/watch?v=QiT6m1uGGhk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=59&pp=iAQB",
    completed: false
  },
  {
    title: "59. rel attribute in HTML (Hindi)",
    description: "Define the relationship between current and linked documents.",
    video: "https://www.youtube.com/watch?v=H4vTNTBcCDE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=60&pp=iAQB",
    completed: false
  },
  {
    title: "60. Example of href Attribute in HTML (Hindi)",
    description: "Practical examples of using the href attribute.",
    video: "https://www.youtube.com/watch?v=DWOBxr-PgS4&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=61&pp=iAQB",
    completed: false
  },
  {
    title: "61. id attribute in HTML (Hindi)",
    description: "Create unique identifiers for elements.",
    video: "https://www.youtube.com/watch?v=ZGAFdwCooJk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=62&pp=iAQB",
    completed: false
  },
  {
    title: "62. Example of script value in href attribute (Hindi)",
    description: "Execute JavaScript code through href attributes.",
    video: "https://www.youtube.com/watch?v=E2DHD0nLTnY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=63&pp=iAQB",
    completed: false
  },
  {
    title: "63. Example of download attribute in HTML (Hindi)",
    description: "Practical examples of forcing file downloads.",
    video: "https://www.youtube.com/watch?v=cUVpUnhTMK0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=64&pp=iAQB",
    completed: false
  },
  {
    title: "64. Example of Media Attribute in HTML (Hindi)",
    description: "Examples of targeting specific media types.",
    video: "https://www.youtube.com/watch?v=2DasyTsd_0c&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=65&pp=iAQB",
    completed: false
  },
  {
    title: "65. Example of hreflang Attribute in HTML (Hindi)",
    description: "Examples of language-specific linking.",
    video: "https://www.youtube.com/watch?v=tSHzU8tuFYY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=66&pp=iAQB",
    completed: false
  },
  {
    title: "66. Example of type Attribute in HTML (Hindi)",
    description: "Examples of specifying MIME types for links.",
    video: "https://www.youtube.com/watch?v=gFoxEivEuuM&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=67&pp=iAQB",
    completed: false
  },
  {
    title: "67. Example of rel Attribute in HTML (Hindi)",
    description: "Practical examples of relationship attributes.",
    video: "https://www.youtube.com/watch?v=cvTyMrhRmBk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=68&pp=iAQB",
    completed: false
  },
  {
    title: "68. Example of target attribute's blank Value in HTML (Hindi)",
    description: "Open links in new tabs/windows with target blank.",
    video: "https://www.youtube.com/watch?v=7riRNEQjj34&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=69&pp=iAQB",
    completed: false
  },
  {
    title: "69. How to Change Link Color in HTML (Hindi)",
    description: "Customize link colors for better visual design.",
    video: "https://www.youtube.com/watch?v=F5NyDfa5CXw&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=70&pp=iAQB",
    completed: false
  },
  {
    title: "70. iframe Tag in HTML (Hindi)",
    description: "Embed external content within your web pages.",
    video: "https://www.youtube.com/watch?v=eZASIievCRY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=71&pp=iAQB",
    completed: false
  },
  {
    title: "71. How to Set Width and height of Frame in HTML (Hindi)",
    description: "Control the dimensions of embedded iframes.",
    video: "https://www.youtube.com/watch?v=GGSnNL69Leo&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=72&pp=iAQB",
    completed: false
  },
  {
    title: "72. Sandbox Attribute in HTML (Hindi)",
    description: "Restrict iframe capabilities for security.",
    video: "https://www.youtube.com/watch?v=c99b7QapjH0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=73&pp=iAQB",
    completed: false
  },
  {
    title: "73. Allow same origin value of sandbox in HTML (Hindi)",
    description: "Allow iframes to access same-origin content.",
    video: "https://www.youtube.com/watch?v=_CEmft4nYnM&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=74&pp=iAQB",
    completed: false
  },
  {
    title: "74. Allow top navigation value of sandbox and target top attribute in HTML (Hindi)",
    description: "Control navigation behavior from within iframes.",
    video: "https://www.youtube.com/watch?v=sNEdtgghlzE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=75&pp=iAQB",
    completed: false
  },
  {
    title: "75. allow scripts Value of Sandbox in HTML (Hindi)",
    description: "Permit JavaScript execution within sandboxed iframes.",
    video: "https://www.youtube.com/watch?v=qMQ1bpCFbzE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=76&pp=iAQB",
    completed: false
  },
  {
    title: "76. allow popups value of Sandbox in HTML (Hindi)",
    description: "Allow popup windows from within iframes.",
    video: "https://www.youtube.com/watch?v=SEgOZC3R3uM&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=77&pp=iAQB",
    completed: false
  },
  {
    title: "77. Nested frame and Target parent in HTML (Hindi)",
    description: "Work with nested frames and parent targeting.",
    video: "https://www.youtube.com/watch?v=wcfoVffDwdA&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=78&pp=iAQB",
    completed: false
  },
  {
    title: "78. Target self in HTML (Hindi)",
    description: "Load content in the same frame/window.",
    video: "https://www.youtube.com/watch?v=IncSEDYS95c&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=79&pp=iAQB",
    completed: false
  },
  {
    title: "79. Target framename in HTML (Hindi)",
    description: "Load content in specific named frames.",
    video: "https://www.youtube.com/watch?v=WG-CRK19H5g&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=80&pp=iAQB",
    completed: false
  },
  {
    title: "80. frame as Hyperlink target in HTML (Hindi)",
    description: "Use frames as targets for hyperlinks.",
    video: "https://www.youtube.com/watch?v=YuV29dvI4Ns&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=81&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "81. Image Tag in HTML (Hindi)",
    description: "Embed images in your web pages.",
    video: "https://www.youtube.com/watch?v=zKhdJvqbSK0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=82&pp=iAQB",
    completed: false
  },
  {
    title: "82. src Attribute in HTML (Hindi)",
    description: "Specify the image source file.",
    video: "https://www.youtube.com/watch?v=_GGZ3HLR6MA&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=83&pp=iAQB",
    completed: false
  },
  {
    title: "83. alt Attribute in HTML (Hindi)",
    description: "Provide alternative text for images.",
    video: "https://www.youtube.com/watch?v=PW3WIYsSpas&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=84&pp=iAQB",
    completed: false
  },
  {
    title: "84. width and height Attribute in HTML (Hindi)",
    description: "Control image dimensions with attributes.",
    video: "https://www.youtube.com/watch?v=sSC-zgjqL3M&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=85&pp=iAQB",
    completed: false
  },
  {
    title: "85. ismap Attribute in HTML (Hindi)",
    description: "Create server-side image maps.",
    video: "https://www.youtube.com/watch?v=g1ZegjvII3c&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=86&pp=iAQB",
    completed: false
  },
   {
    title: "86. map tag in HTML (Hindi)",
    description: "Learn how to create image maps with clickable areas using the map tag.",
    video: "https://www.youtube.com/watch?v=kdMem4JXxtE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=87&pp=iAQB",
    completed: false
  },
  {
    title: "87. area Tag in HTML (Hindi)",
    description: "Define clickable areas within an image map using the area tag.",
    video: "https://www.youtube.com/watch?v=K1mPbELZ0i8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=88&pp=iAQB",
    completed: false
  },
  {
    title: "88. Coords attribute in HTML (Hindi)",
    description: "Specify coordinates for clickable areas in image maps.",
    video: "https://www.youtube.com/watch?v=xCboFN528rs&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=89&pp=iAQB",
    completed: false
  },
  {
    title: "89. How to map image or usemap attribute in HTML (Hindi)",
    description: "Connect an image to an image map using the usemap attribute.",
    video: "https://www.youtube.com/watch?v=RW8OJRZdBb0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=90&pp=iAQB",
    completed: false
  },
  {
    title: "90. How to attach a Link to an Image in HTML (Hindi)",
    description: "Make images clickable by adding hyperlinks to them.",
    video: "https://www.youtube.com/watch?v=E0d-B_c8Vms&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=91&pp=iAQB",
    completed: false
  },
  {
    title: "91. How to Set Background Image in HTML (Hindi)",
    description: "Add background images to your web pages.",
    video: "https://www.youtube.com/watch?v=0z8Tv3xalKQ&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=92&pp=iAQB",
    completed: false
  },
  {
    title: "92. Comment and Conditional Comment in HTML (Hindi)",
    description: "Add comments to your HTML code and understand conditional comments.",
    video: "https://www.youtube.com/watch?v=P3hCbH4CKS0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=93&pp=iAQB",
    completed: false
  },
  {
    title: "93. Audio Tag in HTML (Hindi)",
    description: "Embed audio files in your web pages using the audio tag.",
    video: "https://www.youtube.com/watch?v=aBn6yX2JYao&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=94&pp=iAQB",
    completed: false
  },
  {
    title: "94. How to Set Audio file in web Page (Hindi)",
    description: "Practical implementation of audio files in HTML.",
    video: "https://www.youtube.com/watch?v=byO7IdRmb5U&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=95&pp=iAQB",
    completed: false
  },
  {
    title: "95. Autoplay attribute in HTML (Hindi)",
    description: "Make audio play automatically when the page loads.",
    video: "https://www.youtube.com/watch?v=0vd49SQ3Esg&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=96&pp=iAQB",
    completed: false
  },
  {
    title: "96. Muted Attribute in HTML (Hindi)",
    description: "Control audio muting with the muted attribute.",
    video: "https://www.youtube.com/watch?v=2hb6yyGlP9A&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=97&pp=iAQB",
    completed: false
  },
  {
    title: "97. loop attribute in HTML (Hindi)",
    description: "Make audio loop continuously with the loop attribute.",
    video: "https://www.youtube.com/watch?v=_KshOgCUj7M&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=98&pp=iAQB",
    completed: false
  },
  {
    title: "98. Preload attribute in HTML (Hindi)",
    description: "Control how audio files are preloaded with the preload attribute.",
    video: "https://www.youtube.com/watch?v=xP4p4mDjj2A&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=99&pp=iAQB",
    completed: false
  },
  {
    title: "99. Some browser doesn't support Audio Tag in HTML (Hindi)",
    description: "Handle browser compatibility issues with the audio tag.",
    video: "https://www.youtube.com/watch?v=20O0UD6ztC0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=100&pp=iAQB",
    completed: false
  },
  {
    title: "100. Video tag in HTML (Hindi)",
    description: "Embed video content in your web pages using the video tag.",
    video: "https://www.youtube.com/watch?v=TpwsV1pkKbw&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=101&pp=iAQB",
    completed: false
  },
  {
    title: "101. How to set Video file in web page (Hindi)",
    description: "Practical implementation of video files in HTML.",
    video: "https://www.youtube.com/watch?v=uSMHdBgsWsg&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=102&pp=iAQB",
    completed: false
  },
  {
    title: "102. Poster attribute in HTML (Hindi)",
    description: "Set a preview image for your videos with the poster attribute.",
    video: "https://www.youtube.com/watch?v=iMnKPQVg2b4&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=103&pp=iAQB",
    completed: false
  },
  {
    title: "103. Source tag in HTML (Hindi)",
    description: "Provide multiple video sources using the source tag.",
    video: "https://www.youtube.com/watch?v=B5J6f357c_Y&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=104&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "104. Example of Source Tag in HTML (Hindi)",
    description: "Practical example of using the source tag for video.",
    video: "https://www.youtube.com/watch?v=B4J_rko_RQk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=105&pp=iAQB",
    completed: false
  },
  {
    title: "105. Embed Tag in HTML (Hindi)",
    description: "Embed external content using the embed tag.",
    video: "https://www.youtube.com/watch?v=cO1bQWUocC8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=106&pp=iAQB",
    completed: false
  },
  {
    title: "106. noembed Tag in HTML (Hindi)",
    description: "Provide fallback content with the noembed tag.",
    video: "https://www.youtube.com/watch?v=LfN37RFRaoI&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=107&pp=iAQB",
    completed: false
  },
  {
    title: "107. Object Tag in HTML (Hindi)",
    description: "Embed external resources using the object tag.",
    video: "https://www.youtube.com/watch?v=pXpH99u07w8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=108&pp=iAQB",
    completed: false
  },
  {
    title: "108. Param Tag in HTML (Hindi)",
    description: "Pass parameters to embedded objects with the param tag.",
    video: "https://www.youtube.com/watch?v=nAsnayM7HHU&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=109&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "109. form Tag in HTML (Hindi)",
    description: "Create forms to collect user input with the form tag.",
    video: "https://www.youtube.com/watch?v=axJ6EfcQZNc&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=110&pp=iAQB",
    completed: false
  },
  {
    title: "110. Input Tag in HTML (Hindi)",
    description: "Create various form input elements with the input tag.",
    video: "https://www.youtube.com/watch?v=hNPMHEnOttI&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=111&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "111. type Attribute in HTML (Hindi)",
    description: "Understand different input types with the type attribute.",
    video: "https://www.youtube.com/watch?v=8l3uI_hgygE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=112&pp=iAQB",
    completed: false
  },
  {
    title: "112. Text field in HTML (Hindi)",
    description: "Create single-line text input fields.",
    video: "https://www.youtube.com/watch?v=9CdCTND7Bgg&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=113&pp=iAQB",
    completed: false
  },
  {
    title: "113. Password Field in HTML (Hindi)",
    description: "Create password input fields that mask the entered text.",
    video: "https://www.youtube.com/watch?v=l--YWn3x4x0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=114&pp=iAQB",
    completed: false
  },
  {
    title: "114. Button in HTML (Hindi)",
    description: "Create clickable buttons with the button tag.",
    video: "https://www.youtube.com/watch?v=IjTW2-NCdNY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=115&pp=iAQB",
    completed: false
  },
  {
    title: "115. Button with Value in HTML (Hindi)",
    description: "Set values for buttons to identify them when submitted.",
    video: "https://www.youtube.com/watch?v=op6NjxJE-pg&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=116&pp=iAQB",
    completed: false
  },
  {
    title: "116. Email field in HTML (Hindi)",
    description: "Create input fields specifically for email addresses.",
    video: "https://www.youtube.com/watch?v=X8OzldLAKFE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=117&pp=iAQB",
    completed: false
  },
  {
    title: "117. Name Attribute in HTML (Hindi)",
    description: "Identify form elements with the name attribute.",
    video: "https://www.youtube.com/watch?v=q5m0H9OdrII&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=118&pp=iAQB",
    completed: false
  },
  {
    title: "118. Value Attribute in HTML (Hindi)",
    description: "Set default values for form elements.",
    video: "https://www.youtube.com/watch?v=5jdW6Bx_-7A&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=119&pp=iAQB",
    completed: false
  },
  {
    title: "119. Checkbox in HTML (Hindi)",
    description: "Create checkboxes for multiple selections.",
    video: "https://www.youtube.com/watch?v=0y9I0Kw8HYA&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=120&pp=iAQB",
    completed: false
  },
  {
    title: "120. Radio Button in HTML (Hindi)",
    description: "Create radio buttons for single selections from multiple options.",
    video: "https://www.youtube.com/watch?v=-nVfhIb1Ho8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=121&pp=iAQB",
    completed: false
  },
  {
    title: "121. Checked Attribute in HTML (Hindi)",
    description: "Pre-select checkboxes and radio buttons with the checked attribute.",
    video: "https://www.youtube.com/watch?v=dEla-ANyuN8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=122&pp=iAQB",
    completed: false
  },
  {
    title: "122. URL Field in HTML (Hindi)",
    description: "Create input fields specifically for URLs.",
    video: "https://www.youtube.com/watch?v=5m2VyiCTDyg&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=123&pp=iAQB",
    completed: false
  },
  {
    title: "123. Searchbox for Form in HTML (Hindi)",
    description: "Create search input fields with dedicated styling.",
    video: "https://www.youtube.com/watch?v=ChArGTprZF8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=124&pp=iAQB",
    completed: false
  },
  {
    title: "124. Tel Field in HTML (Hindi)",
    description: "Create input fields specifically for telephone numbers.",
    video: "https://www.youtube.com/watch?v=CnhpHXTHOkU&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=125&pp=iAQB",
    completed: false
  },
  {
    title: "125. Range in HTML (Hindi)",
    description: "Create sliders for numeric input within a range.",
    video: "https://www.youtube.com/watch?v=9nQa2Z7_J0E&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=126&pp=iAQB",
    completed: false
  },
  {
    title: "126. Number Field in HTML (Hindi)",
    description: "Create input fields specifically for numeric values.",
    video: "https://www.youtube.com/watch?v=L8If9A94AH4&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=127&pp=iAQB",
    completed: false
  },
  {
    title: "127. File field in HTML (Hindi)",
    description: "Create file upload inputs with the file type.",
    video: "https://www.youtube.com/watch?v=o7uPDvmsO9s&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=128&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "128. Image button in HTML (Hindi)",
    description: "Create image-based submit buttons.",
    video: "https://www.youtube.com/watch?v=mIJ0tpfGF10&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=129&pp=iAQB",
    completed: false
  },
  {
    title: "129. Hidden Data in HTML (Hindi)",
    description: "Store hidden data in forms with hidden inputs.",
    video: "https://www.youtube.com/watch?v=W2l62U_CkXI&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=130&pp=iAQB",
    completed: false
  },
  {
    title: "130. Date in HTML (Hindi)",
    description: "Create date picker inputs.",
    video: "https://www.youtube.com/watch?v=jUBfN2Fkyl0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=131&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "131. Time in HTML (Hindi)",
    description: "Create time picker inputs.",
    video: "https://www.youtube.com/watch?v=7RrSuaGpY8M&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=132&pp=iAQB",
    completed: false
  },
  {
    title: "132. Datetime in HTML (Hindi)",
    description: "Create datetime picker inputs (UTC).",
    video: "https://www.youtube.com/watch?v=3qbYXpgBxSM&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=133&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "133. Datetime local in HTML (Hindi)",
    description: "Create datetime picker inputs (local time).",
    video: "https://www.youtube.com/watch?v=eX8-4D7SfMc&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=134&pp=iAQB",
    completed: false
  },
  {
    title: "134. Month in HTML (Hindi)",
    description: "Create month picker inputs.",
    video: "https://www.youtube.com/watch?v=2ru2x-Ck7zc&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=135&pp=iAQB",
    completed: false
  },
  {
    title: "135. Week in HTML (Hindi)",
    description: "Create week picker inputs.",
    video: "https://www.youtube.com/watch?v=qzitKXALyYM&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=136&pp=iAQB",
    completed: false
  },
  {
    title: "136. Submit Button in HTML (Hindi)",
    description: "Create form submission buttons.",
    video: "https://www.youtube.com/watch?v=O_XiQNbAmRM&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=137&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "137. Reset Button in HTML (Hindi)",
    description: "Create form reset buttons.",
    video: "https://www.youtube.com/watch?v=ZoCutFUY_bY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=138&pp=iAQB",
    completed: false
  },
  {
    title: "138. Color Picker in HTML (Hindi)",
    description: "Create color picker inputs.",
    video: "https://www.youtube.com/watch?v=ilqrLBDI40E&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=139&pp=iAQB",
    completed: false
  },
  {
    title: "139. Accept Charset Attribute in HTML (Hindi)",
    description: "Specify character encodings for form submission.",
    video: "https://www.youtube.com/watch?v=1Jg2XRdaPhQ&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=140&pp=iAQB",
    completed: false
  },
  {
    title: "140. action attribute in HTML (Hindi)",
    description: "Specify where to send form data with the action attribute.",
    video: "https://www.youtube.com/watch?v=zqQN4_TfHWU&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=141&pp=iAQB",
    completed: false
  },
  {
    title: "141. Autocomplete attribute in HTML (Hindi)",
    description: "Control browser autocomplete behavior for forms.",
    video: "https://www.youtube.com/watch?v=6muwRejL5Zw&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=142&pp=iAQB",
    completed: false
  },
  {
    title: "142. Method GET or POST in HTML (Hindi)",
    description: "Choose between GET and POST methods for form submission.",
    video: "https://www.youtube.com/watch?v=42AuTirAcKo&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=143&pp=iAQB",
    completed: false
  },
  {
    title: "143. Difference between GET and POST in HTML (Hindi)",
    description: "Understand the differences between GET and POST methods.",
    video: "https://www.youtube.com/watch?v=yzfjipuHdiU&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=144&pp=iAQB",
    completed: false
  },
  {
    title: "144. enctype Attribute in HTML (Hindi)",
    description: "Specify how form data should be encoded for submission.",
    video: "https://www.youtube.com/watch?v=Fs__Nb2o7LM&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=145&pp=iAQB",
    completed: false
  },
  {
    title: "145. required attribute in HTML (Hindi)",
    description: "Make form fields mandatory with the required attribute.",
    video: "https://www.youtube.com/watch?v=V4L71wWPuZc&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=146&pp=iAQB",
    completed: false
  },
  {
    title: "146. Novalidate attribute in HTML (Hindi)",
    description: "Disable form validation with the novalidate attribute.",
    video: "https://www.youtube.com/watch?v=2CQh36zccoU&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=147&pp=iAQB",
    completed: false
  },
  {
    title: "147. formnovalidate attribute in HTML (Hindi)",
    description: "Disable validation for specific submit buttons.",
    video: "https://www.youtube.com/watch?v=kgQ74dlXCBk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=148&pp=iAQB",
    completed: false
  },
  {
    title: "148. accept attribute in HTML (Hindi)",
    description: "Specify file types for file inputs with the accept attribute.",
    video: "https://www.youtube.com/watch?v=FgwsfNZMWk4&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=149&pp=iAQB",
    completed: false
  },
  {
    title: "149. autofocus attribute in HTML (Hindi)",
    description: "Automatically focus a form field when the page loads.",
    video: "https://www.youtube.com/watch?v=1WyRztHFFQY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=150&pp=iAQB",
    completed: false
  },
  {
    title: "150. dirname attribute in HTML (Hindi)",
    description: "Submit text direction information with form data.",
    video: "https://www.youtube.com/watch?v=U_9WRZQgrII&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=151&pp=iAQB",
    completed: false
  },
  {
    title: "151. disabled attribute in HTML (Hindi)",
    description: "Disable form elements with the disabled attribute.",
    video: "https://www.youtube.com/watch?v=E7Yc3s6nFdo&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=152&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "152. form attribute in HTML (Hindi)",
    description: "Associate form elements with forms they're not nested in.",
    video: "https://www.youtube.com/watch?v=L9iQ3ZofHRs&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=153&pp=iAQB",
    completed: false
  },
  {
    title: "153. formaction attribute in HTML (Hindi)",
    description: "Override form action for specific submit buttons.",
    video: "https://www.youtube.com/watch?v=ZD8fcGOmfg4&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=154&pp=iAQB",
    completed: false
  },
  {
    title: "154. formenctype attribute in HTML (Hindi)",
    description: "Override form encoding for specific submit buttons.",
    video: "https://www.youtube.com/watch?v=2xVWA9DdXGk&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=155&pp=iAQB",
    completed: false
  },
  {
    title: "155. formmethod attribute in HTML (Hindi)",
    description: "Override form method for specific submit buttons.",
    video: "https://www.youtube.com/watch?v=pP2UcuGo2U8&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=156&pp=iAQB",
    completed: false
  },
  {
    title: "156. form tag's target attribute in HTML (Hindi)",
    description: "Specify where to display form response with target attribute.",
    video: "https://www.youtube.com/watch?v=k-UtILPWo70&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=157&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "157. formtarget attribute in HTML (Hindi)",
    description: "Override form target for specific submit buttons.",
    video: "https://www.youtube.com/watch?v=xINxlHgklGA&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=158&pp=iAQB",
    completed: false
  },
  {
    title: "158. min and max attribute in HTML (Hindi)",
    description: "Set minimum and maximum values for numeric inputs.",
    video: "https://www.youtube.com/watch?v=1rHUbkHg92w&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=159&pp=iAQB",
    completed: false
  },
  {
    title: "159. minlength and maxlength attribute in HTML (Hindi)",
    description: "Set minimum and maximum lengths for text inputs.",
    video: "https://www.youtube.com/watch?v=avvIkFshX0s&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=160&pp=iAQB",
    completed: false
  },
  {
    title: "160. size attribute in HTML (Hindi)",
    description: "Set the visible width of text inputs with size attribute.",
    video: "https://www.youtube.com/watch?v=qtO9juvya00&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=161&pp=iAQB",
    completed: false
  },
  {
    title: "161. placeholder attribute in HTML (Hindi)",
    description: "Add hint text to form fields with placeholder attribute.",
    video: "https://www.youtube.com/watch?v=QL7FpfGwv2k&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=162&pp=iAQB",
    completed: false
  },
  {
    title: "162. readonly attribute in HTML (Hindi)",
    description: "Make form fields read-only with readonly attribute.",
    video: "https://www.youtube.com/watch?v=j7ta5nF57_4&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=163&pp=iAQB",
    completed: false
  },
  {
    title: "163. multiple attribute in HTML (Hindi)",
    description: "Allow multiple values in file and email inputs.",
    video: "https://www.youtube.com/watch?v=sPBi55Z0TFY&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=164&pp=iAQB",
    completed: false
  },
  {
    title: "164. step attribute in HTML (Hindi)",
    description: "Set increment steps for numeric inputs.",
    video: "https://www.youtube.com/watch?v=1bst1CXeGwE&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=165&pp=iAQB",
    completed: false
  },
  {
    title: "165. pattern attribute in HTML (Hindi)",
    description: "Validate input against regular expressions.",
    video: "https://www.youtube.com/watch?v=acjQT0GtVG0&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=166&pp=iAQB",
    completed: false
  },
  {
    title: "166. Input Tag's title attribute in HTML (Hindi)",
    description: "Add tooltips to form elements with title attribute.",
    video: "https://www.youtube.com/watch?v=kELmC4Z84qI&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=167&pp=iAQB0gcJCa0JAYcqIYzv",
    completed: false
  },
  {
    title: "167. Text Area Tag in HTML (Hindi)",
    description: "Create multi-line text input fields with textarea.",
    video: "https://www.youtube.com/watch?v=A6hxWy6nn5Q&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=168&pp=iAQB",
    completed: false
  },
  {
    title: "168. cols and rows attribute in HTML (Hindi)",
    description: "Set dimensions for textarea elements.",
    video: "https://www.youtube.com/watch?v=3ExJxRUaZCU&list=PLbGui_ZYuhihSr4HroBBQt_quHL42JLif&index=169&pp=iAQB",
    completed: false
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


const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Tool Multi Language"
    ],
    correctIndex: 1,
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: [
      "<a>",
      "<link>",
      "<href>",
      "<hyperlink>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which attribute is used to specify the URL in the <a> tag?",
    options: [
      "src",
      "href",
      "url",
      "link"
    ],
    correctIndex: 1,
  },
  {
    question: "Which attribute is used to specify the URL in the <a> tag?",
    options: [
      "src",
      "href",
      "url",
      "link"
    ],
    correctIndex: 1,
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: [
      "<break>",
      "<br>",
      "<lb>",
      "<newline>"
    ],
    correctIndex: 1,
  },
  {
    question: "Which tag is used to define an unordered list?",
    options: [
      "<ol>",
      "<ul>",
      "<li>",
      "<list>"
    ],
    correctIndex: 1,
  },
  {
    question: "Which tag is used to define a list item?",
    options: [
      "<li>",
      "<item>",
      "<listitem>",
      "<ul>"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    options: [
      "<heading>",
      "<h6>",
      "<head>",
      "<h1>"
    ],
    correctIndex: 3,
  },
  {
    question: "Which attribute is used to provide alternative text for an image?",
    options: [
      "alt",
      "title",
      "src",
      "longdesc"
    ],
    correctIndex: 0,
  },
  {
    question: "Which HTML element is used to specify a footer for a document or section?",
    options: [
      "<bottom>",
      "<footer>",
      "<section>",
      "<aside>"
    ],
    correctIndex: 1,
  },
  {
    question: "Which HTML element is used for playing audio files?",
    options: [
      "<sound>",
      "<mp3>",
      "<audio>",
      "<music>"
    ],
    correctIndex: 2,
  },
  {
    question: "Which tag is used to create a table row?",
    options: [
      "<tr>",
      "<td>",
      "<table>",
      "<row>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to create a table cell?",
    options: [
      "<td>",
      "<tr>",
      "<th>",
      "<cell>"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a checkbox in HTML?",
    options: [
      "<input type='checkbox'>",
      "<checkbox>",
      "<input type='check'>",
      "<check>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to define a paragraph?",
    options: [
      "<para>",
      "<p>",
      "<pg>",
      "<paragraph>"
    ],
    correctIndex: 1,
  },
  {
    question: "How do you insert a comment in HTML?",
    options: [
      "// this is comment",
      "<!-- this is comment -->",
      "/* this is comment */",
      "# this is comment"
    ],
    correctIndex: 1,
  },
  {
    question: "Which attribute is used to open a link in a new tab?",
    options: [
      "target='_blank'",
      "new_tab='yes'",
      "open='_new'",
      "tab='new'"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the default display value of the <div> element?",
    options: [
      "inline",
      "block",
      "inline-block",
      "none"
    ],
    correctIndex: 1,
  },
  {
    question: "Which tag is used to make text bold?",
    options: [
      "<strong>",
      "<bold>",
      "<b>",
      "Both <b> and <strong>"
    ],
    correctIndex: 3,
  },
  {
    question: "Which tag is used to create a dropdown list?",
    options: [
      "<select>",
      "<dropdown>",
      "<input type='dropdown'>",
      "<list>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to insert an image?",
    options: [
      "<img>",
      "<image>",
      "<pic>",
      "<src>"
    ],
    correctIndex: 0,
  },
  {
    question: "What does the 'src' attribute specify in the <img> tag?",
    options: [
      "Size of image",
      "Source of image",
      "Style of image",
      "Screen resolution"
    ],
    correctIndex: 1,
  },
  {
    question: "Which tag is used to define a section in HTML5?",
    options: [
      "<section>",
      "<div>",
      "<article>",
      "<aside>"
    ],
    correctIndex: 0,
  },
  {
    question: "What does the <title> tag define?",
    options: [
      "The title of the webpage shown in browser tab",
      "Title of a paragraph",
      "Header of a page",
      "Footer of a page"
    ],
    correctIndex: 0,
  },
  {
    question: "Which HTML tag is used to display a numbered list?",
    options: [
      "<ol>",
      "<ul>",
      "<li>",
      "<list>"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the correct way to create a hyperlink that links to 'https://www.google.com'?",
    options: [
      `<a href="https://www.google.com">Google</a>`,
      `<a url="https://www.google.com">Google</a>`,
      `<link href="https://www.google.com">Google</link>`,
      `<a name="https://www.google.com">Google</a>`
    ],
    correctIndex: 0,
  },
  {
    question: "Which attribute specifies the size of an input field?",
    options: [
      "length",
      "size",
      "width",
      "height"
    ],
    correctIndex: 1,
  },
  {
    question: "Which tag is used to define a header for a document or section?",
    options: [
      "<header>",
      "<head>",
      "<section>",
      "<top>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which attribute is used to specify an input field's placeholder text?",
    options: [
      "tooltip",
      "title",
      "placeholder",
      "hint"
    ],
    correctIndex: 2,
  },
  {
    question: "How do you create a radio button in HTML?",
    options: [
      `<input type="radio">`,
      `<radio>`,
      `<input type="button">`,
      `<input type="checkbox">`
    ],
    correctIndex: 0,
  },
  {
    question: "What is the correct HTML element for playing video files?",
    options: [
      "<video>",
      "<movie>",
      "<media>",
      "<clip>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to define a caption for a <table>?",
    options: [
      "<caption>",
      "<title>",
      "<label>",
      "<legend>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which attribute is used to define inline styles in HTML?",
    options: [
      "style",
      "class",
      "font",
      "styles"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to define a hyperlink to an external CSS file?",
    options: [
      "<link>",
      "<css>",
      "<style>",
      "<script>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which attribute is used with <form> to specify where to send form-data on submission?",
    options: [
      "action",
      "method",
      "target",
      "submit"
    ],
    correctIndex: 0,
  },
  {
    question: "Which attribute specifies the HTTP method (GET or POST) to use when submitting a form?",
    options: [
      "method",
      "action",
      "submit",
      "type"
    ],
    correctIndex: 0,
  },
  {
    question: "Which input type creates a password field?",
    options: [
      `<input type="password">`,
      `<input type="pass">`,
      `<input type="text">`,
      `<input type="secret">`
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag defines the title of a document?",
    options: [
      "<title>",
      "<head>",
      "<header>",
      "<document>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which HTML element is used to define emphasized text?",
    options: [
      "<em>",
      "<i>",
      "<strong>",
      "<bold>"
    ],
    correctIndex: 0,
  },
  {
    question: "How do you create a numbered list in HTML?",
    options: [
      "<ol>",
      "<ul>",
      "<list>",
      "<nl>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which attribute is used to specify the language of the HTML document?",
    options: [
      "lang",
      "language",
      "xml:lang",
      "doclang"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the correct HTML element for inserting a horizontal line?",
    options: [
      "<hr>",
      "<line>",
      "<hl>",
      "<br>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to define a blockquote?",
    options: [
      "<blockquote>",
      "<quote>",
      "<q>",
      "<bq>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to create a dropdown menu?",
    options: [
      "<select>",
      "<dropdown>",
      "<menu>",
      "<option>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to insert a line break?",
    options: [
      "<br>",
      "<lb>",
      "<break>",
      "<newline>"
    ],
    correctIndex: 0,
  },
  {
    question: "What does the <meta> tag do in an HTML document?",
    options: [
      "Defines metadata about the HTML document",
      "Defines the main content",
      "Defines the footer",
      "Adds images"
    ],
    correctIndex: 0,
  },
  {
    question: "Which attribute specifies the character encoding for the HTML document?",
    options: [
      "charset",
      "encoding",
      "code",
      "lang"
    ],
    correctIndex: 0,
  },
  {
    question: "What is the correct HTML element for inserting a video?",
    options: [
      "<video>",
      "<movie>",
      "<media>",
      "<clip>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which element defines navigation links in HTML5?",
    options: [
      "<nav>",
      "<navigation>",
      "<menu>",
      "<section>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which element is used to group footer content in HTML5?",
    options: [
      "<footer>",
      "<bottom>",
      "<section>",
      "<aside>"
    ],
    correctIndex: 0,
  },
  {
    question: "Which tag is used to create a form in HTML?",
    options: [
      "<form>",
      "<input>",
      "<fieldset>",
      "<submit>"
    ],
    correctIndex: 0,
  }
]

const currentQuestion = ref(0)
const selectedOption = ref(null)
const showResult = ref(false)
const isCorrect = ref(false)

function checkAnswer() {
  if (selectedOption.value === questions[currentQuestion.value].correctIndex) {
    isCorrect.value = true
    showResult.value = true
    alert("🎉 Congratulations! Correct answer.")

    currentQuestion.value++
    selectedOption.value = null
    showResult.value = false // agle question ke liye reset
  } else {
    isCorrect.value = false
    alert("Oops! Wrong answer. Try again.")
    // showResult ko false rakho takay options enable rahein
    showResult.value = false
    selectedOption.value = null // reset selection taaki dobara select kare
  }
}


function nextQuestion() {
  currentQuestion.value++
  selectedOption.value = null
  showResult.value = false
  isCorrect.value = false
}

function restartQuiz() {
  currentQuestion.value = 0
  selectedOption.value = null
  showResult.value = false
  isCorrect.value = false
}
</script>