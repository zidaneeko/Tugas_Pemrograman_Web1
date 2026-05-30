const display = document.getElementById("result");

/* Efek suara */
function playSound() {

    const audioContext =
        new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "square";
    oscillator.frequency.value = 500;

    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.08);
}

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

function calculate(){
    try{
        display.value = eval(display.value);
    }catch{
        display.value = "Error";
    }
}

/* Ripple Effect */
function createRipple(event){

    const button = event.currentTarget;

    const circle = document.createElement("span");

    const diameter = Math.max(
        button.clientWidth,
        button.clientHeight
    );

    const radius = diameter / 2;

    circle.style.width =
    circle.style.height = `${diameter}px`;

    circle.style.left =
    `${event.clientX -
    button.offsetLeft - radius}px`;

    circle.style.top =
    `${event.clientY -
    button.offsetTop - radius}px`;

    circle.classList.add("ripple");

    const ripple =
        button.getElementsByClassName("ripple")[0];

    if(ripple){
        ripple.remove();
    }

    button.appendChild(circle);
}

/* Partikel Cahaya */
function createParticles(x,y){

    for(let i=0;i<8;i++){

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.background =
            `hsl(${Math.random()*360},
            100%, 60%)`;

        particle.style.setProperty(
            "--x",
            `${(Math.random()-0.5)*100}px`
        );

        particle.style.setProperty(
            "--y",
            `${(Math.random()-0.5)*100}px`
        );

        document.body.appendChild(particle);

        setTimeout(()=>{
            particle.remove();
        },800);
    }
}

/* Semua tombol */
document.querySelectorAll("button")
.forEach(button=>{

    button.addEventListener("click",(e)=>{

        playSound();

        createRipple(e);

        createParticles(
            e.clientX,
            e.clientY
        );

        button.classList.add("rgb-glow");

        setTimeout(()=>{
            button.classList.remove("rgb-glow");
        },400);
    });

});

/* Support Keyboard */
document.addEventListener("keydown",(e)=>{

    const key = e.key;

    if(
        "0123456789+-*/.%".includes(key)
    ){
        appendValue(key);
        playSound();
    }

    if(key === "Enter"){
        calculate();
    }

    if(key === "Backspace"){
        deleteLast();
    }

    if(key === "Escape"){
        clearDisplay();
    }
});