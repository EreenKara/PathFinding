import { Algorithm } from "./algorithm.js";
import { Node } from "./node.js";

export class searchAlgorithms extends Algorithm{
    constructor(grid,config,agent){
        super();
        this.config=config;
        this.grid=grid;
        this.agent=agent;
        this.actions=[
            [-1,0,100],
            [0,-1,100],
            [1,0,100],
            [0,1,100]
        ]
    }

    chooseNextNode(){throw new Error("Override this function on derived classes");    }
       
    iterativeSearchTree(){
        if(this.closedList.length==0){
            this.openList.push(new Node(this.agent.state,null));
        }
         
        if(this.openList.length==0) return -1; // fail
        let node = this.chooseNextNode();
        if(node.state[0]==this.agent.goal[0]&&node.state[1]==this.agent.goal[1]) return node; // solution
        if(this.closedList.find((x)=>x.state[0]==node.state[0]&&x.state[1]==node.state[1])!=undefined) return -2;
        this.closedList.push(node);
        let successors = this.expand(node);
        successors.forEach((x)=>this.openList.push(x));
        return;
    }
    
    
    expand(node){
        let successors=[];
        let legalActs= this.legalActions(node);
        for(let act of legalActs){
            let x=node.state[0]+act[0];
            let y=node.state[1]+act[1];
            let childNode=new Node([x,y],node);
            childNode.action=act;
            childNode.g=node.g+ act[2];// buraya action'u bir sınıf oalrak yazarsan onun cost'nunu girebilirsin.
            childNode.depth=node.depth+1;
            successors.push(childNode);
            // if(this.startendState==2){
            //     await this.draw(node,6);
            // }
        }
        return successors;
    }
}