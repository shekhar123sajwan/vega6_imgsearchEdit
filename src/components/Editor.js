import React, { useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

const Editor = ({ selectedImage }) => {
  const { editor, onReady } = useFabricJSEditor();

  const addText = () => {
    if (editor) {
      const text = new fabric.Textbox("Editable Text", {
        left: 100,
        top: 100,
        fontSize: 30,
        editable: true,
        hasRotatingPoint: true,
        lockScalingX: false,
        lockScalingY: false,
        lockUniScaling: true,
        cornerSize: 10,
      });

      editor.canvas.add(text);
      editor.canvas.setActiveObject(text);
    }
  };

  const addShape = (shapeType) => {
    if (editor) {
      let shape;
      if (shapeType === "circle") {
        shape = new fabric.Circle({
          radius: 50,
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: "gray",
          strokeWidth: 1,
        });
      } else if (shapeType === "rectangle") {
        shape = new fabric.Rect({
          width: 100,
          height: 50,
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: "gray",
          strokeWidth: 1,
        });
      } else if (shapeType === "triangle") {
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: "gray",
          strokeWidth: 1,
        });
      } else if (shapeType === "polygon") {
        shape = new fabric.Polygon(
          [
            { x: 50, y: 50 },
            { x: 100, y: 0 },
            { x: 150, y: 50 },
            { x: 100, y: 100 },
          ],
          {
            left: 100,
            top: 100,
            fill: "transparent",
            stroke: "gray",
            strokeWidth: 1,
          }
        );
      }

      editor.canvas.add(shape);
      editor.canvas.setActiveObject(shape);
    }
  };

  const downloadImage = () => {
    if (editor) {
      const imgElement = new Image();
      imgElement.crossOrigin = "Anonymous";

      imgElement.src = selectedImage.urls.small;

      imgElement.onload = () => {
        const fabricImage = new fabric.Image(imgElement, {
          left: 0,
          top: 0,
          angle: 0,
          opacity: 1,
          originX: "left",
          originY: "top",

          scaleX: 1,
          scaleY: 1,

          centeredRotation: true,
          centeredScaling: true,
        });

        // Scale the image to fit the canvas dimensions
        const canvasWidth = editor.canvas.getWidth();
        const canvasHeight = editor.canvas.getHeight();

        fabricImage.scaleToWidth(canvasWidth); // Scale the image width to match the canvas width
        fabricImage.scaleToHeight(canvasHeight); // Scale the image height to match the canvas height

        editor.canvas.setBackgroundImage(
          fabricImage,
          editor.canvas.renderAll.bind(editor.canvas)
        );

        const dataURL = editor.canvas.toDataURL({ format: "png" });

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = selectedImage.id + ".png";
        link.click();
      };

      imgElement.onerror = (error) => {
        console.error("Failed to load image:", error);
      };
    }
  };

  useEffect(() => {
    if (editor && selectedImage) {
      editor.canvas.setHeight(600);
      editor.canvas.setWidth(600);

      fabric.Image.fromURL(selectedImage.urls.small, (img) => {
        img.set({
          left: 0,
          top: 0,
          angle: 0,
          originX: "left",
          originY: "top",
        });

        const canvasWidth = editor.canvas.getWidth();
        const canvasHeight = editor.canvas.getHeight();

        img.scaleToWidth(canvasWidth);
        img.scaleToHeight(canvasHeight);

        editor.canvas.setBackgroundImage(
          img,
          editor.canvas.renderAll.bind(editor.canvas)
        );

        editor.canvas.renderAll();
      });
    }
  }, [editor, selectedImage]);

  return (
    <div className="editor flex flex-row justify-evenly">
      <div
        style={{
          border: `1px solid Green`,
          width: "600px",
          height: "600px",
        }}
      >
        <FabricJSCanvas onReady={onReady} />
      </div>
      <div className="controls border-2 p-4">
        <button
          onClick={addText}
          className="bg-green-500 text-white px-2 py-1 rounded-md mx-1"
        >
          Add Text
        </button>
        <button
          onClick={() => addShape("circle")}
          className="bg-red-500 text-white px-2 py-1 rounded-md mx-1"
        >
          Add Circle
        </button>
        <button
          onClick={() => addShape("rectangle")}
          className="bg-violet-500 text-white px-2 py-1 rounded-md mx-1"
        >
          Add Rectangle
        </button>
        <button
          onClick={() => addShape("triangle")}
          className="bg-yellow-500 text-white px-2 py-1 rounded-md mx-1"
        >
          Add Triangle
        </button>
        <button
          onClick={() => addShape("polygon")}
          className="bg-pink-500 text-white px-2 py-1 rounded-md mx-1"
        >
          Add Polygon
        </button>
        <button
          onClick={downloadImage}
          className="bg-blue-500 text-white px-2 py-1 rounded-md mx-1"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Editor;
