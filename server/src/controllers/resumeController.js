import fs from "fs";
import { parseResumeText } from "../services/resumeParserService.js";

export const analyzeResume = async (req, res) => {
  try {
    const { targetRole, jobDescription } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: "Target Role is required",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is requires",
      });
    }

    const resumeText = await parseResumeText(req.file);

    fs.unlink(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Resume extracted succesfully",
      data: {
        targetRole,
        jobDescription: jobDescription || "",
        originalFileName: req.file.origunalname,
        filetype: req.file.mimetype,
        resumeTextPreview: resumeText.slice(0, 1000),
      },
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Resume analysis failed",
      error: error.message,
    });
  }
};
