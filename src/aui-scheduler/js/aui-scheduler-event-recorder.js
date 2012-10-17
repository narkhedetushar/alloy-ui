var L = A.Lang,
	isArray = L.isArray,

	ARROW = 'arrow',
	BODY = 'body',
	BODY_CONTENT = 'bodyContent',
	BOTTOM = 'bottom',
	BOUNDING_BOX = 'boundingBox',
	CANCEL = 'cancel',
	CLICK = 'click',
	CONSTRAIN = 'constrain',
	DATE = 'date',
	DATE_FORMAT = 'dateFormat',
	DELETE = 'delete',
	DESCRIPTION = 'description',
	EVENT = 'event',
	FOOTER_CONTENT = 'footerContent',
	FORM = 'form',
	HEADER = 'header',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OVERLAY_OFFSET = 'overlayOffset',
	RENDERED = 'rendered',
	RIGHT = 'right',
	SAVE = 'save',
	SCHEDULER_CHANGE = 'schedulerChange',
	SHADOW = 'shadow',
	STRINGS = 'strings',
	TL = 'tl',
	TOOLBAR = 'toolbar',
	SUBMIT = 'submit',
	VALUE = 'value',
	VISIBLE_CHANGE = 'visibleChange',
	WIDTH = 'width',

	EV_SCHEDULER_EVENT_RECORDER_CANCEL = 'cancel',
	EV_SCHEDULER_EVENT_RECORDER_DELETE = 'delete',
	EV_SCHEDULER_EVENT_RECORDER_EDIT = 'edit',
	EV_SCHEDULER_EVENT_RECORDER_SAVE = 'save',

	_serialize = A.IO.prototype._serialize,

	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_BOTTOM = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW, BOTTOM),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_RIGHT = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW, RIGHT),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_SHADOW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW, SHADOW),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_BODY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, BODY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, CONTENT),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_DATE = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, DATE),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_FORM = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, FORM),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_HEADER = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, HEADER),

	TPL_OVERLAY_BODY_CONTENT = new A.Template(
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_SHADOW, ' ', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW, '"></div>',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW, '"></div>',
		'<input type="hidden" name="startDate" value="{startDate}" />',
		'<input type="hidden" name="endDate" value="{endDate}" />',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_HEADER, '">',
			'<input class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT, '" name="content" value="{content}" />',
		'</div>',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_BODY, '">',
			'<label class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_DATE, '">{date}</label>',
		'</div>'
	),

	TPL_OVERLAY_FORM = '<form class="' + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_FORM + '" id="schedulerEventRecorderForm"></form>';

