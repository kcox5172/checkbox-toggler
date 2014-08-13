(function($) {

	$.fn.checkboxToggler = function(selector, callback) {
		
		/**
		 *	$('parentCheckbox').checkboxToggler('[name="delete"]');
		 *
		 *	accepts optional callback
		 *
		 *	$('parentCheckbox').checkboxToggler('[name="delete"]', function(numChildren, numChecked) {
		 *		console.log(numChildren, numChecked);	
		 *	});
		 */
	
		return this.each(function() {

			var	$parent = $(this);
			var $children = $(selector);
			var numChildren = $children.length;
			var numChecked = $children.filter(':checked').length;
			
			if (numChecked === numChildren) {
				$parent.prop('checked', true);
			}
			
			$parent.on('click', function() {
				
				var isChecked = $parent.prop('checked');
				
				numChecked = isChecked ? numChildren : 0;
				
				$children.prop('checked', isChecked);
				
				if (callback) {
					callback.call(null, numChildren, numChecked);
				}
				
			});
		
			$children.on('click', function() {
				
				var $this = $(this);
	
				$this.prop('checked') ? numChecked++ : numChecked--;
				$parent.prop('checked', (numChecked === numChildren));
				
				if (callback) {
					callback.call(null, numChildren, numChecked);
				}
				
			});
			
		});
		
	};
	
})(jQuery);
