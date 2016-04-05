if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/aui-tooltip-delegate/aui-tooltip-delegate.js']) {
   __coverage__['build/aui-tooltip-delegate/aui-tooltip-delegate.js'] = {"path":"build/aui-tooltip-delegate/aui-tooltip-delegate.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":51}}},"2":{"name":"(anonymous_2)","line":35,"loc":{"start":{"line":35,"column":17},"end":{"line":35,"column":28}}},"3":{"name":"(anonymous_3)","line":48,"loc":{"start":{"line":48,"column":16},"end":{"line":48,"column":27}}},"4":{"name":"(anonymous_4)","line":60,"loc":{"start":{"line":60,"column":12},"end":{"line":60,"column":23}}},"5":{"name":"(anonymous_5)","line":77,"loc":{"start":{"line":77,"column":16},"end":{"line":77,"column":27}}},"6":{"name":"(anonymous_6)","line":105,"loc":{"start":{"line":105,"column":28},"end":{"line":105,"column":39}}},"7":{"name":"(anonymous_7)","line":117,"loc":{"start":{"line":117,"column":28},"end":{"line":117,"column":44}}},"8":{"name":"(anonymous_8)","line":132,"loc":{"start":{"line":132,"column":27},"end":{"line":132,"column":41}}},"9":{"name":"(anonymous_9)","line":137,"loc":{"start":{"line":137,"column":29},"end":{"line":137,"column":48}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":264,"column":85}},"2":{"start":{"line":9,"column":0},"end":{"line":10,"column":23}},"3":{"start":{"line":23,"column":0},"end":{"line":261,"column":3}},"4":{"start":{"line":36,"column":8},"end":{"line":36,"column":28}},"5":{"start":{"line":38,"column":8},"end":{"line":38,"column":36}},"6":{"start":{"line":39,"column":8},"end":{"line":39,"column":26}},"7":{"start":{"line":49,"column":8},"end":{"line":49,"column":28}},"8":{"start":{"line":51,"column":8},"end":{"line":51,"column":61}},"9":{"start":{"line":61,"column":8},"end":{"line":63,"column":20}},"10":{"start":{"line":64,"column":8},"end":{"line":64,"column":46}},"11":{"start":{"line":65,"column":8},"end":{"line":65,"column":42}},"12":{"start":{"line":67,"column":8},"end":{"line":74,"column":10}},"13":{"start":{"line":78,"column":8},"end":{"line":79,"column":39}},"14":{"start":{"line":81,"column":8},"end":{"line":94,"column":9}},"15":{"start":{"line":82,"column":12},"end":{"line":93,"column":15}},"16":{"start":{"line":96,"column":8},"end":{"line":96,"column":23}},"17":{"start":{"line":106,"column":8},"end":{"line":106,"column":28}},"18":{"start":{"line":108,"column":8},"end":{"line":108,"column":37}},"19":{"start":{"line":118,"column":8},"end":{"line":119,"column":20}},"20":{"start":{"line":121,"column":8},"end":{"line":121,"column":38}},"21":{"start":{"line":123,"column":8},"end":{"line":123,"column":70}},"22":{"start":{"line":133,"column":8},"end":{"line":140,"column":9}},"23":{"start":{"line":134,"column":12},"end":{"line":134,"column":24}},"24":{"start":{"line":136,"column":13},"end":{"line":140,"column":9}},"25":{"start":{"line":137,"column":12},"end":{"line":139,"column":15}},"26":{"start":{"line":138,"column":16},"end":{"line":138,"column":48}},"27":{"start":{"line":142,"column":8},"end":{"line":142,"column":21}}},"branchMap":{"1":{"line":81,"type":"if","locations":[{"start":{"line":81,"column":8},"end":{"line":81,"column":8}},{"start":{"line":81,"column":8},"end":{"line":81,"column":8}}]},"2":{"line":133,"type":"if","locations":[{"start":{"line":133,"column":8},"end":{"line":133,"column":8}},{"start":{"line":133,"column":8},"end":{"line":133,"column":8}}]},"3":{"line":136,"type":"if","locations":[{"start":{"line":136,"column":13},"end":{"line":136,"column":13}},{"start":{"line":136,"column":13},"end":{"line":136,"column":13}}]}},"code":["(function () { YUI.add('aui-tooltip-delegate', function (A, NAME) {","","/**"," * The Toggler Component"," *"," * @module aui-tooltip"," */","","var Lang = A.Lang,","    DOC = A.config.doc;","","/**"," * A base class for Toggler Delegate."," *"," * Check the [live demo](http://alloyui.com/examples/tooltip/)."," *"," * @class A.TooltipDelegate"," * @extends Base"," * @param {Object} config Object literal specifying widget configuration"," *     properties."," * @constructor"," */","A.TooltipDelegate = A.Base.create('tooltip-delegate', A.Base, [], {","    items: null,","","    tooltip: null,","","    /**","     * Construction logic executed during TooltipDelegate instantiation.","     * Lifecycle.","     *","     * @method initializer","     * @protected","     */","    initializer: function() {","        var instance = this;","","        instance._eventHandles = [];","        instance.bindUI();","    },","","    /**","     * Destructor lifecycle implementation for the `TooltipDelegate` class.","     *","     * @method destructor","     * @protected","     */","    destructor: function() {","        var instance = this;","","        (new A.EventHandle(instance._eventHandles)).detach();","    },","","    /**","     * Bind the events on the TooltipDelegate UI. Lifecycle.","     *","     * @method bindUI","     * @protected","     */","    bindUI: function() {","        var instance = this,","            container,","            trigger;","        container = instance.get('container');","        trigger = instance.get('trigger');","","        instance._eventHandles.push(","            container.delegate(","                instance.get('triggerShowEvent'),","                A.bind(instance._onUserShowInteraction, instance), trigger),","            container.delegate(","                instance.get('triggerHideEvent'),","                A.bind(instance._onUserHideInteraction, instance), trigger)","        );","    },","","    getTooltip: function() {","        var instance = this,","            tooltip = instance.tooltip;","","        if (!tooltip) {","            tooltip = instance.tooltip = new A.Tooltip({","                align: instance.get('align'),","                bindDOMEvents: false,","                cssClass: instance.get('cssClass'),","                duration: instance.get('duration'),","                formatter: instance.get('formatter'),","                opacity: instance.get('opacity'),","                position: instance.get('position'),","                html: instance.get('html'),","                visible: false,","                zIndex: instance.get('zIndex')","            });","        }","","        return tooltip;","    },","","    /**","     * Show tooltip on user interaction.","     *","     * @method _onUserHideInteraction","     * @param event","     */","    _onUserHideInteraction: function() {","        var instance = this;","","        instance.getTooltip().hide();","    },","","    /**","     * Show tooltip on user interaction.","     *","     * @method _onUserShowInteraction","     * @param event","     */","    _onUserShowInteraction: function(event) {","        var instance = this,","            trigger;","","        trigger = event.currentTarget;","","        instance.getTooltip().set('trigger', trigger).render().show();","    },","","    /**","     * Validate the trigger events.","     *","     * @method _validateTriggerEvent","     * @param  {String | Array} val","     */","    _validateTriggerEvent: function(val) {","        if (A.Lang.isString(val)) {","            return true;","        }","        else if (A.Lang.isArray(val)) {","            return val.every(function (element) {","                return A.Lang.isString(element);","            });","        }","","        return false;","    }","}, {","    /**","     * Static property used to define the default attribute","     * configuration for the Toggler Delegate.","     *","     * @property ATTRS","     * @type Object","     * @static","     */","    ATTRS: {","        /**","         * The alignment configuration for this widget.","         *","         * @attribute align","         * @default Guess position.","         * @type Object","         */","        align: {","            value: null","        },","","        /**","         * The container of Toggler Delegate instance.","         *","         * @attribute container","         */","        container: {","            setter: A.one,","            value: DOC,","            writeOnce: true","        },","","        /**","         * The CSS class applied to the tooltip.","         *","         * @attribute cssClass","         */","        cssClass: {","            value: null","        },","","        /**","         * Determine the duration of the tooltip animation.","         *","         * @attribute duration","         * @default 0.15","         * @type {Number}","         */","        duration: {","            value: 0.15,","            writeOnce: true","        },","","        formatter: A.Tooltip.ATTRS.formatter,","","        /**","         * Determines if the tooltip allows arbitary HTML or is plain text.","         *","         * @attribute html","         * @default false","         * @type Boolean","         */","        html: {","            value: false,","            validator: Lang.isBoolean","        },","","        /**","         * Determine the opacity of the tooltip.","         *","         * @attribute opacity","         * @default 0.8","         * @type {Number}","         */","        opacity: {","            value: 0.8,","            writeOnce: true","        },","","        position: A.WidgetPositionAlignSuggestion.ATTRS.position,","","        trigger: A.WidgetPositionAlignSuggestion.ATTRS.trigger,","","        /**","         * DOM event to hide the tooltip.","         *","         * @attribute triggerHideEvent","         * @default MOUSEENTER","         * @type String","         */","        triggerHideEvent: {","            validator: '_validateTriggerEvent',","            value: 'mouseleave',","            writeOnce: true","        },","","        /**","         * DOM event to show the tooltip.","         *","         * @attribute triggerShowEvent","         * @default MOUSEENTER","         * @type String","         */","        triggerShowEvent: {","            validator: '_validateTriggerEvent',","            value: 'mouseenter',","            writeOnce: true","        },","","        /**","         * Specify the zIndex for the tooltips.","         *","         * @attribute zIndex","         * @type {Number}","         */","        zIndex: {}","    }","});","","","}, '3.0.3-deprecated.27', {\"requires\": [\"node-event-delegate\", \"aui-tooltip-base\"]});","","}());"]};
}
var __cov_44U1iAdL39Qwo0nstRdqUw = __coverage__['build/aui-tooltip-delegate/aui-tooltip-delegate.js'];
__cov_44U1iAdL39Qwo0nstRdqUw.s['1']++;YUI.add('aui-tooltip-delegate',function(A,NAME){__cov_44U1iAdL39Qwo0nstRdqUw.f['1']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['2']++;var Lang=A.Lang,DOC=A.config.doc;__cov_44U1iAdL39Qwo0nstRdqUw.s['3']++;A.TooltipDelegate=A.Base.create('tooltip-delegate',A.Base,[],{items:null,tooltip:null,initializer:function(){__cov_44U1iAdL39Qwo0nstRdqUw.f['2']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['4']++;var instance=this;__cov_44U1iAdL39Qwo0nstRdqUw.s['5']++;instance._eventHandles=[];__cov_44U1iAdL39Qwo0nstRdqUw.s['6']++;instance.bindUI();},destructor:function(){__cov_44U1iAdL39Qwo0nstRdqUw.f['3']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['7']++;var instance=this;__cov_44U1iAdL39Qwo0nstRdqUw.s['8']++;new A.EventHandle(instance._eventHandles).detach();},bindUI:function(){__cov_44U1iAdL39Qwo0nstRdqUw.f['4']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['9']++;var instance=this,container,trigger;__cov_44U1iAdL39Qwo0nstRdqUw.s['10']++;container=instance.get('container');__cov_44U1iAdL39Qwo0nstRdqUw.s['11']++;trigger=instance.get('trigger');__cov_44U1iAdL39Qwo0nstRdqUw.s['12']++;instance._eventHandles.push(container.delegate(instance.get('triggerShowEvent'),A.bind(instance._onUserShowInteraction,instance),trigger),container.delegate(instance.get('triggerHideEvent'),A.bind(instance._onUserHideInteraction,instance),trigger));},getTooltip:function(){__cov_44U1iAdL39Qwo0nstRdqUw.f['5']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['13']++;var instance=this,tooltip=instance.tooltip;__cov_44U1iAdL39Qwo0nstRdqUw.s['14']++;if(!tooltip){__cov_44U1iAdL39Qwo0nstRdqUw.b['1'][0]++;__cov_44U1iAdL39Qwo0nstRdqUw.s['15']++;tooltip=instance.tooltip=new A.Tooltip({align:instance.get('align'),bindDOMEvents:false,cssClass:instance.get('cssClass'),duration:instance.get('duration'),formatter:instance.get('formatter'),opacity:instance.get('opacity'),position:instance.get('position'),html:instance.get('html'),visible:false,zIndex:instance.get('zIndex')});}else{__cov_44U1iAdL39Qwo0nstRdqUw.b['1'][1]++;}__cov_44U1iAdL39Qwo0nstRdqUw.s['16']++;return tooltip;},_onUserHideInteraction:function(){__cov_44U1iAdL39Qwo0nstRdqUw.f['6']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['17']++;var instance=this;__cov_44U1iAdL39Qwo0nstRdqUw.s['18']++;instance.getTooltip().hide();},_onUserShowInteraction:function(event){__cov_44U1iAdL39Qwo0nstRdqUw.f['7']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['19']++;var instance=this,trigger;__cov_44U1iAdL39Qwo0nstRdqUw.s['20']++;trigger=event.currentTarget;__cov_44U1iAdL39Qwo0nstRdqUw.s['21']++;instance.getTooltip().set('trigger',trigger).render().show();},_validateTriggerEvent:function(val){__cov_44U1iAdL39Qwo0nstRdqUw.f['8']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['22']++;if(A.Lang.isString(val)){__cov_44U1iAdL39Qwo0nstRdqUw.b['2'][0]++;__cov_44U1iAdL39Qwo0nstRdqUw.s['23']++;return true;}else{__cov_44U1iAdL39Qwo0nstRdqUw.b['2'][1]++;__cov_44U1iAdL39Qwo0nstRdqUw.s['24']++;if(A.Lang.isArray(val)){__cov_44U1iAdL39Qwo0nstRdqUw.b['3'][0]++;__cov_44U1iAdL39Qwo0nstRdqUw.s['25']++;return val.every(function(element){__cov_44U1iAdL39Qwo0nstRdqUw.f['9']++;__cov_44U1iAdL39Qwo0nstRdqUw.s['26']++;return A.Lang.isString(element);});}else{__cov_44U1iAdL39Qwo0nstRdqUw.b['3'][1]++;}}__cov_44U1iAdL39Qwo0nstRdqUw.s['27']++;return false;}},{ATTRS:{align:{value:null},container:{setter:A.one,value:DOC,writeOnce:true},cssClass:{value:null},duration:{value:0.15,writeOnce:true},formatter:A.Tooltip.ATTRS.formatter,html:{value:false,validator:Lang.isBoolean},opacity:{value:0.8,writeOnce:true},position:A.WidgetPositionAlignSuggestion.ATTRS.position,trigger:A.WidgetPositionAlignSuggestion.ATTRS.trigger,triggerHideEvent:{validator:'_validateTriggerEvent',value:'mouseleave',writeOnce:true},triggerShowEvent:{validator:'_validateTriggerEvent',value:'mouseenter',writeOnce:true},zIndex:{}}});},'3.0.3-deprecated.27',{'requires':['node-event-delegate','aui-tooltip-base']});
