import Matter from "matter-js";
import React from "react";
import { JOINT } from "../../constants/"

export default class Joint {
  constructor(x, y, index, engine, handleJointClick) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.index = index;
    this.engine = engine;
    this.handleJointClick = handleJointClick(index);
    this.matterObject = Matter.Bodies.circle(
      this.initialX, this.initialY, JOINT.radius*2,
      {
        density: 0.04,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 0.8,
      });
    Matter.World.add(this.engine.world, [this.matterObject]);
  }

  render() {
    this.x = this.matterObject.position.x;
    this.y = this.matterObject.position.y;
    return (
      <div id = {`joint_${this.index}`}
           className = "joint"
           style={{
             width:JOINT.radius*2,
             height:JOINT.radius*2,
             borderRadius:JOINT.radius,
             left:`${this.x}px`,
             top:`${this.y}px`,
             background:'red'}}
           onClick={this.handleJointClick}/>
    )
  }
}