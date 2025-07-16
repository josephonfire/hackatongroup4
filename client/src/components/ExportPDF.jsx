
import React from 'react';
// Make sure to install these packages in your project:
// npm install jspdf html2canvas
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * ExportPDF component
 * Props:
 *   - exportRef: React ref to the DOM node to export (e.g., the dashboard section)
 *   - fileName: Name for the downloaded PDF
 */
const ExportPDF = ({ exportRef, fileName = 'dashboard.pdf' }) => {
  const handleDownload = async () => {
    if (!exportRef?.current) return;
    const element = exportRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save(fileName);
  };

  return (
    <button onClick={handleDownload} className="export-pdf-btn">
      Download PDF
    </button>
  );
};

export default ExportPDF;
