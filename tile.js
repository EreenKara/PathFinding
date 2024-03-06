export class Tile{
    size;
    pointx;
    pointy;
    color;
    normalColor;
    constructor(pointx,pointy,color,size){
        this.pointx=pointx;
        this.pointy=pointy;
        this.color=color;
        this.normalColor=this.color;
        this.size=size;
    }
    
    

}