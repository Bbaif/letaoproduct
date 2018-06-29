/**
 * Created by Administrator on 2018/6/29.
 */




$(function(){











  // 功能1: 搜索历史记录渲染功能
  // (1) 获取本地存储中存储的数据 jsonStr
  // (2) 转换成数组
  // (3) 将数组, 通过模板引擎渲染历史记录

  //获取历史记录的数组

  render();

  function getHistory(){
    var history = localStorage.getItem("search_list") || '[]';


    var arr = JSON.parse(history);
    return arr;
  }

  //读取历史记录  进行页面渲染
  function  render(){
    var arr = getHistory();
    var htmlStr = template("history_tpl",{arr:arr});
    $(".lt_history").html(htmlStr)
  }




  // 功能2: 删除一条记录的功能
  // (1) 点击删除按钮, 删除该条记录, 添加点击事件 (事件委托)
  // (2) 将 数组下标存储在 标签中, 将来用于删除
  // (3) 获取 下标, 根据下标删除数组的对应项  arr.splice( index, 1 );
  // (4) 将数组存储到本地历史记录中
  // (5) 重新渲染

  $(".lt_history").on("click",".icon_delete",function(){
      var that = this;

      //mui 确认框
    mui.confirm("你确认要删除该条数据么","温馨提示",["取消","确认"],function(e){
      if(e.index===1){
      //    获取下标
        var index = $(this).data("index");
        //获取数组
        var arr = getHistory();
        //根据下标删除对应的项
        arr.splice(index,1);
        //储存到本地
        localStorage.setItem("search_list",JSON.stringify(arr));

        //重新渲染数据
        render();
      }
    })
  })


//功能3. 清空记录
  //给清空按钮添加点击事件  用事件委托
  //将search_list从本地储存中删除
  //将页面重新渲染
  $(".lt_history").on("click",".icon_empty",function(){
    //添加确认框
    mui.confirm("你确认要清除数据么","温馨提示",["取消","确认"],function(e){
      if(e.index===1){
        //清除search_list
       localStorage.removeItem("search_list");
        //重新渲染数据
        render();
      }
    })
  })



  //4.添加搜索历史记录

  //1.给搜索按钮添加点击事件
  //2.获取搜索关键字吧
  //获取数组
  //添加到数组最前面
  //储存在本地历史记录中
  //重新渲染数据
  $(".search_btn").click(function(){
    //获取搜索关键字
    var key = $('.search_input').val();
    //判断如果数据是空时
    if(key==""){
      // 默认两秒
      mui.toast("请输入搜索关键字");
      return;
    }
    //获取数组
    var arr = getHistory();
    //添加在数组的在最前面
   //需求
    //1.不能有重复的  如果有就将数组中的数据删除
    //2.如果数组的长度大于10的时候  删除最后面的数据
    var index = arr.indexOf(key);
    if(index >-1){
      //说明有  将重读的数据删除
      arr.splice(index,1)
    }
    if(arr.length >=10){
      //如果数组的长度大于等于10
      arr.pop();
    }
    //添加在数组的最前面
    arr.unshift(key);
    //储存在本地
    localStorage.setItem("search_list",JSON.stringify(arr));

    //重新渲染数据
    render();

    //清空搜索框
    $('.search_input').val("");

    //进行页面跳转
    location.href="searchList.html?key=" + key;
  })























































});








































































