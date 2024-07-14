import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const filePath = path.join(process.cwd(), 'code.php');

    fs.writeFileSync(filePath, code);

    return new Promise((resolve) => {
      exec(`php ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          resolve(NextResponse.json({ output: stderr }));
        } else {
          resolve(NextResponse.json({ output: stdout }));
        }
      });
    });
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method is not allowed for this endpoint' }, { status: 405 });
}
