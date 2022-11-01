{
   const tasks = [];

   const addNewTask = (newTaskContent) => {
      tasks.push({
         content: newTaskContent,
      });
      render();
   };

   const removeTask = (taskIndex) => {
      tasks.splice(taskIndex, 1);
      render();
   }

   const toggleTaskDone = (taskIndex) => {
      tasks[taskIndex].done = !tasks[taskIndex].done;
      render();
   }

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

   const render = () => {
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