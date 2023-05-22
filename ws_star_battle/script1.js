//Declaration
  var ctx=document.getElementById('canvas').getContext('2d');
  var gameover = true;
  var Iship = new Image();
  Iship.src="ship1.png";

  var Iball = new Image();
  Iball.src="bullet.png";

  var Fr = new Image();
  Fr.src = "ennemis/fr.png";

  var En = new Image();
  En.src = "ennemis/en.png";

  var En2 = new Image();
  En2.src = "ennemis/en2.png";

  var R = new Image();
  R.src = "ennemis/asteroidn.png";

  var R2 = new Image();
  R2.src = "ennemis/asteroid2n.png";

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
  var muted=false;

  var dg=0;
  var sun = new Image();
  sun.src = "planets/sun.png";
  var mercury = new Image();
  mercury.src = "planets/mercury.png";
  var venus = new Image();
  venus.src = "planets/venus.png";
  var earth = new Image();
  earth.src = "planets/earth.png";
  var moon = new Image();
  moon.src = "planets/moon.png";
  var mars = new Image();
  mars.src = "planets/mars.png";
  var jupiter = new Image();
  jupiter.src = "planets/jupiter.png";
  var saturn = new Image();
  saturn.src = "planets/saturn.png";
  var uranus = new Image();
  uranus.src = "planets/uranus.png";
  var neptune = new Image();
  neptune.src = "planets/neptune.png";




//-------------L'M39ooooool-------------//

function AddI(img,x,y,width,height,speed)
{
	return {
		img:img,
		x:x,
		y:y,
		w:img.width,
		h:img.height,
		tire:1,
		s:speed,
		draw:function()
		{
            this.w = this.img.width;
            this.h = this.img.height;
			ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
		}
	}
}

function AddE()
{
	var kindER=kindE[Math.floor(Math.random()*5)];
	var Y=Math.floor(Math.random()*(360-kindER.height))+50;
	var	Speed=Math.floor(Math.random()*3)+2;
	var nbf=4;
	if(kindER == R || kindER == R2) nbf=1;
	ennemis.push(DrawE(kindER,canvas.width,Y,kindER.width/nbf,kindER.height,Speed,nbf))
}

function AddF()
{
	var X=Math.floor(Math.random()*800)+100;
	var	Speed=Math.floor(Math.random()*3)+2;
	var nbf=16;
	ennemis.push(DrawE(Fuel,X,-Fuel.height,Fuel.width/nbf,Fuel.height,Speed,nbf))
}


function DrawE(img,x,y,w,h,speed,NbFrame)
{
	return {
		img:img,
		x:x,
		y:y,
		w:w,
		h:h,
		srcX:0,
		srcY:0,
		curFrame:0,
		tire:1,
		s:speed,
		draw:function()
		{	
            this.curFrame=++this.curFrame % NbFrame;
			this.srcX=this.curFrame * w;
			ctx.drawImage(this.img,this.srcX,this.srcY,this.w,this.h,this.x,this.y,this.w,this.h);
		}
	}
}


function within(a,b,c)
{return( a>b && a<c );}

function collision(a,b)
{
	var result = false;
	if(within(a.x , b.x , b.x + b.w) || within (a.x + a.w , b.x , b.x + b.w))
	{
		if(within(a.y , b.y , b.y + b.h) || within(a.y + a.h , b.y , b.y + b.h))
			result = true;
	}
	return result;
}
function Shoot()
{
	if(!shoot)
	{	
		$('.shoot')[0].play();
		var IballX=ship.x+ship.w;
	    var IballY=ship.y+(ship.h/2);
	    ball= AddI(Iball,IballX,IballY,Iball.width,Iball.height,10);
		shoot=true;
	}
}

$(document).keydown(function(event)
{	
	if(event.which===80) Stop();
	if(event.which===37) left=true;
	if(event.which===38) up=true;
	if(event.which===39) right=true;
	if(event.which===40) down=true;
	if(event.which===32) {
		// if(!gameover) {
			Shoot();

		// }
	}
});

$(document).keyup(function(event)
{	
	if(event.which===37) left=false;
	if(event.which===38) up=false;
	if(event.which===39) right=false;
	if(event.which===40) down=false;
});

