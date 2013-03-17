

  function get_py(id_q) {
    url="http://api.laolin.com/rest/api/pinyin/list/"+
    'js=1&func=set_info_box_main'+
    '&q='+$('#'+id_q).attr('value');
    py_waiting(0);
    laolin.fn.loadJs('pyscript',url);//会调用 set_info_box_main(htm)
    return false;
  }
  
  //这个函数是给 ajax文件生成js代码回调用的
  function set_info_box_main(str) {
    $('#info-box-main').html(str);
     py_done();
  }
  
  function py_waiting(n) {
    MAX_WAIT=8;
    n++;
    if(n>=MAX_WAIT) {
      set_info_box_main('[error]网络超时。');
      return;
    }
    txt='查询中';
    if(n>2) {//3秒以后再数秒，这样正常网速下就不会出现数秒这破事了
      txt+="("+(MAX_WAIT-n)+")";
    }
    $("#py_btn").attr('value',txt).attr('disabled',true);
    laolin.data.py_timeid=setTimeout("py_waiting("+n+")",1000);

  }
  function py_done() {
    $("#py_btn").attr('value','查询').attr('disabled',false);
    clearTimeout(laolin.data.py_timeid);
  }