#!/bin/bash
set -e

if [ ! -f AndroidManifest.xml ]; then
	echo " Error: Not an Android path?"
	exit
fi
PACKAGE=$(xmllint --xpath 'string(//manifest/@package)' AndroidManifest.xml)
PACKAGE_PATH=${PACKAGE//./\/}
if [ -d assets/ ]; then ASSETS_FLAG=" -A assets"; fi
SDK=./sdk
APKNAME=output

rm -rf build/*
mkdir -p build/apk build/gen build/obj
echo Generate R.java
${SDK}/aapt package -f -m -J build/gen -S res/ -M AndroidManifest.xml -I ${SDK}/android.jar
echo Compile code
javac --release 11 -classpath ${SDK}/android.jar -d build/obj build/gen/${PACKAGE_PATH}/R.java java/${PACKAGE_PATH}/*.java
echo Make Dalvik code
${SDK}/d8 --release --lib ${SDK}/android.jar --output build/apk build/obj/${PACKAGE_PATH}/*.class
echo Package into apk
${SDK}/aapt package -f -M AndroidManifest.xml ${ASSETS_FLAG} -S res/ -I ${SDK}/android.jar -F build/${APKNAME}.unsigned.apk build/apk
echo Align apk
${SDK}/zipalign -f -p 4 build/${APKNAME}.unsigned.apk build/${APKNAME}.aligned.apk
echo Sign apk
${SDK}/apksigner sign --ks ${SDK}/keystore.jks --ks-key-alias androidKey --ks-pass pass:android --key-pass pass:android --out build/${APKNAME}.apk build/${APKNAME}.aligned.apk
