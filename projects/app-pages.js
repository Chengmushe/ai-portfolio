/* Standalone frontends for the documented business projects. */
(function(){
const H=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const status="原项目数据库和 API 尚未接入。当前页面只处理本浏览器中的输入，不会产生真实业务结果。";
function guide(p){const g=window.PROJECT_GUIDE?.[p.id];if(!g)return '';return '<section class="project-guide" aria-label="项目用途与操作流程"><div class="guide-head"><span>项目说明 · 文档第 '+H(p.num)+' 章</span><h2>这个项目用来做什么？</h2><p>'+H(g[1])+'</p><small>主要使用者：'+H(g[0])+'</small></div><div class="guide-grid"><div><h3>实际业务怎么走</h3><ol>'+g.slice(2,5).map((step,i)=>'<li><b>'+String(i+1).padStart(2,'0')+'</b><span>'+H(step)+'</span></li>').join('')+'</ol></div><div class="guide-try"><h3>从这里开始</h3><p>'+H(g[5])+'</p><a class="guide-start" href="#operation-area">进入操作区 ↓</a><h3>接入后会得到什么</h3><p>'+H(g[6])+'</p></div></div></section>'}
function frame(p,content,variant){
 document.getElementById('app').innerHTML='<div class="experience theme-'+variant+' project-'+H(p.id)+'"><header class="experience-top"><a href="./index.html#/projects">← 返回项目目录</a><span>'+H(p.collection)+'</span><a href="../portfolio.html">作品集 ↗</a></header><div class="experience-layout"><aside class="experience-side"><img src="../assets/project-animals/'+H(p.animal)+'.svg" alt="'+H(p.animalName)+'插画"><strong>'+H(p.title)+'</strong><span>'+H(p.category)+'</span><a href="./index.html#/projects">全部项目 ↗</a></aside><main class="experience-main" tabindex="-1"><div class="experience-title"><span>'+H(p.collection)+' / '+H(p.num)+'</span><h1>'+H(p.title)+'</h1><p>'+H(p.desc)+'</p></div>'+guide(p)+'<div id="operation-area" class="experience-status"><span aria-hidden="true">●</span> '+status+'</div>'+content+'</main></div></div>';

}
window.renderProjectApp=p=>{const special=window.PROJECT_FEATURES?.[p.id]||window.PROJECT_FEATURES_MORE?.[p.id];if(special){const result=special.render(p);frame(p,result.html,result.theme||'sage');special.bind?.(p);return}throw new Error("项目界面未配置："+p.id)};
})();
