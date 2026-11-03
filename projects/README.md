# 由莱 AI 项目独立前端

22 个模块各有独立业务界面，入口在 `projects/#/projects`。访客点击动物卡片后先阅读介绍并确认，再进入模块。旧版通用工作台脚本已从 `index.html` 中移除。

`project-features.js` 与 `project-features-more.js` 实现各模块界面、交互和本机草稿。`app-pages.js` 只提供统一作品集视觉外壳。草稿在本浏览器 `localStorage` 保存；业务结果不伪造。

接入真实服务：在 `connections.js` 为单个项目设置受控 HTTPS 网关；`api.js` 保存健康检查、读取与写入路径合同。实际身份、参数和响应结构仍需对照原服务逐项验收。数据库密码、模型密钥和第三方凭据不能进入前端。
