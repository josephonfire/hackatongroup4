import React from "react";
import "../styles/ExportPDF.css";
// Make sure to install these packages in your project:
// npm install jspdf html2canvas
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * ExportPDF component
 * Props:
 *   - exportRef: React ref to the DOM node to export (e.g., the dashboard section)
 *   - fileName: Name for the downloaded PDF
 */
const ExportPDF = ({ exportRef, fileName = "dashboard.pdf", customButton }) => {
  const handleDownload = async () => {
    // Hide elements with .pdf-hide
    const style = document.createElement("style");
    style.innerHTML = ".pdf-hide { display: none !important; }";
    document.head.appendChild(style);

    try {
      if (!exportRef?.current) return;
      const element = exportRef.current;
      // Expand height to fit all content (remove overflow, set height to scrollHeight)
      const originalOverflow = element.style.overflow;
      const originalHeight = element.style.height;
      const originalMaxHeight = element.style.maxHeight;
      const originalOverflowY = element.style.overflowY;
      element.style.overflow = "visible";
      element.style.height = element.scrollHeight + "px";
      element.style.maxHeight = "none";
      element.style.overflowY = "visible";
      // Aguarda o layout atualizar
      await new Promise((r) => setTimeout(r, 100));
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Get image dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const imgAspect = imgWidth / imgHeight;
      const pageAspect = pageWidth / pageHeight;

      let renderWidth, renderHeight, x, y;
      if (imgAspect > pageAspect) {
        renderWidth = pageWidth;
        renderHeight = pageWidth / imgAspect;
        x = 0;
        y = (pageHeight - renderHeight) / 2;
      } else {
        renderHeight = pageHeight;
        renderWidth = pageHeight * imgAspect;
        x = (pageWidth - renderWidth) / 2;
        y = 0;
      }

      pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);
      pdf.save(fileName);
      // Restore original styles
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      element.style.maxHeight = originalMaxHeight;
      element.style.overflowY = originalOverflowY;
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

  return null;
};

export default ExportPDF;
