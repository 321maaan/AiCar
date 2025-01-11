const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;

const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=400;

const infoCanvas = document.getElementById("infoCanvas");
infoCanvas.width=270;

class Info{
    static isTraining = true;
    static aICarsAmount = 0;
    static bestCarYTravelDistance = 0;
    static allTimeMaxTravelDistance = 0;
    static generationCount = 0;
}
console.log(Info.isTraining); // O
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const infoCtx = infoCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const N=500;
const cars=generateCars(N);
const infoUI = new InfoUI;

let drawAIcars = false;
let bestCar=cars[0];
if(localStorage.getItem("generetionCount")){
    //Info.generationCount=JSON.parse(localStorage.getItem("generetionCount"));
}
else
{
   // localStorage.setItem("generetionCount",JSON.stringify(0));
}

if(localStorage.getItem("bestCarTravelDistance")){
        Info.allTimeMaxTravelDistance=JSON.parse(
            localStorage.getItem("bestCarTravelDistance"));
}
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }
    }
}

const traffic=[
    /*new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",1),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",1),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",1),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",1),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",1),
    new Car(road.getLaneCenter(0),-1000,30,50,"DUMMY",1),
    new Car(road.getLaneCenter(1),-1000,30,50,"DUMMY",1),
new Car(road.getLaneCenter(2),-1200,30,50,"DUMMY",1) */];
    let trafficGenerator = new TrafficGenerator(road.laneCount);


animate();

function save(){
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain));
    console.log("Saved Sucsesfully!");
}

function discard(){
    localStorage.removeItem("bestBrain")
    localStorage.setItem("bestCarTravelDistance",
    JSON.stringify(0));
    Info.allTimeMaxTravelDistance=JSON.parse(
        localStorage.getItem("bestCarTravelDistance"));
}
function generateCars(N){
    const cars=[]
   for(let i = 1; i <=N; i++) {
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
   }
    return cars;
}
function animate(time)
{
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    infoCanvas.height=window.innerHeight;
    trafficGenerator.update(bestCar);
    
    for(let i=0;i<traffic.length; i++)
    {
        traffic[i].update(road.borders,[]);
        manageDummies(i);
    }
    
    for(let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders,traffic);
        removeBadCars(i);
    //    saveBestCar(i);
    }

   

    bestCar = cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));
   


    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    road.draw(carCtx);

    for(let i=0;i<traffic.length; i++)
    {
        traffic[i].draw(carCtx, "red");  
    }
    carCtx.globalAlpha=0.2;

    if (drawAIcars){
        for(let i = 0; i < cars.length; i++) {
            cars[i].draw(carCtx, "blue");   
         }
    }
   
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx, "blue",true);
    carCtx.restore();
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);

    Info.aICarsAmount=cars.length;
    Info.bestCarYTravelDistance = bestCar.y;
    infoUI.draw(infoCtx);

    requestAnimationFrame(animate);

}



function removeBadCars(carIndex)
{

    if(cars.length==1) // if there is only one car dont delete it 
        return;
    if (cars[carIndex].damaged){
        cars.splice(carIndex,1);
        return;
    }
    if(cars[carIndex].y>bestCar.y+100){
        cars.splice(carIndex,1);
        return;
    }

}

function manageDummies(dummyIndex)
{
    if(cars.length==1) // if there is only one car dont delete it 
    return;
    if (traffic[dummyIndex].y > bestCar.y + 200)
    {
        traffic.splice(dummyIndex,1);
    }
}

function saveBestCar(carIndex)
{
    
    if (cars.length==1){
        if (bestCar.y < Info.allTimeMaxTravelDistance*-1){
        localStorage.setItem("bestCarTravelDistance",
        JSON.stringify(bestCar.y*-1));
        save();
        }
       
        localStorage.setItem("generetionCount",
        JSON.stringify(Info.generationCount)+1);
        location.reload();
    }
}

function drawAICarsFlip()
{
    drawAIcars = !drawAIcars;
}


