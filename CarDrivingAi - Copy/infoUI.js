class InfoUI{
    constructor()
    {
        
    }

  
    draw(ctx)
    {
        ctx.font = "20px arial";
        ctx.fillText("Current AI cars: " + Info.aICarsAmount, 1, 50);
       
        ctx.font = "20px arial";
        ctx.fillText("Best car travel distance: " + Math.round(Info.bestCarYTravelDistance)*-1, 1, 70);
        ctx.font = "15px arial";
        ctx.fillText("All time best travel distance: " + Info.allTimeMaxTravelDistance, 1, 90)
    }
}