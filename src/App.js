import React, { useEffect, useState, useRef } from "react";
import image from "./image.jpg";
import "./App.css";

function App() {
  // ref start
  const defaultSizeContainerRef = useRef(null);
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

  const onMouseDown = (e) => {
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

  const onMouseUp = (e) => {
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

    if (resizer.rightBottom) {
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
    if (resizer.leftBottom) {
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

    if (resizer.leftTop) {
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

    if (resizer.rightTop) {
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

    if (resizer.right) {
      if (defaultSizeContainer.right < defaultSizeContainer.left + 20) {
        stopResizingAndMoving();
      }
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
    }

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

    if (resizer.rightBottom) {
      setTouchPoint({
        ...touchPoint,
        x: MousePoint(e).x,
        y: MousePoint(e).y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        width: defaultSizeContainer.right - defaultSizeContainer.left,
        right: touchPoint.x,
        height: defaultSizeContainer.bottom - defaultSizeContainer.top,
        bottom: touchPoint.y,
      });
    }
    if (resizer.leftBottom) {
      setTouchPoint({
        ...touchPoint,
        x: MousePoint(e).x,
        y: MousePoint(e).y,
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

    if (resizer.leftTop) {
      setTouchPoint({
        ...touchPoint,
        x: MousePoint(e).x,
        y: MousePoint(e).y,
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

    if (resizer.rightTop) {
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
        top:
          defaultSizeContainer.top - (defaultSizeContainer.top - touchPoint.y),
        width: defaultSizeContainer.right - defaultSizeContainer.left,
        right: touchPoint.x,
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

  const stopResizingAndMoving = () => {
    setResizer({
      ...resizer,
      left: false,
      top: false,
      bottom: false,
      right: false,
      rightBottom: false,
      leftBottom: false,
      leftTop: false,
      rightTop: false,
    });
  };

  useEffect(() => {}, [defaultSizeContainer]);

  return (
    <div
      className="App"
      onMouseMove={mouseMove}
      onTouchMove={TouchMove}
      onMouseUp={stopResizingAndMoving}
      onTouchEnd={stopResizingAndMoving}
      onDrag={(e) => {
        e.preventDefault();
      }}
    >
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
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
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
        onDrag={(e) => e.preventDefault()}
      />
      {/* right and bottom */}
      <div
        className="box-resizer "
        style={{
          left: `${defaultSizeContainer.right - 6}px`,
          top: `${defaultSizeContainer.bottom - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, rightBottom: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, rightBottom: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, rightBottom: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, rightBottom: false });
        }}
      ></div>
      {/* bottom-left */}
      <div
        className="box-resizer"
        style={{
          left: `${defaultSizeContainer.left - 6}px`,
          top: `${defaultSizeContainer.bottom - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, leftBottom: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, leftBottom: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, leftBottom: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, leftBottom: false });
        }}
      ></div>
      {/* top-left  */}
      <div
        className="box-resizer "
        style={{
          left: `${defaultSizeContainer.left - 6}px`,
          top: `${defaultSizeContainer.top - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, leftTop: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, leftTop: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, leftTop: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, leftTop: false });
        }}
      ></div>
      {/* top-right box*/}
      <div
        className="box-resizer"
        style={{
          left: `${defaultSizeContainer.right - 6}px`,
          top: `${defaultSizeContainer.top - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, rightTop: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, rightTop: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, rightTop: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, rightTop: false });
        }}
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
      {/* left resizer box */}
      <div
        className="box-resizer "
        style={{
          left: `${defaultSizeContainer.left - 6}px`,
          top: `${
            defaultSizeContainer.top + defaultSizeContainer.height / 2.5
          }px`,
        }}
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
      {/* top resizer box*/}
      <div
        className="box-resizer"
        style={{
          left: `${
            defaultSizeContainer.left + defaultSizeContainer.width / 2.1
          }px`,
          top: `${defaultSizeContainer.top - 6}px`,
        }}
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
      {/* bottom */}
      <div
        className="box-resizer"
        style={{
          left: `${
            defaultSizeContainer.left + defaultSizeContainer.width / 2.1
          }px`,
          top: `${defaultSizeContainer.bottom - 6}px`,
        }}
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
    </div>
  );
}

export default App;
