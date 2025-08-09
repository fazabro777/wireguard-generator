import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    // Парсим введённые строки
    const lines = input.split("\n");
    const values = {};
    lines.forEach(line => {
      const match = line.match(/(\w+)\s*=\s*(\d+)/);
      if (match) {
        values[match[1].toLowerCase()] = match[2];
      }
    });

    // Формируем команду с подстановкой значений
    const command = `interface {name} wireguard asc ${values.jc || ""} ${values.jmin || ""} ${values.jmax || ""} ${values.s1 || ""} ${values.s2 || ""} ${values.h1 || ""} ${values.h2 || ""} ${values.h3 || ""} ${values.h4 || ""}`;

    setOutput(command);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Генератор команд для WireGuard</h1>
      <p style={styles.description}>
        Введите значения в формате <code>Jc = 43</code>, <code>Jmin = 50</code> и т.д., по одному на строку.
      </p>
      <textarea
        style={styles.textarea}
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Jc = 43\nJmin = 50\nJmax = 70\nS1 = 110\nS2 = 120\nH1 = 1593635057\nH2 = 430880481\nH3 = 1214405368\nH4 = 1739253821`}
      />
      <button style={styles.button} onClick={handleGenerate}>
        Сгенерировать команду
      </button>

      {output && (
        <pre style={styles.output}>
          {output}
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
