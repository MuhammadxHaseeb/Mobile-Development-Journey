const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const timeTag = document.querySelector(".time span b");
const tryAgainBtn = document.querySelector(".btn1");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = 0,
    mistakes = 0,
    isTyping = false;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(char => {
        typingText.innerHTML += `<span>${char}</span>`;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
}
function initTyping() {
    const characters = typingText.querySelectorAll("span");

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        const typedValue = inpField.value;

        if (typedValue.length < charIndex) {
            // backspace
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            // use charIndex to get the exact character
            const typedChar = typedValue[charIndex];
            const expectedChar = characters[charIndex].innerText;

            if (typedChar !== undefined) {
                if (expectedChar === typedChar) {
                    characters[charIndex].classList.add("correct");
                } else {
                    mistakes++;
                    characters[charIndex].classList.add("incorrect");
                }
                charIndex++;
            }
        }

        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) {
            characters[charIndex].classList.add("active");
        }

        const activeChar = typingText.querySelector("span.active");
        if (activeChar) {
            activeChar.scrollIntoView({ block: "center", behavior: "smooth" });
        }

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;

    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    isTyping = false;
    timeTag.innerHTML = timeLeft;
    mistakeTag.innerHTML = 0;
    wpmTag.innerHTML = 0;
    cpmTag.innerHTML = 0;
}

// focus input on any tap or click
document.addEventListener("click", () => inpField.focus());
document.addEventListener("keydown", () => inpField.focus());
typingText.addEventListener("click", () => inpField.focus());

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);