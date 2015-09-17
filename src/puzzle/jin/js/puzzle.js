/**
 * event : drag, start, stop, create
 * @example
 * $(selector).draggable({
 *  drag: function () {
 *  },
 *  start: function () {
 *  },
 *  stop: function () {
 *  },
 *  create: function () {
 *  }
 * });
 */
$(document).ready(function () {

	function Puzzle (galleryId, pieceId) {
		var self = this;
		self._cachePiece = null;
		self.pos = {
			piece: { left: 300, top: 300 }
		};
		self.$gallery = $('#'+ galleryId).find('div');
		self.$piece =  $('#'+ pieceId).find('div');

		self._totalPiece = self.$gallery.size();
		self._successPiece = 0;
		self._restPiece = self._totalPiece;

		self.$piece
			.draggable({
				start: function () {
					self._setCachePiece($(this));
				},
				stop: function () {
					var $piece = $(this),
						pieceInfo = self.getPieceInfo($piece),
						$galleryPiece = self.$gallery.eq(pieceInfo.index),
						galleryPieceInfo = self.getPieceInfo($galleryPiece);

					if (self._isEqualPiece(pieceInfo, galleryPieceInfo)) {
						self._processSuccess($piece, galleryPieceInfo);
					}
				}
			})
			.click(function () {
				self._setCachePiece($(this));
			});
	}

	Puzzle.prototype = {
		_getCachePiece: function () {
			return this._cachePiece;
		},

		_setCachePiece: function ($piece) {
			var self = this;
			self._removeCachePiece();
			self._cachePiece = $piece;
			$piece.css('zIndex', 200);
		},

		_removeCachePiece: function () {
			var self = this;
			if (self._getCachePiece()) {
				self.$piece.css('zIndex', 100);
				self._cachePiece = null;
			}
		},

		_getRandomPos: function (left, top) {
			return {
				left: Math.random() * left,
				top: Math.random() * top
			}
		},

		_isEqualPiece: function (piece, galleryPiece) {
			var minLeft  = galleryPiece.offsetLeft - galleryPiece.width,
				minTop   =  galleryPiece.offsetTop - galleryPiece.height,
				maxLeft = galleryPiece.offsetLeft + galleryPiece.width,
				maxTop  = galleryPiece.offsetTop + galleryPiece.height;

			return (piece.offsetLeft > minLeft && piece.offsetLeft < maxLeft && piece.offsetTop > minTop && piece.offsetTop < maxTop);

		},

		_addSuccessPiece: function ($) {
			var self = this;
			self._successPiece += 1;
			self._restPiece -= 1;
		},

		_processSuccess: function ($piece, galleryPieceInfo) {
			var self = this;
			$piece.draggable('destroy');
			$piece.animate({ left:galleryPieceInfo.offsetLeft, top:galleryPieceInfo.offsetTop }, 300).css('zIndex', 100);

			self._addSuccessPiece();
			if (self._isCompleted()) {
				self._processComplete();
			}
		},

		_isCompleted: function () {
			var self = this;
			return self._totalPiece === self._successPiece;
		},

		_processComplete: function () {
			var self = this;
			self.$piece.remove();
			self.$gallery.css({
				opacity:1,
				margin:0
			});

			alert('성공~!');
		},

		getPieceInfo: function ($elm) {
			return {
				index: $elm.index(),
				width: $elm.width(),
				height: $elm.height(),
				offsetLeft: $elm.offset().left,
				offsetTop: $elm.offset().top
			};
		},

		movePieceRandom: function (left, top) {
			var self = this;
			self.$piece.each(function () {
				$(this).css(self._getRandomPos(left, top));
			});
		},

		start: function () {
			var self = this;
			self.movePieceRandom(self.pos.piece.left, self.pos.piece.top);
		}
	};


	var puzzle = new Puzzle('gallery_wrapper', 'draggable_wrapper');
	puzzle.start();
});