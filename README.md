This jQuery plugin allows content to be loaded dynamically via ajax upon change of a dropdown menu, useful for using a dropdown menu to define the content that will appear below it.

It is designed with progressive enhancement in mind, with the configuration options allowing you to define the id of a submit button used as a fallback method for loading the content if the user has javascript switched off which the plugin will then hide for those with javascript.

To get working, add this script and the jQuery library to your page, and then bind the plugin to the dropdown you want to make dynamic. The dropdown should have the ajax url defined as a "data-url" attribute e.g:


	<select name="dynamic_dropdown" data-url="http://example.com/load_via_ajax.php">
		<option value="_NO_SELECTION_">Please select a page...</option>
		<option value="home">Home</option>
		<option value="contact">Contact</option>
	</select>


	jQuery(document).ready(function()
	{
		jQuery("select[name='dynamic_dropdown']").dynamic_dropdown();
	}