//import JSConfetti from 'js-confetti'

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;
        document.getElementById("xp").textContent = xp;

let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;
document.getElementById("level").textContent = level;
let c=false;

//const jsConfetti = new JSConfetti()


function addTask(){
    if(inputBox.value===''){
        alert("write your goals for the day")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li);
        let span= document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
}


function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 150,
        scalar: 1.0,
        startVelocity: 50,
        shapes: ['circle'], // Can be 'square', 'circle', or 'star'
        colors: ['#0cb2af', '#a1c65d', '#fac723', '#f29222','#e95e50','#936fac'],
        origin: { y: 0.6 } // Confetti falls from slightly above the middle
    });
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        if(e.target.classList.toggle("checked")){
        xp += 10; // Increase XP by 10
        }
            document.getElementById("xp").textContent = xp;
            localStorage.setItem("xp", xp);// Save XP
            xpbonus();
            saveData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}

function xpbonus(){
    const modaltoggle=document.getElementById("myModal");
    const close=document.getElementById("close");
    if (xp >= 100) {  
        xp = 0;  // Reset XP
        level++; // Level up
        c=true;
    }
    if(c==true){
    modaltoggle.style.display="block";
    launchConfetti();
    spinWheel();
    c=false;

    }
    else {
        console.log("Modal will not be displayed.");
        c=false;
    }
    close.addEventListener('click', function() {
        modaltoggle.style.display = "none";
    });
    
        localStorage.setItem("level", level); // Save new level
    }



    function spinWheel() {
        const wheel = document.getElementById("wheel");
        const resultDisplay = document.getElementById("result");
    
        // Generate a random spin value between 1000 and 5000 degrees
        const spinValue = Math.floor(Math.random() * 5000) + 1000;
    
        // Apply rotation to the wheel
        wheel.style.transform = `rotate(${spinValue}deg)`;
    
        // Calculate the result after spinning
        setTimeout(() => {
            const actualSpinValue = spinValue % 360; // Normalize to 0-360
            const segmentIndex = Math.floor(actualSpinValue / 60); // 60 degrees per segment
            const rewards = [
                "10% Off",
                "20% Off",
                "Free Gift",
                "50% Off",
                "Try Again",
                "No Luck"
            ];
    
            // Display the result
            resultDisplay.innerText = `You won: ${rewards[segmentIndex]}`;
        }, 4000); // Wait for the animation to finish
    }



    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;
    localStorage.setItem("xp", xp); // Save XP
showTask();