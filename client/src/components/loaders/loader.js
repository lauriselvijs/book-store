import Loader from "react-loader-spinner";

// Loader component handles screen loading look

const LoaderComp = () => {
  return (
    <Loader
      type="TailSpin"
      color="rgb(233, 236, 239)"
      height={70}
      width={70}
      timeout={null}
    />
  );
};
export default LoaderComp;
