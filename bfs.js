import { searchAlgorithms } from "./searchAlgorithms.js";

export class BFS extends searchAlgorithms{



    chooseNextNode(){
        return this.openList.shift();
    }
}

