document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById("saveButton");
  
    saveButton.addEventListener("click", function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const selectedText = window.getSelection().toString();
        const pageTitle = tabs[0].title;
        const pageUrl = tabs[0].url;
  
        // 向 background 页面发送消息
        chrome.runtime.sendMessage({
          type: "saveToNotion",
          selectedText,
          pageTitle,
          pageUrl
        }, function(response) {
          if (response && response.success) {
            alert("信息已成功保存到 Notion！");
          } else {
            alert("保存信息到 Notion 失败，请检查错误日志。");
          }
        });
      });
    });
  });
  