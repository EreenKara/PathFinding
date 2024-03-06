import { ExtendedNode } from "./extendedNode.js";
import { searchAlgorithms } from "./searchAlgorithms.js";

export class Astar extends searchAlgorithms{


    euclideanH(node){
        let nodeX = node.state[0];
        let nodeY = node.state[1];
        let goalX = this.agent.goal[0];
        let goalY = this.agent.goal[1];

        let distance = Math.sqrt((nodeX-goalX)**2+(nodeY-goalY)**2);
        return distance*120; // burada herbir adım 100-141 olduğundan 120 dedim. Ortalama bir rakam verdim.

    }
    manhattanH(node){
        let nodeX = node.state[0];
        let nodeY = node.state[1];
        let goalX = this.agent.goal[0];
        let goalY = this.agent.goal[1];
        let dx= Math.abs(nodeX-goalX);
        let dy= Math.abs(nodeY-goalY);

        let distance = (dx+dy)*100;
        return distance;
    }
    diagonalManhattanH(node){
        let nodeX = node.state[0];
        let nodeY = node.state[1];
        let goalX = this.agent.goal[0];
        let goalY = this.agent.goal[1];
        let dx= Math.abs(nodeX-goalX);
        let dy= Math.abs(nodeY-goalY);
        let minDistance = Math.min(dx,dy);
        let maxDistance= Math.max(dx,dy);

        let distance = minDistance*141 + maxDistance*100 ;
        return distance;
    }
    calculateF(node){
        let f = node.g+ this.euclideanH(node);
        return f;
    }
    chooseNextNode(){
        let minDistanceNode=this.openList[0];
        let indexOfRemoveNode=0;
        console.log("min F:",minDistanceNode.f);
        for(let i =1;i<this.openList.length;i++)
        {
            // console.log("i-> F:",this.openList[i].f);
            if(minDistanceNode.f>this.openList[i].f){
                minDistanceNode=this.openList[i];
                indexOfRemoveNode=i;
            }
        }
        this.openList.splice(indexOfRemoveNode, 1); // Remove 1 element starting from the found index
        
        return minDistanceNode;
    }
       
    iterativeSearchTree(){
        // console.log("agent: ",this.agent);
        if(this.closedList.length==0){
            let firstNode = new ExtendedNode(this.agent.state,null);
            this.openList.push(firstNode);
            firstNode.h=this.euclideanH(firstNode);
            firstNode.f=this.calculateF(firstNode);
        }
         
        if(this.openList.length==0) return -1; // fail
        let node = this.chooseNextNode();
        // console.log("node:",node );
        if(node.state[0]==this.agent.goal[0]&&node.state[1]==this.agent.goal[1]) return node; // solution
        if(this.closedList.find((x)=>x.state[0]==node.state[0]&&x.state[1]==node.state[1])!=undefined) return -2; // pass the draw 
        this.closedList.push(node);
        let successors = this.expand(node);
        successors.forEach((x)=>this.openList.push(x));
        return; // draw if undefined
    }
    
    
    expand(node){
        let successors=[];
        let legalActs= this.legalActions(node);
        for(let act of legalActs){
            let x=node.state[0]+act[0];
            let y=node.state[1]+act[1];
            let childNode=new ExtendedNode([x,y],node);
            childNode.action=act;
            childNode.g=node.g+ act[2];// buraya action'u bir sınıf oalrak yazarsan onun cost'nunu girebilirsin.
            childNode.h=this.euclideanH(childNode);
            childNode.f=this.calculateF(childNode);
            childNode.depth=node.depth+1;
            successors.push(childNode);
        }
        return successors;
    }

}