$('.arrow').mouseenter(function(){
  switch($(this).attr('id'))
  {
    case 'Mup':
      up=true;
    break;

    case 'Mdown':
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
    case 'Mup':
      up=false;
    break;

    case 'Mdown':
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

var ship = AddI(Iship,20,(canvas.height/2)-Iship.height,Iship.width/3,Iship.height,5);
function Animate()
{	
	ctx.clearRect(0,0,canvas.width,canvas.height);
    Planet(sun,0,0,0.02);
    Planet(mercury,20,150,0.5);
	Planet(venus,60,200,0.5);
	// Planet(earth,-25,0,0.5);
	// Planet(moon,-66,0,0.5);
	Planet(mars,-90,220,0.5);
	Planet(jupiter,20,250,0.5);
	Planet(saturn,80,280,0.5);
	Planet(uranus,100,310,0.5);
	Planet(neptune,120,420,0.5);
	ctx.fillStyle='#02071477';
	ctx.fillRect(0,0,canvas.width,canvas.height);

    
    
	ennemis.forEach(function(enemy,i)
	{
		if(enemy.img == Fuel) enemy.y += enemy.s;
		else enemy.x -= enemy.s;
		if(collision(enemy,ship))
		{
			switch(enemy.img)
			{
				case Fuel:
				$('.star')[0].play();
					fuel+=15;
					$('.fuel').html(fuel);
					ennemis.splice(i,1);
				break;

				case Fr : 
					console.log('ok');
				break;

				default:
					fuel-=15;
					$('.fuel').html(fuel);
					ennemis.splice(i,1);
				break;
			}
		}
		enemy.draw();
	});

	if(up && ship.y>80) ship.y-=ship.s;
	if(down && ship.y+ship.h<520) ship.y+=ship.s;
	if(left && ship.x>0) ship.x-=ship.s;
	if(right && ship.x+ship.w < canvas.width) ship.x +=ship.s;
	if(shoot)
	{	
		ball.x += ball.s;
		// console.log(ball);

		
		ennemis.forEach(function(enemy,i)
		{
			if(collision(ball,enemy))
			{	
				shoot=false;
				switch(enemy.img)
				{
					case Fuel:
						fuel+=15;
						$('.star')[0].play();
						$('.fuel').html(fuel);
						ennemis.splice(i,1);
					break;

					case Fr : 
						score-=10;
						$('.score').html(score);
						ennemis.splice(i,1);
					break;

					case R:
						if(enemy.tire==0)
						{
							$('.destroyed')[0].play();
							score+=10;
							$('.score').html(score);
							ennemis.splice(i,1);
						}else enemy.tire--;
					break;

					case R2:
						if(enemy.tire==0)
						{
							$('.destroyed')[0].play();
							score+=10;
							$('.score').html(score);
							ennemis.splice(i,1);
						}else enemy.tire--;
					break;

					default:
					$('.destroyed')[0].play();
						fuel+=5;
						ennemis.splice(i,1);
					break;
				}
			}
		});
		if(ball.x > canvas.width) shoot=false;
		ball.draw();
	}
	
    ship.draw();

	if(!stop)
	if(!gameover)
	{
        End()
    }else window.requestAnimationFrame(Animate);
	
}

function Options()
{
	$('.options').css('display','none');
	$('.close').css('display','block');
	$('.instructions').css('display','block');
	$('.start').css('background-image','none');
	var i=0;
	p=setInterval(function()
	{
		$('.instructions p:eq('+i+')').show(700);
		if(i>=13) clearInterval(p);
		i++;
	},1000);
}

function Close()
{
	$('.options').css('display','block');
	$('.close').css('display','none');
	$('.instructions').css('display','none');
	$('.start').css('background-image',"url('StartBg.png')");
}

function main()
{
    $('.timer').html('00:00');
	$('.score').html('0');
	$('.fuel').html('30');
	$('.start').css('display','none');
	$('.main').css('display','block');

	score=0;
	fuel=30;
	ennemis=[];
	
	e=setInterval(AddE,5000);
	ef=setInterval(AddF,6000);
	t=setInterval(Timer,1000);
	f=setInterval(function()
	{
		fuel--;
		if(fuel==0) End();
		$('.fuel').html(fuel)
	},1000);
	Animate();
}
function End()
{
	$('.start').css('display','none');
	$('.end').css('display','block');
}
function Mute()
{
	if(!muted)
	{
		$('.bg')[0].muted=true;
		$('.star')[0].muted=true;
		$('.destroyed')[0].muted=true;
		$('.shoot')[0].muted=true;
		muted=true;
	}else
	{
		$('.bg')[0].muted=false;
		$('.star')[0].muted=false;
		$('.destroyed')[0].muted=false;
		$('.shoot')[0].muted=false;	
		muted=false;
	}
}
function Stop()
{
	if(!stop){
		Mute();
		clearInterval(e);
		clearInterval(ef);
		clearInterval(f);
		clearInterval(t);
		stop=true;
	}else{
		$('.bg')[0].muted=false;
		$('.star')[0].muted=false;
		$('.destroyed')[0].muted=false;
		$('.shoot')[0].muted=false;	
		stop=false;
		muted=false;
		t=setInterval(Timer,1000);
		Animate();
	}
}

function Timer()
{
	ss++;
	var s =ss % 60;
	var m = (ss-s) / 60;
	var ch = "";
	if(m<10) ch="0" +m+ ":";
	else ch=m+ ":";
	if(s<10) ch+="0" +s;
	else ch+=s;
	$(".timer").html(ch);

}

function Fbigger()
{
	$('.header').css('font-size','+=1px');
}

function Fsmaller()
{
	$('.header').css('font-size','-=1px');
}

function Planet(img,a,b,c)
{	
	
	var time = new Date();
	ctx.strokeStyle = '#fcfeff05';
	ctx.beginPath();
	ctx.arc(canvas.width/2,canvas.height/2,b,Math.PI*2,false);
	
	ctx.stroke();

	ctx.save();
	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() +a );
	ctx.translate(b,0);
	ctx.save();
	ctx.rotate( (dg + 2*Math.PI)/90 );
	ctx.drawImage(img,-img.width/2,-img.height/2);
	ctx.restore();
	ctx.restore();
	dg+=c;
}