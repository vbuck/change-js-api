<?php

require_once 'ChangeOrgApiProxy.php';

ChangeOrgApiProxy::setSecretKey('YOUR_SECRET_KEY');

if(ChangeOrgApiProxy::validate($_GET)) {
	echo ChangeOrgApiProxy::fetch($_GET);
}