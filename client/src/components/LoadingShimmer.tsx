import { Shimmer, ShimmerElementType } from "@fluentui/react";

const shimmerElements = [
  { type: ShimmerElementType.line, width: "30%", height: 16 },
  { type: ShimmerElementType.gap, width: "5%" },
  { type: ShimmerElementType.line, width: "10%", height: 16 },
];

const LoadingShimmer: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <Shimmer
          key={index}
          shimmerElements={shimmerElements}
          styles={{ root: { marginBottom: 12 } }}
        />
      ))}
    </div>
  );
};

export default LoadingShimmer;
