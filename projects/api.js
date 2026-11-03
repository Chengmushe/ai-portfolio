/* 真实服务只通过受控后端网关接入；前端不持有密钥或直接连接数据库。 */
window.ULIKE_API = {
  contracts: {
    platform:{health:'/api/status',list:'/api/models',write:'/api/channel'},
    ask:{health:'/api/auth/me',list:'/api/v2/conversations',write:'/api/v2/conversations'},
    'voc-service':{health:'/api/auth/me',list:'/api/v2/conversations',write:'/api/v2/conversations'},
    aigc:{health:'/api/health',list:'/api/jobs',write:'/api/generate/image'},
    'voc-tagger':{health:'/health',list:'/api/v1/results',write:'/api/v1/label'},
    qms:{health:'/api/health',list:'/api/tasks',write:'/api/tasks'},
    nas:{health:'/health',list:'/api/storage-sync/jobs',write:'/api/storage-sync/claim'},
    dmr:{health:'/api/health',list:'/api/records',write:'/api/batches'},
    legal:{health:'/health',list:'/api/tasks',write:'/api/tasks'},
    ocr:{health:'/health',list:'/mcp',write:'/mcp'},
    translation:{health:'/api/v1/health/live',list:'/api/v1/jobs',write:'/api/v1/jobs'},
    reception:{health:'/health',list:'/api/training/sessions',write:'/api/training/sessions'},
    'overseas-qa':{health:'/health',list:'/qa/workbench',write:'/qa/reprocess-jobs'},
    autorecruit:{health:'/health',list:'/api/tasks',write:'/api/tasks'},
    meeting:{health:'/health',list:'/api/rooms',write:'/api/bookings'},
    amazon:{health:'/health',list:'/api/checks',write:'/api/runs'},
    kol:{health:'/health',list:'/api/authorizations',write:'/api/reminders'},
    bridge:{health:'/health',list:'/api/chunks',write:'/api/sync'},
    ipl:{health:'/health',list:'/api/v1/ipl/predict',write:'/api/v1/ipl/predict'},
    caddy:{health:'/health',list:'/routes',write:'/routes'},
    deploy:{health:'/health',list:'/status',write:'/deploy'},
    ops:{health:'/readyz',list:'/events',write:'/recoveries'}
  },
  available(id){return Boolean((window.ULIKE_CONNECTIONS||{})[id]);},
  async request(id,kind,{method='GET',body,signal}={}){
    const base=(window.ULIKE_CONNECTIONS||{})[id];
    if(!base)throw new Error('未接入数据库和 API：当前页面无法执行真实业务操作。');
    const parsed=new URL(base);
    if(parsed.protocol!=='https:'&&!(parsed.protocol==='http:'&&parsed.hostname==='localhost'))throw new Error('接入地址需为 HTTPS 后端网关；仅本机开发允许 localhost。');
    const path=kind.startsWith("/")?kind:this.contracts[id]?.[kind];
    if(!path||path.includes("{"))throw new Error('该项目尚未配置 '+kind+' 接口。');
    const res=await fetch(base.endsWith('/')?base.slice(0,-1)+path:base+path,{method,credentials:'include',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined,signal});
    if(!res.ok)throw new Error('接口返回 HTTP '+res.status+'，请检查身份、权限和服务状态。');
    const type=res.headers.get('content-type')||'';
    return type.includes('json')?res.json():res.text();
  }
};
