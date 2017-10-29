@ECHO OFF
SET BIN_TARGET=%~dp0/../deployer/deployer/bin/dep
php "%BIN_TARGET%" %*
