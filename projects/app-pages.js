/* Standalone frontends for the documented business projects. */
(function(){
const H=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const status="原项目数据库和 API 尚未接入。当前页面只处理本浏览器中的输入，不会产生真实业务结果。";
function frame(p,content,variant){
 document.getElementById('app').innerHTML='<div class="experience theme-'+variant+' project-'+H(p.id)+'"><header class="experience-top"><a href="#/projects">← 返回项目目录</a><span>'+H(p.collection)+'</span><a href="../portfolio.html">作品集 ↗</a></header><div class="experience-layout"><aside class="experience-side"><img src="../assets/project-animals/'+H(p.animal)+'.svg" alt="'+H(p.animalName)+'插画"><strong>'+H(p.title)+'</strong><span>'+H(p.category)+'</span><a href="#/projects">全部项目 ↗</a></aside><main class="experience-main"><div class="experience-title"><span>'+H(p.collection)+' / '+H(p.num)+'</span><h1>'+H(p.title)+'</h1><p>'+H(p.desc)+'</p></div><div class="experience-status"><span aria-hidden="true">●</span> '+status+'</div>'+content+'</main></div></div>';

}
window.renderProjectApp=p=>{const special=window.PROJECT_FEATURES?.[p.id]||window.PROJECT_FEATURES_MORE?.[p.id];if(special){const result=special.render(p);frame(p,result.html,result.theme||'sage');special.bind?.(p);return}throw new Error("项目界面未配置："+p.id)};
})();
