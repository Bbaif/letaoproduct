/**
 * Created by Administrator on 2018/6/29.
 */


$(function(){
  // 1. 一级分类进行数据渲染
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr = template("tpl",info);
      $(".lt_category_left ul").html(htmlStr);
      // 应该根据第一个一级分类的 id, 进行渲染二级分类
      renderSecondByid(info.rows[0].id)

    }
  });



  // 2. 点击左侧按钮, 获取当前点击的 一级分类id, 让二级列表重新渲染
  //    用事件委托给 a 注册点击事件
  $(".lt_category_left").on("click","a",function(){
      var id = $(this).data("id");

    renderSecondByid(id)


    $(this).addClass("current").parent().siblings().find("a").removeClass("current")
  });



//2.进行二级数据渲染
  function renderSecondByid(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("rightTpl",info);
        $(".lt_category_right ul").html(htmlStr)
      }
    })
  }



})










































