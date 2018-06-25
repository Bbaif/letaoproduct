/**
 * Created by Administrator on 2018/6/25.
 */


//进行表单校验
//要求  1.用户名不能为空  长度为2-6位
//2.密码不能为空  长度为6-12位数字

$(function(){

  $("#form").bootstrapValidator({


    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    //指定校验字段
    fields:{
      username:{
        //配置校验的规则
        validators: {
          //配置非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          //配置长度校验
          stringLength: {
            min:2,
            max:6,
            message: " 用户名的长度必须在2-6位"
          },
          callback:{
            message: "用户名不存在"
          }
        }
      },
      //密码的配置
      password: {
        //配置校验规则
        validators: {
          //配置非空校验
          notEmpty:{
            message:"密码不能为空"
          },
          //配置长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码的长度必须在6-12位"
          },
          //定制一个专门用于回调函数的校验规则
          callback:{
            message: "密码错误"
          }
        }
      }
    }
  });







//2.使用submit  按钮  进行提交  表单校验插件  会在提交时  进行校验
//  *    (1) 如果校验成功, 会默认提交这次请求, 会进行跳转, 我们需要阻止这次提交, 通过 ajax 提交
//  *    (2) 如果校验失败, 会提示用户, 输入有误
//  *
//  *    需要注册表单校验成功事件, 在成功事件内, 阻止默认的表单提交, 通过 ajax 进行提交


$("#form").on("success.form.bv",function(e){
  //阻止默认的表单提交
  e.preventDefault();
  console.log("阻止了表单的默认提交,通过ajax提交");


  //通过ajax的提交
  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    //表单系列化 快速的收集表单
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info) {
      console.log(info);

      if(info.success){
        //登录成功,跳转到首页
        location.href = "index.html";
      }

      if(info.error ===1000){
        //1000 用户名不存在
        //将username的校验状态,  设置成失败状态
        $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
      }

      if(info.error ===1001){
        //密码错误
        //将password的校验状态  设置成失败的状态 并提示密码错误
        //字段名
        //校验状态 VALID 校验成功  INVALID 校验失败
        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
      }
    }
    })





























})










//3.重置表单的bug 重置表单不仅要重置内容  还是要重置状态
  $('[type="reset"]').click(function(){
    //调用插件提供的方法  进行重置校验状态
    //resetFrom  不传 true 只重置校验状态  传true  还会将表单的内容重置

    $('#form').data("bootstrapValidator").resetForm(true);
  });



});























































