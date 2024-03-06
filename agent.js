export class Agent{
    state=[];
    goal=[];
    size;
    constructor(size){
        this.size=size;
    }
    clear(size){
        this.state=[];
        this.goal=[];
        this.size=size;
    }
    drawAgentStart(){
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                let x =arr[0]+j;
                let y =arr[1]+i;
                
            }
        }
    }
    drawAgentGoal(){

    }

}