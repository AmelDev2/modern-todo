export let todoinput = document.querySelector("#todoInput");
export const addBtn = document.querySelector("#addBtn");
export const tasksList = document.querySelector("#tasksList");
export const clearAllBtn = document.querySelector("#clearAllBtn");
export const combtn = document.querySelector("#combtn");

// اولا بيانات
//  let tasks = []; مصفوفة المهام
export const state = {
  tasks: JSON.parse(localStorage.getItem("myTasks")) || [],
  onlyActiveMode: false,
};
