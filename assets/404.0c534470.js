import{ay as g,az as w,aA as h,aB as C,b as $,u as N,_ as B,w as S,p as E}from"./el-button.8cd9cb62.js";import{d as m,c as R,o as n,j as c,e as d,k as i,n as o,f as s,i as u,a as b,h as D,t as v,w as y,m as I,l as T,K as V}from"./index.b487b962.js";const l={success:"icon-success",warning:"icon-warning",error:"icon-error",info:"icon-info"},k={[l.success]:g,[l.warning]:w,[l.error]:h,[l.info]:C},F=$({title:{type:String,default:""},subTitle:{type:String,default:""},icon:{type:String,values:["success","warning","info","error"],default:"info"}}),z=m({name:"ElResult"}),M=m({...z,props:F,setup(_){const p=_,t=N("result"),r=R(()=>{const e=p.icon,a=e&&l[e]?l[e]:"icon-info",f=k[a]||k["icon-info"];return{class:a,component:f}});return(e,a)=>(n(),c("div",{class:o(s(t).b())},[d("div",{class:o(s(t).e("icon"))},[i(e.$slots,"icon",{},()=>[s(r).component?(n(),b(D(s(r).component),{key:0,class:o(s(r).class)},null,8,["class"])):u("v-if",!0)])],2),e.title||e.$slots.title?(n(),c("div",{key:0,class:o(s(t).e("title"))},[i(e.$slots,"title",{},()=>[d("p",null,v(e.title),1)])],2)):u("v-if",!0),e.subTitle||e.$slots["sub-title"]?(n(),c("div",{key:1,class:o(s(t).e("subtitle"))},[i(e.$slots,"sub-title",{},()=>[d("p",null,v(e.subTitle),1)])],2)):u("v-if",!0),e.$slots.extra?(n(),c("div",{key:2,class:o(s(t).e("extra"))},[i(e.$slots,"extra")],2)):u("v-if",!0)],2))}});var P=B(M,[["__file","/home/runner/work/element-plus/element-plus/packages/components/result/src/result.vue"]]);const j=S(P);const A={name:"NotFound"},q=m({...A,setup(_){const p=V(),t=()=>p.push("/");return(r,e)=>{const a=E,f=j;return n(),b(f,{icon:"error",title:"404 NotFound","sub-title":"Sorry, the page you visited does not exist."},{extra:y(()=>[I(a,{type:"primary",onClick:t},{default:y(()=>[T(" \u8FD4\u56DE\u9996\u9875 ")]),_:1})]),_:1})}}});export{q as default};