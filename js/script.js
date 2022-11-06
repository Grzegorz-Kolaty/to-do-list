{
   let tasks = [];
   let hideDoneTasks = false;

   const addNewTask = (newTaskContent) => {
      tasks = [
         ...tasks,
         { content: newTaskContent },
      ];
      render();
   };

   const removeTask = (taskIndex) => {
      tasks = [
         ...tasks.slice(0, taskIndex),
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   }

   const toggleTaskDone = (taskIndex) => {
      const state = (changestatus) => changestatus = true;
      tasks[taskIndex] = tasks[taskIndex].map(state)


   // tasks[taskIndex].done = !tasks[taskIndex].done;
   console.log(tasks);
   console.log(tasks[taskIndex]);
   render();
};

const bindEvents = () => {
   const removeButtons = document.querySelectorAll(".js-remove");

   removeButtons.forEach((removeButtons, index) => {
      removeButtons.addEventListener("click", () => {
         removeTask(index);
      });
   });

   const toggleDoneButtons = document.querySelectorAll(".js-done");

   toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
         toggleTaskDone(index);
      });
   });
}

const renderTasks = () => {
   let htmlString = "";
   for (const task of tasks) {
      htmlString += `
         <li class="list__tasks">
           <button class="js-done${task.done ? " list__checkButton--true" : " list__checkButton"}">✔</button>
           <span class="list__item${task.done ? " list__item--done" : ""}">${task.content}</span>
           <button class="js-remove list__removeButton">🗑</button>
         </li>
      `;
   };

   document.querySelector(".js-tasks").innerHTML = htmlString;
}

const renderButtons = () => { }

const bindButtonsEvents = () => {


}

const render = () => {
   renderTasks();
   renderButtons();
   bindButtonsEvents()

   bindEvents();
};

const onFormSubmit = (event) => {
   event.preventDefault();

   const inputField = document.querySelector(".js-newTask");
   const newTaskContent = inputField.value.trim();

   if (newTaskContent === "") {
      return;

   }
   addNewTask(newTaskContent);
   inputField.value = "";  // cleaning up input field 

   const focusField = document.querySelector(".js-newTask--button")
   focusField.addEventListener("click", (event => {
      document.querySelector(".js-newTask").focus(); // input field focus after click
      onFormSubmit(event);

   }));
};

const init = () => {
   render();

   const form = document.querySelector(".js-form");
   form.addEventListener("submit", onFormSubmit);

};
init();
}