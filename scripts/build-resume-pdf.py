"""Build the public PDF from the same data as the English resume page.
Requires reportlab. Run from the repository root; never includes the private DOCX.
"""
import json
from pathlib import Path
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
source = Path("src/content/resume.ts").read_text(encoding="utf-8").split("export const resume = ", 1)[1].rsplit(" as const;", 1)[0]
data = json.loads(source)
target = Path("public/resume/dat-pham-resume-en.pdf")
target.parent.mkdir(parents=True, exist_ok=True)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="NamePublic",fontName="Helvetica-Bold",fontSize=21,leading=24,spaceAfter=4,textColor=HexColor("#142b36")))
styles.add(ParagraphStyle(name="SectionPublic",fontName="Helvetica-Bold",fontSize=10.5,leading=13,spaceBefore=8,spaceAfter=4,textColor=HexColor("#142b36"),keepWithNext=True))
styles.add(ParagraphStyle(name="EntryPublic",fontName="Helvetica-Bold",fontSize=9.5,leading=12,spaceBefore=5,spaceAfter=2,keepWithNext=True))
styles.add(ParagraphStyle(name="BodyPublic",fontName="Helvetica",fontSize=9.5,leading=12,spaceAfter=3))
styles.add(ParagraphStyle(name="BulletPublic",parent=styles["BodyPublic"],leftIndent=10,firstLineIndent=-8))
story=[]
def p(text,style="BodyPublic"): return Paragraph(text,styles[style])
def text(value): return escape(value)
story += [p("DAT PHAM", "NamePublic"),p(text(data["title"])),p(text(data["location"])+" | "+text(data["email"])),p('<link href="https://datpham.io.vn/resume/" color="#142b36">datpham.io.vn/resume/</link> | <link href="'+text(data["linkedin"])+'" color="#142b36">LinkedIn</link>'),Spacer(1,5),p(text(data["profile"]))]
story += [p("PROFESSIONAL EXPERIENCE","SectionPublic"),p(text(data["company"]),"EntryPublic")]
for job in data["experience"]:
    story.append(p(text(job["role"])+" | "+text(job["period"]),"EntryPublic"))
    story.extend(p("• "+text(point),"BulletPublic") for point in job["points"])
story.append(p("SELECTED PROJECTS","SectionPublic"))
for project in data["projects"]:
    story.append(p(text(project["name"])+" | "+text(project["field"])+" | "+text(project["period"]),"EntryPublic"))
    story.extend(p("• "+text(point),"BulletPublic") for point in project["points"])
story.append(p("SKILLS","SectionPublic"))
story.extend(p("<b>"+text(skill["label"])+":</b> "+text(skill["text"])) for skill in data["skills"])
story += [p("EDUCATION","SectionPublic"),p(text(data["education"]["school"])+" | "+text(data["education"]["period"])),p(text(data["education"]["qualification"]))]
def footer(canvas,doc):
    canvas.setFont("Helvetica",8)
    canvas.setFillColor(HexColor("#52616a"))
    canvas.drawString(40,25,"Dat Pham | English resume | November 2026")
    canvas.drawRightString(A4[0]-40,25,str(doc.page))
SimpleDocTemplate(str(target),pagesize=A4,rightMargin=40,leftMargin=40,topMargin=36,bottomMargin=40,title="Dat Pham English Resume",author="Dat Pham").build(story,onFirstPage=footer,onLaterPages=footer)
print(target)
