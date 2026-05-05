import {
  deletTask,
  getActiveCount,
  toggleTask,
  updateTaskText,
  addTask,
  clearAll,
  showOnlyActive,
} from "./scripts/functions.js";
import {
  state,
  tasksList,
  addBtn,
  clearAllBtn,
  combtn,
  todoinput,
} from "./scripts/variable.js";

import "./scripts/events.js";

export function renderTasks() {
  // 1. تنظيف القائمة تماماً قبل ما نعيد رسمها (عشان ما تتكرر المهام)
  tasksList.innerHTML = "";

  // 2. تحديث التخزين المحلي (LocalStorage) بأحدث نسخة من المصفوفة
  localStorage.setItem("myTasks", JSON.stringify(state.tasks));

  // 3. فلترة المهام: هل نعرض الكل ولا بس النشطة؟
  let tasksToRender = state.tasks;
  if (state.onlyActiveMode === true) {
    tasksToRender = state.tasks.filter((t) => t.isCompleted === false);
  }

  // 4. الدوران على كل مهمة وبناء شكلها (HTML)
  tasksToRender.forEach((task) => {
    // إنشاء العناصر الأساسية للمهمة
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div"); // حاوية الأزرار
    const checkBtn = document.createElement("button");
    const remBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    div.classList.add("control");

    // تعبئة نصوص العناصر
    span.textContent = task.text;
    checkBtn.textContent = "✔️";
    remBtn.textContent = "X";
    editBtn.textContent = "Edit";

    // إذا كانت المهمة "مكتملة"، نضيف خط تشطيب على النص
    if (task.isCompleted === true) {
      span.style.textDecoration = "line-through";
    }

    // --- إضافة الأوامر باستخدام addEventListener ---

    // 1. زر التعديل
    editBtn.addEventListener("click", () => {
      let newText = prompt("عدل مهمتك:", task.text);
      if (newText !== null && newText.trim() !== "") {
        updateTaskText(task.id, newText);
        // ملاحظة: updateTaskText هي اللي بتنادي renderTasks في نهايتها
      }
    });

    // 2. زر التشطيب (الصح)
    checkBtn.addEventListener("click", () => {
      toggleTask(task.id);
      renderTasks(); // نعيد الرسم عشان نشوف الخط طلع أو اختفى
    });

    // 3. زر الحذف
    remBtn.addEventListener("click", () => {
      deletTask(task.id);
      renderTasks(); // نعيد الرسم بعد ما نقصت المصفوفة
    });

    // 5. تجميع العناصر (الترتيب مهم)
    div.append(checkBtn, editBtn, remBtn); // نحط الأزرار الثلاثة في الـ div
    li.append(span, div); // نحط النص والـ div داخل السطر li
    tasksList.appendChild(li); // نحط السطر كله في القائمة الكبيرة UL
  });

  // 6. تحديث العداد في أسفل الصفحة
  const counterElement = document.querySelector("#counter");
  if (counterElement) {
    counterElement.textContent = getActiveCount();
  }
}

renderTasks();

// melYen
