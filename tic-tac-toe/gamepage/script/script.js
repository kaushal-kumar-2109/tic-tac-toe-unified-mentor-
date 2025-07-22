const params = new URLSearchParams(window.location.search);
let player1=document.getElementById("player1");
let player2=document.getElementById("player2");
let player1logo=document.getElementById('player1logo');
let player2logo=document.getElementById('player2logo');
let gameboard=document.getElementById('gameboard');
let resultboard=document.getElementById('resultboard');
let restart=document.getElementById('restart');


// -------------------------------------- Setting up the game variables  -------------------------------------- 
// count the number of moves and no of wins by both user 
let movescount=0,p1win=0,p2win=0;
let symbol,color ,p1,p2,i;
// to set the winner name and flag for know that got the winner
let wincon=false,winner=false;
// players cell select veriavle
let p1select=[];
let p2select=[];
// game cells variable
let gamecell=["cell1","cell2","cell3","cell4","cell5","cell6","cell7","cell8","cell9"];
let wincriteria=[["cell1","cell2","cell3"],["cell4","cell5","cell6"],["cell7","cell8","cell9"],["cell1","cell4","cell7"],["cell2","cell5","cell8"],["cell3","cell6","cell9"],["cell1","cell5","cell9"],["cell7","cell5","cell3"]]
//  --------------------------------------  setting variables End !  -------------------------------------- 


//  --------------------------------------   settong the first player moves   --------------------------------------  
window.addEventListener("load",()=>{
    player1logo.innerHTML=`<i class="fa-solid fa-x fa-beat" style="color: #015cf9;"></i>`;
    player2logo.innerHTML=`<i class="fa-solid fa-o" style="color: #f07828;"></i>`;
});
//   --------------------------------------  setting first move End!  --------------------------------------  


//   --------------------------------------   setting the player name on the game screen  --------------------------------------  
// it take the parameters and set the name if player give in there veriable if not given then set default name 
const setusername = (params)=>{
    const value1 = params.get('player1');
    p1= value1 && value1.trim() !== "" ? value1.trim() : "Player 1";
  
    const value2 = params.get('player2');
    p2= value2 && value2.trim() !== "" ? value2.trim() : "Player 2";

    player1.innerText=p1;
    player2.innerText=p2;
}
//   --------------------------------------  setting the player name End !   --------------------------------------  


//   --------------------------------------  calling the set player name function   --------------------------------------  
setusername(params);// ????????????  setp 1  ????????????
//   --------------------------------------  calling function end !  --------------------------------------  


//   --------------------------------------   function for check the turn  --------------------------------------  
//  this function check the turn and tell the user by there icon if the moves reach to 9 means game is tie
const checkTurn = ()=> {
    // check the winner of tie 
    if(movescount>=9 || winner!=false){
        setTimeout(() => {
            showwinner();// ????????????  setp 8  ????????????
        }, 500);
    }
    // if not winner found the show the next turn 
    // and the process repaet again
    else if(movescount%2!=0 && movescount<9){
        player2logo.innerHTML=`<i class="fa-solid fa-o fa-beat" style="color: #f07828;"></i>`;
        player1logo.innerHTML=`<i class="fa-solid fa-x" style="color: #015cf9;"></i>`;
    }
    else{
        player1logo.innerHTML=`<i class="fa-solid fa-x fa-beat" style="color: #015cf9;"></i>`;
        player2logo.innerHTML=`<i class="fa-solid fa-o" style="color: #f07828;"></i>`;
    }
}
//   --------------------------------------   function for check the turn End !  --------------------------------------  


