
$(function(){
  var app;
  
  //===========================================
  app={};
  app.name='index';
  app.disc='首页';
  //app.loginfo="请先<a href='#login'>登录</a>";
  app.path='apps/index/';
  app.items={'':{disc:app.disc,html:'index.html',css:'',js:''},
      'about':{disc:'关于软件',html:'about.html',css:'',js:''},
      'about-laolin':{disc:'关于作者',html:'about-laolin.html',css:'',js:''},
      'contact':{disc:'意见反馈',html:'contact.html',css:'',js:''}
      };
  app.css='app.index.css';
  app.js='';
    
  regApp(app);
  //===========================================
  app={};
  app.name='pinyin';
  app.disc='查拼音';
  //app.loginfo="请先<a href='#login'>登录</a>";
  app.path='apps/pinyin/';
  app.items={'':{disc:app.disc,html:'index.html',css:'',js:'index.js'},
      'about':{disc:'说明',html:'about.html',css:'',js:''}
      };
  app.css='app.pinyin.css';
  app.js='';
  regApp(app);
  //===========================================
  
  
  
  //MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
  appdef='pinyin';//默认app
  console.log('router start.');
  laolin.router.start();
  
  if(typeof(laolin.router.activeApp)=='undefined') {
    console.log('no activeApp, activing app: '+appdef);
    laolin.router.app.navigate(appdef+'/',{trigger: true});
  }

});

function activeApp(appname) {
  console.log('activeApp: '+appname);
  app=laolin.router.allApps[appname];
  var tdata={};
  tdata['sitename']='首页';
  tdata['appname']=app.disc;
  tdata['nav_items']={};
  for(p in app.items) {
    tdata['nav_items']['#'+app.name+'/'+p]=app.items[p]['disc'];
  }
  tdata['loginfo']=app.loginfo||'';
  set_top_nav(tdata);
  laolin.router.activeApp=appname;
  
  if(app.css)laolin.fn.loadCss('app_css_'+app.name,app.path+app.css);
  if(app.js)laolin.fn.loadJs('app_js_'+app.name,app.path+app.js);
  
}  
function regApp(app) {
  
  if(!laolin.router.hasOwnProperty('allApps')){ 
    console.log('start init allApps at app: '+app.name);
    laolin.router.allApps={};
  }
  console.log('regApp: '+app.name);
  laolin.router.allApps[app.name]=app;
  laolin.router.add(app.name,function (item) {
    if(typeof(item)=='undefined')item='';
    
    console.log('Got Router at activeApp='+app.name+', item='+item);
    if(laolin.router.activeApp!=app.name){
      laolin.router.activeApp=app.name;
      activeApp(app.name);
    }
    laolin.router.activeItem=item;
    iObj=app.items.hasOwnProperty(item)?app.items[item]:app.items[''];
    $.get(app.path+iObj.html,function(htm){
      set_main_box(htm);
      if(iObj.css)laolin.fn.loadCss('app_item_css_'+app.name+item,app.path+iObj.css);
      if(iObj.js)laolin.fn.loadJs('app_item_css_'+app.name+item,app.path+iObj.js);
      document.title=iObj.disc+'-'+app.disc;
      //hilight nav Item: 
      var hash=window.location.hash;
      $('.navbar .nav a').parent().removeClass('active');//全变灰
      $('.navbar .nav a[href="'+hash+'"]').parent().addClass('active');//与当前URL相符的亮显
    });
  });
  
}
