//import JSConfetti from 'js-confetti'

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;
        document.getElementById("xp").textContent = xp;

let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;
document.getElementById("level").textContent = level;
let c=false;
const addBtn=document.getElementById("addBtn");

inputBox.addEventListener('keydown', function(event) {
    // Check if Enter was pressed
    if (event.keyCode === 13) {
      // Prevent the default action
      event.preventDefault();
      
      // Trigger the button click
      addBtn.click();
    }
  });

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
        let wheel = document.querySelector('.wheel');
        let spinBtn = document.querySelector('.spinBtn');
        let numbers = document.querySelectorAll('.number span');
        
        // Extract the actual text values from your wheel segments
        let words = [];
        numbers.forEach(span => {
            words.push(span.textContent);
        });
        
        let segmentCount = words.length;
        
        // Track total rotation for consecutive spins
        let totalRotation = 0;
        
        spinBtn.onclick = function() {
            // Disable the button during spinning
            spinBtn.disabled = true;
            
            // Pick a random segment to land on
            let winningIndex = Math.floor(Math.random() * segmentCount);
            let winningItem = words[winningIndex];
            
      
            let segmentAngle = 360 / segmentCount;
            
            let winningI = winningIndex + 1;

            let degToTarget = 360 - (winningI * segmentAngle);
            
            // Add extra spins (5 full rotations) for effect
            let extraSpins = 5 * 360;
            let finalRotation = extraSpins + degToTarget;
            
            // Add to total rotation for sequential spins
            totalRotation += finalRotation;
            
            // Apply rotation to the wheel
            wheel.style.transition = "transform 4s ease-out";
            wheel.style.transform = `rotate(${totalRotation}deg)`;
            
            // Show the toast after animation completes
            setTimeout(() => {
                let toast = document.getElementById("toast");
                let toastText = document.getElementById("toastText");
                
                toastText.innerText = "You landed on: " + winningItem;
                toast.classList.add("show");
                
                setTimeout(() => {
                    toast.classList.remove("show");
                    // Re-enable the button
                    spinBtn.disabled = false;
                }, 5000);
            }, 4000);
        };
    }
    
    // Initialize the wheel when the page loads
    document.addEventListener('DOMContentLoaded', spinWheel);
    
    // Initialize the wheel when the page loads
    document.addEventListener('DOMContentLoaded', spinWheel);


    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;
    localStorage.setItem("xp", xp); // Save XP
showTask();