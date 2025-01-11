class TrafficGenerator
{
    constructor(laneCount){
       
        this.currentCarYValeu = -400;
       
    
       
    }


    update(bestCar){
        if (bestCar.y < this.currentCarYValeu+400)
        {
            this.#addCars();
            this.currentCarYValeu-=400;
        }
    }

    #addCars()
    {
        this.currentCarYValeu -= 200;
        this.#addRandomCars(this.currentCarYValeu);
    }
    #addRandomCars(y)
    {
        if(Math.random()<.5)
        {
            switch (Math.floor(Math.random()*3)){
                case 0:
                    traffic.push(
                        new Car(road.getLaneCenter(0),y,30,50,"DUMMY",1)
                    );
                    break;
                case 1:
                    traffic.push(
                        new Car(road.getLaneCenter(1),y,30,50,"DUMMY",1)
                    );
                    break;
                case 2:
                    traffic.push(
                        new Car(road.getLaneCenter(2),y,30,50,"DUMMY",1)
                    );
                    break;
    
            } 
        }else
        {
            switch (Math.floor(Math.random()*3)){
                case 0:
                    traffic.push(
                        new Car(road.getLaneCenter(2),y,30,50,"DUMMY",1),
                        new Car(road.getLaneCenter(1),y,30,50,"DUMMY",1)
                    );
                    break;
                case 1:
                    traffic.push(
                        new Car(road.getLaneCenter(0),y,30,50,"DUMMY",1),
                        new Car(road.getLaneCenter(2),y,30,50,"DUMMY",1)
                    );
                    break;
                case 2:
                    traffic.push(
                        new Car(road.getLaneCenter(0),y,30,50,"DUMMY",1),
                        new Car(road.getLaneCenter(1),y,30,50,"DUMMY",1)
                    );
                    break;
    
            } 
        }
    }
}