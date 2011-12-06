// Plugin: This is quiet messy for now
// Need refactor and you can improve it
(function($) {
	$.fn.enableInlineEdit = function () {
		if(!this.length) return;

		// Loop through all apply elements
		this.each(function () {
			$("li", this).each(function () {

				// Wrap up text node with a <span>
				$(this).html("<span>" + $(this).text() + "</span>");

				// Build button and add next to each
				$("<button>", {

					class: "edit-trigger",
					text: "Edit"

				}).click(function () {

					// Only allow one edit per time
					$("input", $(this).parent().parent()).remove();
					$("span", $(this).parent().parent()).show();

					original = $("span", $(this).parent());
					original.hide();

					// Build editable input
					$("<input>", {
						type: "text",
						value: original.text()
					}).keydown(function (e) {
						// Press Esc
						if(e.which == 27) {
							$(this).remove();
							original.show();
						}

						// Press Enter
						if(e.which == 13) {
							original.text($(this).val()).show();
							$(this).remove();
						}

					}).prependTo($(this).parent()).focus().select();

				}).appendTo(this);
			});
		});
	}
})(this.jQuery);

// Usage
$(function () {
	$(".data-list").enableInlineEdit();
});

