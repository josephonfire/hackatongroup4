
import React from 'react';
import '../styles/ExportPDF.css';
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
const ExportPDF = ({ exportRef, fileName = 'dashboard.pdf', customButton }) => {
  const handleDownload = async () => {
    // Hide elements with .pdf-hide
    const style = document.createElement('style');
    style.innerHTML = '.pdf-hide { display: none !important; }';
    document.head.appendChild(style);

    try {
      if (!exportRef?.current) return;
      const element = exportRef.current;
      const canvas = await html2canvas(element, { scale: 2 }); // higher quality
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Get image dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const imgAspect = imgWidth / imgHeight;
      const pageAspect = pageWidth / pageHeight;

      let renderWidth, renderHeight, x, y;
      if (imgAspect > pageAspect) {
        // Image is wider than page
        renderWidth = pageWidth;
        renderHeight = pageWidth / imgAspect;
        x = 0;
        y = (pageHeight - renderHeight) / 2;
      } else {
        // Image is taller than page
        renderHeight = pageHeight;
        renderWidth = pageHeight * imgAspect;
        x = (pageWidth - renderWidth) / 2;
        y = 0;
      }

      pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);
      pdf.save(fileName);
    } finally {
      // Remove the style after export
      document.head.removeChild(style);
    }
  };

  if (customButton) {
    // Clone the custom button and attach the click handler
    return React.cloneElement(customButton, {
      onClick: handleDownload,
      ...customButton.props,
    });
  }

  return (
    <button onClick={handleDownload} className="export-pdf-btn">
      Download PDF
    </button>
  );
};

export default ExportPDF;
