const socket = io();

const renderData = (data) => {
  const html = data
    .map((item) => {
      return `<strong>
              ${item.author}
            </strong>:
            <em>
              ${item.text}
            </em>`;
    })
    .join("<br>");
  document.getElementById("message").innerHTML = html;
};

const clearInputs = () => {
  document.getElementById("username").value = "";
  document.getElementById("texto").value = "";
};

const addMenssage = (e) => {
  const menssage = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };
  socket.emit("new-message", menssage);
  clearInputs();
  return false;
};

socket.on("messages", (data) => renderData(data));