//   --------------------------------------  place key of player   --------------------------------------  
// when player click on cell the which key is to place deside by this function 
const placeKey = (cell)=>{
    // if the movescount%2==0 mean the turn is player 1 
    if(movescount%2==0){
        // push the cell id selected by player 1
        p1select.push(cell.getAttribute("id"));// ????????????  setp 4  ????????????
        //check only when movecount is more then 4 beacouse below move 4 noone will win or tie 
        if(movescount>=4){
            if(checkWin(p1select)){// ????????????  setp 5  ????????????
                winner=p1;
                p1win++;
                symbol='x';
                color='#015cf9';
            }
        }
        cell.innerHTML=`<i class="fa-solid fa-x fa-beat" style="color: #015cf9;"></i>`;
        setTimeout(() => {
            cell.innerHTML=`<i class="fa-solid fa-x" style="color: #015cf9;"></i>`;
        }, 1000);
        movescount++;
    }
    // if the condition false then means the turn is player 2
    else{
        //  push the cell id selected by player 2
        p2select.push(cell.getAttribute("id")); // ????????????  setp 4  ????????????
        // when move count is more then 4 then only a player can we a winnerbellow that move know one will winner
        if(movescount>=4){
            if(checkWin(p2select)){// ????????????  setp 5  ????????????
                winner=p2;
                p2win++;
                symbol="o";
                color='#f07828';
            }
        }
        cell.innerHTML=`<i class="fa-solid fa-o fa-beat" style="color: #f07828;"></i>`;
        setTimeout(() => {
            cell.innerHTML=`<i class="fa-solid fa-o" style="color: #f07828;"></i>`;
        },1000);
        movescount++;
    }
}
//  --------------------------------------   place key End !  --------------------------------------  

//   --------------------------------------  function check the win player  --------------------------------------  
// this function call evry time when players use there moves and if any one of them are win 
const checkWin = (Selected)=>{
    // it check the win  by compare pattern cell and selected cell by user 
    for(let wincell of wincriteria){
        i=0;
        for(let cell of wincell){
            for(let sc of Selected){
                if(cell==sc){
                    console.log(cell,"-",sc);
                    i++;
                }
            }
        }
        if(i>=3){
            // true mean player win the match
            return true;// ????????????  setp 6  ????????????
        }
    }
    // false means player not win the match now 
    return false;// ????????????  setp 6  ????????????
}
//   --------------------------------------   function check win End 1   --------------------------------------  


//   --------------------------------------  show winner    --------------------------------------  
// if a winner got then this function is call and show the wiiner message of the game tie message too 
const showwinner = ()=>{
    // if game is tai 
    if(winner==false){
        document.getElementById('winner').innerHTML=`The&nbsp;<span>Tie</span>&nbsp;Match`;
    }
    // if someone win the match 
    else{
        document.getElementById('winner').innerHTML=`<i class="fa-solid fa-${symbol} fa-beat" style="color:${color};"></i>&nbsp; ${winner}&nbsp;<span>win</span>&nbsp; The Match`;
    }
    // setting the score of both plyaer 
    document.getElementById('p1win').innerText=p1win;
    document.getElementById('p2win').innerText=p2win;
    resultboard.style.display="flex";// ????????????  setp 9  ????????????
}
//   --------------------------------------  show winner End  --------------------------------------  


//   --------------------------------------  settign the cells function when the click   --------------------------------------  
// by using loop we place the functionality of each cell in the board 
// ????????????  setp 2  ????????????
for (let cell of gameboard.children){
    cell.addEventListener("click",()=>{
        if(cell.innerHTML==""){
            placeKey(cell);// ????????????  setp 3  ????????????
        }
        // if the cell aready selected then the give alert to the player 
        else{
            alert("The Cell Already Selected !");
        }
        checkTurn();// ????????????  setp 7  ????????????
    });
}
//   --------------------------------------   cell function end !  --------------------------------------  


//   --------------------------------------  setting the restart functionalty   --------------------------------------  
// when the match over this function help in restart the match 
restart.addEventListener("click",()=>{
    // if player choose to restart 
    // reset all the cells to blank 
    for(let cell of gamecell){
        document.getElementById(`${cell}`).innerHTML="";
    }
    // reset all veriable used 
    p1select=[];
    p2select=[];
    winner=false;
    movescount=0;
    i=0;
    resultboard.style.display="none";// ????????????  setp 10  ????????????
});
//   --------------------------------------  restart functionality end !  --------------------------------------  