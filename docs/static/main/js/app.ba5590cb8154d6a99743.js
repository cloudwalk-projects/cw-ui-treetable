webpackJsonp([1],{147:function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t(397),l=t(152),r=t.n(l),a=t(392),o=t.n(a),d=t(386);t.n(d);n.a.use(r.a);new n.a({el:"#app",template:"<App/>",components:{App:o.a}})},149:function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t(393),l=function(A){return A&&A.__esModule?A:{default:A}}(n);e.default=l.default},150:function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"TreeTableColumn",functional:!0,props:{row:Object,render:Function,index:Number,column:{type:Object,default:null}},render:function(A,e){var t={row:e.props.row,index:e.props.index};return e.props.column&&(t.column=e.props.column),e.props.render(A,t)}}},151:function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={indent:function(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=document.createElement("span");return e.style.paddingRight=5*A+"px",e},create:function(A){var e=[],t=document.createElement("div");t.innerHTML=A;for(var n=0;n<t.childNodes.length;n++)e[e.length]=t.childNodes[n].cloneNode(!0);return e},prepend:function(A,e){for(var t=n.nodes(e),l=0;l<t.length;l++)A.appendChild(t[l]);return A}};e.default=n},152:function(A,e,t){"use strict";function n(A){return A&&A.__esModule?A:{default:A}}Object.defineProperty(e,"__esModule",{value:!0});var l=t(158),r=n(l),a=t(157),o=n(a),d=t(149),u=n(d),i={Treetable:u.default},c=function(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.componentPrefix||"Cw";(0,o.default)(i).forEach(function(e){A.component(t+e,i[e])})},s={};(0,o.default)(i).forEach(function(A){s["Cw"+A]=i[A]}),e.default=(0,r.default)({install:c},s)},153:function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t(99),l=function(A){return A&&A.__esModule?A:{default:A}}(n);e.default={data:function(){return{tableColumns:[{key:"id",label:"区域编号"},{key:"parentId",label:"上级区域"},{key:"name",label:"区域名称"},{key:"level",label:"区域级别",width:"100px"},{key:"status",label:"是否启用",width:"100px"},{key:"remark",label:"备注",width:"100px"},{key:"action",label:"操作",width:"100px",renderType:"render",render:function(A,e){return A("div",[A("button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){console.log("view"),console.log(e)}}},"查看"),A("button",{props:{type:"error",size:"small"},on:{click:function(){console.log("delete"),console.log(e)}}},"删除")])}}],tableColumns2:[{key:"id",label:"区域编号"},{key:"parentId",label:"上级区域"},{key:"name",label:"区域名称"},{key:"level",label:"区域级别",width:"100px"},{key:"status",label:"是否启用",width:"100px"},{key:"remark",label:"备注",width:"100px"},{key:"action",label:"操作",width:"100px",renderType:"render",render:function(A,e){return A("div",[A("button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){console.log("view"),console.log(e)}}},"查看"),A("button",{props:{type:"error",size:"small"},on:{click:function(){console.log("delete"),console.log(e)}}},"删除")])}}],tableRows:[{id:"100",parentId:"",name:"行 100",status:1,remark:"行 100"},{id:"101",parentId:"100",name:"行 101",status:0,remark:"行 101"},{id:"102",parentId:"100",name:"行 102",status:1,remark:"行 102"},{id:"103",parentId:"100",name:"行 103",status:1,remark:"行 103"},{id:"104",parentId:"101",name:"行 104",status:1,remark:"行 104"},{id:"1",parentId:"",name:"行 1",status:1,remark:"行 1"},{id:"1-1",parentId:"1",name:"行 1-1",status:1,remark:"行 1-1"},{id:"2",parentId:"",name:"行 2",status:1,remark:"行 2"},{id:"2-1",parentId:"2",name:"行 2-1",status:1,remark:"行 2-1"}]}},mounted:function(){l.default.translate({target:this.$refs.treetable,display:"collapsed"})},methods:{}}},154:function(A,e,t){"use strict";function n(A){return A&&A.__esModule?A:{default:A}}Object.defineProperty(e,"__esModule",{value:!0});var l=t(142),r=(n(l),t(99)),a=n(r),o=t(150),d=n(o),u={columns:{type:Array,default:[]},rows:{type:Array,default:void 0},display:{type:String,default:"expand"},caption:{type:String,default:void 0},selection:{type:Boolean,default:!1},columnId:{type:Number,default:0},columnParentId:{type:Number,default:1},columnHandle:{type:Number,default:2}};e.default={name:"Treetable",components:{TreetableColumn:d.default},props:u,data:function(){return{}},mounted:function(){a.default.translate({target:this.$refs.treetable,display:this.display,columnId:this.selection?this.columnId+1:this.columnId,columnParentId:this.selection?this.columnParentId+1:this.columnParentId,columnHandle:this.selection?this.columnHandle+1:this.columnHandle})},methods:{handleSelect:function(A,e){for(var t=this.$el.querySelectorAll(".selection"),n=null,l=0;l<t.length;l++)t[l].dataset.id=t[l].value,t[l].dataset.parentId=""==t[l].value?"":t[l].parentNode.parentNode.querySelectorAll("td")[2].innerHTML,t[l].value.length>0&&console.log(t[l].parentNode.parentNode.querySelectorAll("td")[2].innerHTML),t[l].value==e&&(n=t[l]);this.setChildNodes(t,n,A.target.checked)},setChildNodes:function(A,e,t){for(var n=0;n<A.length;n++)A[n].dataset.parentId==e.dataset.id&&A[n].dataset.id!=e.dataset.id&&(A[n].checked=t,this.setChildNodes(A,A[n],t))}}}},386:function(A,e){},387:function(A,e){},390:function(A,e){A.exports="data:image/gif;base64,R0lGODlhCQAJAPcAAICAgP///wAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACQAJAAAIIgABCBxIMIDBgwEEIjyocGFCAAEESJT40GFFhw0XEtwIICAAOw=="},391:function(A,e){A.exports="data:image/gif;base64,R0lGODlhCQAJAPcAAICAgP///wAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACQAJAAAIJgABCBxIMIDBgwEEHhRwUKFBhgYVCpg4MSGAhQ0vPsyIMCNBggEBADs="},392:function(A,e,t){var n=t(141)(t(153),t(394),null,null);A.exports=n.exports},393:function(A,e,t){t(387);var n=t(141)(t(154),t(395),null,null);A.exports=n.exports},394:function(A,e){A.exports={render:function(){var A=this,e=A.$createElement,t=A._self._c||e;return t("div",{staticClass:"example-page"},[t("div",{staticStyle:{padding:"10px"}},[t("cw-treetable",{attrs:{columns:A.tableColumns,rows:A.tableRows,selection:""}})],1)])},staticRenderFns:[]}},395:function(A,e){A.exports={render:function(){var A=this,e=A.$createElement,t=A._self._c||e;return t("table",{ref:"treetable",staticClass:"table cw-treetable"},[A.caption?t("caption",[A._v(A._s(A.caption))]):A._e(),A._v(" "),t("thead",[t("tr",[A.selection?t("th",[t("input",{staticClass:"selection",attrs:{type:"checkbox",value:""},on:{change:function(e){A.handleSelect(e,"")}}})]):A._e(),A._v(" "),A._l(A.columns,function(e){return["selection"==e.renderType?t("th",{key:e.key},[t("input",{staticClass:"selection",attrs:{type:"checkbox",value:""},on:{change:function(e){A.handleSelect(e,"")}}})]):e.width?t("th",{key:e.key,style:{width:e.width}},[A._v(A._s(e.label))]):t("th",{key:e.key},[A._v(A._s(e.label))])]})],2)]),A._v(" "),t("tbody",[void 0,A._v(" "),A._l(A.rows,function(e,n){return[t("tr",{key:e.id},[A.selection?t("td",{key:e.id+"-selection"},[t("input",{staticClass:"selection",attrs:{type:"checkbox"},domProps:{value:e.id},on:{change:function(t){A.handleSelect(t,e.id)}}})]):A._e(),A._v(" "),A._l(A.columns,function(l){return["selection"==l.renderType?t("td",{key:e.id+l.key},[t("input",{staticClass:"selection",attrs:{type:"checkbox"},domProps:{value:e.id},on:{change:function(t){A.handleSelect(t,e.id)}}})]):"render"==l.renderType?t("td",{key:e.id+l.key},[t("treetable-column",{attrs:{index:n,row:e,render:l.render}})],1):t("td",{key:e.id+l.key},[A._v(A._s(e[l.key]))])]})],2)]})],2)])},staticRenderFns:[]}},407:function(A,e,t){t(148),A.exports=t(147)},99:function(A,e,t){"use strict";function n(A){return A&&A.__esModule?A:{default:A}}Object.defineProperty(e,"__esModule",{value:!0});var l=t(142),r=n(l),a=t(151),o=n(a),d={columnId:0,columnParentId:1,columnHandle:2,columnOrderId:-1,iconOpen:t(390),iconClose:t(391),display:"expand"},u={trim:function(A){return A.replace(/(^[\s\xA0]*)|([\s\xA0]*jQuery)/g,"")},translate:function(A){A=r.default.extend({},d,A||{});var e=A.target.querySelector("thead"),t=A.target.querySelector("tbody");if(t&&"TBODY"==t.tagName.toUpperCase()&&null!=A.columnId&&null!=A.columnParentId&&null!=A.columnHandle){var n=[],l=[],a=t.querySelectorAll("tr");r.default.each(a,function(e,t){var l=r.default.string.trim(t.querySelectorAll("td")[A.columnId].innerHTML),a=r.default.string.trim(t.querySelectorAll("td")[A.columnParentId].innerHTML);n.push({id:l,parent:a,level:0,node:"leaf",expanded:!0,obj:t})});for(var u=n.length,i=0;u>0&&i<100;){for(var c=0;c<n.length;c++){var s=n[c];if(null!=s)if(""==s.parent)l.push(s),n[c]=null,u--;else for(var p=0;p<l.length;p++)if(l[p].id==s.parent){s.level=l[p].level+1,l[p].node="node",l.splice(p+1,0,s),n[c]=null,u--;break}}i++}for(var f=function(){for(var e=r.default.string.trim(this.parentNode.parentNode.querySelectorAll("td")[A.columnId].innerHTML),t=-1,n=0;n<l.length;n++){var a=l[n];if(a.id==e){if("leaf"==a.node)return;t=a.level;var o=a.obj.querySelectorAll("td")[A.columnHandle].querySelector("img");a.expanded?(o.src=A.iconClose,a.expanded=!1):(o.src=A.iconOpen,a.expanded=!0);for(var d=a.expanded,u=!1,i=0,c=n+1;c<l.length;c++){a=l[c];var s=(a.obj.querySelectorAll("td")[A.columnHandle].querySelector("img"),!a.expanded);if(a.level>t&&d)u||s?!u&&s?(i=a.level,u=!0,a.obj.style.display=""):u&&a.level<=i&&(s?i=a.level:u=!1,a.obj.style.display=""):a.obj.style.display="";else if(a.level>t&&!d)a.obj.style.display="none";else if(a.level<=t)break}break}}},y=l.length-1;y>-1;y--){var m=l[y],h=new Image;h.src=A.iconOpen,r.default.on(h,"click",f);var v=m.obj.querySelectorAll("td")[A.columnHandle];v.prepend(o.default.indent()),v.prepend(h),v.prepend(o.default.indent(4*m.level)),t.prepend(m.obj)}"collapsed"==A.display&&r.default.each(t.querySelectorAll("tr"),function(e,t){t.querySelectorAll("td")[A.columnHandle].querySelector("img").click()}),a=e.querySelectorAll("tr"),r.default.each(a,function(e,t){var n=t.querySelectorAll("th")[A.columnId];n&&(n.style.display="none"),(n=t.querySelectorAll("th")[A.columnParentId])&&(n.style.display="none")}),a=t.querySelectorAll("tr"),r.default.each(a,function(e,t){var n=t.querySelectorAll("td")[A.columnId];n.style.display="none",n=t.querySelectorAll("td")[A.columnParentId],n.style.display="none",n=t.querySelectorAll("td")[A.columnHandle].querySelector("img"),n.style.cursor="pointer"})}}};e.default=u}},[407]);
//# sourceMappingURL=app.ba5590cb8154d6a99743.js.map