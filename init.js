var nbInit = new Vue({
    el: '#initApp'
    , computed: {
        $layer: function () {
            return layui.layer;
        }
        , $form: function () {
            return layui.form;
        }
        , $: function () {
            return layui.$;
        }
    }
    , data: {
        step: 1
        , step1Data: {
            dbName: ''
            , dbUser: ''
            , dbPass: ''
            , dbHost: ''
            , dbTablePre: ''
        }
        , step2Data: {
            logoText: ''
            , username: ''
            , password: ''
            , repeatPass: ''
            , email: ''
        }
    }
    , methods: {
        testMySQL: function () {
            this.$.post('http://127.0.0.1:8088/initApp'
                , this.step1Data
                , function (json) {
                    console.log(json)
                });
        }
        , nextStep: function () {
            if (this.step1Data.dbName !== ''
                && this.step1Data.dbUser !== ''
                && this.step1Data.dbPass !== ''
                && this.step1Data.dbHost !== ''
                && this.step1Data.dbTablePre !== '') {
                this.step = 2;
            } else {
                this.$layer.msg('请正确填写所有内容！', {icon: 7, skin: 'layui-layer-molv'});
            }
        }
        , prevStep: function () {
            this.step = 1;
        }
    }
});


//监听提交
nbInit.$form.on('submit(nbInit)', function () {
    var submitData = nbInit.$.extend(nbInit.step1Data, nbInit.step2Data);
    if (nbInit.step2Data.password !== nbInit.step2Data.repeatPass) {
        nbInit.$layer.msg('两次输入的密码不一致！', {icon: 7, skin: 'layui-layer-molv'});
    } else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(nbInit.step2Data.email)) {
        nbInit.$layer.msg('请输入正确的邮箱！', {icon: 7, skin: 'layui-layer-molv'});
    } else {
        var html = '<p style="color: #FF5722;">请确认您所填的信息</p>';
        for (var o in submitData) {
            if (submitData.hasOwnProperty(o)) {
                var labelName = nbInit.$("input[name=" + o + "]").parents("div.layui-form-item").find("label").text();
                html += '<p>' + labelName + '：' + submitData[o] + '</p>';
            }
        }
        var index = nbInit.$layer.confirm(html, {
            btn: ['确定', '重填']
            , title: '确认信息'
        }, function () {
            nbInit.$.post('http://127.0.0.1:8088/initApp'
                , submitData
                , function (json) {
                    console.log(json);
                    nbInit.$layer.close(index);
                });
        });

    }
    return false;
});


