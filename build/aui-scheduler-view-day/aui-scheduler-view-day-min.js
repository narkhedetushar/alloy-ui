YUI.add("aui-scheduler-view-day",function(e,t){var n=e.Lang,r=n.isBoolean,i=n.isFunction,s=n.isNumber,o=n.isObject,u=e.DataType.DateMath,a=e.WidgetStdMod,f=e.cached(function(){var t=e.config.doc,n=t.createElement("div"),r=t.getElementsByTagName("body")[0],i=.1;return r&&(n.style.cssText="position:absolute;visibility:hidden;overflow:scroll;width:20px;",n.appendChild(t.createElement("p")).style.height="1px",r.insertBefore(n,r.firstChild),i=n.offsetWidth-n.clientWidth,r.removeChild(n)),i},null,.1),l=function(e,t){return function(n){var r=n.all(e);return r.size()>=t?r:null}},c=function(e,t){return Math.round(e/t)*t},h=function(e){return parseFloat(e)||0},p=e.getClassName,d=p("scheduler-view","table","data"),v=p("scheduler-event"),m=p("scheduler-event","disabled"),g=p("scheduler-event","intersecting"),y=p("scheduler-event","proxy"),b=p("scheduler","today"),w=p("scheduler","today","hd"),E=p("scheduler-view","scrollable"),S=p("scheduler-view","coldata"),x=p("scheduler-view","colgrid"),T=p("scheduler-view","day","current","time"),N=p("scheduler-view","grid"),C=p("scheduler-view","grid","container"),k=p("scheduler-view","day","header","col"),L=p("scheduler-view","day","header","day"),A=p("scheduler-view","day","header","day","first"),O=p("scheduler-view","day","header","day","number"),M=p("scheduler-view","day","header","day","weekday"),_=p("scheduler-view","day","header","table"),D=p("scheduler-view","day","header","view","label"),P=p("scheduler-view","icon","grip","horizontal"),H=p("scheduler-view","marker","division"),B=p("scheduler-view","markercell"),j=p("scheduler-view","markers"),F=p("scheduler-view","day","resizer"),I=p("scheduler-view","day","resizer","icon"),q=p("scheduler-view","day","table"),R=p("scheduler-view","day","table","col"),U=p("scheduler-view","day","table","col","shim"),z=p("scheduler-view","day","table","colblank"),W=p("scheduler-view","day","table","colday"),X=p("scheduler-view","day","table","coltime"),V=p("scheduler-view","day","table","time"),$='<div class="'+T+'"></div>',J='<div class="'+F+'">'+'<div class="'+[P,I].join(" ")+'"></div>'+"</div>",K='<div class="'+B+'">'+'<div class="'+H+'"></div>'+"</div>",Q='<span class="'+D+'">{label}</span>',G='<table cellspacing="0" cellpadding="0" class="'+q+'">'+"<tbody>"+'<tr class="'+x+'" height="1">'+'<td height="0" class="'+[R,z].join(" ")+'"></td>'+'<td class="'+C+'" colspan="1">'+'<div class="'+N+'">'+'<div class="'+j+'"></div>'+"</div>"+"</td>"+"</tr>"+'<tr class="'+S+'">'+'<td class="'+[R,X].join(" ")+'"></td>'+"</tr>"+"</tbody>"+"</table>",Y='<td class="'+[R,W].join(" ")+'" data-colnumber="{colNumber}">'+'<div class="'+U+'">&nbsp;</div>'+"</td>",Z='<div class="'+V+'">{hour}</div>',et='<table cellspacing="0" cellpadding="0" class="'+_+'">'+"<tbody>"+'<tr class="'+k+'"></tr>'+"</tbody>"+"</table>",tt='<th class="'+L+'" data-colnumber="{colNumber}"><a href="#">&nbsp;</a></th>',nt='<span class="'+M+'">%a</span> <span class="'+O+'">%d</span>',rt='<td class="'+[L,A].join(" ")+'"></td>',it=e.Component.create({NAME:"scheduler-view-day",ATTRS:{bodyContent:{value:""},currentTimeNode:{valueFn:function(){return e.Node.create($)}},days:{value:1,validator:s},delegateConfig:{value:{},setter:function(t){var n=this;return e.merge({dragConfig:{useShim:!1},bubbleTargets:n,container:n.get("boundingBox"),nodes:"."+v,invalid:"input, select, button, a, textarea, ."+m},t||{})},validator:o},eventWidth:{value:95,validator:s},filterFn:{value:function(e){return e.get("visible")&&e.getHoursDuration()<=24&&!e.get("allDay")}},headerDateFormatter:{value:function(t){var n=this,r=n.get("scheduler");return e.DataType.Date.format(t,{format:nt,locale:r.get("locale")})},validator:i},headerView:{value:!0,validator:r},headerViewConfig:{setter:function(t){return e.merge({displayDaysInterval:1,displayRows:6,filterFn:function(e){return e.getHoursDuration()>24||e.get("allDay")},height:"auto",visible:!0},t||{})},value:{}},hourHeight:{value:52,validator:s},name:{value:"day"},navigationDateFormatter:{value:function(t){var n=this,r=n.get("scheduler");return e.DataType.Date.format(t,{format:"%A, %B %d, %Y",locale:r.get("locale")})},validator:i},strings:{value:{allDay:"All day"}},headerTableNode:{valueFn:function(){return e.Node.create(et)}},headerViewLabelNode:{valueFn:function(){var t=this,r=t.get("strings");return e.Node.create(n.sub(Q,{label:r.allDay}))}},resizerNode:{valueFn:function(){return e.Node.create(J)}},tableNode:{valueFn:function(){return e.Node.create(G)}},colDaysNode:{valueFn:"_valueColDaysNode"},colHeaderDaysNode:{valueFn:"_valueColHeaderDaysNode"},markercellsNode:{valueFn:"_valueMarkercellsNode"},timesNode:{valueFn:"_valueTimesNode"}},HTML_PARSER:{colDaysNode:l("."+W,1),colHeaderDaysNode:l("."+L,2),currentTimeNode:"."+T,headerTableNode:"."+_,headerViewLabelNode:"."+D,markercellsNode:l("."+B,24),resizerNode:"."+F,tableNode:"."+q,timesNode:l("."+V,24)},EXTENDS:e.SchedulerView,prototype:{initializer:function(){var t=this;t.colDaysNode=t.get("colDaysNode"),t.colHeaderDaysNode=t.get("colHeaderDaysNode"),t.currentTimeNode=t.get("currentTimeNode"),t.headerTableNode=t.get("headerTableNode"),t.markercellsNode=t.get("markercellsNode"),t.resizerNode=t.get("resizerNode"),t.tableNode=t.get("tableNode"),t.timesNode=t.get("timesNode"),t.activeColumn=null,t.columnData=t.tableNode.one("."+S),t.columnDayHeader=t.headerTableNode.one("."+k),t.columnShims=t.colDaysNode.all("."+U),t.columnTime=t.tableNode.one("."+X),t.gridContainer=t.tableNode.one("."+C),t.markersNode=t.tableNode.one("."+j),t.get("headerView")&&(t.headerView=new e.SchedulerTableView(t.get("headerViewConfig")))},destructor:function(){this._eventHandles&&(new e.EventHandle(this._eventHandles)).detach(),clearInterval(this._currentTimeInterval)},renderUI:function(){var e=this;e.columnTime.setContent(e.timesNode),e.markersNode.setContent(e.markercellsNode),e.colDaysNode.appendTo(e.columnData),e.colHeaderDaysNode.appendTo(e.columnDayHeader),e.headerView&&(e.headerView.set("scheduler",e.get("scheduler")),e.headerView
.render())},bindUI:function(){var t=this;t.headerTableNode.delegate("click",e.bind(t._onClickDaysHeader,t),"."+L),this._bindMouseEvents(),this._bindCurrentTimeInterval(),t.on("drag:end",t._onEventDragEnd),t.on("drag:start",t._onEventDragStart),t.on("drag:tickAlignY",t._dragTickAlignY),t.on("schedulerChange",t._onSchedulerChange),t.after("drag:align",t._afterDragAlign)},syncUI:function(){var e=this;it.superclass.syncUI.apply(this,arguments),e.gridContainer.attr("colspan",e.get("days")),e.syncCurrentTimeUI(),e._setupDragDrop()},syncStdContent:function(){var t=this;t.setStdModContent(a.BODY,t.tableNode.getDOM());var n=e.NodeList.create(t.headerTableNode);t.headerView&&(n.push(t.headerView.get("boundingBox")),n.push(t.get("headerViewLabelNode"))),t.setStdModContent(a.HEADER,n)},calculateEventHeight:function(e){var t=this,n=t.get("hourHeight");return Math.max(e*(n/60),n/2)},calculateTop:function(e){var t=this;return(e.getHours()*60+e.getMinutes()+e.getSeconds()/60)*(t.get("hourHeight")/60)},getNextDate:function(){var e=this,t=e.get("scheduler").get("viewDate");return u.toLastHour(u.add(t,u.DAY,1))},getPrevDate:function(){var e=this,t=e.get("scheduler").get("viewDate");return u.toMidnight(u.subtract(t,u.DAY,1))},getColumnByDate:function(e){var t=this;return t.colDaysNode.item(t.getDateDaysOffset(e))},getColumnShimByDate:function(e){var t=this;return t.columnShims.item(t.getDateDaysOffset(e))},getDateByColumn:function(e){var t=this,n=u.safeClearTime(t.get("scheduler").get("viewDate"));return u.add(n,u.DAY,e)},getDateDaysOffset:function(e){var t=this,n=u.safeClearTime(t.get("scheduler").get("viewDate"));return u.countDays(u.safeClearTime(e),n)},getYCoordTime:function(e){var t=this,n=t.get("hourHeight"),r=h((e/n).toFixed(2)),i=Math.floor(r*100%100*.6),s=Math.floor(r);return[s,i,0]},plotEvent:function(e){var t=this,n=e.get("node");n.size()<2&&e.addPaddingNode();var r=e.get("node").item(0),i=e.get("node").item(1),s=t.getColumnShimByDate(e.get("endDate")),o=t.getColumnShimByDate(e.get("startDate"));o?(o.append(r),e.get("visible")&&r.show()):r.hide(),s?s.compareTo(o)||e.isDayBoundaryEvent()?i.hide():(s.append(i),e.get("visible")&&i.show()):i.hide(),e.syncUI(),t.syncEventTopUI(e),t.syncEventHeightUI(e)},plotEvents:function(){var t=this,n=t.get("scheduler"),r=t.get("filterFn");t.get("scheduler").flushEvents(),t.columnShims.each(function(i,s){var o=n.getEventsByDay(t.getDateByColumn(s),!0),u=[];i.empty(),e.Array.each(o,function(e){r.apply(t,[e])&&(t.plotEvent(e),u.push(e))}),t.syncEventsIntersectionUI(u)}),t.syncHeaderViewUI(),t.syncCurrentTimeUI()},scrollToDate:function(e){var t=this.get("boundingBox").one("."+E);this.get("scrollable")&&t&&t.set("scrollTop",this.calculateTop(e))},syncColumnsUI:function(){var e=this,t=e.get("scheduler").get("todayDate");e.colDaysNode.each(function(n,r){var i=e.getDateByColumn(r);n.toggleClass(b,!u.isDayOverlap(i,t))}),this.syncCurrentTimeUI()},syncCurrentTimeUI:function(){var e=this.get("currentTimeNode"),t=this.colDaysNode.get("parentNode").one("."+b);t?(t.one("."+U).append(e),e.setStyle("top",this.calculateTop(new Date)+"px")):e.remove()},syncDaysHeaderUI:function(){var e=this,t=e.get("scheduler").get("viewDate"),n=e.get("headerDateFormatter"),r=e.get("scheduler").get("todayDate");e.colHeaderDaysNode.all("a").each(function(i,s){var o=u.add(t,u.DAY,s);i.toggleClass(w,!u.isDayOverlap(o,r)),i.html(n.call(e,o))})},syncEventsIntersectionUI:function(t){var n=this,r=[],i=n.get("eventWidth");e.Array.each(t,function(s){var o=n.findEventIntersections(s,t),u=0,a=o.length,f=i/a;e.Array.each(o,function(t){var n=t.get("clientId"),s=e.Array.indexOf(r,n);if(s===-1){s=0,t._filtered&&(s=1);var o=t.get("node").item(s),l=f*u,c=f*1.7;u===a-1&&(c=i-l),o.setStyle("width",c+"%"),o.setStyle("left",l+"%"),a>1?o.addClass(g):o.removeClass(g);var h=o.get("parentNode");h&&h.insert(o,u),t._filtered=!0,r.push(n),u+=1}})})},syncEventHeightUI:function(e){var t=this,n=e.get("endDate"),r=e.get("startDate"),i=u.clone(r);i.setHours(24,0,0);var s=u.getMinutesOffset(t.limitDate(n,i),r);e.get("node").item(0).set("offsetHeight",t.calculateEventHeight(s));var o=e.get("node").item(1);if(o.inDoc()){var a=u.getMinutesOffset(n,u.toMidnight(e.getClearEndDate()));o.set("offsetHeight",t.calculateEventHeight(a))}},syncEventTopUI:function(e){var t=this;e.get("node").item(0).setStyle("top",t.calculateTop(e.get("startDate"))+"px"),e.get("node").item(1).setStyle("top",0)},syncHeaderViewUI:function(){var e=this;if(e.get("headerView")){var t=e.headerView;t.plotEvents(),e.headerNode.setStyle("paddingRight",f());var n=t.get("boundingBox"),r=n.one("."+d),i=Math.max(r.get("offsetHeight"),40);t.set("height",i),e._fillHeight()}},calculateYDelta:function(e,t){var n=this;return(t[1]-e[1])/(n.get("hourHeight")/2)*30},findEventIntersections:function(t,n){var r=[];return e.Array.each(n,function(e){e.get("visible")&&t.intersects(e)&&r.push(e)}),r},getXYDelta:function(t){var n=t.currentTarget.getXY(),r=[t.pageX,t.pageY];return e.Array.map(n,function(e,t){return r[t]-e})},getTickY:function(){var e=this;return c(Math.ceil(e.get("hourHeight")/2),10)},roundToNearestHour:function(e,t){var n=this;e.setHours(t[0],c(t[1],n.getTickY()),t[2])},_afterDragAlign:function(e){var t=this,n=e.target;t.startXY||(t.startXY=n.actXY),n.actXY[0]=null},_bindMouseEvents:function(){this.columnData.delegate("gesturemovestart",e.bind(this._onGestureMoveStartTableCol,this),"."+R),this.columnData.delegate("mouseenter",e.bind(this._onMouseEnterEvent,this),"."+v),this.columnData.delegate("mouseleave",e.bind(this._onMouseLeaveEvent,this),"."+v),this.columnData.delegate("gesturemove",e.bind(this._onGestureMoveTableCol,this),"."+W,{standAlone:!0}),this.columnData.delegate("gesturemoveend",e.bind(this._onGestureMoveEndTableCol,this),"."+R)},_afterVisibleChange:function(){clearInterval(this._currentTimeInterval),this.get("visible")&&this._bindCurrentTimeInterval()},_bindCurrentTimeInterval:function(){this._currentTimeInterval=setInterval(e.bind(this.syncCurrentTimeUI,this)
,6e4)},_dragTickAlignX:function(e){var t=this,n=t.draggingEvent;if(n&&!t.resizing){var r=t.eventPlaceholder,i=h(e.attr("data-colnumber"))-t.startColNumber;t.draggingEventStartDate=u.add(n.get("startDate"),u.DAY,i);var s=u.clone(t.draggingEventStartDate);u.copyHours(s,r.get("startDate")),r.move(s,{silent:!0}),t.plotEvent(r)}},_dragTickAlignY:function(e){var t=this,n=t.draggingEvent;if(n){var r=e.target.get("host"),i=t.eventPlaceholder,s=t.calculateYDelta(t.startXY,r.actXY);if(t.resizing){var o=u.add(t.draggingEventEndDate,u.MINUTES,s);if(u.getMinutesOffset(o,t.draggingEventStartDate)<30)return;i.set("endDate",o,{silent:!0})}else i.move(u.add(t.draggingEventStartDate,u.MINUTES,s),{silent:!0});t.plotEvent(i)}},_findActiveColumn:function(e){return e.currentTarget},_setupDragDrop:function(){var t=this,n=t.eventPlaceholder;if(!n){var r=t.get("scheduler");n=new r.eventModel({scheduler:r}),n.removeTarget(r),n.get("node").addClass(y),n.set("visible",!1,{silent:!0}),t.eventPlaceholder=n}t.delegate||(t.delegate=new e.DD.Delegate(t.get("delegateConfig")));var i=t.delegate.dd;i.unplug(e.Plugin.DDConstrained),i.unplug(e.Plugin.DDNodeScroll);var s=t.bodyNode.get("region");s.bottom=Infinity,s.top=-Infinity,i.plug(e.Plugin.DDConstrained,{bubbleTargets:t,constrain:s,stickY:!0,tickY:t.get("hourHeight")/2}),i.plug(e.Plugin.DDNodeScroll,{node:t.bodyNode,scrollDelay:150})},_uiSetDate:function(){var e=this;e.syncColumnsUI(),e.syncDaysHeaderUI()},_onClickDaysHeader:function(e){var t=this,n=t.get("scheduler");if(e.target.test("a, a span")){var r=n.getViewByName("day");if(r){var i=h(e.currentTarget.attr("data-colnumber"));n.set("date",t.getDateByColumn(i)),n.set("activeView",r)}}e.preventDefault()},_onEventDragEnd:function(){var e=this,t=e.draggingEvent;if(t){var n=e.eventPlaceholder;n.set("visible",!1,{silent:!0}),t.set("visible",!0,{silent:!0}),t.copyDates(n),e.get("scheduler").syncEventsUI()}e.startXY=null,e.draggingEvent=null},_onEventDragStart:function(){var e=this,t=e.draggingEvent=e.delegate.dd.get("node").getData("scheduler-event");if(t){var n=e.eventPlaceholder;n.copyPropagateAttrValues(t,null,{silent:!0}),e.plotEvent(n),t.set("visible",!1,{silent:!0}),e.draggingEventStartDate=u.clone(t.get("startDate")),e.draggingEventEndDate=u.clone(t.get("endDate"));var r=e.getColumnByDate(t.get("startDate"));e.startColNumber=r?h(r.attr("data-colnumber")):0}},_onGestureMoveEndTableCol:function(){var e=this,t=e.get("scheduler"),n=t.get("eventRecorder");n&&!t.get("disabled")&&e.creationStartDate&&(e.plotEvent(n),n.showPopover()),e.creationStartDate=null,e.resizing=!1,e.startXY=null,e._removeResizer(),e.get("boundingBox").selectable()},_onGestureMoveStartTableCol:function(e){var t=this,n=e.target,r=t.get("scheduler"),i=r.get("eventRecorder");i&&!r.get("disabled")&&(i.hidePopover(),n.test("."+U)?this._prepareEventCreation(e):n.test(["."+F,"."+I].join(","))&&(t.resizing=!0)),t.get("boundingBox").unselectable()},_onGestureMoveTableCol:function(e){var t=this,n=this._findActiveColumn(e),r=t.get("scheduler").get("eventRecorder");t.activeColumn!==n&&(t.activeColumn=n,t._dragTickAlignX(t.activeColumn));var i=t.creationStartDate;if(i){var s=c(t.calculateYDelta(t.startXY,[e.pageX,e.pageY]),t.getTickY()),o=s>=t._delta;if(t._delta!==s){if(s>0){var a=o?Math.max(s,r.get("duration")):s;r.set("endDate",u.add(i,u.MINUTES,a),{silent:!0})}else r.set("startDate",u.add(i,u.MINUTES,s),{silent:!0});t.plotEvent(r),t._delta=s}}},_onMouseEnterEvent:function(e){var t=this,n=e.currentTarget,r=n.getData("scheduler-event");r&&!r.get("disabled")&&t.resizerNode.appendTo(n)},_onMouseLeaveEvent:function(){var e=this;e.resizing||e._removeResizer()},_onSchedulerChange:function(e){var t=this;t.headerView&&t.headerView.set("scheduler",e.newVal)},_prepareEventCreation:function(e,t){var n=this.getXYDelta(e),r=h(e.currentTarget.attr("data-colnumber")),i,s=this.getDateByColumn(r),o=this.get("scheduler").get("eventRecorder");this.startXY=[e.pageX,e.pageY],this.roundToNearestHour(s,this.getYCoordTime(n[1])),t||(t=o.get("duration")),i=u.add(s,u.MINUTES,t),o.move(s,{silent:!0}),o.setAttrs({allDay:!1,endDate:i},{silent:!0}),this.creationStartDate=s,e.halt()},_removeResizer:function(){var e=this;e.resizerNode.remove()},_valueColDaysNode:function(){var t=this,n=t.get("days"),r=[],i=0;while(n--)r.push(e.Lang.sub(Y,{colNumber:i++}));return e.NodeList.create(r.join(""))},_valueColHeaderDaysNode:function(){var t=this,n=t.get("days"),r=[],i=0;r.push(rt);while(n--)r.push(e.Lang.sub(tt,{colNumber:i++}));return e.NodeList.create(r.join(""))},_valueMarkercellsNode:function(){var t=[],n;for(n=0;n<=23;n++)t.push(K);return e.NodeList.create(t.join(""))},_valueTimesNode:function(){var t=this,r=t.get("isoTime"),i=[],s;for(s=0;s<=23;s++)i.push(n.sub(Z,{hour:r?u.toIsoTimeString(s):u.toUsTimeString(s,!1,!0)}));return e.NodeList.create(i.join(""))}}});e.SchedulerDayView=it},"3.0.3-deprecated.27",{requires:["dd-drag","dd-delegate","dd-drop","dd-constrain","aui-scheduler-view-table"],skinnable:!0});
