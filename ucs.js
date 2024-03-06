import { searchAlgorithms } from "./searchAlgorithms.js";

export class UCS extends searchAlgorithms{
    constructor(grid,config,agent){
        super();
        this.config=config;
        this.grid=grid;
        this.agent=agent;
    }
    minGValue(){
        let index=0;
        let minNode = this.openList[index];
        for (let i =0; i < this.openList.length; i++) {
            const node = this.openList[i];
            if(node.g<minNode.g){
                minNode=node;
                index=i;
            }
        }
        this.openList.splice(index,1);
        return minNode;
    }
    chooseNextNode(){
        return this.minGValue();
    }
}