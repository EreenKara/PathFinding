import { searchAlgorithms } from "./searchAlgorithms.js";

export class DFS extends searchAlgorithms{

    chooseNextNode(){
        return this.openList.pop();
    }
     
    
}