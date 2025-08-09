import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputCommand, setOutputCommand] = useState("");
  const [interfaceName, setInterfaceName] = useState("");

  function parseInput(text) {
    const lines = text.split("\n");
    const values = {};
    for (const line of lines) {
      const parts = line.split("=");
      if (parts.length === 2) {
        const key = parts[0].trim().toLowerCase();
        const value = parts[1].trim();
        values[key] = value;
      }
    }
    return values;
  }

  function generateCommand() {
    const vals = parseInput(inputText);

    if (!interfaceName) {
      alert("Please enter interface name");
      return;
    }

    const requiredKeys = [
      "jc",
      "jmin",
      "jmax",
      "s1",
      "s2",
      "h1",
      "h2",
      "h3",
      "h4",
    ];

    for (const key of requiredKeys) {
      if (!vals[key]) {
        alert(`Missing value for ${key.toUpperCase()}`);
        return;
      }
    }

    const cmd = `interface ${interfaceName} wireguard asc ${vals.jc} ${vals.jmin} ${vals.jmax} ${vals.s1} ${vals.s2} ${vals.h1} ${vals.h2} ${vals.h3} ${vals.h4}`;

    setOutputCommand(cmd);
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>WireGuard - создание команды для роутера</h1>

      <label>
        Имя интерфейса:<br />
        <input
          type="text"
          value={interfaceName}
          onChange={(e) => setInterfaceName(e.target.value)}
          placeholder="Enter interface name"
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
        />
      </label>

      <label>
        Введите значения</code>):<br />
        <textarea
          rows={10}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Jc = 43
Jmin = 50
Jmax = 70
S1 = 110
S2 = 120
H1 = 1593635057
H2 = 430880481
H3 = 1214405368
H4 = 1739253821`}
          style={{ width: "100%", padding: 8 }}
        />
      </label>

      <button
        onClick={generateCommand}
        style={{
          marginTop: 12,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Generate Command
      </button>

      {outputCommand && (
        <pre
          style={{
            background: "#eee",
            padding: 12,
            marginTop: 20,
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {outputCommand}
        </pre>
      )}
    </div>
  );
}
const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    fontFamily: "monospace",
    borderRadius: 6,
    border: "1px solid #ccc",
    resize: "vertical",
    boxSizing: "border-box",
  },
  button: {
    marginTop: 15,
    padding: "12px 20px",
    width: "100%",
    fontSize: 16,
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  output: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#272822",
    color: "#f8f8f2",
    borderRadius: 6,
    fontSize: 16,
    whiteSpace: "pre-wrap",
  },
};
