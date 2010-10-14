/*
	Dropdown Plugin. Adds a second dropdown with values taken from an ajax json response
	Requires that there is a data atrribute data-url set to the url for the ajax response

	Written by Leo Allen
	Copyright (c) 2009 Mukuru Ltd
	http://mukuru.com

	Licensed under the ISC License, http://www.opensource.org/licenses/isc-license.txt

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO
	THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
	IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
	DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN
	AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
	CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

(function(jQuery){
	jQuery.fn.dynamic_dropdown = function(configuration)
	{
		// Setup configuration
		configuration = jQuery.extend({
			loader: Mukuru.ajax_loader,
			noSelectVal: '_NO_SELECTION_',		// Dropdown value to ignore (i.e. the please select value)
			label: 'Please select',				// The label to be added to the new dropdown
			appendAfter: '.dynamic_dropdown',	// The id of the element to append the new dropdown to after
			submitButton: '.no_script',			// The identifier for the submit button used for degradation
			submitButtonVal: 'Submit'			// The value of the submit button
		}, configuration);

		return this.each(function(){

			// Find the dropdown menu
			var dropdown = jQuery(this);

			// Set the image variable
			var image;

			// Set the new data variable
			var new_data;

			// If there is a submit button next to the dropdown for degradation find it and hide it
			if(submit_button === undefined)
				var submit_button = jQuery(this).closest('form').find("button" + configuration.submitButton + "[type='submit']").hide();

			// Run the function straight off
			checkToLoad();

			jQuery(dropdown).change(function(){

				// Run the function
				checkToLoad();
			})

			// Checks whether to load dynamic data
			function checkToLoad()
			{
				// Get the selected value
				var selected = jQuery(dropdown).find('option:selected').val();

				// Check if the value does not equal the no select value
				if (selected !== configuration.noSelectVal)
				{
					// Remove the old data (this seems to be the only way to do this!)
					if (new_data !== undefined)
					{
						new_data.remove();
					}
					
					// Define ajax loader as new data
					image = jQuery('<p class="loader"><img src="' + configuration.loader + '" /> Loading...</p>');

					// Append to DOM
					jQuery(configuration.appendAfter).after(image);

					// Append to the url the value that has just been selected
					configuration.url = jQuery(dropdown).attr('data-url') + selected;

					// If so we need to get values from ajax
					jQuery.ajax({
					url: configuration.url,
					dataType: 'text',
					type: 'GET',
					success: function(data){
						addHTML(data, dropdown)
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert('There has been a problem communicating with the server, please refresh this page! \n If the problem continues please contact Mukuru		');
					}});
				}
				else if (new_data !== undefined)
				{

					// Remove previously added values
					new_data.remove();

					// Hide submit button
					submit_button.hide();
				}

			}


			// Load the dropdown form with the values returned from the db
			function addHTML(data, dropdown)
			{
				// Set new data as the just returned data
				new_data = jQuery(data);

				// Replace image loader with data from ajax
				jQuery(image).replaceWith(new_data);

				// Change the value and name to the the submit button value
				submit_button.text(configuration.submitButtonVal).attr('name', configuration.submitButtonVal).show();

				// Bind a function
				dropdown.bind('dyn_drop', function(){});

				// Create a global event to indicate that the dropdown has arrived
				jQuery('body').trigger('dynamic_dropdown.complete');
			};
		})
	}
})
(jQuery);
