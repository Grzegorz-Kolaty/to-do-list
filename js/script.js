{
  const tasks = [
    {
      content: "record a lesson",
      done: false,
    },

    {
      content: "zjeść pierogi",
      done: true,
    },
  ];

  const render = () => {
    let htmlsString = "";

    for (const task of tasks) {
      htmlsString += `
            <li>
                ${task.content}
            </li>
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlsString;

  };

  const init = () => {
    render();
  };

  init();
}