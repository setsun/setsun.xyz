import * as React from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import AbstractSphere from './AbstractSphere';
import Boxes from './Boxes';
import Stars from './Stars';
import OctahedronDance from './OctahedronDance';

const Sketches = ({ id }) => {
  switch (id) {
    case 1: {
      return <Boxes />;
    }
    case 2: {
      return <Stars />;
    }
    case 3: {
      return <OctahedronDance />;
    }
  }
};

export default Sketches;
