import jsPDF from 'jspdf';

export const generatePDF = (content: string) => {
  const pdf = new jsPDF();
  
  // Split content into lines
  const lines = content.split('\n');
  
  let yPosition = 20;
  lines.forEach((line) => {
    // Handle markdown-style headers
    if (line.startsWith('# ')) {
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(line.replace('# ', ''), 20, yPosition);
      yPosition += 10;
    } else if (line.startsWith('## ')) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(line.replace('## ', ''), 20, yPosition);
      yPosition += 8;
    } else if (line.startsWith('**')) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(line.replace(/\*\*/g, ''), 20, yPosition);
      yPosition += 7;
    } else if (line.trim() !== '') {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(line, 20, yPosition);
      yPosition += 7;
    }

    // Add new page if needed
    if (yPosition > 280) {
      pdf.addPage();
      yPosition = 20;
    }
  });

  return pdf;
};