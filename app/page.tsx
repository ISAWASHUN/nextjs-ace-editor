'use client';

import { EditorComponent } from "@/components/EditorComponent";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("<?php echo 'Hello World'; ?>");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const res = await axios.post('/api/run', { code });
      setOutput(res.data.output);
    } catch (error: any) {
      console.error('Error in runCode:', error);
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div>
      <EditorComponent
        fileType="php"
        contents={code}
        readOnly={false}
        onChange={setCode}
        theme="monokai"
      />
      <button onClick={runCode}>Run</button>
      <pre>{output}</pre>
    </div>
  );
}