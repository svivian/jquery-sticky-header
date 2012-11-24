/* jQuery sticky table headers plugin */
(function($){

	$.fn.stickyheader = function() {
		return this.each( function() {

			var $thead = $(this);
			if ( $thead.prop('tagName') !== 'THEAD' )
				return;

			// set each TH to its own width
			var thsizes = [];
			$thead.find('> tr > th').each( function(i) {
				thsizes[i] = $(this).width();
				$(this).css( 'width', thsizes[i] );
			} );

			var $table = $thead.parent();
			var $newThead = $thead.clone();

			var tblPos = $table.offset();
			var tblSize = { width: $table.width(), height: $table.height() };

			var tblCSS = {
				position: 'fixed',
				top: 0,
				left: tblPos.left,
				width: tblSize.width,
				visibility: 'hidden'
			};
			var $newTable = $('<table class="stickify"></table>').css(tblCSS).append($newThead).appendTo('body');

			$(window).scroll( function() {
				// while over the table, show sticky header
				var currTop = $(this).scrollTop();
				var scrollLimit = tblPos.top + tblSize.height - $newTable.height();
				if ( currTop > tblPos.top && currTop < scrollLimit )
					$newTable.css('visibility', 'visible');
				else
					$newTable.css('visibility', 'hidden');
			} );

		} );
	};

})(jQuery);
