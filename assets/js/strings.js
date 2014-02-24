$(document).ready(function() {
	
var strings={
'gs_step1':
'<script type="text/javascript" src="./ChangeOrgApi/sha256.js"></script>\n\
<script type="text/javascript" src="./ChangeOrgApi/base.js"></script>'

};

	var el;
	for(var key in strings) {
		el=$('[data-string="'+key+'"]');
		if(el.length)
			el.html(htmlEntities(strings[key]));
	}

	function htmlEntities(str) {
	    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}
});