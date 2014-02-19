/**
 * ChangeOrgApiException
 *
 * Library exception wrapper.
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiException=function(message) {

	return {
		name	 	: 'ChangeOrgApiException',
		'message' 	: message,
		toString 	: function() {
			return this.name+': '+this.message;
		}
	};

};