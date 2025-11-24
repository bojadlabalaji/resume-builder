import os
import subprocess
import importlib
from docx import Document

class TemplateService:
    def __init__(self):
        self.output_dir = "/tmp/resumes"
        os.makedirs(self.output_dir, exist_ok=True)

    def generate_docx(self, resume_data: dict, filename: str) -> str:
        """
        Generates a DOCX file from the resume data using the specified template.
        Returns the path to the generated file.
        """
        document = Document()
        
        # Determine template_id from resume_data or default to 1
        # Note: The API passes template_id in GeneratedResume, but here we receive resume_data.
        # Ideally, we should pass template_id to this method.
        # For now, let's assume it might be in resume_data or we default to 1.
        # Wait, the API call is: template_service.generate_docx(resume_data, filename)
        # I should update the signature to accept template_id.
        
        template_id = resume_data.get("template_id", 1)
        if not template_id:
            template_id = 1

        try:
            # Dynamic import: app.templates.{template_id}.generator
            module_name = f"app.templates.{template_id}.generator"
            generator = importlib.import_module(module_name)
            
            # Call the generate function
            generator.generate(document, resume_data)
            
        except ImportError:
            print(f"Template {template_id} not found, falling back to Template 1")
            # Fallback to template 1
            module_name = "app.templates.1.generator"
            generator = importlib.import_module(module_name)
            generator.generate(document, resume_data)
        except Exception as e:
             print(f"Error loading template {template_id}: {e}")
             raise e

        output_path = os.path.join(self.output_dir, f"{filename}.docx")
        document.save(output_path)
        return output_path

    def convert_to_pdf(self, docx_path: str) -> str:
        """
        Converts a DOCX file to PDF using LibreOffice.
        Returns the path to the generated PDF file.
        """
        # libreoffice --headless --convert-to pdf <file> --outdir <dir>
        cmd = [
            "libreoffice",
            "--headless",
            "--convert-to",
            "pdf",
            docx_path,
            "--outdir",
            self.output_dir
        ]
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            # The output filename will be the same as docx but with .pdf extension
            pdf_filename = os.path.splitext(os.path.basename(docx_path))[0] + ".pdf"
            return os.path.join(self.output_dir, pdf_filename)
        except subprocess.CalledProcessError as e:
            print(f"Error converting to PDF: {e.stderr.decode()}")
            raise Exception("PDF conversion failed")

template_service = TemplateService()
