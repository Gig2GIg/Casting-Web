(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{5326:function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("img",{staticClass:"max-w-xs",attrs:{src:"/images/logo.png",alt:"Logo"}}),t("form",{staticClass:"w-full max-w-xs mt-8",on:{submit:function(a){return a.preventDefault(),e.handleLogin(a)}}},[t("base-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{name:"user",placeholder:"User",message:e.errors.first("user")},model:{value:e.email,callback:function(a){e.email=a},expression:"email"}}),t("base-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"password",type:"password",placeholder:"Password",message:e.errors.first("password")},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}}),t("base-button",{attrs:{type:"submit",expanded:""}},[e._v("\n      Log In\n    ")])],1),t("router-link",{staticClass:"mt-2 text-sm",attrs:{to:{name:"password.email"}}},[e._v("\n    Forgot Password?\n  ")]),t("router-link",{staticClass:"mt-16",attrs:{to:{name:"register"}}},[e._v("\n    Create Account\n  ")])],1)},s=[],n=(t("a481"),t("96cf"),t("3b8d")),i=t("cebc"),o=t("2f62"),l={data:function data(){return{email:"",password:"",isLoading:!1}},methods:Object(i["a"])({},Object(o["b"])("auth",["login"]),{handleLogin:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function _callee(){return regeneratorRuntime.wrap(function _callee$(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,!this.isLoading){e.next=3;break}return e.abrupt("return");case 3:return this.isLoading=!0,e.next=6,this.login({email:this.email,password:this.password});case 6:this.$router.replace(this.$route.query.redirect||{name:"auditions"}),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),401===e.t0.response.status&&this.$toasted.error("These credentials do not match our records.");case 12:return e.prev=12,this.isLoading=!1,e.finish(12);case 15:case"end":return e.stop()}},_callee,this,[[0,9,12,15]])}));function handleLogin(){return e.apply(this,arguments)}return handleLogin}()})},u=l,c=t("2877"),d=Object(c["a"])(u,r,s,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=login.31296dbf.js.map