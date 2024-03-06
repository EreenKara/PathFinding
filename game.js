import {Config} from "./config.js"
import {Gamer} from "./gamer.js"
import {Grid} from "./grid.js"
import {Tile} from "./tile.js"
import {colors} from "./colors.js"
import { DFS } from "./dfs.js"
import { BFS } from "./bfs.js"
import { UCS } from "./ucs.js"
import { Astar } from "./Astar.js"
import { Agent } from "./agent.js"
class Game{
    canvas;
    config;
    grid;
    gamer;
    agent;
    algorithm;
    intervalName;
    isMouseDown=false;
    gameState=0;

    constructor(){
        this.canvas=document.getElementById("cnvs").getContext("2d");
        this.config=new Config();
        this.grid=new Grid(this.canvas,this.config.size[0],this.config.size[1],this.config.sizeofTile);
        this.gamer=new Gamer(0,0);
        this.agent=new Agent(this.config.sizeofAgent.substring(0,1));
        this.algorithm=new BFS(this.grid,this.config,this.agent);
    }
    refresh(){
        this.gameState=0;
        switch (this.config.algorithm) {
            case "BFS":
                this.algorithm=new BFS(this.grid,this.config,this.agent);
                break;
            case "DFS":
                this.algorithm=new DFS(this.grid,this.config,this.agent);
                break;
            case "UCS":
                this.algorithm=new UCS(this.grid,this.config,this.agent);
                break;
            case "A*":
                this.algorithm=new Astar(this.grid,this.config,this.agent);
                break;
            default:
                break;
        }
    }
    updateAllThings(){
        this.config.updateConfig();
        this.grid.updateGrid(this.config.size[0],this.config.size[1],this.config.sizeofTile);
        this.ModeIntervals();
        this.agent.clear(this.config.sizeofAgent.substring(0,1));
        this.refresh();
        this.grid.backToNormalColor();
    }




    makePath(node){
        let temp = node;
        do{
            this.algorithm.path.unshift(temp.action);
            temp=temp.parentNode;
            
        }while(temp.parentNode!=null);

        return this.algorithm.path;
    }
    async algorithmFindPath(){
        let node;
        do{
            node=this.algorithm.iterativeSearchTree();
            if(this.config.velocity=="StepToStep" && node!=-2 ){
                await this.algorithm.draw();
            }
        }while(this.gameState==2&&(node==undefined || node==-2))
        if(node == -1 ||node== undefined) return -1;
        return this.makePath(node);
    }
    async findPath(){
        this.algorithm.path=[];
        this.algorithm.openList=[];
        this.algorithm.closedList=[];
        let path = await this.algorithmFindPath();
        if(path==-1||path==undefined) return;
        this.drawPath(path);
        
    }
    drawPath(path){
        let newx=this.agent.state[0];
        let newy=this.agent.state[1];
        let index=0;
        for (; index < path.length-1; index++) {
            const action = path[index];
            newx = newx + action[0];
            newy = newy + action[1];
            this.grid.updateTileColor(newx,newy,1);
        }
        this.drawAgentStart();
        this.drawAgentGoal();
    }
    async stepbyStep(){
        if(this.algorithm.path.length!=0) return;
        let node;
        do{
            node=this.algorithm.iterativeSearchTree();
        }while(this.gameState==2&&node==-2)
        await this.algorithm.draw();
        if(!(node == -1 ||node== undefined)) this.drawPath(this.makePath(node));
    }




