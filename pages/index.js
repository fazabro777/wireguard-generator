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
      <h1>WireGuard Command Generator</h1>

      <label>
        Interface name:<br />
        <input
          type="text"
          value={interfaceName}
          onChange={(e) => setInterfaceName(e.target.value)}
          placeholder="Enter interface name"
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
        />
      </label>

      <label>
        Paste your values (one per line, e.g. <code>Jc = 43</code>):<br />
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
