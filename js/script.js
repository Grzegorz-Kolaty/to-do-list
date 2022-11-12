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

   let hideDoneTasks = false;


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

   const showTasksCompleted = () => {
      tasks = tasks.filter(task => task.done)
      render()
   };

   const completeTasksAll = () => {
      tasks = tasks.map((task) => {
         if (task.done === false) {
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

   const bindEvents = () => {
      const completedTasksButtons = document.querySelectorAll(".js-tasksCompleted");

      completedTasksButtons.forEach((completedTasksButton, index) => {
         completedTasksButton.addEventListener("click", () => {
            showTasksCompleted(index);
            
         });
      });

      const completeTasksButtons = document.querySelectorAll(".js-completeAll");

      completeTasksButtons.forEach((completeTasksButton, index) => {
         completeTasksButton.addEventListener("click", () => {
            completeTasksAll(index);
         });
      });
   }

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
   }

   const render = () => {
      renderTasks();
      renderButtons();
      bindButtonsEvents();
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