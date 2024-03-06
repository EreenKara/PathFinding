export class Node{
    action=[];
    parentNode;
    g;// total cost up to this node.
    depth;
    state; // location , (x,y) , bu örnekte state location oluyor.
    constructor(state,parentNode){
        this.state=state;
        this.parentNode=parentNode;
        this.action=null;
        this.g=0;
        this.depth=1;
    }
}