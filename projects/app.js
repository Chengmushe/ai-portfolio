const projects = [
['platform','UliKe AI 企业主平台','平台','统一身份、模型路由、聊天、知识、DTC 周报与应用入口。','Go · React · Gin','模型渠道|令牌配置|路由检查|调用记录'],
['ask','Ask 问数 Agent','智能体','中文业务问数、口径澄清、查询确认与可追溯答案。','React · FastAPI · PostgreSQL','新建会话|业务提问|口径确认|答案证据'],
['voc-service','独立 VOC 客服 Agent','智能体','隔离快照问答与固定事实报告，保留证据和冻结产物。','React · FastAPI · MySQL','选择范围|查询快照|固定报告|冻结产物'],
['aigc','AIGC 创意工作台','内容生产','图片与视频创意任务、素材管理、进度与历史。','Vite · FastAPI · JavaScript','填写创意|选择参数|创建任务|查看进度'],
['voc-tagger','VOC 智能打标引擎','数据智能','反馈情绪、正式标签、使用频率与人工复核。','Python · JEV · SQLite','输入反馈|标签候选|证据检查|人工复核'],
['qms','QMS 体系运维','业务工作台','周期资料任务、负责人提交、管理员核对与归档。','React · FastAPI · PostgreSQL','创建周期任务|负责人提交|管理员核对|归档'],
['nas','QMS NAS 同步代理','基础设施','领取已审核文件，区分归档与实际 NAS 同步。','Python · FastAPI · Synology','领取文件|个人账号传输|同步校验|读取'],
['dmr','DMR 量产文件管理','业务工作台','批量解析、人工字段核对、受控版本与历史归档。','React · FastAPI · SQLite','批量录入|版本判断|人工核对|文控归档'],
['legal','法务流程机器人','业务工作台','供应商材料收集、字段核对与 OA 预填单。','React · Node.js · OCR MCP','收集材料|OCR 识别|字段核对|OA 预填'],
['ocr','PaddleOCR MCP','基础设施','共享图片与 PDF OCR，输出文字、位置与置信度。','Python · PaddleOCR · MCP','选择文件|限制校验|OCR 识别|结构化返回'],
['translation','Word 翻译工作台','内容生产','DOCX 上传、文本块翻译、结构核对与产物管理。','Python · FastAPI · SQLite','上传 DOCX|选择语种|翻译任务|结构核对'],
['reception','AI 客服训练工作台','智能体','国内与海外场景模拟接待、实时提示与训练报告。','Vue 3 · FastAPI · RAG','选择场景|模拟接待|逐轮提示|训练报告'],
['overseas-qa','海外正式质检','数据智能','真实会话评分、证据归责、主管复核与申诉版本。','Python · FastAPI · SQLite','导入会话|评分预览|主管复核|申诉'],
['autorecruit','招聘采集与筛选工作台','业务工作台','岗位方案、候选人硬门槛、HR 确认与触达队列。','FastAPI · SQLite · Playwright','创建岗位|候选采集|HR 筛选|确认触达'],
['meeting','会议室预订 Agent','智能体','自然语言查空闲、成员消歧、确认预约与取消。','Python · FastAPI · 飞书','解析需求|查询空闲|确认卡片|创建预约'],
['amazon','Amazon Listing 监控','监控与运维','活动商品的价格、配送、Buy Box 三类异常检查。','Python · Playwright · 飞书 Base','活动规则|页面观测|三项检查|异常通知'],
['kol','KOL 授权风险提醒','监控与运维','授权到期 D-3 / D+7 预警、责任台账与周报。','Node.js · MySQL · 飞书','授权台账|到期计算|责任处理|周报'],
['bridge','飞书知识桥','基础设施','遍历授权 Wiki、抽取正文并交付知识片段。','Node.js · 飞书 CLI','遍历 Wiki|抽取正文|切片|交付平台'],
['ipl','IPL / MASK 图片识别','数据智能','模型概率、双阈值判断与人工复核分流。','FastAPI · ONNX Runtime','选择模型|输入图片|阈值判断|人工复核'],
['caddy','Caddy 路由配置','基础设施','工作台路径规范化、反向代理和未知路径处理。','Caddy · TLS · Reverse Proxy','输入路径|规范化|匹配上游|响应'],
['deploy','AI Deploy 部署控制面','监控与运维','项目注册、发布、重启、回滚、日志与健康状态。','FastAPI · PM2 · Compose','选择项目|创建操作|执行步骤|健康回执'],
['ops','AI Ops 观察与恢复','监控与运维','连续故障观察、恢复意图、回执和冷却熔断。','Python · SQLite · ai-deploy','观察快照|判断候选|恢复意图|回执确认']
].map((x,i)=>({id:x[0],title:x[1],category:x[2],desc:x[3],tech:x[4],flow:x[5].split('|'),num:String(i+1).padStart(2,'0')}));

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const groups=['全部','平台','智能体','业务工作台','内容生产','数据智能','监控与运维','基础设施'];
let group='全部', search='';
function nav(active){return '<aside class="sidebar" id="sidebar"><a class="brand" href="../portfolio.html"><img src="../assets/little-flower.svg" width="39" height="39" alt=""><div><b>Chengmu She</b><small>A CURIOUS BUILDER</small></div></a><div class="nav-label">SITE</div><a class="nav-item" href="../index.html">首页</a><a class="nav-item" href="../portfolio.html">作品集</a><a class="nav-item" href="../contact.html">联系我</a><div class="nav-label">ULIKE / PROJECTS</div><a class="nav-item '+(active==='projects'?'active':'')+'" href="#/projects">全部项目</a><a class="nav-item '+(active==='about'?'active':'')+'" href="#/about">接入状态</a><div class="nav-label">PROJECT GROUPS</div>'+groups.slice(1).map(x=>'<a class="nav-item" href="#/projects?cat='+encodeURIComponent(x)+'">'+esc(x)+'</a>').join('')+'<div class="sidebar-bottom">22 个项目 · 依据复现文档</div></aside>'}
function shell(body,title,active){$('#app').innerHTML='<div class="layout">'+nav(active)+'<div class="main"><header class="topbar"><div><button class="btn ghost mobile-menu" id="menuBtn">☰</button><a href="../portfolio.html">作品集</a> / '+esc(title)+'</div><div>数据库与 API 未接入</div></header><main class="page">'+body+'<div class="footer"><a href="../portfolio.html">← 返回作品集</a><span>CHENGMU SHE · 2026</span><a href="../contact.html">联系我 →</a></div></main></div></div>';$('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');window.scrollTo(0,0)}
function card(p){return '<a class="card" href="#/project/'+p.id+'/demo"><div class="card-top"><span class="number">'+p.num+' / 22</span><span class="badge">'+esc(p.category)+'</span></div><h3>'+esc(p.title)+'</h3><p>'+esc(p.desc)+'</p><div class="card-footer"><span class="tags">'+esc(p.tech)+'</span><span>进入项目 ↗</span></div></a>'}
function listing(){shell('<div class="section-heading"><div><div class="eyebrow">ULIKE / AI PROJECTS</div><h1>业务项目</h1><p>按项目进入对应工作台。</p></div></div><div class="toolbar"><input class="search" id="search" placeholder="搜索项目…" value="'+esc(search)+'">'+groups.map(x=>'<button class="pill '+(group===x?'active':'')+'" data-group="'+esc(x)+'">'+esc(x)+'</button>').join('')+'</div><div class="grid" id="grid"></div>','全部项目','projects');let draw=()=>{$('#grid').innerHTML=projects.filter(p=>(group==='全部'||p.category===group)&&(!search||(p.title+p.desc+p.tech).toLowerCase().includes(search.toLowerCase()))).map(card).join('')||'<p>没有匹配项目。</p>'};draw();$('#search').oninput=e=>{search=e.target.value;draw()};document.querySelectorAll('[data-group]').forEach(b=>b.onclick=()=>{group=b.dataset.group;document.querySelectorAll('[data-group]').forEach(x=>x.classList.toggle('active',x===b));draw()})}
function about(){shell('<div class="eyebrow">SERVICE STATUS</div><h1>项目接入状态</h1><div class="panel"><p>22 个项目页面按复现文档中的职责和业务入口组织。当前本机没有原项目源码、模型权重、业务数据库或授权服务；列表为空，业务操作不会提交。</p><p>接入时需逐项目配置原服务、身份和数据源。浏览器端不保存数据库密码或模型密钥。</p></div>','接入状态','about')}
function route(){let raw=location.hash.slice(1)||'/projects',[path,qs]=raw.split('?');if(path==='/'||path==='/projects'){let cat=new URLSearchParams(qs||'').get('cat');if(cat&&groups.includes(cat))group=cat;listing();return}if(path==='/about'){about();return}let parts=path.split('/').filter(Boolean);if(parts[0]==='project'&&parts[1]){let p=projects.find(x=>x.id===parts[1]);if(p){window.renderPrototype(p);return}}shell('<h1>页面未找到</h1><a class="btn primary" href="#/projects">返回全部项目</a>','未找到','projects')}
addEventListener('hashchange',route);route();
