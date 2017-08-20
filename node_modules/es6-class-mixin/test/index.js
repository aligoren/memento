/* globals before, after, describe, it, beforeEach */
'use strict';

// Dependencies
const mixin = require('..');

let ListItem = class ListItem {
  constructor() {
    this.isList = true;
    super();
  }
};

let Draggable = {
  drag() { return 'draggable'; }
};

let Droppable = {
  drop() { return 'droppable'; }
};

let MyDraggable = Object.create(Draggable)
MyDraggable.dragAndLog = function() {
  console.log("Dragged");
  return this.drag();
}

describe('mixin', () => {

  it('should work as extend-expression', () => {
    class View extends mixin(ListItem, Draggable, Droppable) {}
    let view = new View();
    view.should.have.property('isList');
    view.drag().should.be.equal('draggable');
    view.drop().should.be.equal('droppable');
  });

  it('should work as inherited properites', () => {
    class View extends mixin(ListItem, MyDraggable, Droppable) {}
    let view = new View();
    view.should.have.property('isList');
    view.drag().should.be.equal('draggable');
    view.drop().should.be.equal('droppable');
    view.dragAndLog().should.be.equal('draggable');
  });

});
