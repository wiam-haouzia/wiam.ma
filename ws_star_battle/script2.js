//Declarations
  var ctx=document.getElementById('canvas').getContext('2d');
  var gameover = true;

  var Iship = new Image();
  Iship.src="ship.png";

  var Iball = new Image();
  Iball.src="bullet.png";

  var Fr = new Image();
  Fr.src = "ennemis/fr.png";

  var En = new Image();
  En.src = "ennemis/en.png";

  var En2 = new Image();
  En2.src = "ennemis/en2.png";

  var R = new Image();
  R.src = "ennemis/asteroid.png";

  var R2 = new Image();
  R2.src = "ennemis/asteroid2.png";

  var Fuel = new Image();
  Fuel.src = "ennemis/fuel.png"

  var kindE=[Fr,En,En2,R,R2,Fuel];

  var ennemis=[];

  var up    = false;
  var down  = false;
  var left  = false;
  var right = false;
  var space = false;
  var shoot = false;
  var ship  = null;
  var ball  = null;
  var score = 0;
  var fuel  = 30;
  var stop  = false;

  var t=null;
  var ss=0;
  var f=0;
  var s=null;
  var m =null;
  var ch=null;

  var sun = new Image();
  var moon = new Image();
  var mercury = new Image();
  var venus = new Image();
  var earth = new Image();
  var jupiter = new Image();
  var saturn = new Image();
  var dg = 0;



  sun.src = 'planets/sun.png';
  moon.src = 'planets/moon.png';
  mercury.src = 'planets/mercury.png';
  venus.src = 'planets/venus.png';
  earth.src = 'planets/earth.png';
  jupiter.src = 'planets/jupiter.png';
  saturn.src = 'planets/saturn.png';

function main()
{     

    $(".timer").html("00:00");
    $(".fuel").html("30");
    $(".score").html("0");
    score = 0;
    fuel  = 30;
    t=null;
    ss=0;
    ch="";
    f=0;
    gameover = false;
    ennemis=[];
    $('.score').html('0');
    $('.fuel').html('30');
    $('.start').css('display','none');
    $('.main').css('display','block');
    
    ship=DrawE(Iship,20,(canvas.height/2)-Iship.height/2,Iship.width/4,Iship.height,4,4)
    var IballX=ship.x+ship.w;
    var IballY=ship.y+ship.h;
    ball= AddI(Iball,IballX,IballY,Iball.width,Iball.height,10);
    
    Animate();

    e=setInterval(AddE,4000);
    ef=setInterval(AddF,5000);
    // clearInterval(t);
    t=setInterval(timer,1000);
    // clearInterval(f);
    f=setInterval(function(){
    fuel--;
    if (fuel<=0) end();
    $(".fuel").html(fuel);
    },1000);
}

function AddI(img,x,y,w,h,speed)
{
      var obj={
            img:img,
            x:x,
            y:y,
            w:w/2,
            h:h/2,
            tire:1,
            s:speed,
            draw:function()
            {
              ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
            }
      }
      return obj;
}
function AddF()
{      
      var YF=Math.floor(Math.random()*900)+50;
      var Size = Math.floor(Math.random() * 4);
      var Speed= Math.floor(Math.random()*3)+2;
      var nbf=16;
      ennemis.push(DrawE(Fuel,YF,0,Fuel.width/nbf,Fuel.height,Speed,nbf));
}

function AddE()
{
      var Y=Math.floor(Math.random()*374)+56;
      var kindER=kindE[Math.floor(Math.random()*5)];
      var Speed= Math.floor(Math.random()*3)+2;
      var nbf= 4;
      ennemis.push(DrawE(kindER,canvas.width,Y,kindER.width/nbf,kindER.height,Speed,nbf));
}
function DrawE(img,x, y ,w , h , speed , NbFrame) {
  return {
    img:img,
    x: x,
    y: y,
    w:w,
    h:h,
    s: speed,
    tire:1,
    srcX:0,
    srcY:0,
    curFrame:0,
    draw: function() 
    {
      this.curFrame = ++this.curFrame % NbFrame; 
      this.srcX = this.curFrame * w;
      ctx.drawImage(this.img,this.srcX,this.srcY,w,h,this.x,this.y,w,h);
    }
  };
}
function within(a,b,c)
{return( a>b && a<c );}

