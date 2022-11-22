{
   let tasksHidingSwitch = false;

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
               <button class="js-done list__checkButton ${task.done ? "list__checkButton--true" : ""}">
                  ✔
               </button> 

               <span class="list__item${task.done ? " list__item--done" : ""}">
                  ${task.content} 
               </span>

               <button class="js-remove list__removeButton">🗑</button>
            </li>
         `};

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

   const toggleListButtons = () => {
      const completeListButton = document.querySelector(".js-tasks-buttons")

      if (tasks.length !== 0) {

         let htmlString =
            `<button class="list__button js-showList">
            ${tasks.some(({ done }) => done) && tasksHidingSwitch
               ? "Pokaż ukończone"
               : "Ukryj ukończone"} 
         </button>
         <button class="list__button js-completeList" 
            ${tasks.every(({ done }) => done)
               ? `disabled`
               : ``}
            >Ukończ zadania</button> 
         `;

         completeListButton.innerHTML = htmlString;

      } else {
         completeListButton.innerHTML = "";
      }
   };

   const toggleListButtonEvents = () => {
      if (tasks.length !== 0) {
         const toggleListState = document.querySelector(".js-showList");
         toggleListState.addEventListener("click", () => {
            tasks.some(({ done }) => done) ? tasksHidingSwitch = !tasksHidingSwitch : "";
            render();
         })

         const toggleTasksAsDone = document.querySelector(".js-completeList");
         toggleTasksAsDone.addEventListener("click", () => {
            tasks = tasks.map((task) => {
               return {
                  ...task,
                  done: true
               }
            });
            render();
         })
      }
   };

   const render = () => {
      renderTasks();
      toggleListButtons();
      toggleListButtonEvents();
      bindButtonsEvents();
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