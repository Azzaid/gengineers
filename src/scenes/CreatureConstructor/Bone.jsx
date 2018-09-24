import Matter from "matter-js";
import React from "react";
import { BONE } from "../../constants/"

export default class Bone {
  constructor(joint1, joint2, index, engine, handleBoneClick) {
    this.joint1 = joint1;
    this.joint2 = joint2;
    this.index = index;
    this.engine = engine;
    this.handleBoneClick = handleBoneClick(index);
    
    this.lenght = Math.sqrt(Math.pow((this.joint1.y-this.joint2.y) ,2) + Math.pow((this.joint1.x-this.joint2.x),2));
    this.angle = getAngleBetweenDots([this.joints[0].currentX,this.joint1.y],[this.joints[1].currentX,this.joint2.y]);
    
    this.x = this.joint1.y - bone.thickness;
    this.y = this.joints[0].currentY+(jointHeight/2)-(boneHeigth/2);
    
    this.matterObject = Matter.Bodies.rectangle(x, y, width, height, {
      density: 0.04,
      friction: 0.01,
      frictionAir: 0.00001,
      restitution: 0.8,
    });
    this.constraintWithJoint1 = Matter.Constraint.create({bodyA:joint1, bodyB:this.matterObject, stiffness:1});
    this.constraintWithJoint2 = Matter.Constraint.create({bodyA:joint2, bodyB:this.matterObject, stiffness:1});
    Matter.World.add(this.engine.world, [this.matterObject, this.constraintWithJoint1, this.constraintWithJoint2]);
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