var SchedulerEventRecorder = A.Component.create({
	NAME: SCHEDULER_EVENT_RECORDER,

	ATTRS: {
		allDay: {
			value: false
		},

		content: {
		},

		duration: {
			value: 60
		},

		dateFormat: {
			validator: isString,
			value: '%a, %B %d,'
		},

		event: {
		},

		eventClass: {
			valueFn: function() {
				return A.SchedulerEvent;
			}
		},

		strings: {
			value: {},
			setter: function(val) {
				return A.merge(
					{
						'delete': 'Delete',
						'description-hint': 'e.g., Dinner at Brian\'s',
						cancel: 'Cancel',
						description: 'Description',
						edit: 'Edit',
						save: 'Save',
						when: 'When'
					},
					val || {}
				);
			},
			validator: isObject
		},

		overlay: {
			validator: isObject,
			value: {
				constrain: null,
				visible: false,
				width: 300,
				zIndex: 500
			}
		},

		// See #2530972
		overlayOffset: {
			value: [15, -38],
			validator: isArray
		},

		template: {
			value: TPL_OVERLAY_BODY_CONTENT
		},

		toolbar: {
			setter: function(val) {
				var instance = this;
				var strings = instance.get(STRINGS);

				return A.merge({
					children: [
						{
							handler: A.bind(instance._handleSaveEvent, instance),
							label: strings[SAVE]
						},
						{
							handler: A.bind(instance._handleCancelEvent, instance),
							label: strings[CANCEL]
						},
						{
							handler: A.bind(instance._handleDeleteEvent, instance),
							label: strings[DELETE]
						}
					]
				}, val || {});
			},
			validator: isObject,
			value: {}
		}
	},

	EXTENDS: A.SchedulerEvent,

	prototype: {

		initializer: function() {
			var instance = this;

			instance.get(NODE).addClass(CSS_SCHEDULER_EVENT_RECORDER);

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_CANCEL, {
				defaultFn: instance._defCancelEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_DELETE, {
				defaultFn: instance._defDeleteEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_EDIT, {
				defaultFn: instance._defEditEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_SAVE, {
				defaultFn: instance._defSaveEventFn
			});

			instance.after(SCHEDULER_CHANGE, instance._afterSchedulerChange);

			instance[OVERLAY] = new A.Overlay(instance.get(OVERLAY));
			instance[TOOLBAR] = new A.Toolbar(instance.get(TOOLBAR));
		},

		_afterSchedulerChange: function(event) {
			var instance = this;
			var scheduler = event.newVal;
			var schedulerBB = scheduler.get(BOUNDING_BOX);

			instance[OVERLAY].set(CONSTRAIN, schedulerBB);

			schedulerBB.delegate(CLICK, A.bind(instance._onClickSchedulerEvent, instance), _DOT + CSS_SCHEDULER_EVENT);
		},

		_defCancelEventFn: function(event) {
			var instance = this;

			instance.get(NODE).remove();

			instance.hideOverlay();
		},

		_defDeleteEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.removeEvent(instance.get(EVENT));

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_defEditEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_defSaveEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.addEvent(event.newSchedulerEvent);

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_handleCancelEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_CANCEL);

			event.preventDefault();
		},

		_handleDeleteEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_DELETE, {
				schedulerEvent: instance.get(EVENT)
			});

			event.preventDefault();
		},

		_handleSaveEvent: function(event) {
			var instance = this,
				schedulerEvent = instance.get(EVENT),
				eventName = schedulerEvent ? EV_SCHEDULER_EVENT_RECORDER_EDIT : EV_SCHEDULER_EVENT_RECORDER_SAVE,
				options = {
					silent: !schedulerEvent
				},
				values = instance.serializeForm();

			if (!schedulerEvent) {
				schedulerEvent = instance.clone();
			}

			schedulerEvent.set(SCHEDULER, instance.get(SCHEDULER), { silent: true });

			schedulerEvent.setAttrs({
				content: values[CONTENT]
			},
			options);

			instance.fire(eventName, {
				newSchedulerEvent: schedulerEvent
			});

			event.preventDefault();
		},

		_onClickSchedulerEvent: function(event) {
			var instance = this;
			var evt = event.currentTarget.getData(SCHEDULER_EVENT);

			if (evt) {
				instance.set(EVENT, evt, { silent: true });
				instance.showOverlay([event.pageX, event.pageY]);

				instance.get(NODE).remove();
			}
		},

		_onOverlayVisibleChange: function(event) {
			var instance = this;

			if (event.newVal) {
				instance.populateForm();

				if (!instance.get(EVENT)) {
					var overlayBB = instance[OVERLAY].get(BOUNDING_BOX);
					var contentNode = overlayBB.one(_DOT + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT);

					setTimeout(function() {
						contentNode.selectText();
					}, 0);
				}
			}
			else {
				instance.set(EVENT, null, { silent: true });

				instance.get(NODE).remove();
			}
		},

		_onSubmitForm: function(event) {
			var instance = this;

			instance._handleSaveEvent(event);
		},

		_renderOverlay: function() {
			var instance = this;
			var strings = instance.get(STRINGS);

			instance[OVERLAY].render();
			instance[TOOLBAR].render();

			var overlayBB = instance[OVERLAY].get(BOUNDING_BOX);
			overlayBB.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY);

			instance[OVERLAY].set(FOOTER_CONTENT, instance[TOOLBAR].get(BOUNDING_BOX));
			instance[OVERLAY].on(VISIBLE_CHANGE, A.bind(instance._onOverlayVisibleChange, instance));

			instance.formNode = A.Node.create(TPL_OVERLAY_FORM);

			instance[OVERLAY].set(BODY_CONTENT, instance.formNode);

			instance.formNode.on(SUBMIT, A.bind(instance._onSubmitForm, instance));
		},

		getFormattedDate: function() {
			var instance = this;
			var dateFormat = instance.get(DATE_FORMAT);
			var evt = (instance.get(EVENT) || instance);

			var endDate = evt.get(END_DATE);
			var scheduler = evt.get(SCHEDULER);
			var startDate = evt.get(START_DATE);
			var fmtHourFn = (scheduler.get(ACTIVE_VIEW).get(ISO_TIME) ? DateMath.toIsoTimeString : DateMath.toUsTimeString);

			return [ evt._formatDate(startDate, dateFormat), fmtHourFn(startDate), _DASH, fmtHourFn(endDate) ].join(_SPACE);
		},

		getTemplateData: function() {
			var instance = this,
				strings = instance.get(STRINGS),
				evt = instance.get(EVENT) || instance,
				content = evt.get(CONTENT);

			if (isUndefined(content)) {
				content = strings['description-hint'];
			}

			return {
				content: content,
				date: instance.getFormattedDate(),
				endDate: evt.get(END_DATE).getTime(),
				startDate: evt.get(START_DATE).getTime()
			};
		},

		hideOverlay: function() {
			var instance = this;

			instance[OVERLAY].hide();
		},

		populateForm: function() {
			var instance = this;

			instance.formNode.setContent(
				instance.get(TEMPLATE).parse(instance.getTemplateData())
			);
		},

		serializeForm: function() {
			var instance = this;

			return A.QueryString.parse(_serialize(instance.formNode.getDOM()));
		},

		showOverlay: function(xy, offset) {
			var instance = this,
				constrain = instance[OVERLAY].get(CONSTRAIN),
				overlayOffset = instance.get(OVERLAY_OFFSET),
				defaultXY = xy.concat([]);

			if (!instance[OVERLAY].get(RENDERED)) {
				instance._renderOverlay();
			}

			instance[OVERLAY].show();

			if (!xy) {
				var eventNode = (instance.get(EVENT) || instance).get(NODE);
				var titleNode = eventNode.one(_DOT + CSS_SCHEDULER_EVENT_TITLE);

				offset = [overlayOffset[0] + titleNode.get(OFFSET_WIDTH), overlayOffset[1] + titleNode.get(OFFSET_HEIGHT) / 2];

				xy = titleNode.getXY();
			}

			offset = offset || overlayOffset;

			xy[0] += offset[0];
			xy[1] += offset[1];

			var overlayBB = instance[OVERLAY].get(BOUNDING_BOX),
				overlayWidth = overlayBB.get(OFFSET_WIDTH),
				overlayHeader = overlayBB.one(_DOT + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_HEADER),
				arrows = overlayBB.all(_DOT+CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW);

			if ((xy[0] + overlayWidth) >= constrain.get(OFFSET_WIDTH)) {
				arrows.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_RIGHT);

				xy[0] -= overlayWidth + arrows.item(0).get(OFFSET_WIDTH);
			}

			instance[OVERLAY].set('xy', xy);

			if (defaultXY[1] >= (overlayHeader.get(OFFSET_HEIGHT) + overlayHeader.getY())) {
				arrows.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_BOTTOM);
			}
			else {
				arrows.removeClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_BOTTOM);
			}
		}
	}
});

A.SchedulerEventRecorder = SchedulerEventRecorder;