let canvas = document.querySelector("#canvas");
let pencil=document.querySelectorAll(".color");
//   console.log(pencil.length)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
});
let color;
for (let i = 0; i < pencil.length; i++) {
    
            pencil[i].addEventListener("click", function(e){
                
                color=pencil[i].classList[2];
                console.log(color);
                ctx.strokeStyle =color;
            });
        }
// canvas drawing gets erased on window resize ???

// a context object which provides fun for 2d drawing
let ctx = canvas.getContext("2d");


let linesDB = [];
let redoLinesDB = [];
let isPenDown = false;
let line = [];

canvas.addEventListener("mousedown" , function(e){
    if(redoLinesDB.length){
        redoLinesDB = [];
    }
    console.log("Inside mouse down");
    isPenDown = true;
    let x = e.clientX;
    let y = e.clientY-100;
    ctx.beginPath();
    ctx.moveTo(x , y);

    let pointObject = {
        x:x , 
        y:y , 
        type:"md",
        Color:color
    }
    line.push(pointObject);
})

canvas.addEventListener("mousemove" , function(e){
    if(isPenDown){
        // console.log("Inside mousemove")
        let x = e.clientX;
        let y = e.clientY-100;
        ctx.lineTo(x , y);
      
        ctx.strokeStyle =color;
        
        ctx.stroke();

        let pointObject = {
            x:x , 
            y:y , 
            type:"mm",
            Color:color
        }
        line.push(pointObject);
    }
})

canvas.addEventListener("mouseup" , function(e){
    console.log("mouseup");
    isPenDown = false;

    linesDB.push(line);
    line = [];

    console.log(linesDB);
})