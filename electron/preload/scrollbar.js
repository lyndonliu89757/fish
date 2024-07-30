// 隐藏 webview 滚动条
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  const style = document.createElement("style");
  style.textContent = `
      ::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        background: transparent;
      }
      body, div, iframe, * {
        scrollbar-width: none !important; /* Firefox */
        -ms-overflow-style: none !important; /* IE 10+ */
        overflow: -moz-scrollbars-none !important; /* Older FF */
      }
    `;
  document.head.appendChild(style);

  console.log("Styles injected.");
});
