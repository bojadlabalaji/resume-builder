import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, TabStopPosition, TabStopType } from "docx";
import { ResumeData } from "@/types/resume";
import { saveAs } from "file-saver";

export const generateDocx = async (data: ResumeData) => {
    // Helper to create sections
    const heading = (text: string) => new Paragraph({
        text: text.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        border: {
            bottom: { color: "666666", style: "single", size: 6, space: 1 }
        }
    });

    const subHeading = (text: string, rightText?: string) => {
        const children = [
            new TextRun({
                text: text,
                bold: true,
                size: 24 // 12pt
            })
        ];

        if (rightText) {
            children.push(new TextRun({
                text: `\t${rightText}`,
                bold: false,
                size: 24
            }));
        }

        return new Paragraph({
            children: children,
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
            spacing: { before: 100 }
        });
    };

    const normalText = (text: string, bold = false, italic = false) => new Paragraph({
        children: [
            new TextRun({
                text: text,
                bold: bold,
                italics: italic,
                size: 22 // 11pt
            }),
        ],
    });

    const bulletItem = (text: string) => new Paragraph({
        children: [
            new TextRun({
                text: text,
                size: 22
            }),
        ],
        bullet: {
            level: 0
        }
    });

    // --- Build Document Sections ---

    const sections = [];

    // Header
    sections.push(
        new Paragraph({
            text: data.basic_info.full_name?.toUpperCase() || "",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
        })
    );

    const contactParts = [
        data.basic_info.email,
        data.basic_info.phone,
        data.basic_info.location,
        data.basic_info.linkedin_url
    ].filter(Boolean);

    sections.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: contactParts.join(" | "),
                    size: 20,
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
        })
    );

    // Summary
    if (data.basic_info.summary) {
        sections.push(heading("Professional Summary"));
        sections.push(normalText(data.basic_info.summary));
    }

    // Experience
    if (data.experience && data.experience.length > 0) {
        sections.push(heading("Experience"));
        data.experience.forEach(exp => {
            sections.push(subHeading(exp.role, exp.duration));
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: exp.company,
                            bold: true,
                            size: 22
                        }),
                        new TextRun({
                            text: ` | ${exp.location || ""}`,
                            italics: true,
                            size: 22
                        })
                    ]
                })
            );
            sections.push(normalText(exp.description));
            sections.push(new Paragraph({ text: "" })); // Spacer
        });
    }

    // Education
    if (data.education && data.education.length > 0) {
        sections.push(heading("Education"));
        data.education.forEach(edu => {
            sections.push(subHeading(edu.university, edu.year));
            sections.push(normalText(edu.degree, false, true));
            if (edu.gpa) sections.push(bulletItem(`GPA: ${edu.gpa}`));
            sections.push(new Paragraph({ text: "" }));
        });
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
        sections.push(heading("Skills"));
        // Handle string[] vs ResumeSkill[]
        let skillText = "";
        data.skills.forEach(skill => {
            if (typeof skill === 'string') {
                skillText += `${skill}, `;
            } else {
                skillText += `${skill.category}: ${skill.skills.join(", ")}\n`;
            }
        });
        // Simple render for now
        if (typeof data.skills[0] === 'string') {
            sections.push(normalText(skillText.slice(0, -2)));
        } else {
            data.skills.forEach(skill => {
                if (typeof skill !== 'string') {
                    sections.push(
                        new Paragraph({
                            children: [
                                new TextRun({ text: `${skill.category}: `, bold: true, size: 22 }),
                                new TextRun({ text: skill.skills.join(", "), size: 22 })
                            ]
                        })
                    );
                }
            });
        }
    }

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: sections,
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${data.basic_info.full_name?.replace(/\s+/g, '_')}_Resume.docx`);
};
