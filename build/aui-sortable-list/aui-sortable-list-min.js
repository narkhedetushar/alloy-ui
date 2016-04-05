YUI.add("aui-sortable-list",function(e,t){var n=e.Lang,r=n.isString,i=n.isFunction,s=e.DD.DDM,o=e.Component.create({NAME:"sortable-list",ATTRS:{dd:{value:null},dropCondition:{value:function(){return!0},setter:function(t){return e.bind(t,this)},validator:i},dropContainer:{value:function(e){var t=this,n=e.drop,r=n.get("node"),i=t.get("dropOn");return r.one(i)},validator:i},dropOn:{validator:r},helper:{value:null},nodes:{setter:function(e){return this._setNodes(e)}},placeholder:{value:null},proxy:{value:null,setter:function(t){return e.merge({moveOnEnd:!1,positionProxy:!1},t||{})}},sortCondition:{value:function(){return!0},setter:function(t){return e.bind(t,this)},validator:i}},EXTENDS:e.Base,prototype:{initializer:function(){var e=this,t=e.get("nodes");e.on("drag:align",e._onDragAlign),e.on("drag:end",e._onDragEnd),e.on("drag:exit",e._onDragExit),e.on("drag:mouseDown",e._onDragMouseDown),e.on("drag:over",e._onDragOver),e.on("drag:start",e._onDragStart),e._createHelper(),t&&e.addAll(t)},add:function(e){var t=this;t._createDrag(e)},addAll:function(e){var t=this;e.each(function(e){t.add(e)})},_createDrag:function(t){var n=this,r=n.get("helper");if(!s.getDrag(t)){var i={bubbleTargets:n,node:t,target:!0},o=n.get("proxy");r&&(o.borderStyle=null),(new e.DD.Drag(e.mix(i,n.get("dd")))).plug(e.Plugin.DDProxy,o).plug(e.Plugin.DDWinScroll)}},_createHelper:function(){var t=this,n=t.get("helper");n&&(e.one("body").append(n.hide()),t.set("helper",n))},_updatePlaceholder:function(e,t){var n=this,r=e.target,i=e.drop,s=r.get("node"),o=i.get("node"),u=n.get("dropContainer"),a;u&&(a=u.apply(n,arguments));var f=!1,l=n.XDirection,c=n.YDirection;o.getStyle("float")!=="none"&&(f=!0);var h=n.get("placeholder");h||(h=s);if(!h.contains(o)){var p=n.get("dropCondition");a&&!t&&p(e)?!a.contains(h)&&!h.contains(a)&&a.append(h):f&&l==="left"||!f&&c==="up"?o.placeBefore(h):o.placeAfter(h)}},_onDragAlign:function(e){var t=this,n=t.lastX,r=t.lastY,i=e.target.lastXY,s=i[0],o=i[1];o!==r&&(t.YDirection=o<r?"up":"down"),s!==n&&(t.XDirection=s<n?"left":"right"),t.lastX=s,t.lastY=o},_onDragEnd:function(e){var t=this,n=e.target,r=n.get("node"),i=t.get("placeholder");i&&(r.show(),i.hide(),r.contains(i)||i.placeAfter(r))},_onDragExit:function(e){var t=this,n=t.get("sortCondition");n(e)&&t._updatePlaceholder(e,!0)},_onDragMouseDown:function(e){var t=this,n=e.target,r=t.get("helper");r&&n.set("dragNode",r)},_onDragStart:function(e){var t=this,n=e.target,r=n.get("node"),i=t.get("helper"),s=t.get("placeholder");s&&(s.setStyle("height",r.get("offsetHeight")+"px"),r.hide(),s.show(),r.placeAfter(s),i&&i.setStyles({display:"block",visibility:"visible"}).show())},_onDragOver:function(e){var t=this,n=t.get("sortCondition");n(e)&&t._updatePlaceholder(e)},_setNodes:function(t){return e.Lang.isNodeList(t)?t:r(t)?e.all(t):new e.NodeList([t])}}});e.SortableList=o},"3.0.3-deprecated.27",{requires:["dd-drag","dd-drop","dd-proxy","dd-scroll","aui-node","aui-component"]});
