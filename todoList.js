const inputBox = document.getElementById("inputBox");//INPUT BOX 
const listContainer = document.getElementById("listContainer");//container list ul/li
const addBtn=document.getElementById("addBtn");//button for adding tasks
let c=false;//flag for xp

let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;
        document.getElementById("xp").textContent = xp;//XP local storage fetching

let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;
document.getElementById("level").textContent = level;//Level local storage fetching




//APPENDING TASKS TO THE LIST
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




//ENTER KEY FOR ADDING TASKS
inputBox.addEventListener('keydown', function(event) {
    // Check if Enter was pressed
    if (event.keyCode === 13) {
      // Prevent the default action
      event.preventDefault();
      
      // Trigger the button click
      addBtn.click();
    }
  });



  
//XP MANAGEMENT
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





//PROGRESS BAR USING THE XP XLIXK
const progressBar=document.getElementsByClassName("progressBar")[0]
setInterval(()=>{
    const computedStyle =getComputedStyle(progressBar);
    const width=parseFloat(xp)||0

progressBar.style.setProperty('--width',width+.1)

},5)




//LEVEL UP MANAGEMENT
function xpbonus(){
    const modaltoggle=document.getElementById("myModal");
    const close=document.getElementById("close");
    if (xp >= 100) {  
        xp = 0;  // Reset XP
        level++; // Level up
        c=true;
        document.getElementById("level").textContent = level;
        
        // Save new level to localStorage
        localStorage.setItem("level", level);
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
    }




//RESETTING THE LEVEL ON SCREEN AND LOCAL STORAGE
document.getElementById('resetBtn').onclick = function() {
    level = 0; // Reset the level variable
    document.getElementById("level").textContent = level; // Update display
    localStorage.setItem("level", level); // Update localStorage
};




//CONFETTI LAUNCHER
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




    //SPIN THE WHEEL
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
    



//SAVING DATA OR TASKS IN LOCAL STORAGE
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}


//FETCHING AND SHOWING DATA FROM LOCAL STORAGE
function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}




    // Initialize the wheel when the page loads
    document.addEventListener('DOMContentLoaded', spinWheel);
    
    // Initialize the wheel when the page loads
    document.addEventListener('DOMContentLoaded', spinWheel);


    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;
    localStorage.setItem("xp", xp); // Save XP
showTask();