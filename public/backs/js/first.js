/**
 * Created by Administrator on 2018/6/26.
 */


$(function(){



  var currentPage = 1;//当前页码
  var pageSize = 2;//每页多少条
  render();

  function render(){

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function( info ){
        console.log(info);

        var htmlStr = template("tpl",info);
        $('tbody').html(htmlStr);




      //  分页插件  首先定义插件的版本号
        //分页初始化
        $("#paginator").bootstrapPaginator({
          //手动指定版本号
          bootstrapMajorVersion:3,
          //总共的页数
          totalPages:Math.ceil(info.total/info.size),
          //当前是第几页
          currentPage:info.page,
          //配置按钮点击事件   page当前页
          onPageClicked(a,b,c,page){
            currentPage = page;
            render();
          }

        })
      }
    })



  }


//2.点击添加分类按钮   显示模态框

$("#addBtn").click(function(){
  $("#addModal").modal("show");
})

//3.通过表单校验  校验模态框
  $("#form").bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    //指定校验字段
    fields:{
      categoryName:{
        //配置校验的规则
        validators:{
          //非空校验
          notEmpty:{
            message:"一级分类的名称不能为空"
          }
        }
      }
    }















  })

//4.阻止表单的submit的提交事件  然后由我们自己用ajax事件提交
  //// 4. 注册表单校验成功事件, 阻止默认成功的提交, 通过 ajax 进行提交

  $("#form").on("success.form.bv",function( e ){
    //阻止事件
    e.preventDefault();
    //通过自己设置的ajax提交
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        //添加成功
        //1.关闭模态框
        //2.重新渲染数据
        //3.重置状态
        if(info.success){
          $("#addModal").modal("hide");
          //重新渲染数据   显示在第一页最好
          currentPage = 1;
          render();

          //重置表单的状态
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })

  });





});









