    readMap(mapText){
        if(mapText==""||mapText==null||mapText=="None") return;
    }
    ModeIntervals(){
        if(this.config.mode=="DrawLine")
        {
            this.intervalName=setInterval(()=>{
                if(this.isMouseDown && this.grid.isInCanvas(this.gamer.mouseX,this.gamer.mouseY)){
                    let arr=this.positionToState([this.gamer.mouseX,this.gamer.mouseY]);
                    this.grid.updateNormalColor(arr[0],arr[1],4);
                }
            },17);
        }
        else{
            clearInterval(this.intervalName);
        }
    }
    drawAgentStart(){
        for(let i=0;i<this.agent.size;i++){
            for(let j=0;j<this.agent.size;j++){
                let x =this.agent.state[0]+j;
                let y =this.agent.state[1]+i;
                this.grid.updateTileColor(x,y,2);
            }
        }
    }
    drawAgentGoal(){
        for(let i=0;i<this.agent.size;i++){
            for(let j=0;j<this.agent.size;j++){
                let x =this.agent.goal[0]+j;
                let y =this.agent.goal[1]+i;
                this.grid.updateTileColor(x,y,2);
            }
        }
    }
    putAgent(){
        let arr=this.positionToState([this.gamer.mouseX,this.gamer.mouseY]);
        for(let i=0;i<this.agent.size;i++){
            for(let j=0;j<this.agent.size;j++){
                let x =arr[0]+j;
                let y =arr[1]+i;
                if(!this.grid.isInCanvas(x*this.grid.tileSize,y*this.grid.tileSize)||
                !this.grid.compareTwoTilesColor([arr[0],arr[1]],[x,y])){
                    return false;
                }
            }
        }
        if(this.gameState==0)
        { 
            this.agent.state.push(arr[0]);
            this.agent.state.push(arr[1]);
            this.drawAgentStart();
            this.gameState=1;
        }
        else if(this.gameState==1){

            this.agent.goal.push(arr[0]);
            this.agent.goal.push(arr[1]);
            this.drawAgentGoal();
            this.gameState=2;
            if(this.config.velocity!="StepbyStep") this.findPath();
            else{
                this.algorithm.path=[];
                this.algorithm.openList=[];
                this.algorithm.closedList=[];
            }
        }
        else if(this.gameState==2){ //if(this.startPoint.length==0 && this.endPoint.length==0){
            this.grid.backToNormalColor();
            this.agent.state=[];
            this.agent.goal=[];
            this.gameState=0;
        }
    }
    setAllEvents(){
        
        document.getElementById("sizeofCanvas").onchange=()=>this.updateAllThings();
        document.getElementById("maps").onchange =()=>this.updateAllThings();
        document.getElementById("modes").onchange =()=>this.updateAllThings();
        document.getElementById("velocity").onchange =()=>this.updateAllThings();
        document.getElementById("algorithms").onchange =()=>this.updateAllThings();
        document.getElementById("sizeofAgent").onchange =()=>this.updateAllThings();
        document.getElementById("sizeofTiles").onchange =()=>this.updateAllThings();
        document.getElementById("stepupbutton").onclick=()=>this.stepbyStep();

        document.onmousemove=(mouse)=>{
            this.gamer.mouseX=mouse.clientX;
            this.gamer.mouseY=mouse.clientY;
        };
        document.onclick=()=> // burada click olayında eğer canvasın içindeyse renk değiştirdim.
        {
            if(this.config.mode=="StartToEnd" && this.grid.isInCanvas(this.gamer.mouseX,this.gamer.mouseY) ){
                this.putAgent();
            }
        };
        
        document.onmousedown=()=>{
            if(this.config.mode=="DrawLine") this.isMouseDown=true;
        };
        document.onmouseup=()=>{
            if(this.config.mode=="DrawLine") 
            {
                this.isMouseDown=false;
            }
        };
    }
    positionToState(position){
        let x =Math.floor(position[0]/this.config.sizeofTile);
        let y =Math.floor(position[1]/this.config.sizeofTile);
        return [x,y]; // x ,y ikilisi almak için 
    }


    gameTick(){
        this.grid.drawTiles();
    }

    start(){
        this.setAllEvents();
        setInterval(() => {
            this.gameTick();
        }, 17);
    }
}

let game=new Game();
game.start();

console.log("?:",game.algorithm.isOkeyToPut([3,-1],1));