import io
import tempfile
import os
from typing import BinaryIO, Union
import pymupdf4llm
import mammoth
from markdownify import markdownify as md

def pdf_to_markdown(file_obj: BinaryIO) -> str:
    """
    Extract text from a PDF file object and convert to markdown using pymupdf4llm.
    Preserves layout and formatting better than simple text extraction.
    """
    try:
        # pymupdf4llm needs a file path or bytes. 
        # Since we have a file-like object, let's write to a temp file to be safe and efficient
        # with the library's API which often prefers paths.
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            tmp_file.write(file_obj.read())
            tmp_path = tmp_file.name
        
        # Convert to markdown
        md_text = pymupdf4llm.to_markdown(tmp_path)
        
        # Clean up
        os.unlink(tmp_path)
        
        return md_text
    except Exception as e:
        raise ValueError(f"Error converting PDF to Markdown: {str(e)}")

def docx_to_markdown(file_obj: BinaryIO) -> str:
    """
    Extract text from a DOCX file object and convert to markdown.
    Uses mammoth to convert to HTML, then markdownify to convert to Markdown.
    This preserves basic formatting like headers, lists, and bold text.
    """
    try:
        # Convert DOCX to HTML using mammoth
        result = mammoth.convert_to_html(file_obj)
        html = result.value
        messages = result.messages # Any warnings
        
        # Convert HTML to Markdown
        markdown_text = md(html, heading_style="ATX")
        
        return markdown_text
    except Exception as e:
        raise ValueError(f"Error converting DOCX to Markdown: {str(e)}")

def convert_to_markdown(file: Union[BinaryIO, bytes], filename: str) -> str:
    """
    Convert a file (PDF or DOCX) to markdown text preserving formatting.
    Args:
        file: The file object or bytes.
        filename: The name of the file (used to determine extension).
    Returns:
        Extracted markdown string.
    """
    # Ensure we have a file-like object
    if isinstance(file, bytes):
        file_obj = io.BytesIO(file)
    else:
        file_obj = file

    # Reset file pointer to beginning if possible
    if hasattr(file_obj, 'seek'):
        file_obj.seek(0)

    if filename.lower().endswith(".pdf"):
        return pdf_to_markdown(file_obj)
    elif filename.lower().endswith(".docx"):
        return docx_to_markdown(file_obj)
    else:
        raise ValueError("Unsupported file format. Please upload a PDF or DOCX file.")