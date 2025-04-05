RPGMV game to Android:

Use RPG_Maker_toAndroid-master repository. Replace www files and build APK.

If audio loading error because of missing m4a files, must convert to m4a:
	ffmpeg -i sound.ogg -c:a aac -vn -b:a 160k sound.m4a
Or all files:
	for f in *.ogg; do ffmpeg -i "${f}" -c:a aac -vn -b:a 160k "${f%.ogg}.m4a"; done

If audio files were encrypted, unencrypt all of them using "petschko.org" and setting "hasEncryptionAudio" to "false" in www/data/System.json

Compiling to Android doesn't accept files names with unicode characters. Must be renamed and Maps files that use those filenames must be modified.

Decompile an APK and Compile it back:



Decompile APK:
	java -jar apktool.jar d [apk] -o [new decompile dir]

Decompile without resource files:
	java -jar apktool.jar d -r -s [apk] -o [new decompile dir]

Recompile APK:
	java -jar apktool.jar b [decompiled dir]

Align APK:
	zipalign -v 4 [recompiled apk] [new align apk]

Align APK overwriting it:
	zipalign -f v 4 infile.apk outfile.ak

Confirm alignment:
	zipalign -c -v 4 existing.apk

Create keystore for signing:
	keytool -genkey -v -keystore  [release.keystore] -alias alias_name -keyalg ARS -keysize 2048 -validity 10000

Sign app:
	apksigner sign --ks [release.keystore] --v1-signing-enable true --v2-signing-enable true [aligned.apk]

Verify signing:
	apksigner verify [signed.apk]



ADB


Show devices plugged:
	adb devices -l

Install APK:
	adb install [app.apk]

Run APK on device:
	adb shell am start -n [com.package.name]/[com.package.name].[MainActivity]

Copy from PC to device:
	adb push [file | dir] "/storage/sdcard0/Download" <- or other location
# If above directory doesn't exist, try "/storage/emulated/0/Download"

Copy from device to PC:
	adb pull [/data/app/com.example.someapp-2.apk] [/home/user1/Desktop/]

Show installed packages:
	adb shell pm list packages

Get package path:
	adb shell pm path [com.example.someapp]



Run java on Android

Compile class that uses library "commons-cli":
	javac -source 1.7 -target 1.7 -d bin -cp lib/commons-cli-1.3.1.jar src/com/example/HelloWorld.java

Make sure it compiled properly:
	java -cp lib/commons-cli-1.3.1.jar:bin com.example.HelloWorld

Convert to Dalvik code:
	./android-sdk-linux/build-tools/23.0.2/dx --output=helloworld.jar --dex ./bin lib/commons-cli-1.3.1.jar

Create shellscript wrapper "helloworld.sh" with contents:
	base=/data/local/tmp/helloworld
	export CLASSPATH=$base/helloworld.jar
	export ANDROID_DATA=$base
	mkdir -p $base/dalvik-cache
	exec app_process $base com.example.HelloWorld "$@"

Push everything to device:
	adb shell mkdir -p /data/local/tmp/helloworld
	adb push helloworld.jar /data/local/tmp/helloworld
	adb push helloworld.sh /data/local/tmp/helloworld
	adb shell chmod 777 /data/local/tmp/helloworld/helloworld.sh

Run script:
	adb shell /data/local/tmp/helloworld/helloworld.sh