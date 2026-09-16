# Chengmu She · Personal Portfolio

An English job-seeking portfolio with an illustrated, moonlit introduction. Click anywhere on the rooftop scene to enter the personal profile and selected work. The scene depicts a boy with a green snake on his shoulder looking at the moon, and uses original SVG artwork with desktop, portrait, and landscape compositions.

`index.html` is the introduction; `portfolio.html` contains the profile, technology overview, four interactive project entries, project notes, and GitHub contact link. Each application returns directly to the portfolio. The entrance and project notes also work without JavaScript. Motion respects the device's reduced-motion preference.

The portfolio has a soft cartoon theme with four original SVG companions: a firefly for travel, a little mouse for Hermes, a cat for GEO Radar, and a puppy for GEO Studio. The English welcome page is `index.html`; the following pages use Chinese and switch independently through `about.html` (关于我), `portfolio.html` (作品集), and `contact.html` (联系我). `cartoon-portfolio.css` contains the theme and responsive layouts; `assets/` contains the companion illustrations, notebook scene, and flower icon. Serve the entire directory to preview the pages, for example with `python3 -m http.server 8123 --bind 127.0.0.1`.

在线地址：https://chengmushe.github.io/ai-portfolio/

四个项目均支持个人服务绑定：

- **智能旅行助手**：打开 AI 设置，填写 API Key、模型名称和 Base URL，生成并修改行程。
- **Hermes**：打开服务设置绑定模型，用知识库、记忆和已启用技能进行问答并提炼技能。渠道连接支持绑定 Hermes 后端，再配置企业微信、飞书或钉钉转发器凭据及白名单。
- **GEO Radar**：在平台管理分别绑定目标模型，在服务设置绑定评分模型，然后创建评估。原始回答、评分依据、进度和 CSV 保存在浏览器。每条问题调用一次目标模型、一次评分模型，按服务商计费。页面关闭会中断任务；持续调度和网页采集需绑定后端。
- **GEO Studio**：在服务设置绑定改写模型，以及 WordPress 应用密码或 MetaWeblog 账号。测试验证账号；分发窗口确认后创建远程草稿，公开发布仍在目标站点完成。社区平台需打开编辑页登录并手动保存。

凭据默认保存在当前标签页，勾选“记住凭据”后才长期保存在本浏览器；支持测试、断开和清除。凭据不会进入文章、评估、CSV 或仓库。浏览器存储不加密，不适合在公用设备上长期保存密钥。任务内容会发送到填写的服务地址；请使用可信的 HTTPS 服务。

模型须兼容 Chat Completions，服务须允许本站的 CORS 跨域请求；服务商余额、地区和模型权限以实际账号为准。模型 API 结果与同名平台网页的搜索、联网能力不同，评分属于模型判断。未绑定时保留离线功能和明确标注的示例数据，不会假装完成模型调用。

远程后端连接使用对应项目的部署地址及 ADMIN_PASSWORD（Bearer 认证），需要设置 `CORS_ORIGINS=https://chengmushe.github.io` 和强管理密码。绑定后切换到服务器工作空间；断开后返回浏览器记录。本仓库只托管静态网页，不托管后端进程。完整后端源码和部署说明位于本地交付包。

企业微信使用后端持续 WebSocket；飞书当前支持未加密 Webhook；钉钉需受信 Stream 转发器。渠道后台模型仍使用服务器的 LLM 配置，个人浏览器 Key 不会自动复制到后端。CMS 不允许 CORS 时，可通过配置好 CMS 的自有后端同步。WordPress 浏览器同步保留图片原链接。

已用模拟 HTTP 服务验证模型、CMS 草稿和后端认证调用；未使用真实付费 Key、未发送真实企业消息、未发布真实文章。

GitHub Pages：main 分支 / 根目录，HTTPS。
