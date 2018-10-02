import React from 'react';
import Matter from "matter-js";
import Joint from "./components/Joint";
import Bone from "./components/Bone";
import {GROUND} from "../../constants";
import getAngleBetweenDots from "../../scripts/getAngleBetweenDots";
import Muscle from "./components/Muscle";

export default class GameField extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {};
    this.jointsList = [];
    this.bonesList = [];
    this.musclesList = [];
    this.domObjectRef = React.createRef();
    this.stopAnimationFlag = false;
  }

  componentDidMount() {
    this.engine = Matter.Engine.create();
    this.debugScreen = document.getElementById('debugCanvas');
    if (this.debugScreen) {
      this.debugScreenRenderer = Matter.Render.create({canvas:this.debugScreen, engine:this.engine});
      Matter.Render.run(this.debugScreenRenderer);
    }
    this.updateGamefieldPosition();
    this.addGround([{x:0, y:500}, {x:200, y:500},  {x:400, y:550},  {x:600, y:500},  {x:800, y:500},])
  }

  updateGamefieldPosition = () => {
    const gamefieldCorner = this.domObjectRef.current.getBoundingClientRect();
    this.gamefieldCornerX = gamefieldCorner.left;
    this.gamefieldCornerY = gamefieldCorner.top;
  };
  
  addGround = groundSurfaceArray => {
    let previousDot = false;
    groundSurfaceArray.forEach(({x,y}) => {
      if (previousDot) {
        
        const length = Math.sqrt(Math.pow((previousDot.y - y) ,2) + Math.pow((previousDot.x - x),2));
        const angle = getAngleBetweenDots([previousDot.x,previousDot.y],[x, y]);
  
        const centerX = Math.min(previousDot.x, x) + Math.abs(previousDot.x - x)/2;
        const centerY = Math.min(previousDot.y, y) + Math.abs(previousDot.y - y)/2;
        
        const matterObject = Matter.Bodies.rectangle(centerX, centerY, length, GROUND.thickness, {
          angle:angle/57.29,
          isStatic:true,
          friction:GROUND.friction,
        });
        
        Matter.World.add(this.engine.world, [matterObject]);
  
        previousDot = {x:x, y:y};
        
      } else {
        previousDot = {x:x, y:y};
      }
    })
  };

  handleGameFieldClick = (event) => {
    if (this.selectedJoint) this.selectedJoint = "";
    else if (this.selectedBone) this.selectedBone = "";
    else this.addJoint(event.clientX - this.gamefieldCornerX, event.clientY - this.gamefieldCornerY);
    this.forceUpdate();
  };

  handleJointClick = jointIndex => event => {
    if (this.selectedJoint) {
      this.addBone(this.selectedJoint, this.jointsList[jointIndex]);
      this.selectedJoint = '';
    }
    else {
      this.selectedJoint = this.jointsList[jointIndex];
      this.forceUpdate();
    }
    event.stopPropagation();
  };
  
  handleBoneClick = boneIndex => event => {
    if (this.selectedBone) {
      this.addMuscle(this.selectedBone, this.bonesList[boneIndex]);
      this.selectedBone = '';
    }
    else {
      this.selectedBone = this.bonesList[boneIndex];
      this.forceUpdate();
    }
    event.stopPropagation();
  };

  addJoint = (x,y) => {
    this.jointsList.push(new Joint(x, y, this.jointsList.length, this.engine, this.handleJointClick));
    this.forceUpdate();
  };

  addBone = (joint1, joint2) => {
    this.bonesList.push(new Bone(joint1, joint2, this.bonesList.length, this.engine, this.handleBoneClick));
    this.forceUpdate();
  };
  
  addMuscle = (bone1, bone2) => {
    this.musclesList.push(new Muscle(bone1, bone2, this.musclesList.length, this.handleMuscleClick));
    this.forceUpdate();
  };

  startSimulation = time => {
    const stepTime = isFinite(time) ? time : false;
    const startTime = new Date().getTime();
    this.renderStep(startTime, startTime, stepTime)
  };
  
  stopSimulation = () => {
    this.stopAnimationFlag = true;
  };

  renderStep = (animationStartTime, previousCallTime, targetAnimationLength) => {
    const currentTime = new Date().getTime();
    Matter.Engine.update(this.engine, previousCallTime-currentTime, 1);
    this.forceUpdate();
    if (!this.stopAnimationFlag) {
      if (!targetAnimationLength || currentTime - animationStartTime < targetAnimationLength) window.requestAnimationFrame(()=>{
        this.renderStep(animationStartTime, currentTime, targetAnimationLength)
      })
    } else {
      this.stopAnimationFlag = false;
    }
  };

  render()
  {
    return (
      <React.Fragment>
        <div className="BIGBUTTON" onClick={() => {this.startSimulation(200)}}>step</div>
        <div className="BIGBUTTON" onClick={this.startSimulation}>start</div>
        <div className="BIGBUTTON" onClick={this.stopSimulation}>stop</div>
        <div ref={this.domObjectRef}
             className="gamefield"
             onClick={this.handleGameFieldClick}>
          {this.jointsList.map(joint => {return joint.render(joint === this.selectedJoint)})}
          {this.bonesList.map(bone => {return bone.render(bone === this.selectedBone)})}
          {this.musclesList.map(muscle => {return muscle.render()})}
        </div>
        <canvas id="debugCanvas" style={{width:600, height:600}}/>
      </React.Fragment>
    );
  }
}