const circleChannel = new BroadcastChannel("circle_channel");
const myChannel = new BroadcastChannel("my_channel");
const circle = document.getElementById("circle");
const text = document.getElementById("text");
const corpo = document.getElementById("corpo");

function circleMove(e) {
  const x = e.clientX,
    y = e.clientY;
    
  circle.classList.remove("noite")
  circle.classList.add("dia");

  circle.style.right = "";
  circle.style.left = x + "px";
  circle.style.top = y + "px";
  circle.style.background = "#ffb56b";
  circle.style.filter = "blur(15px)";
  
  corpo.style.background = "#fff";

  text.style.color = "#ffb56b";

  circleChannel.postMessage({ x, y });
}

circleChannel.onmessage = (e) => {
  const { x, y } = e.data;

  circle.classList.remove("dia")
  circle.classList.add("noite");

  circle.style.right = x + "px";
  circle.style.left = "";
  circle.style.top = y + "px";
  circle.style.background = "#22c1c3";
  circle.style.filter = "blur(1px)";

  corpo.style.background = "#36454f";

  text.style.color = "#fff";
};

addEventListener("mousemove", circleMove);
addEventListener("mousemove", sendDataToAnotherBrowser);

function sendDataToAnotherBrowser() {
  text.innerHTML = "Bommm Diaaa!!! ☀️";
  myChannel.postMessage("Boa noite!!! 🌑");
}

myChannel.onmessage = (e) => {
  text.innerHTML = e.data;
};
