import { NextRequest, NextResponse } from "next/server";
import { analyzeresume } from "@/lib/actions/gemini.actions"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read the file content as text (assuming it's a .txt, .docx, or .pdf)
    const text = await file.text(); // Works for text-based files
    // For .docx or .pdf, you need a parser like `pdf-parse` or `mammoth`

    // Call the AI-powered resume analysis function
    const analysisResult = await analyzeresume(text);

    return NextResponse.json(analysisResult);
  } catch (error: any) {
    console.error("Resume analysis failed:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
