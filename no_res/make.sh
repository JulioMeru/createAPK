#!/bin/bash

SDK=~/Desktop/android/android_sdk
KEYSTORE=$SDK/keystore.jks
AAPT=$SDK/build-tools/34.0.0/aapt
SIGNER=$SDK/build-tools/34.0.0/apksigner
D8=$SDK/build-tools/34.0.0/d8
ANDROID_JAR=$SDK/platforms/android-34/android.jar

echo Clean files
rm -f dex/*
rm -f *.apk
rm -f *.class
rm -f *.idsig
echo Compile code
javac -classpath $ANDROID_JAR MainActivity.java
if [ ! $? -eq 0 ]; then exit; fi
echo Generate bytecode
$D8 --lib $ANDROID_JAR MainActivity.class
mv classes.dex dex/
echo Package app
$AAPT package -M AndroidManifest.xml -I $ANDROID_JAR -F unsigned.apk dex/
echo Sign app
$SIGNER sign --ks $KEYSTORE --ks-key-alias androidKey --ks-pass pass:android --key-pass pass:android --out output.apk unsigned.apk
echo Install on device
adb install -r output.apk
