// 监听从弹出窗口发送的消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'saveToNotion') {
    const pageTitle = message.pageTitle;
    const pageUrl = message.pageUrl;
    const currentTime = new Date().toLocaleString(); // 获取当前时间

    let selectedText = ''; // 初始化选中的文本为空字符串

    // 检查是否存在选中的文本
    if (window.getSelection) {
      selectedText = window.getSelection().toString();
    }

    // 构造要发送到 Notion 的数据
    const requestData = {
      parent: {
        database_id: '547dceecec3149f8adbb82b1cfd72c72' // 替换为目标数据库的ID
      },
      properties: {
        "地址": {
          url: pageUrl
        },
        "标题": {
          title: [
            {
              text: {
                content: pageTitle
              }
            }
          ]
        },
        "时间": {
          rich_text: [
            {
              text: {
                content: currentTime
              }
            }
          ]
        },
        "内容": {
          rich_text: [
            {
              text: {
                content: selectedText
              }
            }
          ]
        },
        "备注": {
          rich_text: [
            {
              text: {
                content: "1"
              }
            }
          ]
        }
      }
    };


    // 调用 Notion API 创建新的页面
    const notionApi = 'secret_vnyI3dPldhDw2ghMwd4S9Y4991j4wJ9OunPpTj3U9ij'; // 替换为你的 Notion API 密钥

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionApi}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28' // 使用最新的 API 版本
      },
      body: JSON.stringify(requestData)
    };

    const apiUrl = `https://api.notion.com/v1/pages`;

    fetch(apiUrl, options)
      .then((response) => {
        console.log('Data saved to Notion:', response);
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error('Error saving data to Notion:', error);
        sendResponse({ success: false, error: error.message });
      });

    // 返回 true 表示异步处理，以便长时间运行的操作可以继续
    return true;
  }
});



  