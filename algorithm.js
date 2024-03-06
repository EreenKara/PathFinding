export class Algorithm{
    openList=[];
    closedList=[];
    path=[];
    sleepTime=5;
    
    //disaridan veriyorum
    config;
    grid;
    agent;
    constructor() {
        if (this.constructor == Algorithm) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    iterativeSearchTree(){throw new Error("U have to Override this function in derived classes.");}
    
    legalActions(node){
        let legalActs=[];
        let left=false;
        let up=false;
        let right=false;
        let down=false;
        let x =node.state[0];
        let y =node.state[1];
        for(let a of this.actions)
        {
            
            let newX = x+a[0];
            let newY = y+a[1];
            if(this.isOkeyToPut([x,y],[newX,newY],this.config.sizeofAgent.substring(0,1))){
                legalActs.push(a);
                if(a[0]==1 && a[1]==0) right=true;
                else if(a[0]==-1 && a[1]==0) left=true;
                else if(a[0]==0 && a[1]==-1) up=true;
                else if(a[0]==0 && a[1]==1) down=true;
            }
        }
        if(left && up && this.grid.compareTwoTilesColor([x,y],[x-1,y-1])) legalActs.push([-1,-1,141]);
        if(right && up && this.grid.compareTwoTilesColor([x,y],[x+1,y-1])) legalActs.push([1,-1,141]);
        if(right && down && this.grid.compareTwoTilesColor([x,y],[x+1,y+1])) legalActs.push([1,1,141]);
        if(left && down && this.grid.compareTwoTilesColor([x,y],[x-1,y+1])) legalActs.push([-1,1,141]);
        return legalActs;
    }
    isOkeyToPut(state,newState,size){
        let x=newState[0];
        let y=newState[1];

        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                let newX=x+i;
                let newY=y+j;
                if(!this.grid.isInCanvas(newX*this.grid.tileSize,newY*this.grid.tileSize)||
                 !this.grid.compareTwoTilesColor([state[0],state[1]],[newX,newY])){
                    return false;
                }
            }
        }
        return true;
        
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async draw(){
        this.openList.forEach((node)=>this.grid.updateTileColor(node.state[0],node.state[1],6));
        this.closedList.forEach((node)=>this.grid.updateTileColor(node.state[0],node.state[1],5));
        this.grid.drawTiles();
        await this.sleep(this.sleepTime);
    }

    compareTwoStates(state1,state2){
        return state1[0]==state2[0] && state1[1]==[state2[1]] ? true : false;
    }

}