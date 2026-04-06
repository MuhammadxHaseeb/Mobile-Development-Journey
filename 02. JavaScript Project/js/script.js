const typingText = document.querySelector(".typing-text p");
inpField =document.querySelector(".wrapper .input-field");
mistakeTag = document.querySelector(".mistake span");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
timeTag = document.querySelector(".time span b");
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


function randomParagraph()
{
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener( "keydown",() => inpField.focus());
    typingText.addEventListener("click",() => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    
    if(charIndex < characters.length -1 && timeLeft > 0){
    if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    // Backspace detection
    if (inpField.value.length < charIndex) {
        charIndex--;
        if(characters[charIndex].classList.contains("incorrect")){
            mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
    } else {
        let typedChar = inpField.value[charIndex];

        if (characters[charIndex].innerText === typedChar) {
            characters[charIndex].classList.add("correct");
        } else {
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }

        charIndex++;
    }

    // Active cursor
    characters.forEach(span => span.classList.remove("active"));
    
    if (charIndex < characters.length) {
        characters[charIndex].classList.add("active");
    }

    // Auto scroll AFTER active class is updated
    const activeChar = typingText.querySelector("span.active");
    if (activeChar) {
        activeChar.scrollIntoView({ block: "center", behavior: "smooth" });
    }

    let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;
    }
    else{
        inpField.value = "";
        clearInterval(timer)
    }
}
function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inpField.value="";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerHTML = timeLeft;
    mistakeTag.innerHTML = mistakes;
    wpmTag.innerHTML = 0;
    cpmTag.innerHTML = 0;
}

randomParagraph();
inpField.addEventListener("input",initTyping)
tryAgainBtn.addEventListener("click",resetGame);