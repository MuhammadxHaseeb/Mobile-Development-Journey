let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.querySelector(".new-btn");
let msg =document.querySelector(".msg")
let turnO = true;

const winPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
boxes.forEach((b) => {
    b.addEventListener("click",() => {
        if(turnO)
        {
            b.innerText = "O";
            turnO=false;
        }
        else 
        {
            b.innerText = "X";
            turnO = true;
        }
        b.disabled=true;
        checkWinner();
    });    
});

const checkWinner = () =>{
    for(let parr of winPatterns)
    {
        let pos1 = boxes[parr[0]].innerText;
        let pos2 = boxes[parr[1]].innerText;
        let pos3 = boxes[parr[2]].innerText;
        
        if (pos1 != "" && pos2 != "" && pos3 != "")
        {
            if(pos1 === pos2  && pos2 === pos3)
            {
                showWinner(pos1);
            }
        }
    }
}

const showWinner = (winner) =>{
    msg.innerText = "Winner"+winner;
    msg.classList.remove("hide");
}

resetBtn.addEventListener("click",() =>{
    boxes.forEach(function(b){  
        b.innerText = "";
        b.disabled=false;
    });
        turnO = true;

});


newBtn.addEventListener("click",() =>{
    boxes.forEach(function(b){  
        b.innerText = "";
        b.disabled=false;
    });
        turnO = true;

});