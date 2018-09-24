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


    this.initialLenght = Math.sqrt(Math.pow((this.joints[0].currentY-this.joints[1].currentY) ,2) + Math.pow((this.joints[0].currentX-this.joints[1].currentX),2));

    this.coordX = this.joints[0].currentX+(jointWith/2);
    this.coordY = this.joints[0].currentY+(jointHeight/2)-(boneHeigth/2);
    this.middleX = this.coordX + (this.joints[1].currentX-this.joints[0].currentX)/2;
    this.middleY = this.coordY + (this.joints[1].currentY-this.joints[0].currentY)/2;
    this.lenght = Math.sqrt(Math.pow((this.joints[0].currentY-this.joints[1].currentY) ,2) + Math.pow((this.joints[0].currentX-this.joints[1].currentX),2));
    this.angle = getAngleBetweenDots([this.joints[0].currentX,this.joints[0].currentY],[this.joints[1].currentX,this.joints[1].currentY]);


    this.matterObject = Matter.Bodies.rectangle(x, y, width, height, [options])
      this.initialX, this.initialY, JOINT.radius*2,
      {
        density: 0.04,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 0.8,
      });
    this.constraintWithJoint1 = Matter.Constraint.create({bodyA:joint1, bodyB:this.matterObject, stiffness:1});
    this.constraintWithJoint2 = Matter.Constraint.create({bodyA:joint2, bodyB:this.matterObject, stiffness:1});
    Matter.World.add(this.engine.world, [this.constraintWithJoint1, this.constraintWithJoint2, this.matterObject]);
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