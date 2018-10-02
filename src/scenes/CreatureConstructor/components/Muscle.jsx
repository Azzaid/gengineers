import React from "react";
import { MUSCLE } from "../../../constants/index"
import getAngleBetweenDots from "../../../scripts/getAngleBetweenDots"

export default class Muscle {
  constructor(bone1, bone2, index, handleMuscleClick) {
    this.bone1 = bone1;
    this.bone2 = bone2;
    this.index = index;
    //this.handleMuscleClick = handleMuscleClick(index);
    
    this.lenght = Math.sqrt(Math.pow((this.bone1.y-this.bone2.y) ,2) + Math.pow((this.bone1.x-this.bone2.x),2));
  }
  
  render() {
    const angle = getAngleBetweenDots([this.bone1.x,this.bone1.y],[this.bone2.x,this.bone2.y]);
    const x = Math.min(this.bone1.x, this.bone2.x)+ Math.abs(this.bone1.x - this.bone2.x)/2;
    const y = Math.min(this.bone1.y, this.bone2.y)+ Math.abs(this.bone1.y - this.bone2.y)/2;
    return (
      <div id = {`bone_${this.index}`}
           className = "bone"
           style={{
             width:this.lenght,
             height:MUSCLE.thickness,
             transform:`translate(${x-this.lenght/2}px, ${y-MUSCLE.thickness/2}px) rotate(${angle}deg)`,
             background:'blue'}}
           onClick={this.handleJointClick}/>
    )
  }
}