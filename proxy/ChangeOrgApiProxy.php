<?php

/**
 * Proxy for cross-domain requests to the Change.org API.
 *
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

final class ChangeOrgApiProxy {

	private static $_api='https://api.change.org';
	private static $_methods=array('get','post');
	private static $_contentTypes=array('application/x-www-form-urlencoded','application/json');
	private static $_secretKey=false;

	/**
	 * Create a new cURL resource from the request data.
	 * 
	 * @param array $data
	 * @return resource
	 */
	private static function _getConnection(array $data) {
		$connection=curl_init();

		curl_setopt_array($connection,array(
			CURLOPT_HEADER 			=> false,
			CURLOPT_RETURNTRANSFER	=> true,
			CURLOPT_URL 			=> self::getUrl($data),
			CURLOPT_HTTPHEADER		=> self::isPost($data)?array('Content-Type: '.urldecode($data['c'])):array()
		));

		$data['p']=self::signRequest($data['p']);

		if(self::isPost($data)) {
			curl_setopt($connection,CURLOPT_POST,true);
			curl_setopt($connection,CURLOPT_POSTFIELDS,$data['p']);
		}
		else {
			curl_setopt($connection,CURLOPT_HTTPGET,true);
		}

		return $connection;
	}

	/**
	 * Append query parameters to the given URL.
	 * 
	 * @param string $url
	 * @param array $params
	 * @return string
	 */
	public static function addParams($url,$params) {
		if(!is_array($params)) {
			$params=self::expandRequest($params);
		}

		$parts=explode('?',$url);
		$existingParams=array();
		if(count($parts)>1) {
			$existingParams=self::expandRequest(array_pop($parts));
		}

		$params=array_merge($existingParams,$params);
		$paramParts=array();

		foreach($params as $key=>$value) {
			$paramParts[]="{$key}=".urlencode($value);
		}

		return array_shift($parts).(count($paramParts)?'?'.implode('&',$paramParts):'');
	}

	/**
	 * Debug the given request.
	 * 
	 * @param array $data
	 * @return null
	 */
	public static function debug($data) {
		echo "ChangeOrgApiProxy::debug\n\nRequest URL: {$data['r']}\nRequest Method: {$data['m']}\nContent-Type: {$data['c']}\nRequest:\n----\n";

		foreach(self::expandRequest($data['p']) as $key=>$value) {
			echo "{$key}: {$value}\n";
		}

		echo "----\n";

		return null;
	}

	/**
	 * Expand a request body into an array.
	 * 
	 * @param string $requestBody
	 * @return array
	 */
	public static function expandRequest($requestBody) {
		$data=array();
		$parts=explode('&',$requestBody);

		foreach($parts as $part) {
			$pair=explode('=',$part);
			$data[$pair[0]]=urldecode($pair[1]);
		}

		return $data;
	}

	/**
	 * Fetch the results of the request.
	 * 
	 * @param array $data
	 * @return string
	 */
	public static function fetch(array $data) {
		if($data['d']) {
			return self::debug($data);
		}

		$connection=self::_getConnection($data);
		
		$result=curl_exec($connection);

		curl_close($connection);

		return $result;
	}

	/**
	 * Get the API URL.
	 * 
	 * @return string
	 */
	public static function getApi() {
		return self::$_api;
	}

	/**
	 * Get the full request URL.
	 * 
	 * @param array $data
	 * @return string
	 */
	private static function getUrl(array $data) {
		if(self::isPost($data)) {
			return urldecode($data['r']);
		}

		return self::addParams(urldecode($data['r']),$data['p']);
	}

	/**
	 * Check if the request method is GET.
	 * 
	 * @param array $data
	 * @return boolean
	 */
	public static function isGet(array $data) {
		return (strcasecmp($data['m'],'post')!=0);
	}

	/**
	 * Check if the request method is POST.
	 * 
	 * @param array $data
	 * @return boolean
	 */
	public static function isPost(array $data) {
		return (strcasecmp($data['m'],'post')==0);
	}

	/**
	 * Set the API URL.
	 * 
	 * @param string $url
	 */
	public static function setApi($url) {
		self::$_api=$url;
	}

	/**
	 * Set the client secret key.
	 * 
	 * @param string|boolean $key
	 */
	public static function setSecretKey($key=false) {
		self::$_secretKey=$key;
	}

	/**
	 * Sign the request.
	 * 
	 * @param string $requestBody
	 * @return string
	 */
	public static function signRequest($requestBody) {
		$data=self::expandRequest($requestBody);

		if(isset($data['server_sign']) && self::$_secretKey!==false) {
			unset($data['server_sign']);

			$body=array();
			foreach($data as $key=>$value) {
				if(!in_array($key,array('include_auth_key','auth_key'))) {
					$body[]="{$key}=".urlencode($value);
				}
			}

			$body=implode('&',$body);

			$body.=self::$_secretKey;

			if(isset($data['auth_key']) && isset($data['include_auth_key']) && $data['include_auth_key']) {
				$body.=$data['auth_key'];
				unset($data['auth_key']);
				unset($data['include_auth_key']);
			}
			elseif(isset($data['include_auth_key']))
				unset($data['include_auth_key']);

			$data['rsig']=hash('sha256',$body);

			$body=array();
			foreach($data as $key=>$value) {
				$body[]="{$key}=".urlencode($value);
			}

			return implode('&',$body);
		}

		return $requestBody;
	}

	/**
	 * Validate the proxied request structure.
	 * 
	 * @param array $data
	 * @return boolean
	 */
	public static function validate(array $data) {
		try {
			if(
				strcasecmp(substr($_GET['r'],0,strlen(self::$_api)),self::$_api)==0 && // Request URL must match API URL
				in_array(strtolower($_GET['m']),self::$_methods) && 
				in_array(strtolower($_GET['c']),self::$_contentTypes)
			) {
				return true;
			}
		}
		catch(Exception $error) {
			return false;
		}

		return false;
	}

}