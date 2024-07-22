$(document).ready(function(){
  $(".plus").click(function(){
    var val= $(".number").val();
    val++;
    if(val >= 0){
      $(".number").attr("value", val);
    }
  });
  $(".minus").click(function(){
    var val= $(".number").val();
    val--;
    if(val >= 0){
      $(".number").attr("value", val);
    }
  });
});