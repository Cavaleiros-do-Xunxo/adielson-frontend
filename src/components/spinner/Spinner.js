import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  return (
    <Loader
      type="Oval"
      color="#EA1D2C"
      height={100}
      width={100}
      timeout={30000}
    />
  );
};

export default Spinner;
