
// drawMode = 0 --> Start point to End point
// drawMode = 1 --> Draw Lines
// drawMode = 0 -->

export class Config{
    size;
    map;
    mode;
    velocity;
    algorithm;
    sizeofAgent;
    sizeofTile;
    constructor() {
        this.updateConfig();
    }
    updateConfig(){
        let sizeofCanvas = document.getElementById("sizeofCanvas");
        let maps=document.getElementById("maps");
        let modes=document.getElementById("modes");
        let velocityElement= document.getElementById("velocity");
        let algorithms= document.getElementById("algorithms");
        let sizeofAgents= document.getElementById("sizeofAgent");
        let sizeofTiles= document.getElementById("sizeofTiles");

        this.size = sizeofCanvas.options[sizeofCanvas.selectedIndex].text.split("x");
        this.map= maps.options[maps.selectedIndex].text;
        this.mode= modes.options[modes.selectedIndex].text;
        this.velocity=velocityElement.options[velocityElement.selectedIndex].text;
        this.algorithm=algorithms.options[algorithms.selectedIndex].text;
        this.sizeofAgent=sizeofAgents.options[sizeofAgents.selectedIndex].text;
        this.sizeofTile=sizeofTiles.options[sizeofTiles.selectedIndex].text;
        if(this.velocity=="StepbyStep"){
            document.getElementById("stepupbutton").removeAttribute("disabled");
        }
        else{
            document.getElementById("stepupbutton").setAttribute("disabled","disabled");
        }
        document.getElementById("cnvs").setAttribute("width",`${this.size[0]}`); // Canvasa config'de verilen değerlere göre bir genişlik giriyorum.
        document.getElementById("cnvs").setAttribute("height",`${this.size[1]}`);// Canvasa config'de verilen değerlere göre bir uzunluk giriyorum.
    }

}