function collision(a,b)
{
      var result=false
      if(within(a.x , b.x , b.x+b.w) || within(a.x+a.w , b.x , b.x+b.w)){
            if( within(a.y , b.y , b.y+b.h) || within(a.y+a.h , b.y , b.y+b.h) ) result=true;
      }return result;
}

function Shoot()
{
    if(!shoot)
    {
       $('#shoot')[0].play();
       shoot=true;
       ball.x=ship.x+ship.w;
       ball.y=ship.y+ship.h/2
    }
}

$(document).keydown(function(event)
{     
      if(event.which===37)left=true;
      if(event.which===38)up=true;
      if(event.which===39)right=true;      
      if(event.which===40)down=true;
      if(event.which===32) {
        if(!gameover){
          Shoot();
        }
      }
      if(event.which===80) Stop();
});

$(document).keyup(function(event)
{
      if(event.which===37)left=false;
      if(event.which===38)up=false;
      if(event.which===39)right=false;      
      if(event.which===40)down=false;
});

function Animate()
{     erase();
      ennemis.forEach(function(enemy,i)
      {     
          if(enemy.img==Fuel) enemy.y+=enemy.s;
          else {enemy.x-=enemy.s;}
          if(collision(enemy,ship))
            { 
              switch(enemy.img)
              {
                case Fuel:
                  fuel+=10;
                  $(".fuel").html(fuel);
                  $('#star')[0].play();
                  ennemis.splice(i,1);
                break;

                case Fr:
                  console.log('ok')
                break;

                default:
                  fuel-=15;
                  $(".fuel").html(fuel);
                  $('#hit')[0].play();
                  ennemis.splice(i,1);
                break;
              }
            }
            enemy.draw();
      });

      if(up && ship.y>56) ship.y-=ship.s;
      if(down &&ship.y<432) ship.y+=ship.s;
      if(left &&ship.x>0) ship.x-=ship.s;
      if(right && ship.x<(canvas.width-ship.w)) ship.x+=ship.s;
      if(shoot) 
      {
        ball.x+=ball.s;
        ennemis.forEach(function(enemy,i)
        {
          if(collision(ball,enemy))
          { 
            space=false;
            switch(enemy.img)
            {
              case R:
                if(enemy.tire==0)
                {
                  $('#destroyed')[0].play();
                  score+=10;
                  $(".score").html(score);
                  ennemis.splice(i,1);
                }else enemy.tire--;
              break;

              case R2:
                if(enemy.tire==0)
                {
                  $('#destroyed')[0].play();
                  score+=10;
                  $(".score").html(score);
                  ennemis.splice(i,1);
                }else enemy.tire--;
              break;

              case Fr:
                score-=10;
                $(".score").html(score);
                $('#destroyed')[0].play();
                ennemis.splice(i,1);
              break;

              case Fuel:
                fuel+=10;
                $(".fuel").html(fuel);
                $('#destroyed')[0].play();
                ennemis.splice(i,1);
              break;

              default:
                score+=5;
                $(".score").html(score);
                $('#destroyed')[0].play();
                ennemis.splice(i,1);
              break;

            }
            

            shoot = false;
          }
        });
        if(ball.x>canvas.width) shoot=false;
        
        ball.draw();
      }
      ship.draw();
      if(!stop){
        if (gameover) 
        {
        }else window.requestAnimationFrame(Animate); 
      }   
}

