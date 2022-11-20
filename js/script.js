{
   let tasks = [
      {
         content: "kodzić troche",
         done: true,
      },
      {
         content: "pograc w gry",
         done: false,
      },
   ];

   let tasksHidingSwitch = false;

   const tasksHidingSwitchToggle = () => {
      tasksHidingSwitch = !tasksHidingSwitch
   };


   const addNewTask = (newTaskContent) => {
      tasks = [
         { content: newTaskContent, done: false },
         ...tasks,
      ];
      render();
   };

   const removeTask = (taskIndex) => {
      tasks = [
         ...tasks.slice(0, taskIndex),
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   };

   const toggleTaskDone = (taskIndex) => {
      tasks = tasks.map((task, index) => {
         if (index === taskIndex) {
            return {
               ...task,
               done: !task.done,
            }
         }
         return task;
      });
      render();
   };

   const renderTasks = () => {
      let htmlString = "";
      for (const task of tasks) {
         htmlString += `
         <li class="list__tasks ${task.done && tasksHidingSwitch ? "list__tasks--hidden" : ""}">
           <span class="list__item${task.done ? " list__item--done" : ""}">
            <button class="js-done${task.done ? " list__checkButton--true" : " list__checkButton"}">✔</button> 
               ${task.content} 
            <button class="js-remove list__removeButton">🗑</button>
           </span>
         </li>
      `;
      };

      document.querySelector(".js-tasks").innerHTML = htmlString;
   };

   const bindButtonsEvents = () => {
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
   };

   toggleListButtons = () => {

      if (tasks.length > 1) {
         console.log(tasks.length);

         let htmlString = "";
         showListButton = document.querySelector(".js-tasks-buttons")
         completeListButton = document.querySelector(".js-tasks-buttons")
         tasks.every(({ done }) => done)
            ? (htmlString += ` <button class="list__button js-showList">Pokaż ukończone</button> `, tasksHidingSwitchToggle())
            : htmlString += ` <button class="list__button js-showList">Ukryj ukończone</button> `

         showListButton.innerHTML = htmlString;

         htmlString += ` <button class="list__button js-completeList" ${tasks.every(({ done }) => done) ? `disabled` : ``}>Ukończ zadania</button> `
         completeListButton.innerHTML = htmlString;
      }
   };

   render = () => {
      renderTasks();
      bindButtonsEvents();
      toggleListButtons();
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