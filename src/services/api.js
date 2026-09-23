const base=(import.meta.env.VITE_API_BASE_URL||'').replace(/\/$/,'');
async function request(path,options={}){const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),60000);try{const response=await fetch(`${base}${path}`,{...options,signal:controller.signal});const data=await response.json();if(!response.ok)throw new Error(data.error||`Request failed (${response.status})`);return {data,status:response.status}}finally{clearTimeout(timeout)}}
export const getStatus=()=>request('/api/status');
export const sendInquiry=(body)=>request('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
