
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as Y}from"./index.vue_vue_type_script_setup_true_lang-BYBp4hie.js";import{_ as ee}from"./index.vue_vue_type_script_setup_true_lang-CLje3jPX.js";import{d as oe,u as te,a as le,b as ae,c as se,r as u,s as h,e as w,f as re,h as e,w as t,i as s,j as o,k as S,v as F,p as ne,l as ie,m as ue,o as de,t as L,n as pe,q as i,x as q,y as $,_ as ce,z as me}from"./index-DtuMVnuH.js";import ge from"./index-Dc6yBUn8.js";import"./HDropdownMenu.vue_vue_type_script_setup_true_lang-BEvF1ttS.js";const y=b=>(ne("data-v-e04534f1"),b=b(),ie(),b),fe=y(()=>s("div",{class:"bg-banner"},null,-1)),_e={id:"login-box"},we={class:"login-banner"},ve=["src"],he=["src"],ye={class:"title-container"},be={class:"title"},ke={class:"flex-bar"},xe={class:"sub-link"},Ve=y(()=>s("span",{class:"text"},"还没有帐号?",-1)),Ee={style:{"margin-top":"20px","margin-bottom":"-20px","text-align":"center"}},Re=y(()=>s("div",{class:"title-container"},[s("h3",{class:"title"}," 探索从这里开始! 🚀 ")],-1)),Ce={class:"sub-link"},Ue=y(()=>s("span",{class:"text"},"已经有帐号?",-1)),Se=y(()=>s("div",{class:"title-container"},[s("h3",{class:"title"}," 忘记密码了? 🔒 ")],-1)),Fe={class:"sub-link"},qe=oe({name:"Login",__name:"login",setup(b){var P;const{t:x}=ue(),z=new URL(""+new URL("logo-BGVN89r2.png",import.meta.url).href,import.meta.url).href,B=new URL(""+new URL("login-banner-ZfMZACb6.png",import.meta.url).href,import.meta.url).href,D="kpu-web",N=te(),M=le(),A=ae(),K=se(),m=u("login"),v=u(!1),T=u(((P=N.query.redirect)==null?void 0:P.toString())??K.settings.home.fullPath),V=u(),r=u({account:h.local.get("login_account")??"",password:"",remember:h.local.has("login_account")}),Z=u({account:[{required:!0,trigger:"blur",message:"请输入用户名"}],password:[{required:!0,trigger:"blur",message:"请输入密码"}]});function E(){V.value&&V.value.validate(f=>{if(f){v.value=!0;try{A.login({username:r.value.account,password:r.value.password}).then(()=>{v.value=!1,r.value.remember?h.local.set("login_account",r.value.account??""):h.local.remove("login_account"),M.push(T.value)}).catch(()=>{v.value=!1})}catch(l){console.error(l)}}})}const R=u(),d=u({account:"",captcha:"",password:"",checkPassword:""}),j=u({account:[{required:!0,trigger:"blur",message:"请输入用户名"}],captcha:[{required:!0,trigger:"blur",message:"请输入验证码"}],password:[{required:!0,trigger:"blur",message:"请输入密码"}],checkPassword:[{required:!0,trigger:"blur",message:"请再次输入密码"},{validator:(f,l,n)=>{l!==d.value.password?n(new Error("两次输入的密码不一致")):n()}}]});function G(){$({message:"注册模块仅提供界面演示，无实际功能，需开发者自行扩展",type:"warning"}),R.value&&R.value.validate(f=>{})}const C=u(),g=u({account:h.local.get("login_account")??"",captcha:"",newPassword:""}),H=u({account:[{required:!0,trigger:"blur",message:"请输入用户名"}],captcha:[{required:!0,trigger:"blur",message:"请输入验证码"}],newPassword:[{required:!0,trigger:"blur",message:"请输入新密码"}]});function J(){$({message:"重置密码模块仅提供界面演示，无实际功能，需开发者自行扩展",type:"warning"}),C.value&&C.value.validate(f=>{})}function I(f){r.value.account=f,r.value.password="kpu",E()}return(f,l)=>{const n=ce,O=ee,p=w("ElInput"),c=w("ElFormItem"),Q=w("ElCheckbox"),k=w("ElLink"),_=w("ElButton"),W=w("ElDivider"),U=w("ElForm"),X=Y;return de(),re("div",null,[fe,e(O,{class:"i18n-selector"},{default:t(()=>[e(n,{name:"i-ri:translate"})]),_:1}),s("div",_e,[s("div",we,[s("img",{src:o(z),class:"logo"},null,8,ve),s("img",{src:o(B),class:"banner"},null,8,he)]),S(e(U,{ref_key:"loginFormRef",ref:V,model:o(r),rules:o(Z),class:"login-form",autocapitalize:"on"},{default:t(()=>[s("div",ye,[s("h3",be," 欢迎来到 "+L(o(D))+" ! 👋🏻 ",1)]),s("div",null,[e(c,{prop:"account"},{default:t(()=>[e(p,{modelValue:o(r).account,"onUpdate:modelValue":l[0]||(l[0]=a=>o(r).account=a),placeholder:o(x)("app.account"),autocomplete:"on",tabindex:"1",text:""},{prefix:t(()=>[e(n,{name:"i-ri:user-3-fill"})]),_:1},8,["modelValue","placeholder"])]),_:1}),e(c,{prop:"password"},{default:t(()=>[e(p,{modelValue:o(r).password,"onUpdate:modelValue":l[1]||(l[1]=a=>o(r).password=a),type:"password",placeholder:o(x)("app.password"),tabindex:"2",autocomplete:"on","show-password":"",onKeyup:pe(E,["enter"])},{prefix:t(()=>[e(n,{name:"i-ri:lock-2-fill"})]),_:1},8,["modelValue","placeholder"])]),_:1})]),s("div",ke,[e(Q,{modelValue:o(r).remember,"onUpdate:modelValue":l[2]||(l[2]=a=>o(r).remember=a)},{default:t(()=>[i(" 记住我 ")]),_:1},8,["modelValue"]),e(k,{underline:!1,type:"primary",onClick:l[3]||(l[3]=a=>m.value="reset")},{default:t(()=>[i(" 忘记密码了? ")]),_:1})]),e(_,{loading:o(v),size:"large",style:{width:"100%"},type:"primary",onClick:q(E,["prevent"])},{default:t(()=>[i(L(o(x)("app.login")),1)]),_:1},8,["loading"]),s("div",xe,[Ve,e(k,{underline:!1,type:"primary",onClick:l[4]||(l[4]=a=>m.value="register")},{default:t(()=>[i(" 创建新帐号 ")]),_:1})]),s("div",Ee,[e(W,null,{default:t(()=>[i("演示账号一键登录")]),_:1}),e(_,{plain:"",size:"small",type:"primary",onClick:l[5]||(l[5]=a=>I("kpu"))},{default:t(()=>[i(" kpu ")]),_:1}),e(_,{plain:"",size:"small",onClick:l[6]||(l[6]=a=>I("test"))},{default:t(()=>[i(" test ")]),_:1})])]),_:1},8,["model","rules"]),[[F,o(m)==="login"]]),S(e(U,{ref_key:"registerFormRef",ref:R,model:o(d),rules:o(j),class:"login-form","auto-complete":"on"},{default:t(()=>[Re,s("div",null,[e(c,{prop:"account"},{default:t(()=>[e(p,{modelValue:o(d).account,"onUpdate:modelValue":l[7]||(l[7]=a=>o(d).account=a),autocomplete:"on",placeholder:"用户名",tabindex:"1"},{prefix:t(()=>[e(n,{name:"ep:user"})]),_:1},8,["modelValue"])]),_:1}),e(c,{prop:"captcha"},{default:t(()=>[e(p,{modelValue:o(d).captcha,"onUpdate:modelValue":l[8]||(l[8]=a=>o(d).captcha=a),autocomplete:"on",placeholder:"验证码",tabindex:"2"},{prefix:t(()=>[e(n,{name:"ep:key"})]),append:t(()=>[e(_,null,{default:t(()=>[i("发送验证码")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(c,{prop:"password"},{default:t(()=>[e(p,{modelValue:o(d).password,"onUpdate:modelValue":l[9]||(l[9]=a=>o(d).password=a),type:"password",placeholder:"密码",tabindex:"3",autocomplete:"on","show-password":""},{prefix:t(()=>[e(n,{name:"ep:lock"})]),_:1},8,["modelValue"])]),_:1}),e(c,{prop:"checkPassword"},{default:t(()=>[e(p,{modelValue:o(d).checkPassword,"onUpdate:modelValue":l[10]||(l[10]=a=>o(d).checkPassword=a),type:"password",placeholder:"确认密码",tabindex:"4",autocomplete:"on","show-password":""},{prefix:t(()=>[e(n,{name:"ep:lock"})]),_:1},8,["modelValue"])]),_:1})]),e(_,{loading:o(v),type:"primary",size:"large",style:{width:"100%","margin-top":"20px"},onClick:q(G,["prevent"])},{default:t(()=>[i(" 注册 ")]),_:1},8,["loading"]),s("div",Ce,[Ue,e(k,{underline:!1,type:"primary",onClick:l[11]||(l[11]=a=>m.value="login")},{default:t(()=>[i(" 去登录 ")]),_:1})])]),_:1},8,["model","rules"]),[[F,o(m)==="register"]]),S(e(U,{ref_key:"resetFormRef",ref:C,model:o(g),rules:o(H),class:"login-form","auto-complete":"on"},{default:t(()=>[Se,s("div",null,[e(c,{prop:"account"},{default:t(()=>[e(p,{modelValue:o(g).account,"onUpdate:modelValue":l[12]||(l[12]=a=>o(g).account=a),autocomplete:"on",placeholder:"用户名",tabindex:"1"},{prefix:t(()=>[e(n,{name:"ep:user"})]),_:1},8,["modelValue"])]),_:1}),e(c,{prop:"captcha"},{default:t(()=>[e(p,{modelValue:o(g).captcha,"onUpdate:modelValue":l[13]||(l[13]=a=>o(g).captcha=a),autocomplete:"on",placeholder:"验证码",tabindex:"2"},{prefix:t(()=>[e(n,{name:"ep:key"})]),append:t(()=>[e(_,null,{default:t(()=>[i("发送验证码")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(c,{prop:"newPassword"},{default:t(()=>[e(p,{modelValue:o(g).newPassword,"onUpdate:modelValue":l[14]||(l[14]=a=>o(g).newPassword=a),type:"password",placeholder:"新密码",tabindex:"3",autocomplete:"on","show-password":""},{prefix:t(()=>[e(n,{name:"ep:lock"})]),_:1},8,["modelValue"])]),_:1})]),e(_,{loading:o(v),type:"primary",size:"large",style:{width:"100%","margin-top":"20px"},onClick:q(J,["prevent"])},{default:t(()=>[i(" 确认 ")]),_:1},8,["loading"]),s("div",Fe,[e(k,{underline:!1,type:"primary",onClick:l[15]||(l[15]=a=>m.value="login")},{default:t(()=>[i(" 返回登录 ")]),_:1})])]),_:1},8,["model","rules"]),[[F,o(m)==="reset"]])]),e(ge),e(X,{class:"login-switcher"})])}}}),Be=me(qe,[["__scopeId","data-v-e04534f1"]]);export{Be as default};
