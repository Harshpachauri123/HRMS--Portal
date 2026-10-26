import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from "pdf-lib"

type ProfileSection = { title: string; fields: Array<[string, string]> }

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 42
const ink = rgb(0.1, 0.15, 0.24)
const muted = rgb(0.4, 0.46, 0.54)
const accent = rgb(0.02, 0.48, 0.39)
const line = rgb(0.87, 0.9, 0.93)

function drawHeader(page: PDFPage, logo: Awaited<ReturnType<PDFDocument["embedPng"]>>, title: string, name: string, id: string, regular: PDFFont, bold: PDFFont) {
  page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 138, width: PAGE_WIDTH, height: 138, color: rgb(0.96, 0.98, 0.97) })
  page.drawImage(logo, { x: MARGIN, y: PAGE_HEIGHT - 71, width: 113, height: 35 })
  page.drawText("PEOPLE • CULTURE • PROGRESS", { x: 165, y: PAGE_HEIGHT - 52, size: 8, font: bold, color: accent })
  page.drawText(title.toUpperCase(), { x: MARGIN, y: PAGE_HEIGHT - 96, size: 16, font: bold, color: ink })
  page.drawText(name || "—", { x: MARGIN, y: PAGE_HEIGHT - 119, size: 10, font: regular, color: muted, maxWidth: 365 })
  const idText = id || "—"
  page.drawRectangle({ x: 438, y: PAGE_HEIGHT - 126, width: 115, height: 27, color: rgb(0.88, 0.95, 0.92), borderColor: rgb(0.79, 0.9, 0.85), borderWidth: 0.6 })
  page.drawText(idText.length > 18 ? `${idText.slice(0, 15)}…` : idText, { x: 447, y: PAGE_HEIGHT - 116, size: 8, font: bold, color: accent, maxWidth: 97 })
  page.drawLine({ start: { x: MARGIN, y: 34 }, end: { x: PAGE_WIDTH - MARGIN, y: 34 }, thickness: 0.7, color: line })
  page.drawText("HR Pulse  |  Confidential profile", { x: MARGIN, y: 20, size: 7.5, font: regular, color: muted })
}

function drawSection(page: PDFPage, section: ProfileSection, y: number, regular: PDFFont, bold: PDFFont) {
  page.drawRectangle({ x: MARGIN, y: y - 8, width: PAGE_WIDTH - 2 * MARGIN, height: 23, color: rgb(0.93, 0.97, 0.95) })
  page.drawText(section.title.toUpperCase(), { x: MARGIN + 10, y, size: 8.5, font: bold, color: accent })
  y -= 24
  const colGap = 18
  const colWidth = (PAGE_WIDTH - 2 * MARGIN - colGap) / 2
  for (let i = 0; i < section.fields.length; i += 2) {
    for (let col = 0; col < 2; col += 1) {
      const field = section.fields[i + col]
      if (!field) continue
      const x = MARGIN + col * (colWidth + colGap)
      const value = field[1]?.trim() || "—"
      const label = field[0]
      let valueSize = 8.5
      while (valueSize > 5.5 && regular.widthOfTextAtSize(value, valueSize) > colWidth - 16) {
        valueSize -= 0.5
      }
      page.drawRectangle({ x, y: y - 21, width: colWidth, height: 39, color: rgb(1, 1, 1), borderColor: line, borderWidth: 0.55 })
      page.drawText(label, { x: x + 8, y: y + 5, size: 7.2, font: bold, color: muted, maxWidth: colWidth - 16 })
      page.drawText(value, { x: x + 8, y: y - 9, size: valueSize, font: regular, color: ink })
    }
    y -= 44
  }
  return y - 7
}

export async function createProfilePdf({ title, name, id, sections, documents, documentTitle }: {
  title: string
  name: string
  id: string
  sections: ProfileSection[]
  documents: string[]
  documentTitle: string
}) {
  const pdf = await PDFDocument.create()
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const logoBytes = await fetch("/Hr%20Pulse.png").then((response) => {
    if (!response.ok) throw new Error("HR Pulse logo could not be loaded")
    return response.arrayBuffer()
  })
  const logo = await pdf.embedPng(logoBytes)
  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  drawHeader(page, logo, title, name, id, regular, bold)
  let y = PAGE_HEIGHT - 165
  for (const section of sections) {
    const estimatedHeight = 39 + Math.ceil(section.fields.length / 2) * 44 + 7
    if (y - estimatedHeight < 55) {
      page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])
      drawHeader(page, logo, title, name, id, regular, bold)
      y = PAGE_HEIGHT - 165
    }
    y = drawSection(page, section, y, regular, bold)
  }
  const docHeight = 48 + Math.max(1, documents.length) * 20
  if (y - docHeight < 55) {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])
    drawHeader(page, logo, title, name, id, regular, bold)
    y = PAGE_HEIGHT - 165
  }
  page.drawRectangle({ x: MARGIN, y: y - 8, width: PAGE_WIDTH - 2 * MARGIN, height: 23, color: rgb(0.93, 0.97, 0.95) })
  page.drawText(documentTitle.toUpperCase(), { x: MARGIN + 10, y, size: 8.5, font: bold, color: accent })
  y -= 28
  const entries = documents.length ? documents : ["No documents attached"]
  for (const document of entries) {
    page.drawText(`•  ${document}`, { x: MARGIN + 9, y, size: 8.5, font: regular, color: muted, maxWidth: PAGE_WIDTH - 2 * MARGIN - 18 })
    y -= 18
  }
  return new Blob([await pdf.save() as BlobPart], { type: "application/pdf" })
}
