/**
 * Created by Administrator on 2018/6/26.
 */

$(function(){

  var currentPage = 1; //当前页

  var pageSize = 5;//每页多少条

  var currentId;
  var isDelete;

  render();

  function render(){

    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function( info ){
        //console.log(info);
        var htmlStr = template( "tpl",info);
        $('tbody').html( htmlStr );



        //分页初始化
        $("#paginator").bootstrapPaginator({
          //指定版本
          bootstrapMajorVersion:3,//需要定义版本号   ul
          //总共多少页
          totalPages:Math.ceil(info.total/info.size),
          //当前页是第几页
          currentPage:info.page,
          //配置按钮点击事件  page表示当前页面
          onPageClicked(a,b,c,page){
            //更新当前页
            currentPage = page;
            //重新渲染数据
            render();
          }
        })
      }
    })
  }


  // 2. 启用禁用功能, 点击按钮, 弹出模态框(复用, 用的是同一个模态框)
  //    通过事件委托来注册点击事件, 效率更高

$("tbody").on("click",".btn",function(){
  $("#userModal").modal("show");//让模态框显示
  //点击按钮的时候  将当前用户的id记录在全局环境中
  currentId = $(this).parent().data("id");
//点击禁用按钮的时候 将用户的状态变成禁用  将isDelete变成0 传递给后台
  isDelete = $(this).hasClass("btn-danger") ? 0:1;
});

  //3.点击确认按钮的时候 根据 id  和 isDelete 发送ajax请求的状态  更改数据

$("#submitBtn").click(function(){


  //发送ajax请求
  $.ajax({
    type:"post",
    url:"/user/updateUser",
    data:{
      id:currentId,
      isDelete:isDelete
    },
    dataType:"json",
    success:function(info){
      //console.log(info);
      //关闭模态框
      $("#userModal").modal("hide");
      //重新渲染数据
      render();
    }
  })
})









});