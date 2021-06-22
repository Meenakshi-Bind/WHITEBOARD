let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let tools = document.querySelectorAll(".tool");

// tools.addEventListener("click",select);
undo.addEventListener("click" , undoLine);
redo.addEventListener("click" , redoLine);


function undoLine(){
    if(linesDB.length){
        let undoLine = linesDB.pop();
        redoLinesDB.push(undoLine);
    
       
        ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    
        drawLinesFromDB();
    }
}

function redoLine(){
    if(redoLinesDB.length){
        let redoLine = redoLinesDB.pop();
        for(let i=0 ; i<redoLine.length ; i++){
            let pointObject = redoLine[i];
            if(pointObject.type == "md"){
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }
            else{
                ctx.lineTo(pointObject.x , pointObject.y);
                ctx.strokeStyle=pointObject.Color;
                ctx.stroke();
                
            }
        }
        linesDB.push(redoLine);
    }



}

function drawLinesFromDB(){
    for(let i=0 ; i<linesDB.length ; i++){
        let line = linesDB[i];
        for(let i=0 ; i<line.length ; i++){
            let pointObject = line[i];
            if(pointObject.type == "md"){
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }
            else{
                ctx.lineTo(pointObject.x , pointObject.y);
                ctx.strokeStyle=pointObject.Color;
                ctx.stroke();
            }
        }
    }
}

for (let i = 0; i < tools.length; i++) {
   
    tools[i].addEventListener("click", function(e){
        // console.log(e);
        if (e.target.classList.contains("selected")) {
            return;
          }
         
        document
            .querySelector(".selected")
            .classList.remove("selected");
            e.path[1].classList.add("selected");
    });
}

