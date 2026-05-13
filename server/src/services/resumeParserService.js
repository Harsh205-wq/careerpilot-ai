import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const parseResumeText = async (file) => {
  if (!file) {
    throw new Error("Resume file is required");
  }

  const filePath = file.path;
  const fileType = file.mimetype;

  let extractedText = "";

  if (fileType === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    extractedText = pdfData.text;
  } 
  
  else if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ path: filePath });

    extractedText = result.value;
  } 
  
  else {
    throw new Error("Unsupported file type");
  }

  if (!extractedText || extractedText.trim().length === 0) {
    throw new Error("Could not extract text from resume");
  }

  return extractedText.trim();
};