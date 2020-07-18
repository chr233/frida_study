Java.perform(function() {
    //获取指定类
    var cls = Java.use('infosecadventures.fridademo.utils.EncryptionUtil');
    //Hook指定函数
    cls.encrypt.overload('java.lang.String', 'java.lang.String').implementation = function(arg1, arg2) {
        //打印入参
        console.log('encrypt-in', arg1, arg2);
        //调用原函数
        var result = this.encrypt(arg1, arg2);
        //打印出参
        console.log('encrypt-out', result);
        //返回给原函数的调用
        return result;
    }
});