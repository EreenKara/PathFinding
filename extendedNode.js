import { Node } from "./node.js";

export class ExtendedNode extends Node{
    f;
    h;

    constructor(state,parentNode){
        super(state,parentNode);
    }
}