(function (window) {
	var ui = {};

	ui.Banner = function (config) {
		var self = this;

		self._aBtnList = [];
		self._aSlideList = [];
		self._fInterval = null;

		self.sId = '';
		self.eRoot = null;
		self.nCurrent = 0;
		self.nInterval = 5000;

		self.oClass = {
			viewContainer: 'banner-view-container',
			btnContainer: 'banner-btn-container',
			view: 'banner-view',
			btn: 'banner-btn'
		};

		self._init(config);
	};

	ui.Banner.prototype = {
		/**
		 * 초기 생성자 호출시 실행된다.
		 * @param {object} config
		 * @private
		 */
		_init: function (config) {
			var self = this;

			self._setInitData(config);
			self._bindInitEvent();
		},

		/**
		 * 초기 생성자 호출시 설정 값을 세팅한다.
		 * @param {object} config
		 * @private
		 */
		_setInitData: function (config) {
			var self = this;

			if (!config.id) { self._error({ msg: 'You must need a id.' }); }

			self.sId = config.id;
			self.eRoot = document.getElementById(self.sId);
			self.nInterval = config.interval || self.nInterval;
			self._aSlideList = Array.prototype.slice.call(self.eRoot.querySelectorAll('.'+ self.oClass.viewContainer +' > ul > li'), 0);
			self._aBtnList = Array.prototype.slice.call(self.eRoot.querySelectorAll('.'+ self.oClass.btnContainer +' > li'), 0);
		},

		/**
		 * 초기 생성자 호출시 이벤트를 바인드한다.
		 * @private
		 */
		_bindInitEvent: function () {
			var self = this;

			self.click();
			$(self.eRoot).on({
				mouseover: function () {
					clearInterval(self._fInterval);
				},
				mouseout: function () {
					self.timer();
				}
			});
		},

		/**
		 * 에러를 메세지를 호출한다.
		 * @param {{msg:string}} err 에러 정보를 담고 있는 객체(msg-에러메세지)
		 * @private
		 */
		_error: function (err) {
			throw new Error(err.msg);
		},

		/**
		 * Slide를 이동 시킨다.
		 * @param {number} i slide의 index
		 */
		move: function (i) {
			var self = this,
				eCurrent, eNext;

			if (self.nCurrent === i) { return; }

			eCurrent = self._aSlideList[self.nCurrent];
			eNext = self._aSlideList[i];

			$(eCurrent).css({ left: 0 }).stop().animate({ left: '-100%' });
			$(eNext).css({ left: '100%' }).stop().animate({ left: 0 });

			self.nCurrent = i;
		},

		/**
		 * Button 클릭시 해당 슬라이드로 이동시킨다.
		 */
		click: function () {
			var self = this,
				$aBtnList = $(self._aBtnList);

			$aBtnList.on('click', function () {
				var $tg = $(this),
					nIdx = $tg.index();

				$aBtnList.removeClass('on');
				$tg.addClass('on');

				self.move(nIdx);
			});
		},

		timer: function () {
			var self = this;
			self._fInterval = setInterval(function () {
				var nIdx = self.nCurrent + 1;
				if (nIdx === self._aSlideList.length) {
					nIdx = 0;
				}

				$(self._aBtnList[nIdx]).click();
			}, self.nInterval);
		}
	};

	window.ui = ui;

}(window));

new ui.Banner({ id: 'banner1', interval: 3000 });
new ui.Banner({ id: 'banner2', interval: 1000 });