// 从网页中获取选中的文本
function getSelectedText() {
    let selectedText = '';
    if (window.getSelection) {
      selectedText = window.getSelection().toString();
    }
    return selectedText;
  }
  
  // 向后台页面发送消息，将选中文本传递给后台页面
  function sendSelectedTextToBackground(selectedText, pageTitle, pageUrl) {
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
  }
  
  // 监听来自页面的鼠标选中事件
  document.addEventListener('mouseup', function() {
    const selectedText = getSelectedText();
    const pageTitle = document.title;
    const pageUrl = window.location.href;
  
    if (selectedText) {
      // 将选中的文本发送给后台页面
      sendSelectedTextToBackground(selectedText, pageTitle, pageUrl);
    }
  });
  