<template>
  <div>
    <h1 class="text-4xl font-bold mt-7 text-slate-900 text-center">Create Free Account</h1>
    <p class="text-slate-700 text-center text-[17px] px-6 mt-2">
      Clarity gives you the blocks and components you need to <br />
      create a truly professional website.
    </p>
  </div>

  <div class="max-w-md mx-auto bg-white p-8 mt-5 rounded-lg shadow-lg ">
    <h1 class="text-2xl font-bold text-center mb-6">Sign Up</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          v-model="form.username"
          type="text"
          id="username"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Account
      </button>
    </form>

    

    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Already have an account?
        <a href="#" @click.prevent="$emit('toggle-form')" class="font-medium text-indigo-600 hover:text-indigo-500">
          Sign In
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['toggle-form']);

const form = ref({
  username: '',
  email: '',
  password: ''
});

const handleSubmit = () => {
  // Get old users
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Check if user already exists
  const existingUser = users.find(u => u.email === form.value.email);
  if (existingUser) {
    alert('User already exists!');
    return;
  }

  // Add new user
  users.push({ ...form.value });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(form.value.email));

  alert('Account created successfully!');
  
  // Reset form
  form.value = { username: '', email: '', password: '' };
};
</script>


