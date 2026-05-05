// المرحلة الأولى: تأسيس "مخزن" البيانات
// أول شيء، نحتاج "مصفوفة" (Array) فاضية تخزن المهام اللي بيضيفها المستخدم. وكل مهمة عبارة عن Object.

import { renderTasks } from "../index.js";
import { combtn, state } from "./variable.js";

// فانكشن لإضافة مهمة جديدة
export function addTask(text) {
  const newTask = {
    id: Date.now(),
    text: text,
    isCompleted: false,
  };
  state.tasks.push(newTask);
  renderTasks();
  console.log("not working");
}

// -----------------------------------------

// لمرحلة الثانية: وظيفة "التشطب" (Toggle Complete)
// أمس أنت قلت: "نشطب عليها يعني نحول الـ isCompleted لـ true".
// هنا بنسوي فانكشن تبحث عن المهمة بالـ id حقها وتقلب حالتها.

export function toggleTask(id) {
  state.tasks.forEach((task) => {
    if (task.id === id) {
      if (task.isCompleted === false) {
        task.isCompleted = true;
      } else {
        task.isCompleted = false;
      }
    }
  });
  console.log("تحديث الحالة المهمة: ", state.tasks);
}

// ---------------------------------------------------------------

export function deletTask(id) {
  state.tasks = state.tasks.filter((task) => {
    if (task.id != id) {
      return true;
    } else {
      return false;
    }
  });
}

// --------------------------------------------

export function clearAll() {
  if (confirm("هل انت متاكد من حذف جميع المهام؟")) {
    state.tasks = [];
    // tasks.length=0
    renderTasks();
  }
}

// -------------------------------------------------------

export function showOnlyActive() {
  console.log("الوضع الحالي قبل التغير, ", state.onlyActiveMode);
  // إذا كان الوضع "عرض النشط فقط" شغال، نطفيه
  if (state.onlyActiveMode === true) {
    state.onlyActiveMode = false;
    combtn.textContent = "show active only"; // نغير النص عشان المستخدم يعرف وش بيصير لو ضغط
  }
  // وإذا كان الوضع طافي، نشغله
  else {
    state.onlyActiveMode = true;
    combtn.textContent = "Show All";
  }
  renderTasks();
}

export function updateTaskText(id, newText) {
  state.tasks.forEach((task) => {
    if (task.id === id) {
      task.text = newText;
    }
  });

  renderTasks();
}

export function getActiveCount() {
  const activeTasks = state.tasks.filter((task) => {
    return task.isCompleted === false;
  });
  return activeTasks.length;
}
