import Muscle from "../scenes/CreatureConstructor/components/Muscle";

//collision bits order: bone, joints, ground

export const JOINT = {
  bodyRadius:30,
  visualRadius:40,
  friction:0.1,
  collisionBitset:0x0010,
  collisionBitmask:0x0001,
  };

export const BONE = {
  thickness:40,
  visualJointOverlap:JOINT.bodyRadius,
  collisionBitset:0x0100,
  collisionBitmask:0x0001,
};

export const MUSCLE = {
  thickness:10,
  //currently has no physic body
  };

export const CONSTRAINT = {
  damping:0.1,
  stiffness:0.9,
  length:0,
};

export const GROUND = {
  thickness:10,
  friction:0.8
  };