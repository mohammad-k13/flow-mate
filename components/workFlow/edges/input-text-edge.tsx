import {
  BaseEdge,
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
  Position,
} from "@xyflow/react";
import React from "react";

const InputTextEdge = (props: any) => {
  console.log(props);
  const { id, sourceX, sourceY, targetX, targetY, label, markerEnd, style } =
    props;
  const [path, labelX, labelY, offsetX, offsetY] = getBezierPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: Position.Right,
    targetX: targetX,
    targetY: targetY,
    targetPosition: Position.Left,
  });

  return (
    <>
      <BezierEdge
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        sourcePosition={Position.Right}
        targetX={targetX}
        targetY={targetY}
        targetPosition={Position.Left}
        labelShowBg
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#fef08a",
            padding: 10,
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
          }}
          className="nodrag nopan"
        >
          {label}
        </div>
      </EdgeLabelRenderer>
      ;
    </>
  );
};

export default InputTextEdge;
