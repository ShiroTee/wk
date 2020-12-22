call generateKeyPair.bat apmserver apmserverpass serverStore.jks keystorePass serverKey.rsa
call generateKeyPair.bat apmclient apmclientpass clientStore.jks keystorePass clientKey.rsa
keytool -import -alias apmserver -file serverKey.rsa -keystore clientStore.jks -storepass keystorePass -noprompt
keytool -import -alias apmclient -file clientKey.rsa -keystore serverStore.jks -storepass keystorePass -noprompt