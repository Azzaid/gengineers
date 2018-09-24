import Matter from "matter-js";
import React from "react";
import { BONE, JOINT, CONSTRAINT } from "../../constants/"
import getAngleBetweenDots from "../../scripts/getAngleBetweenDots"

export default class Bone {
  constructor(joint1, joint2, index, engine, handleBoneClick) {
    this.joint1 = joint1;
    this.joint2 = joint2;
    this.index = index;
    this.engine = engine;
    //this.handleBoneClick = handleBoneClick(index);
    
    this.lenght = Math.sqrt(Math.pow((this.joint1.y-this.joint2.y) ,2) + Math.pow((this.joint1.x-this.joint2.x),2));
    this.angle = getAngleBetweenDots([this.joint1.x,this.joint1.y],[this.joint2.x,this.joint2.y]);
    
    this.x = this.joint1.x + (BONE.thickness/2 * Math.sin(this.angle/57.29)) + JOINT.radius;
    this.y = this.joint1.y + (BONE.thickness/2 * Math.cos(this.angle/57.29))  + JOINT.radius;
    
    this.matterObject = Matter.Bodies.rectangle(this.x, this.y, this.lenght, BONE.thickness, {
      angle:this.angle/57.29,
      density: 0.04,
      friction: 0.01,
      frictionAir: 0.00001,
      restitution: 0.8,
    });
    this.constraintWithJoint1 = Matter.Constraint.create({
      bodyA:joint1.matterObject,
      bodyB:this.matterObject,
      pointB:{x:BONE.thickness/2, y:0},
      damping:CONSTRAINT.damping,
      stiffness:CONSTRAINT.stiffness});
    this.constraintWithJoint2 = Matter.Constraint.create({bodyA:joint2.matterObject, bodyB:this.matterObject, stiffness:1});
    Matter.World.add(this.engine.world, [this.matterObject, this.constraintWithJoint1, this.constraintWithJoint2]);
  }

  render() {
    this.x = this.matterObject.position.x;
    this.y = this.matterObject.position.y;
    this.angle = this.matterObject.angle * 57.29;
    console.log(this.constraintWithJoint1);
    return (
      <div id = {`bone_${this.index}`}
           className = "bone"
           style={{
             width:this.lenght,
             height:BONE.thickness,
             left:`${this.x}px`,
             top:`${this.y}px`,
             transform:`rotate(${this.angle}deg)`,
             background:'blue'}}
           onClick={this.handleJointClick}/>
    )
  }
}