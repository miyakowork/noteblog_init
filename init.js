var init = new Vue({
    el: '#initApp'
    , computed: {
        $form: function () {
            return layui.form;
        }
        , $layer: function () {
            return layui.layer;
        }
    }
    , data: {
        step: 1
        , step1Data: {
            dbName: ''
            , dbUser: ''
            , dbPass: ''
            , dbHost: ''
            , dbTablePrev: ''
        }
        , step2Data: {}
    }
    , methods: {
        testMySQL: function () {
            layer.msg(this.step1Data)
        }
        , nextStep: function () {
            this.step++;
        }
        , prevStep: function () {
            this.step--;
        }
    }
});

//监听提交
init.$form.on('submit(formDemo)', function (data) {
    init.$layer.msg(JSON.stringify(data.field));
    return false;
});
