$.fn.checkboxToggler = function(selector) {
	
	/**
	 *	accepts optional callback as second argument
	 *
	 *	$('selector').checkboxToggler('[name="delete"]', function(total, checked) {
	 *		console.log(total, checked);	
	 *	});
	 */

	var callback = function() {};

	if (arguments.length === 2) {
		callback = arguments[1];
	}

	return this.each(function() {
		
		var	$this = $(this);
		
		// get all "child" checkboxes
		var checkChildren = $(selector);
		
		// get how many are checked initially
		var numChecked = checkChildren.filter(':checked').length;
		
		if (numChecked === checkChildren.length) {
			$this.prop('checked', true)
		}
	
		$.each(checkChildren, function() {
			
			/**
			 *	bind function to each child that will increment
			 *	or decrement the number of checked children so
			 *	parent can be checked/unchecked automatically
			 */
			$(this).click(function() {
				
				if (!$(this).prop('checked')) {
					numChecked--;
				} else {
					numChecked++;							
				}
				
				if (numChecked < checkChildren.length) {
					$this.prop('checked', false);
				} else {
					$this.prop('checked', true);
				}
				
				callback.call(null, checkChildren.length, numChecked)
				
			});
			
		});
		
		// attach click event to the "parent" checkbox
		$this.click(function() {
			
			var state = $this.prop('checked');
			
			if (!state) {
				numChecked = 0;					
			} else {
				numChecked = checkChildren.length;
			}
			
			// check/uncheck each child
			$.each(checkChildren, function() {
			
				$(this).prop('checked', state);
			
			});
			
			callback.call(null, checkChildren.length, numChecked)
			
		});
		
	});
	  
};