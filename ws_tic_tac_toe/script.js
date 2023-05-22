
var lvl;
var t=null;
  //declaration tableau a  2 dim
  var T  = new Array(3);
  for(var i=0;i<3;i++) T[i]  = new Array(3);
  // initalisation

  function param(){
    $("#msg").html="";
    $("#timer").html="00:00";
  }

function init(){
			//initialisation du jeux
			for(var i=0;i<3;i++){
				  for(var j=0;j<3;j++) T[i][j]="";
			   }
			ss=0;
		  	clearInterval(t);
		  	t=setInterval(timer,1000);

		  	var ch='<div class="header">'+
		   '<img src="tictactoe.png" class="img_title" />'+
		   '</div>'+
		   '<div>'+
		  '<div class="game" id="game">';
		  //creation du tableau
		   ch+='<table>';
		   for(var i=0;i<3;i++){
		     ch+="<tr>";
		       for(var j=0;j<3;j++) ch+='<td id="t'+i+''+j+'" onclick="Jouer('+i+','+j+')"></td>'
		     ch+="</tr>";
		   		}
		   	ch+='</table>'+

		   	'</div>'+
		  '</div>'+
		  '<div style="height:100px;">'+
		   '<div id="msg">&nbsp;</div>'+
		   '<div id="timer"></div>'+
		   '<img src="replay.png" class="replay" onclick="init()">'+
		  
		  '</div>'+
		  '<div style="height:100px;">'+
		 '<button onclick="init()">Re-start</button></div>';

		 	$("#main").html("");
		 	$("#main").html(ch);
			param();
	}//init
	

	function splashScreen(){
    	$("#main").html(
    		'<div class="option">'+
			    '<img src="easy.png" id="easy" class="radio" onclick="alert()"> '+
			    '<img src="hard.png" id="hard" class="radio"> '+
			    '<img src="expert.png" id="expert" class="radio" > '+
			 '</div>');
  	}
   function checkLevel(){
	   	switch(lvl){
	   		case "easy":  
	   			Level1();
	   	    	break;
	   		case "hard":  
	   			if(!Level2()) Level1();
	   			break;
	   		case "expert":  
	   			if(!Level2()) if(!Level3()) Level1();
	   			break;
	   		}
	   
	};

 function  Jouer(l , c){
 	console.log(T);
   if(T[l][c]==""){
     T[l][c]="X";
	 $("#audio3")[0].play();
	 $("#t"+l+""+c).css("background-image","url('X.png')");
     if(!Win("X") && !Equals()){
	  checkLevel();
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


 //EASY

   function Level1(){
   var l ,  c;
   do{
     l =  Math.floor(Math.random()*3);//line
     c =  Math.floor(Math.random()*3);//column
	 
   }while(T[l][c]!="");
   T[l][c]="O";
  	
	$("#audio2")[0].play();
    $("#t"+l+""+c).css("background-image","url('O.png')");
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
  
  }//easy


  //HARD
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
		$("#audio2")[0].play();
		$("#t"+l+""+c).css("background-image","url('O.png')");
		if(Win("O")) WinCPU(); 
	   return true;
	}
	else return false;
  }//hard

  	//EXPERT
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
		$("#audio2")[0].play();
		$("#t"+l+""+c).css("background-image","url('O.png')");
		if(Win("O")) WinCPU(); 
	   return true;
	}
	else return false;
  }//expert

 function WinUser() {
  
 $("#main").html('<div id="won"><img src="you-won.png" class="won"></div>');
  $("#audiow")[0].play();
  clearInterval(t);
  var tmp=setInterval(AnimerText,500);

  }
  
  function WinCPU() {
  
$("#main").html('<div id="lost"><img src="try-again2.png" class="lost"></div>');
  $("#audiol")[0].play();
   clearInterval(t);
  var tmp =setInterval(AnimerText,500);
 
  }

  function Message(c , m){
   $("#msg").html("<h3 style='color:"+c+"'>"+m+"</h3>");
  }
  var x=0;
  function AnimerText(){
   if(x % 2 ==0)  $("#idtw").css("color",'gray');
   else  $("#idtw").css("color",'orange');
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
	
	$("#timer").html(ch);
  }


