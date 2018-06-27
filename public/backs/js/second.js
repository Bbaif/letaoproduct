/**
 * Created by Administrator on 2018/6/26.
 */


$(function(){

  var currentPage = 1;
  var pageSize = 5;



  render();

  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("tpl",info);
        $("tbody").html(htmlStr);


        //分页插件的使用
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked(a,b,c,page){
            //更新currentPage
            currentPage = page;
            //渲染数据
            render();
          }

        })
      }
    })
  }


//2.点击添加分类  显示模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");


    //使用ajax渲染 下拉菜单的数据
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        var htmlStr = template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  })

//3.给dropdown-menu  注册事件委托  让a可以被点击
  $(".dropdown-menu").on("click","a",function(){


    //获取选中的文本  设置给按钮
    var txt = $(this).text();
    $("#dropdownTxt").text(txt);

    //获取id 设置name=categoryId
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);


    // 用户选择了一级分类后, 需要将 name="categoryId" input 框的校验状态置成 VALID
    // 参数1: 字段名, 参数2: 设置成什么状态, 参数3: 回调(配置提示信息)
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  })


//4.  // 4. 进行 jquery-fileupload 实例化, 里面配置图片上传后的回调函数

    $("#fileupload").fileupload({
      //返回的数据的类型
      dataType:"json",

      // 图片上传完成的回调函数
      // e：事件对象
      // data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
        console.log(data.result.picAddr);
        var picUrl = data.result.picAddr; // 上传后得到的图片地址

        // 设置图片地址给 图片
        $('#imgBox img').attr("src", picUrl)

        // 将图片地址存在 name="brandLogo" 的 input 框中
        $('[name="brandLogo"]').val( picUrl );

        // 手动将表单校验状态重置成 VALID
        $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }
    })


  //5.表单状态的校验

  $("#form").bootstrapValidator({

    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //   默认不校验 隐藏域的 input, 我们需要重置 excluded 为 [], 恢复对 隐藏域的校验

    excluded:[],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    //配置文本的状态

    fields:{
      //categoryId 用户选择一级分类 id
      //brandName  用户输入二级分类名称
      //brandLogo  上传的图片地址
      categoryId:{
        //配置校验规则
        validators:{
          //非空校验
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        //配置校验规则
        validators:{
          //非空校验
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      brandLogo:{
        //配置校验规则
        validators:{
          //非空校验
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }






  })




  //6.阻止表单中submit的默认提交
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();


    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);

        if(info.success){
          //添加成功
          //关闭模态框
          //重新渲染页面
          //重置表单
          $("#addModal").modal("hide");
          //重置表单
          $("#form").data("bootstrapValidator").resetForm(true);
          //重新渲染
          //显示为第一页面
          currentPage:1;
          render()


          //由于下拉框和图片不是表单  所有需要手动设置
          $("#dropdownTxt").text("请选择一级分类");
          $("#imgBox img").attr("src","images/none.png");
        }
      }
    })


  })





})
















































