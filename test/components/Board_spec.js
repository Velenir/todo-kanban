import React from 'react';
import {renderIntoDocument, scryRenderedComponentsWithType} from 'react-addons-test-utils';
import {UndecoratedBoard, DropTargetWrapper} from '../../app/components/Board';
import DragApp from '../../app/components/App';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import {compose} from 'redux';
import {expect} from 'chai';
import {ListRecord, List} from '../../app/helpers/immutableHelpers';

describe('Board', () => {
	class StoreLessBoard extends UndecoratedBoard {
		getApps() {
			console.log("REWRITE getApps");
			return this.props.lists.map((list, i) => <DragApp listIndex={i} key={list.id} id={list.id} moveList={this.props.moveList} todos={[]}/>);
		}
	}
	// Wrap DnD component in context with test backend
	const Board = compose(
		DragDropContext(TestBackend),
		DropTargetWrapper
	)(StoreLessBoard);
	
	it('should move list on hover when dragging', () => {
		const lists = List.of(
			new ListRecord({id: 1, title: "List 1"}),
			new ListRecord({id: 2, title: "List 2"})
		);
		
		let moveArguments = null;
		// Keep track of moveItem function execution
		const moveList = (...args) => moveArguments = args;
		
		const component = renderIntoDocument(
			<Board lists={lists} moveList={moveList}/>
		);
		const backend = component.getManager().getBackend();
		
		const apps = scryRenderedComponentsWithType(component, DragApp);
		
		// Drag DragSource-wrapped instance
		backend.simulateBeginDrag([apps[1].getDecoratedComponentInstance().getHandlerId()]);
		
		backend.simulateHover([apps[0].getHandlerId()]);
		
		expect(moveArguments).to.deep.equal([0, 1]);
		
		backend.simulateEndDrag();
	});
	
	it('should not move list on hover over list itself when dragging', () => {
		const lists = List.of(
			new ListRecord({id: 1, title: "List 1"}),
			new ListRecord({id: 2, title: "List 2"})
		);
		
		let moveArguments = null;
		// Keep track of moveItem function execution
		const moveList = (...args) => moveArguments = args;
		
		const component = renderIntoDocument(
			<Board lists={lists} moveList={moveList}/>
		);
		const backend = component.getManager().getBackend();
		
		const apps = scryRenderedComponentsWithType(component, DragApp);
		
		// Drag DragSource-wrapped instance
		backend.simulateBeginDrag([apps[1].getDecoratedComponentInstance().getHandlerId()]);
		
		backend.simulateHover([apps[1].getHandlerId()]);
		
		expect(moveArguments).to.be.null;
		
		backend.simulateEndDrag();
	});
	
	it('should retain list in its position from last hover when dropped in valid location', () => {
		const lists = List.of(
			new ListRecord({id: 1, title: "List 1"}),
			new ListRecord({id: 2, title: "List 2"})
		);
		
		let moveArguments = null;
		// Keep track of moveItem function execution
		const moveList = (...args) => moveArguments = args;
		
		const component = renderIntoDocument(
			<Board lists={lists} moveList={moveList}/>
		);
		const backend = component.getManager().getBackend();
		
		const apps = scryRenderedComponentsWithType(component, DragApp);
		
		// Drag DragSource-wrapped instance
		backend.simulateBeginDrag([apps[1].getDecoratedComponentInstance().getHandlerId()]);
		
		backend.simulateHover([apps[0].getHandlerId()]);
		
		// list at index 1 -> list at index 0 on hover
		expect(moveArguments).to.deep.equal([0, 1]);
		moveArguments = null;
		backend.simulateDrop();
		
		// stay at index 1 after drop
		expect(moveArguments).to.be.null;
		backend.simulateEndDrag();
	});
	
	it('should return list back to its original position when dropped not in valid location', () => {
		const lists = List.of(
			new ListRecord({id: 1, title: "List 1"}),
			new ListRecord({id: 2, title: "List 2"})
		);
		
		let moveArguments = null;
		// Keep track of moveItem function execution
		const moveList = (...args) => moveArguments = args;
		
		const component = renderIntoDocument(
			<Board lists={lists} moveList={moveList}/>
		);
		const backend = component.getManager().getBackend();
		
		const apps = scryRenderedComponentsWithType(component, DragApp);
		
		// Drag DragSource-wrapped instance
		backend.simulateBeginDrag([apps[1].getDecoratedComponentInstance().getHandlerId()]);
		
		backend.simulateHover([apps[0].getHandlerId()]);
		
		// list at index 1 -> list at index 0 on hover
		expect(moveArguments).to.deep.equal([0, 1]);
		// without dropping
		backend.simulateEndDrag();
		
		// back to index 1 after drop
		expect(moveArguments).to.deep.equal([1, 0]);
	});
});
