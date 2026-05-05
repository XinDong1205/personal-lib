import os
import sys
import fitz  # PyMuPDF


def pdf_to_markdown(pdf_path, md_path):
    """将单个 PDF 文件转换为 Markdown 文件"""
    doc = fitz.open(pdf_path)
    md_content = []

    for page_num, page in enumerate(doc, start=1):
        text = page.get_text("text")
        md_content.append(f"\n\n# Page {page_num}\n")
        md_content.append(text)
    doc.close()

    with open(md_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md_content))

    print(f"转换完成: {md_path}")


def main():
    # 支持命令行指定 PDF 路径
    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
        if not os.path.exists(pdf_path):
            print(f"文件不存在: {pdf_path}")
            return
        md_path = os.path.splitext(pdf_path)[0] + ".md"
        pdf_to_markdown(pdf_path, md_path)
        return

    # 无参数时：转换当前目录下所有 PDF
    current_dir = os.getcwd()
    files = os.listdir(current_dir)
    pdf_files = [f for f in files if f.lower().endswith(".pdf")]

    if not pdf_files:
        print("当前目录没有 PDF 文件")
        return

    print(f"找到 {len(pdf_files)} 个 PDF 文件")

    for pdf in pdf_files:
        pdf_path = os.path.join(current_dir, pdf)
        md_name = os.path.splitext(pdf)[0] + ".md"
        md_path = os.path.join(current_dir, md_name)
        try:
            pdf_to_markdown(pdf_path, md_path)
        except Exception as e:
            print(f"转换失败: {pdf}，原因: {e}")


if __name__ == "__main__":
    main()
