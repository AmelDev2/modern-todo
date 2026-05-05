import { addTask, clearAll, showOnlyActive } from "./functions.js";
import { renderTasks } from "../index.js";
import { addBtn, clearAllBtn, combtn, todoinput } from "./variable.js";

addBtn.addEventListener("click", () => {
  let inputValue = todoinput.value;

  if (inputValue === "") {
    return;
  }
  addTask(inputValue);
  todoinput.value = "";
  todoinput.focus();
});

// 4. (إضافة ذكية) للسماح بالإضافة عند الضغط على Enter من الكيبورد
todoinput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

clearAllBtn.addEventListener("click", clearAll);

combtn.addEventListener("click", showOnlyActive);