function erase()
{
  ctx.clearRect(0,0,canvas.width,canvas.height); 
  ctx.strokeStyle = 'rgba(0,153,255,0.1)'; // circles for planets
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2); //check earth animation

  // Earth
  var time = new Date();
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() +20);
  ctx.translate(250,0);
  ctx.save();
  ctx.rotate((dg + 2*Math.PI)/90);
  ctx.drawImage(earth,-earth.width/2,-earth.height/2);
  ctx.restore();
  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,250,Math.PI*2,false); 
  ctx.stroke();


  // Moon
  ctx.save();
  ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );  
  ctx.translate(0,earth.width/2);
  ctx.drawImage(moon,-3.5,-3.5);
  ctx.restore();
  ctx.restore();



  // Mercury
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() -20);
  ctx.translate(200,0);
  ctx.save();
  ctx.rotate( (dg + 2*Math.PI)/90);
  ctx.drawImage(mercury,-mercury.width/2,-mercury.height/2);
  ctx.restore();
  ctx.restore();
  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,200,Math.PI*2,false); 
  ctx.stroke();

  // Venus
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds()+60);
  ctx.translate(220,0);
  ctx.save();
  ctx.rotate( (dg + 2*Math.PI)/90);
  ctx.drawImage(venus,-venus.width/2,-venus.height/2);
  ctx.restore();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,220,Math.PI*2,false); 
  ctx.stroke();


  // Jupiter
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() +100);
  ctx.translate(300,0);
  ctx.save();
  ctx.rotate((dg + 2*Math.PI)/90);
  ctx.drawImage(jupiter,-jupiter.width/2,-jupiter.height/2);
  ctx.restore();
  ctx.restore();
  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,300,Math.PI*2,false); 
  ctx.stroke();

  // Saturn
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() +0);
  ctx.translate(350,0);
  ctx.save();
  ctx.rotate((dg + 2*Math.PI)/90);
  ctx.drawImage(saturn,-saturn.width/2,-saturn.height/2);
  ctx.restore();
  ctx.restore();
  ctx.beginPath();
  ctx.arc(canvas.width/2,canvas.height/2,350,Math.PI*2,false); 
  ctx.stroke();

  //sun
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate((dg + 2*Math.PI)/180);
  ctx.drawImage(sun,-sun.width/2,-sun.height/2);
  ctx.restore();

  var gr = ctx.createRadialGradient(800,400,0,800,400,800);
  gr.addColorStop(0,'#05163f99');
  gr.addColorStop(1,'#00000099');
  ctx.fillStyle='#02071466';
  ctx.fillRect(0,0,1600,800);

  dg+=0.5;
}


function timer()
{
  ss++;
  s= ss % 60;
  m = (ss-s)/60;
  ch="";
  if(m<10) ch="0" +m+":";
  else ch=m+":";
  if(s<10) ch+="0" +s;
  else ch+=s;

  $(".timer").html(ch);
}

$('.arrow').mouseenter(function(){
  switch($(this).attr('id'))
  {
    case 'Mtop':
      up=true;
    break;

    case 'Mbottom':
      down=true; 
    break;

    case 'Mleft':
      left=true;
    break;

    case 'Mright':
      right=true; 
    break;

  }
});

$('.arrow').mouseleave(function(){
  switch($(this).attr('id'))
  {
    case 'Mtop':
      up=false;
    break;

    case 'Mbottom':
      down=false;
    break;

    case 'Mleft':
      left=false;
    break;

    case 'Mright':
      right=false;
    break;

  }
});


function end()
{     
      
      gameover = true;
      ennemis=[];
      document.getElementById("main").style.display = 'none';
      document.getElementById("input").style.display = 'block';
      clearInterval(t);
      clearInterval(e);
      clearInterval(ef);
      clearInterval(f);
      Mute();
}

function Input()
{
  $.post( "register.php", { name: name, time: parseInt((m/60)+s) ,score: parseInt(score)})
        .done(function( data ) {
            
            var jsonData = JSON.parse(data);

            for (let i = 0; i < jsonData.length; i++) {
                var row = jsonData[i];
                $("table").append(
                    '<tr>'+
                        '<td>'+row['name']+'</td>'+    
                        '<td>'+row['time']+'</td>'+    
                        '<td>'+row['score']+'</td>'+
                    '</tr>'
                );
            }
        });
}

function restart()
{     
      document.getElementById("end").style.display = 'none';
      document.getElementById("main").style.display = 'block';
      
}

function Options(){
  $('.options').css('display','none');
  $('.close').css('display','block');
  $('.instructions').css('display','block');
  $('.start').css('background-image','none');

  var i=0;
  p=setInterval(function(){
  $('.instructions p:eq('+i+')').show(700);
  if(i>=13) clearInterval(p);
  i++;
  },1000);
}

function Close(){
  $('.options').css('display','block');
  $('.close').css('display','none');
  $('.instructions').css('display','none');
  $('.start').css('background-image',"url('StartBg.png')");
}

function Mute()
{ 
  $('#hit')[0].muted=true;
  $('#bg')[0].muted=true;
  $('#destroyed')[0].muted=true;
  $('#shoot')[0].muted=true;
}

function Stop()
{
  if (!stop) {
    stop = true;
    $('#bg')[0].muted=true;
    clearInterval(t);
    clearInterval(e);
    clearInterval(ef);
    clearInterval(f);

  }
  else{
      stop = false;
      Animate();
      t = setInterval(timer,1000);
      }
}


function Fbigger()
{
  $('.main p').css('font-size','+=1px');
}

function Fsmaller()
{
  $('.main p').css('font-size','-=1px');
}

canvas.focus();