import { Suspense } from "react";
import Lottie from "lottie-react";

export default function AnimatedLottieIcon({ animationData, size = 32 }) {
  return (
    <Suspense fallback={<span>...</span>}>
      <Lottie animationData={animationData} style={{ width: size, height: size }} loop={true} />
    </Suspense>
  );
}
