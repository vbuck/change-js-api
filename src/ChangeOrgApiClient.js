/**
 * ChangeOrgApiClient
 *
 * A standardized object for transporting Change.org API developer credentials.
 *
 * @see https://github.com/change/api_docs/blob/master/v1/documentation/authentication.md
 *
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiClient=function(data) {

	this._data={};

	/**
	 * Get default client properties.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {
			api_key	: '',
			secret 	: ''
		};
	};

	/**
	 * Get the client API key.
	 * 
	 * @return string
	 */
	this.getApiKey=function() {
		return this._data.api_key;
	};

	/**
	 * Get the client secret.
	 * 
	 * @return string
	 */
	this.getSecret=function() {
		return this._data.secret;
	};

	/**
	 * Set the client API key.
	 * 
	 * @param string apiKey
	 * @return ChangeOrgApiClient
	 */
	this.setApiKey=function(apiKey) {
		this._data[api_key]=apiKey;

		return this;
	};

	/**
	 * Set the client secret.
	 * 
	 * @param string secret
	 * @return ChangeOrgApiClient
	 */
	this.setSecret=function(secret) {
		this._data[secret]=secret;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	this._data=this._getDefaults();

 	if(typeof data=='object') {
		for(var key in data) {
			this._data[key]=data[key];
		}
	}

};