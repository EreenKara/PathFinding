import { colors } from "./colors.js";
import {Tile} from "./tile.js"
export class Grid{
    canvas;
    sizex;
    sizey;
    tileSize;
    oldTileSize;
    tiles=[];
    
    constructor(canvas,sizex,sizey,tileSize)
    {
        this.canvas=canvas;
        this.sizex=sizex;
        this.sizey=sizey;
        this.tileSize=tileSize;
        this.oldTileSize=tileSize;
        this.createTiles();
    }
    updateGrid(sizex,sizey,tileSize){
        this.sizex=sizex;
        this.sizey=sizey;
        this.tileSize=tileSize;
        
        if(this.oldTileSize!=tileSize)
            this.createTiles();  
        this.oldTileSize=tileSize;
    }
    createTiles(){
        this.tiles=[];
        for(let i = 0 ;i< this.sizey/this.tileSize;i++){
            this.tiles[i]=[]; // Yukarda Array.from(Array(2), () => new Array(4)) bunu kullanarak sabit bir array'de oluşturabilrisin.
            for(let j = 0 ; j<this.sizex/this.tileSize;j++){
                let pointx=j*this.tileSize;
                let pointy=i*this.tileSize;
                let tile =new Tile(pointx,pointy,0,this.tileSize);
                this.tiles[i].push(tile);
            }
        }
    }
    drawTiles(){
        this.canvas.clearRect(0,0,this.sizex,this.sizey);
        for(let i= 0 ; i<this.tiles.length;i++){
            for(let j = 0 ; j<this.tiles[i].length;j++){
                this.canvas.fillStyle=colors[this.tiles[i][j].color];
                this.canvas.fillRect(this.tiles[i][j].pointx,this.tiles[i][j].pointy,this.tiles[i][j].size,this.tiles[i][j].size);
            }
        }
    }

    isInCanvas(pointx, pointy){
        if(pointx>=0&&pointx<this.sizex&&pointy>=0&&pointy<this.sizey) return true;
        return false;
    }
    updateTileColor(x,y,color){
        this.tiles[y][x].color=color;
    }
    updateNormalColor(x,y,color){
        this.tiles[y][x].normalColor=color;
        this.tiles[y][x].color=color;
    }
    backToNormalColor(){
        for(let i=0;i<this.tiles.length;i++){
            for(let j = 0;j<this.tiles[i].length;j++){
                this.tiles[i][j].color=this.tiles[i][j].normalColor;
            }
        }   
    }
    compareTwoTilesColor(state1,state2){
        return this.tiles[state1[1]][state1[0]].normalColor == this.tiles[state2[1]][state2[0]].normalColor ? true : false;
    }
}