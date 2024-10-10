<template>
  <div class="flex h-dvh">
    <div class="w-1/4 h-full bg-blue-400 text-white overflow-auto">
      <h1 class="items-center justify-center flex font-bold text-lg my-4">Listes</h1>
      <div :key="list._id" v-for="list in storeList.lists">
        <div v-on:click="storeList.getAllTasks(list._id)" class="relative h-8 flex justify-center items-center bg-blue-700 rounded-3xl mx-8 my-2 cursor-pointer">
          <div class="absolute left-2 bottom-1/2 translate-y-1/2 w-4 h-4 rounded-full" :class="[storeList.currentList?._id === list._id ? 'bg-green-300' : 'bg-white']"></div>
          {{list.title}}
        </div>
      </div>
      <div class="h-8 flex justify-center items-center bg-blue-700 rounded-3xl mx-8 my-2 ">
        <input class="w-4/5 h-auto bg-blue-700 placeholder-white" placeholder="Nouvelle liste" type="text" v-model="newList">
        <div class=" ml-2 w-5 h-5 flex justify-center items-center bg-white text-blue-500 font-bold rounded-full cursor-pointer" v-on:click="storeList.addList(newList)">+</div>
      </div>
    </div>
    <div class="w-full h-auto flex justify-center items-center flex-col overflow-auto">
      <div class="w-1/2">
        <h1 class="text-5xl text-blue-500 font-bold">TO DO LIST !!!</h1>
        <div class="flex border border-2 border-gray-300 m-2 p-3 ">
          <input class="w-full h-auto" placeholder="Nouvelle tâche" type="text" v-model="newTask">
          <div class="flex justify-center items-center bg-blue-500 text-white font-bold py-0.5 px-2.5 cursor-pointer" v-on:click="storeList.addTask(storeList.currentList?._id, newTask)">+</div>
        </div>
        <div class="flex border border-2 border-gray-300 m-2 p-3 " v-for="task in storeList.currentList?.tasks" :key="task._id">
          <input class="mr-4" type="checkbox" v-model="task.completed" v-on:click="storeList.completedTask(storeList.currentList?._id, task._id)">
          <div class="w-full" :class="[task.completed ? 'line-through' : '']">
            {{task.description}}
          </div>
          <div class="flex justify-center items-center bg-red-500 text-white font-bold py-0.5 px-3 cursor-pointer" v-on:click="storeList.deleteTask(storeList.currentList?._id, task._id)">-</div>

        </div>
        <div class="flex justify-end text-blue-500 mr-2">{{formatDate(storeList.currentList?.createdAt)}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {listStore} from "./store/storeList.store.ts";
import {ref} from "vue";

const storeList = listStore()
storeList.getAllList()

const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

const newTask = ref('')
const newList = ref('')

</script>

<style>
</style>
