
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as H,u as B,c as O,D as R,r as d,G as k,H as y,a3 as T,B as $,a4 as z,j as e,o as c,f as m,h as u,K as l,i as p,w as A,O as N,X as j,k as h,v,a5 as V,N as x,_ as D,z as E}from"./index-B3Xk5Nw4.js";import{_ as G}from"./index.vue_vue_type_script_setup_true_lang-DUgaM8t7.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-5TOFIBSU.js";import"./logo-D-CqFC5K.js";import"./sub.vue_vue_type_script_setup_true_lang-C_ai_Azy.js";import"./item-50LpLhg1.js";import"./HTooltip.vue_vue_type_script_setup_true_lang-DWImfDel.js";import"./HBadge.vue_vue_type_script_setup_true_lang-CDeogF71.js";const q=H({name:"SubSidebar",__name:"index",setup(F){const S=B(),s=O(),t=R(),r=d(),_=d(!1),M=d(!1);function b(){const n=r.value.scrollTop;_.value=n>0;const o=r.value.clientHeight,i=r.value.scrollHeight;M.value=Math.ceil(n+o)<i}const g=k(()=>{var n;return s.mode==="mobile"||["side","head","single"].includes(s.settings.menu.mode)&&t.sidebarMenus.length!==0&&!(s.settings.menu.subMenuOnlyOneHide&&t.sidebarMenus.length===1&&(!t.sidebarMenus[0].children||(n=t.sidebarMenus[0])!=null&&n.children.every(o=>{var i;return((i=o.meta)==null?void 0:i.menu)===!1})))});y(g,n=>{n&&T(()=>{b()})},{immediate:!0});const w=d();$(()=>{if(g.value){const{height:n}=z(w);y(()=>n.value,()=>{n.value>0&&b()},{immediate:!0})}});const a=k(()=>s.mode==="pc"?!!(s.settings.menu.subMenuCollapse&&(!s.isHoverSidebar||s.isHoverSidebar&&!s.settings.menu.subMenuAutoCollapse)):s.settings.menu.subMenuCollapse);return(n,o)=>{const i=D;return e(g)?(c(),m("div",{key:0,class:l(["sub-sidebar-container",{"is-collapse":e(a),"shadow-side":e(s).isHoverSidebar&&e(s).settings.menu.subMenuAutoCollapse&&e(s).settings.menu.subMenuCollapse}])},[u(G,{"show-logo":e(s).settings.menu.mode==="single",class:l(["sidebar-logo",{"sidebar-logo-bg":e(s).settings.menu.mode==="single"}])},null,8,["show-logo","class"]),p("div",{ref_key:"subSidebarRef",ref:r,class:l(["sub-sidebar flex-1 transition-shadow-300",{"shadow-top":e(_),"shadow-bottom":e(M)}]),onScroll:b},[p("div",{ref_key:"menuRef",ref:w},[u(V,{name:"sub-sidebar"},{default:A(()=>[(c(!0),m(N,null,j(e(t).allMenus,(f,C)=>h((c(),m("div",{key:C},[u(P,{menu:f.children,value:e(S).meta.activeMenu||e(S).path,"default-openeds":e(t).defaultOpenedPaths,"always-openeds":e(t).alwaysOpenedPaths,accordion:e(s).settings.menu.subMenuUniqueOpened,collapse:e(a),rounded:e(s).settings.menu.isRounded,direction:e(s).settings.app.direction,class:l(["menu",{"-mt-2":!(e(a)||["head","single"].includes(e(s).settings.menu.mode))}])},null,8,["menu","value","default-openeds","always-openeds","accordion","collapse","rounded","direction","class"])],512)),[[v,C===e(t).actived]])),128))]),_:1})],512)],34),e(s).mode==="pc"?(c(),m("div",{key:0,class:l(["relative flex items-center px-4 py-3",{"justify-center":e(a),"justify-between":!e(a)&&e(s).settings.menu.enableSubMenuCollapseButton}])},[h(p("span",{class:"flex-center cursor-pointer rounded bg-stone-1 p-2 transition dark-bg-stone-9 hover-bg-stone-2 dark-hover-bg-stone-8",onClick:o[0]||(o[0]=f=>e(s).toggleSidebarAutoCollapse())},[u(i,{name:e(s).settings.menu.subMenuAutoCollapse?"i-lucide:pin-off":"i-lucide:pin"},null,8,["name"])],512),[[v,!e(a)||e(a)&&!e(s).settings.menu.enableSubMenuCollapseButton]]),h(p("span",{class:l(["flex-center cursor-pointer rounded bg-stone-1 p-2 transition dark-bg-stone-9 hover-bg-stone-2 dark-hover-bg-stone-8",{"-rotate-z-180":e(s).settings.menu.subMenuCollapse}]),onClick:o[1]||(o[1]=f=>e(s).toggleSidebarCollapse())},[u(i,{name:"toolbar-collapse"})],2),[[v,e(s).settings.menu.enableSubMenuCollapseButton]])],2)):x("",!0)],2)):x("",!0)}}}),Y=E(q,[["__scopeId","data-v-b2ef33b4"]]);export{Y as default};
