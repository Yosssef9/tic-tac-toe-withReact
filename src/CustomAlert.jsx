export default function CustomAlert({ message, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
          marginBottom: "500px",
          textAlign: "center",
        }}
      >
        <p>{message}</p>
        <button
          onClick={onClose}
          style={{
            marginTop: "15px",
            padding: "8px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          OK
        </button>
      </div>
    </div>
  );
}
