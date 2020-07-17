/*
 * @Author       : Chr_
 * @Date         : 2020-02-16 18:42:39
 * @LastEditors  : Chr_
 * @LastEditTime : 2020-07-17 22:41:34
 * @Description  : 注入代码
 */
console.log("脚本载入成功");

Java.perform(function() {
    //获取指定类
    var cls = Java.use('infosecadventures.fridademo.utils.EncryptionUtil');
    //加解密类
    var SecretKeySpec = Java.use('javax.crypto.spec.SecretKeySpec');
    var Cipher = Java.use('javax.crypto.Cipher');
    var String = Java.use("java.lang.String")

    //Hook指定函数
    cls.encrypt.overload('java.lang.String', 'java.lang.String').implementation = function(arg1, arg2) {
        //打印入参
        console.log('encrypt-in', arg1, arg2);
        //调用原函数
        var result = this.encrypt(arg1, arg2);

        //打印出参
        console.log('encrypt-out', result);

        //解密算法
        var skey = new SecretKeySpec(arg1, "AES");
        var cipher = new Cipher.getInstance("AES/ECB/PKCS5PADDING");
        cipher.init(Cipher.DECRYPT_MODE, skey);
        var plain = String(cipher.doFinal(result));

        //打印出参
        console.log('decrypt-out', plain);
        //返回给原函数的调用
        return result;
    }
});