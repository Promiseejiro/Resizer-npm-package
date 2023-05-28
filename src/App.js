import React, { useEffect, useState, useRef } from "react";
import image from "./image.jpg";
import "./App.css";

function App() {
  // ref start
  const defaultSizeContainerRef = useRef(null);
  const rightResizerRef = useRef();
  const leftResizerRef = useRef();
  const bottoomResizerRef = useRef();
  const topResizerRef = useRef();
  // ref ends

  // states
  const [stopResizing, setStopResizing] = useState(false);
  const [defaultSizeContainer, setDefaultSizeContainer] = useState({
    width: 100,
    height: 100,
    left: 0,
    right: 100,
    top: 0,
    bottom: 100,
  });
  const [moving, setMoving] = useState(false);
  const [touchPoint, setTouchPoint] = useState({});
  const [resizer, setResizer] = useState({
    left: false,
    top: false,
    right: false,
    bottom: false,
  });
  // states end
  // function start
  const touchPointChecker = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      var x = e.changedTouches[i].clientX;
      var y = e.changedTouches[i].clientY;
      return { x, y };
    }
  };

  const MousePoint = (e) => {
    var x = e.clientX;
    var y = e.clientY;
    return { x, y };
  };

  const touchStart = (e) => {
    setMoving(true);
    setTouchPoint({
      ...touchPoint,
      x: touchPointChecker(e).x - defaultSizeContainer.width / 2,
      y: touchPointChecker(e).y - defaultSizeContainer.height / 2,
    });
    setDefaultSizeContainer({
      ...defaultSizeContainer,
      left: defaultSizeContainerRef.current.getBoundingClientRect().left,
      top: defaultSizeContainerRef.current.getBoundingClientRect().top,
      right: defaultSizeContainerRef.current.getBoundingClientRect().right,
      bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
    });
  };

  const mousedown = (e) => {
    setMoving(true);
    setTouchPoint({
      ...touchPoint,
      x: MousePoint(e).x - defaultSizeContainer.width / 2,
      y: MousePoint(e).y - defaultSizeContainer.height / 2,
    });
    setDefaultSizeContainer({
      ...defaultSizeContainer,
      left: defaultSizeContainerRef.current.getBoundingClientRect().left,
      top: defaultSizeContainerRef.current.getBoundingClientRect().top,
      right: defaultSizeContainerRef.current.getBoundingClientRect().right,
      bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
    });
  };

  const touchEnd = (e) => {
    setMoving(false);
    setTouchPoint({
      ...touchPoint,
      x: touchPointChecker(e).x - defaultSizeContainer.width / 2,
      y: touchPointChecker(e).y - defaultSizeContainer.height / 2,
    });

    setDefaultSizeContainer({
      ...defaultSizeContainer,
      left: defaultSizeContainerRef.current.getBoundingClientRect().left,
      top: defaultSizeContainerRef.current.getBoundingClientRect().top,
      right: defaultSizeContainerRef.current.getBoundingClientRect().right,
      bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
    });
  };

  const mouseUp = (e) => {
    var x = e.clientX;
    var y = e.clientY;
    setMoving(false);
    setTouchPoint({
      ...touchPoint,
      x: e.clientX - defaultSizeContainer.width / 2,
      y: e.clientY - defaultSizeContainer.height / 2,
    });

    setDefaultSizeContainer({
      ...defaultSizeContainer,
      left: defaultSizeContainerRef.current.getBoundingClientRect().left,
      top: defaultSizeContainerRef.current.getBoundingClientRect().top,
      right: defaultSizeContainerRef.current.getBoundingClientRect().right,
      bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
    });
  };

  const TouchMove = (e) => {
    // console.log(moving);
    if (moving) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x - defaultSizeContainer.width / 2,
        y: touchPointChecker(e).y - defaultSizeContainer.height / 2,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        x: touchPoint.x,
        y: touchPoint.y,
        left: defaultSizeContainerRef.current.getBoundingClientRect().left,
        top: defaultSizeContainerRef.current.getBoundingClientRect().top,
        right: defaultSizeContainerRef.current.getBoundingClientRect().right,
        bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
        box_left: defaultSizeContainer.left,
        box_top: defaultSizeContainer.height / 2,
      });
    }
  };

  const mouseMove = (e) => {
    var x = e.clientX;
    var y = e.clientY;
    if (moving) {
      setTouchPoint({
        ...touchPoint,
        x: MousePoint.x - defaultSizeContainer.width / 2,
        y: MousePoint.y - defaultSizeContainer.height / 2,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        x: (x = e.clientX - defaultSizeContainer.width / 2),
        y: e.clientY - defaultSizeContainer.height / 2,
        left: defaultSizeContainerRef.current.getBoundingClientRect().left,
        top: defaultSizeContainerRef.current.getBoundingClientRect().top,
        right: defaultSizeContainerRef.current.getBoundingClientRect().right,
        bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
        box_left: defaultSizeContainer.left,
        box_top: defaultSizeContainer.height / 2,
      });
    }

    if (resizer.right) {
      setTouchPoint({
        ...touchPoint,
        x: MousePoint(e).x,
        y: MousePoint(e).y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        width: defaultSizeContainer.right - defaultSizeContainer.left,
        right: touchPoint.x,
      });
      if (
        defaultSizeContainer.right < defaultSizeContainer.left ||
        defaultSizeContainer.bottom < defaultSizeContainer.top
      ) {
        setStopResizing(true);
        console.log(stopResizing);
      }
    }

    if (resizer.left) {
      setTouchPoint({
        ...touchPoint,
        x: MousePoint(e).x,
        y: MousePoint(e).y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        x:
          defaultSizeContainer.left -
          (defaultSizeContainer.left - touchPoint.x),
        left:
          defaultSizeContainer.left -
          (defaultSizeContainer.left - touchPoint.x),
        width:
          defaultSizeContainer.width +
          (defaultSizeContainer.left - touchPoint.x),
      });
    }

    if (resizer.top) {
      setTouchPoint({
        ...touchPoint,
        x: MousePoint(e).x,
        y: MousePoint(e).y,
      });

      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:
          defaultSizeContainer.height +
          (defaultSizeContainer.top - touchPoint.y),
        y: defaultSizeContainer.top - (defaultSizeContainer.top - touchPoint.y),
        top:
          defaultSizeContainer.top - (defaultSizeContainer.top - touchPoint.y),
      });
    }

    if (resizer.bottom) {
      setTouchPoint({
        ...touchPoint,
        x: MousePoint(e).x,
        y: MousePoint(e).y,
      });

      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height: defaultSizeContainer.bottom - defaultSizeContainer.top,
        bottom: touchPoint.y,
      });
    }
  };

  //right resizer
  const movingRightResizerHandler = (e) => {
    if (resizer.right) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x,
        y: touchPointChecker(e).y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        width: defaultSizeContainer.right - defaultSizeContainer.left,
        right: touchPoint.x,
      });
      if (
        defaultSizeContainer.right < defaultSizeContainer.left ||
        defaultSizeContainer.bottom < defaultSizeContainer.top
      ) {
        setStopResizing(true);
        console.log(stopResizing);
      }
    }
  };

  const movingLeftResizerHandler = (e) => {
    if (resizer.left) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x,
        y: touchPointChecker(e).y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        x:
          defaultSizeContainer.left -
          (defaultSizeContainer.left - touchPoint.x),
        left:
          defaultSizeContainer.left -
          (defaultSizeContainer.left - touchPoint.x),
        width:
          defaultSizeContainer.width +
          (defaultSizeContainer.left - touchPoint.x),
      });
    }
  };

  const movingBottomResizerHandler = (e) => {
    if (resizer.bottom) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x,
        y: touchPointChecker(e).y,
      });

      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height: defaultSizeContainer.bottom - defaultSizeContainer.top,
        bottom: touchPoint.y,
      });
    }
  };

  const movingTopResizerHandler = (e) => {
    if (resizer.top) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x,
        y: touchPointChecker(e).y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:
          defaultSizeContainer.height +
          (defaultSizeContainer.top - touchPoint.y),
        y: defaultSizeContainer.top - (defaultSizeContainer.top - touchPoint.y),
        top:
          defaultSizeContainer.top - (defaultSizeContainer.top - touchPoint.y),
      });
    }
  };

  const bottomRightResizerHandle = (e) => {
    console.log(resizer.bottom, resizer.right);
    if (resizer.bottom && resizer.right) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x,
        y: touchPointChecker(e).y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        width: defaultSizeContainer.right - defaultSizeContainer.left,
        right: touchPoint.x,
        height: defaultSizeContainer.bottom - defaultSizeContainer.top,
        bottom: touchPoint.y,
      });
    }
  };

  const bottomLeftResizerHandle = (e) => {
    if (resizer.left && resizer.bottom) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x,
        y: touchPointChecker(e).y,
      });

      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height: defaultSizeContainer.bottom - defaultSizeContainer.top,
        bottom: touchPoint.y,
        left:
          defaultSizeContainer.left -
          (defaultSizeContainer.left - touchPoint.x),
        width:
          defaultSizeContainer.width +
          (defaultSizeContainer.left - touchPoint.x),
      });
    }
  };

  const TopLeftResizerHandle = (e) => {
    if (resizer.top && resizer.left) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x,
        y: touchPointChecker(e).y,
      });

      setDefaultSizeContainer({
        ...defaultSizeContainer,
        left:
          defaultSizeContainer.left -
          (defaultSizeContainer.left - touchPoint.x),
        width:
          defaultSizeContainer.width +
          (defaultSizeContainer.left - touchPoint.x),
        height:
          defaultSizeContainer.height +
          (defaultSizeContainer.top - touchPoint.y),
        top:
          defaultSizeContainer.top - (defaultSizeContainer.top - touchPoint.y),
      });
    }
  };

  const TopRightResizerHandle = (e) => {
    if (resizer.top && resizer.right) {
      setTouchPoint({
        ...touchPoint,
        x: touchPointChecker(e).x,
        y: touchPointChecker(e).y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:
          defaultSizeContainer.height +
          (defaultSizeContainer.top - touchPoint.y),
        top:
          defaultSizeContainer.top - (defaultSizeContainer.top - touchPoint.y),
        width: defaultSizeContainer.right - defaultSizeContainer.left,
        right: touchPoint.x,
      });
    }
  };

  useEffect(() => {}, [defaultSizeContainer]);

  return (
    <div className="App" onMouseMove={mouseMove}>
      <div
        className="defaultSizeContainer"
        style={{
          width: `${defaultSizeContainer.width}px`,
          height: `${defaultSizeContainer.height}px`,
          left: `${defaultSizeContainer.x}px`,
          top: `${defaultSizeContainer.y}px`,
          opacity: "0",
        }}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        onTouchMove={TouchMove}
        onMouseDown={mousedown}
        onMouseUp={mouseUp}
        ref={defaultSizeContainerRef}
      ></div>
      <img
        src={image}
        className="element-being-resized"
        style={{
          width: `${defaultSizeContainer.width}px`,
          height: `${defaultSizeContainer.height}px`,
          left: `${defaultSizeContainer.left}px`,
          top: `${defaultSizeContainer.top}px`,
        }}
        onDragStart={(e) => e.preventDefault()}
      />
      <div
        className="resizer resizer_right"
        style={{
          left: `${defaultSizeContainer.right}px`,
          top: `${defaultSizeContainer.top}px`,
          height: `${defaultSizeContainer.height}px`,
        }}
        ref={rightResizerRef}
        onTouchMove={movingRightResizerHandler}
        onTouchStart={() => {
          setResizer({ ...resizer, right: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, right: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, right: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, right: false });
        }}
      ></div>
      {/* left resizer */}
      <div
        style={{
          position: "absolute",
          right: `${defaultSizeContainer.right}px`,
        }}
      >
        {defaultSizeContainer.right}
      </div>
      <div
        className="resizer resizer_left"
        style={{
          left: `${defaultSizeContainer.left}px`,
          top: `${defaultSizeContainer.top}px`,
          height: `${defaultSizeContainer.height}px`,
        }}
        onTouchMove={movingLeftResizerHandler}
        onTouchStart={() => {
          setResizer({ ...resizer, left: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, left: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, left: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, left: false });
        }}
      ></div>
      <div
        className="resizer resizer_top"
        style={{
          left: `${defaultSizeContainer.left}px`,
          top: `${defaultSizeContainer.top}px`,
          width: `${defaultSizeContainer.width}px`,
        }}
        ref={topResizerRef}
        onTouchMove={movingTopResizerHandler}
        onTouchStart={() => {
          setResizer({ ...resizer, top: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, top: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, top: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, top: false });
        }}
      ></div>
      <div
        className="resizer resizer_bottom"
        style={{
          left: `${defaultSizeContainer.left}px`,
          top: `${defaultSizeContainer.bottom}px`,
          width: `${defaultSizeContainer.width}px`,
        }}
        ref={bottoomResizerRef}
        onTouchMove={movingBottomResizerHandler}
        onTouchStart={() => {
          setResizer({ ...resizer, bottom: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, bottom: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, bottom: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, bottom: false });
        }}
      ></div>
      {/* bottom-right */}
      <div
        className="box-resizer "
        style={{
          left: `${defaultSizeContainer.right - 6}px`,
          top: `${defaultSizeContainer.bottom - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, right: true, bottom: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, right: false, bottom: false });
        }}
        mousedown={() => {
          setResizer({ ...resizer, right: true, bottom: true });
        }}
        mouseUp={() => {
          setResizer({ ...resizer, right: false, bottom: false });
        }}
        onTouchMove={bottomRightResizerHandle}
      ></div>
      {/* bottom-left */}
      <div
        className="box-resizer"
        style={{
          left: `${defaultSizeContainer.left - 6}px`,
          top: `${defaultSizeContainer.bottom - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, bottom: true, left: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, bottom: false, left: false });
        }}
        mousedown={() => {
          setResizer({ ...resizer, bottom: true, left: true });
        }}
        mouseUp={() => {
          setResizer({ ...resizer, bottom: false, left: false });
        }}
        onTouchMove={bottomLeftResizerHandle}
      ></div>
      {/* top-left  */}
      <div
        className="box-resizer "
        style={{
          left: `${defaultSizeContainer.left - 6}px`,
          top: `${defaultSizeContainer.top - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, top: true, left: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, top: false, left: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, top: true, left: true });
        }}
        mouseUp={() => {
          setResizer({ ...resizer, top: false, left: false });
        }}
        onTouchMove={TopLeftResizerHandle}
      ></div>
      {/* top-right box*/}
      <div
        className="box-resizer"
        style={{
          left: `${defaultSizeContainer.right - 6}px`,
          top: `${defaultSizeContainer.top - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, right: true, top: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, right: false, top: false });
        }}
        mousedown={() => {
          setResizer({ ...resizer, right: true, top: true });
        }}
        mouseUp={() => {
          setResizer({ ...resizer, right: false, top: false });
        }}
        onTouchMove={TopRightResizerHandle}
      ></div>
      {/* right resizer box */}
      <div
        className="box-resizer "
        style={{
          left: `${defaultSizeContainer.right - 6}px`,
          top: `${
            defaultSizeContainer.top + defaultSizeContainer.height / 2.5
          }px`,
        }}
        onTouchMove={movingRightResizerHandler}
        onTouchStart={() => {
          setResizer({ ...resizer, right: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, right: false });
        }}
        mousedown={() => {
          setResizer({ ...resizer, right: true });
        }}
        mouseUp={() => {
          setResizer({ ...resizer, right: false });
        }}
      ></div>
      {/* left resizer box */}
      <div
        className="box-resizer "
        style={{
          left: `${defaultSizeContainer.left - 6}px`,
          top: `${
            defaultSizeContainer.top + defaultSizeContainer.height / 2.5
          }px`,
        }}
        onTouchMove={movingLeftResizerHandler}
        onTouchStart={() => {
          setResizer({ ...resizer, left: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, left: false });
        }}
        mousedown={() => {
          setResizer({ ...resizer, left: true });
        }}
        mouseUp={() => {
          setResizer({ ...resizer, left: false });
        }}
      ></div>
      {/* top resizer box*/}
      <div
        className="box-resizer"
        style={{
          left: `${
            defaultSizeContainer.left + defaultSizeContainer.width / 2.1
          }px`,
          top: `${defaultSizeContainer.top - 6}px`,
        }}
        onTouchMove={movingTopResizerHandler}
        onTouchStart={() => {
          setResizer({ ...resizer, top: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, top: false });
        }}
        mousedown={() => {
          setResizer({ ...resizer, top: true });
        }}
        mouseUp={() => {
          setResizer({ ...resizer, top: false });
        }}
      ></div>
      {/* bottom */}
      <div
        className="box-resizer"
        style={{
          left: `${
            defaultSizeContainer.left + defaultSizeContainer.width / 2.1
          }px`,
          top: `${defaultSizeContainer.bottom - 6}px`,
        }}
        onTouchMove={movingBottomResizerHandler}
        onTouchStart={() => {
          setResizer({ ...resizer, bottom: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, bottom: false });
        }}
        mousedown={() => {
          setResizer({ ...resizer, bottom: true });
        }}
        mouseUp={() => {
          setResizer({ ...resizer, bottom: false });
        }}
      ></div>
    </div>
  );
}

export default App;
