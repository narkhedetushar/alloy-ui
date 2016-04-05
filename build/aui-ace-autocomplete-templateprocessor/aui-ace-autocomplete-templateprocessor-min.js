YUI.add("aui-ace-autocomplete-templateprocessor",function(e,t){var n=e.Lang,r=e.Array,i=e.Object,s=e.AceEditor.AutoCompleteBase,o=0,u=1,a=1,f=-1,l=0,c=e.Base.create("aui-ace-autocomplete-templateprocessor",e.Base,[],{getResults:function(e,t,n){var r=this,i,s,a,f,l;l=e.type,l===o?(a=r.get("directives"),i=e.content.toLowerCase(),i.length&&(s=r.get("host"),a=s._filterResults(i,a)),t(a)):l===u?(f=r._getVariableMatches(e.content),t(f)):n()},getSuggestion:function(e,t){var n=this,r,i,a,f,l;return a=t||"",t&&(r=n.get("host").get("fillMode"),f=e.type,r===s.FILL_MODE_INSERT?f===o?e.content&&t.indexOf(e.content)===0&&(a=t.substring(e.content.length)):f===u&&(l=e.content.split("."),i=l[l.length-1],i&&t.indexOf(i)===0&&(a=t.substring(i.length))):f===u&&(l=e.content.split("."),l[l.length-1]=t,a=l.join("."))),a},_isLastToken:function(e,t){return e===t.length-1},_getTokenType:function(e){var t=f;return n.isString(e)&&(e.length?t=l:t=a),t},_getVariableMatches:function(e){var t=this,n,s,o,u,f,c,h,p,d,v,m,g,y,b,w;d=[],s=t.get("variables"),v={},n=s.variables;if(e){g=e.split("."),c=g[g.length-1];for(u=0;u<g.length;u++){m=g[u],y=t._getTokenType(m);if(y===a)u===0?n={}:v=n;else if(y===l){f=t._isLastToken(u,g);if(f){v=n;break}h=m.indexOf("("),h!==-1&&(m=m.substring(0,h)),b=n[m];if(!b){if(f){v=n;break}v={};break}u===0?w=b.type:w=b.returnType,n=s.types[w]||{}}}}else v=s.variables;return d=i.keys(v),p=d.sort(),c&&(o=t.get("host"),p=o._filterResults(c,p)),p.length&&(p=r.map(p,function(e){var t,n;return n=v[e],n.type==="Method"?(t=r.map(n.argumentTypes,function(e){var t=e.split(".");return t[t.length-1]}),e+"("+t.join(", ")+")"):e})),p},_setRegexValue:function(t){var r=e.AttributeCore.INVALID_VALUE;return n.isString(t)?r=new RegExp(t):t instanceof RegExp&&(r=t),r}},{NAME:"aui-ace-autocomplete-templateprocessor",NS:"aui-ace-autocomplete-templateprocessor",ATTRS:{directives:{validator:n.isArray},host:{validator:n.isObject},variables:{validator:n.isObject}}});e.AceEditor.TemplateProcessor=c},"3.0.3-deprecated.27",{requires:["aui-ace-autocomplete-base"]});
