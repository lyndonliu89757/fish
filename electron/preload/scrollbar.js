// 隐藏 webview 滚动条
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  const style = document.createElement("style");
  style.textContent = `
/*Webkit 内核 (Chrome, Safari):*/
body::-webkit-scrollbar {
	width: 0px;
	height: 0px;
}
/*Gecko 内核 (firefox):*/
body {
  scrollbar-width: none;
}
/*IE内核 (IE, Edge):*/
body {
  -ms-overflow-style:none;
}
    `;
  document.head.appendChild(style);

  console.log("Styles injected.");
});
