
var t=null;
var splashInter = null;
  //declaration tableau a  2 dim
  var T  = new Array(3);
  for(var i=0;i<3;i++) T[i]  = new Array(3);
  // initalisation
  function initArray(){
    for(var i=0;i<3;i++){
		  for(var j=0;j<3;j++) T[i][j]="";
	   }
    }
  function param(){
    document.getElementById("msg").innerHTML="";
    document.getElementById("timer").innerHTML="00:00";
  }
function init(){

          initArray();
          
          ss=0;
          clearInterval(splashInter);
          clearInterval(t);
          t=setInterval(timer,1000);
          var ch='<div class="header">'+
           '<img src="tictactoe.png" class="img_title" />'+
           '</div>'+
           '<div>'+
          '<div class="game" id="game">';
          
           ch+='<table>';
           for(var i=0;i<3;i++){
             ch+="<tr>";
               for(var j=0;j<3;j++) ch+='<td id="t'+i+''+j+'" onclick="Jouer('+i+','+j+')"></td>'
             ch+="</tr>";
           }
           ch+='</table>'+
           
           '</div>'+
          '<div class="option">'+
            '<img src="easy.png" class="radio" onclick="alert()"> '+
            '<img src="hard.png" class="radio"> '+
            '<img src="expert.png" class="radio" > '+
          '</div>'+
          '</div>'+
          '<div style="height:100px;">'+
           '<div id="msg">&nbsp;</div>'+
           '<div id="timer"></div>'+
          
          '</div>'+
          '<div style="height:100px;">'+
         '<button onclick="init()">Re-start</button></div>';
            document.getElementById("main").innerHTML=ch;
        	console.log(ch);
        	param();
  }
  function splashScreen(){
    var initSplash = "<img src='splash.png' class='splach' Onclick='init()' /><span id='sp'></span>";
    document.getElementById("main").innerHTML = initSplash;
  }

 splashScreen();
 
 
 
 splash();

 function splash(){
  var ts=10;
  splashInter = setInterval(function(){
      ts--;
      document.getElementById("sp").innerHTML=" Wait " + ts  +" s";
      if(ts==0) { 
        init();
      }
  },1000);
 }
 
 
 
 var a = document.getElementById("audio");
 function  Jouer(l , c){
   if(T[l][c]==""){
     T[l][c]="X";
	 a.src="audio/beep3.mp3";
	 a.play();
	 document.getElementById("t"+l+""+c).innerHTML="<img src='X.png' class='imgJ' />"
     if(!Win("X") && !Equals()){
	  if(document.getElementById("cl1").checked==true)
	   Level1();
	   else{
	    if(document.getElementById("cl2").checked==true){
			if(!Level2()) Level1();
		}
		else{
		  if(!Level2()) if(!Level3()) Level1();
		}
	   }
	 }
	 else{
	   if(Equals())  Message("green","Finish equals!!");
	   else if(Win("X")) WinUser();
	 }
	 
   }
   else  Message("red","La casse déjà jouée");
 }
 function Win(x){
  var b=false;
 var chwin="";
  if(x=="X") chwin="XXX";
  else chwin="OOO";
  chd1="";
  chd2="";
  for(var i=0 ;i <3 ;i++) {
    chd1+=T[i][i];
	chd2+=T[i][2-i];
	  var chc="", chl="";
	  for(var j=0;j<3;j++){
	   chl+=T[i][j];
	   chc+=T[j][i];
	  }
	  if(chl==chwin ||chc==chwin)  { b= true; 
	  }
  }
	if(chd1==chwin ||chd2==chwin)  {  b= true; 
  }
  
  
 return b;
 }
  function Level1(){
   var l ,  c;
   do{
     l =  Math.floor(Math.random()*3); //[0-2]
     c =  Math.floor(Math.random()*3);
	 
   }while(T[l][c]!="");
   T[l][c]="O";
    a.src="audio/beep2.mp3";
	 a.play();
    document.getElementById("t"+l+""+c).innerHTML="<img src='O.png' class='imgJ' />"
    if(Win("O")) WinCPU(); 
  }
  function Equals(){
   var checkAarry=true;
   for(var i=0 ;i <3 ;i++) {
     for(var j=0;j<3;j++) if(T[i][j]=="") checkAarry=false;
   }
   
   if(checkAarry==true && Win("X")==false &&  Win("O")==false) {
   clearInterval(t);
   return true;
   } 
   else return false;
  
  }
  function Level2(){
  var l=-1 , c=-1;
  var T1  = new Array(3);
  for(var i=0;i<3;i++) T1[i]  = new Array(3);
  // initalisation
    for(var i=0;i<3;i++){
		 for(var j=0;j<3;j++) if(T[i][j]=="") T1[i][j]="?";
		  else  T1[i][j] = T[i][j];
  }
    chd1="";
	chd2="";
	for(var i=0 ;i <3 ;i++) {
		chd1+=T1[i][i];
		chd2+=T1[i][2-i];
		var chc="", chl="";
		for(var j=0;j<3;j++){
			chl+=T1[i][j];
			chc+=T1[j][i];
		}
		if(chl=="OO?") {l=i ; c=2;}
		if(chl=="O?O") {l=i ; c=1;}
		if(chl=="?OO") {l=i ; c=0;}
	
		if(chc=="OO?") {l=2 ; c=i;}
		if(chc=="O?O") {l=1 ; c=i;}
		if(chc=="?OO") {l=0 ; c=i;}
	}
	if(chd1=="OO?") {l=2 ; c=2;}
    if(chd1=="O?O") {l=1 ; c=1;}
	if(chd1=="?OO") {l=0 ; c=0;}
	
	if(chd2=="OO?") {l=0 ; c=2;}
    if(chd2=="O?O") {l=1 ; c=1;}
	if(chd2=="?OO") {l=2 ; c=0;}
	
	if(l!=-1 && c!=-1) {
	 T[l][c]="O";
		a.src="audio/beep2.mp3";
		a.play();
		document.getElementById("t"+l+""+c).innerHTML="<img src='O.png' class='imgJ' />"
		if(Win("O")) WinCPU(); 
	   return true;
	}
	else return false;
  }
  
  function Level3(){
  var l=-1 , c=-1;
  var T1  = new Array(3);
  for(var i=0;i<3;i++) T1[i]  = new Array(3);
  // initalisation
    for(var i=0;i<3;i++){
		 for(var j=0;j<3;j++) if(T[i][j]=="") T1[i][j]="?";
		  else  T1[i][j] = T[i][j];
  }
    chd1="";
	chd2="";
	for(var i=0 ;i <3 ;i++) {
		chd1+=T1[i][i];
		chd2+=T1[i][2-i];
		var chc="", chl="";
		for(var j=0;j<3;j++){
			chl+=T1[i][j];
			chc+=T1[j][i];
		}
		if(chl=="XX?") {l=i ; c=2;}
		if(chl=="X?X") {l=i ; c=1;}
		if(chl=="?XX") {l=i ; c=0;}
	
		if(chc=="XX?") {l=2 ; c=i;}
		if(chc=="X?X") {l=1 ; c=i;}
		if(chc=="?XX") {l=0 ; c=i;}
	}
	if(chd1=="XX?") {l=2 ; c=2;}
    if(chd1=="X?X") {l=1 ; c=1;}
	if(chd1=="?XX") {l=0 ; c=0;}
	
	if(chd2=="XX?") {l=2 ; c=0;}
    if(chd2=="X?X") {l=1 ; c=1;}
	if(chd2=="?XX") {l=0 ; c=2;}
	if(l!=-1 && c!=-1) {
	 T[l][c]="O";
	 T1[l][c]="O";
		a.src="audio/beep2.mp3";
		a.play();
		document.getElementById("t"+l+""+c).innerHTML="<img src='O.png' class='imgJ' />"
		if(Win("O")) WinCPU(); 
	   return true;
	}
	else return false;
  }
  
  
  
  function WinUser() {
  
  document.getElementById("game").innerHTML = "<img src='images/winner.gif' class='imgW' /><h2 id='idtw'>You are the winner!!</h2>";
  a.src="audio/win.mp3";
  a.play();
  clearInterval(t);
  var tmp=setInterval(AnimerText,500);

  }
  
  function WinCPU() {
  
  document.getElementById("game").innerHTML = "<img src='images/winner.gif' class='imgW' /><h2 id='idtw'>CPU is winner!!</h2>";
  a.src="audio/win.mp3";
  a.play();
   clearInterval(t);
  var tmp =setInterval(AnimerText,500);
 
  }
  
  function Message(c , m){
   document.getElementById("msg").innerHTML="<h3 style='color:"+c+"'>"+m+"</h3>";
  }
  var x=0;
  function AnimerText(){
   if(x % 2 ==0)  document.getElementById("idtw").style.color='gray';
   else  document.getElementById("idtw").style.color='orange';
   x++;
  }
 var ss=0;
  function timer(){
	ss++;
	var s= ss % 60;
	var m = (ss-s)/60;
	var ch="";
	if(m<10) ch="0" +m+":";
	else ch=m+":";
	if(s<10) ch+="0" +s;
	else ch+=s;
	
	document.getElementById("timer").innerHTML=ch;
  }