import { Block, Heading } from "react-bulma-components";

export default function SuccessOverlay(props) {
  return (
    <Block
      style={{
        zIndex: 100,
        backgroundColor: "rgba(255,255,255, 0.8)",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Block
        style={{
          color: "black",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "100vw",
        }}
      >
        <i
          className="fas fa-check-circle fa-5x"
          style={{ color: "#48c78e", marginBottom: "10px" }}
        ></i>
        <Heading size={6}>{props.text}</Heading>
      </Block>
    </Block>
  );
}
