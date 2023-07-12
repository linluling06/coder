//const databaseId = '547dceecec3149f8adbb82b1cfd72c72'; // 替换为你的 Notion 数据库的 ID
  //    const notionApi = 'secret_vnyI3dPldhDw2ghMwd4S9Y4991j4wJ9OunPpTj3U9ij'; // 替换为你的 Notion API 密钥
  
// 监听从弹出窗口发送的消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'saveToNotion') {
      const selectedText = message.selectedText;
      const pageTitle = message.pageTitle;
      const pageUrl = message.pageUrl;
  
      // 构造要发送到 Notion 的数据
      const requestData = {
        parent: {
          database_id: '547dceecec3149f8adbb82b1cfd72c72' // 替换为目标数据库的ID
        },
        properties: {
          "收藏句子": {
            rich_text: [
              {
                text: {
                  content: selectedText
                }
              }
            ]
          },
          "地址来源": {
            url: pageUrl
          },
          "文章标题": {
            rich_text: [
              {
                text: {
                  content: pageTitle
                }
              }
            ]
          },
          "备注": {
            rich_text: [
              {
                text: {
                  content: ""
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
  