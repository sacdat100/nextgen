import React from 'react';
import Draggable from 'react-draggable';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        console.log("Start Home");
    }

    /**
     * Render method called by React lifecycle to render this component.
     * @returns {*}
     */
    render () {
        console.info("Render is called");
        return (
              <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[25, 25]}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div>
                  <div className="handle">Drag from here</div>
                  <div>This readme is really dragging on...</div>
                </div>
              </Draggable>
        );
    }
}
