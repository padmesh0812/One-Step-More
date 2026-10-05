import { jsPDF } from 'jspdf';
import { BRAND, FOUNDER, CONTACT_INFO } from '../constants/common';

/**
 * Generates a branded, clinical-grade PDF invoice and triggers an automatic browser download.
 *
 * @param {Object} params
 * @param {Object} params.form - The candidate bio and contact details
 * @param {Object} params.pricing - Pricing details { original, offer, label }
 * @param {Object} params.program - Selected program details { id, title }
 * @param {Object} params.paymentReceipt - Payment transaction details { paymentId, orderId, date, amount }
 */
export function generateInvoicePdf({ form, pricing, program, paymentReceipt }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2); // 180mm

  // Determine receipt metadata
  const paymentId = paymentReceipt?.paymentId || 'TEST_PAY_' + Math.floor(100000 + Math.random() * 900000);
  const orderId = paymentReceipt?.orderId || 'TEST_ORD_' + Math.floor(100000 + Math.random() * 900000);
  const receiptNo = `OSM-${paymentId.replace(/^pay_/, '').slice(0, 10).toUpperCase()}`;
  
  const paymentDate = paymentReceipt?.date || new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const programTitle = program?.title || 'Personalized Wellness Transformation Program';
  const durationLabel = pricing?.label || `${form.duration || 4} Weeks Plan`;
  const originalPrice = pricing?.original || 4999;
  const offerPrice = pricing?.offer || 2999;
  const discountAmount = originalPrice - offerPrice;

  // ================= 1. HEADER SECTION =================
  // Brand Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(46, 125, 50); // Primary green
  doc.text('1 STEP MORE', margin, 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('CLINICAL DIET • YOGA GUIDANCE • LIFESTYLE COACHING', margin, 25);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(BRAND.tagline || 'Every healthy habit begins with one small step.', margin, 29);

  // Right Header Badge (Receipt Tag)
  doc.setFillColor(46, 125, 50);
  doc.roundedRect(132, 12, 63, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL PAYMENT RECEIPT', 163.5, 18, { align: 'center' });

  // Receipt meta fields
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('Receipt No:', 132, 26);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(receiptNo, 195, 26, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.text('Date:', 132, 31);
  doc.setFont('helvetica', 'normal');
  doc.text(paymentDate, 195, 31, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.text('Status:', 132, 36);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 125, 50);
  doc.text('PAID (CONFIRMED)', 195, 36, { align: 'right' });

  // Header Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, 40, margin + contentWidth, 40);

  // ================= 2. PARTICIPANT & CLINIC INFO =================
  const boxY = 44;
  const boxHeight = 40;
  const boxWidth = 87;

  // Left Card: Clinic Info
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, boxY, boxWidth, boxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(46, 125, 50);
  doc.text('ISSUED BY (SERVICE PROVIDER)', margin + 4, boxY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1 Step More Wellness Clinic', margin + 4, boxY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Coach: ${FOUNDER.name}`, margin + 4, boxY + 17);
  doc.text(`Email: ${CONTACT_INFO.email}`, margin + 4, boxY + 22);
  doc.text(`Phone: ${CONTACT_INFO.phoneDisplay}`, margin + 4, boxY + 27);
  doc.text(`Location: ${CONTACT_INFO.address}`, margin + 4, boxY + 32);
  doc.text(`Portal: ${CONTACT_INFO.domain || 'www.onestepmore.in'}`, margin + 4, boxY + 37);

  // Right Card: Client Info
  const rightBoxX = margin + boxWidth + 6;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightBoxX, boxY, boxWidth, boxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(46, 125, 50);
  doc.text('BILLED TO (ENROLLED CANDIDATE)', rightBoxX + 4, boxY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(form.name || 'Enrolled Candidate', rightBoxX + 4, boxY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${form.email || 'N/A'}`, rightBoxX + 4, boxY + 17);
  doc.text(`Phone: ${form.phone || 'N/A'}`, rightBoxX + 4, boxY + 22);
  doc.text(`Address: ${form.address ? form.address.substring(0, 36) : 'Online Coaching Consultation'}`, rightBoxX + 4, boxY + 27);
  
  const bioSummary = `Age: ${form.age || '-'} Yrs  |  Blood: ${form.bloodGroup || '-'}  |  Wt: ${form.weight ? form.weight + 'kg' : '-'}`;
  doc.text(bioSummary, rightBoxX + 4, boxY + 32);
  doc.text(`Height: ${form.height || 'N/A'}`, rightBoxX + 4, boxY + 37);

  // ================= 3. TRANSACTION DETAILS STRIP =================
  const stripY = 88;
  doc.setFillColor(232, 245, 233); // Soft green tint
  doc.setDrawColor(165, 214, 167);
  doc.roundedRect(margin, stripY, contentWidth, 12, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text('Payment ID:', margin + 4, stripY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(46, 125, 50);
  doc.text(paymentId, margin + 22, stripY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Order ID:', margin + 75, stripY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(orderId, margin + 89, stripY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Gateway:', margin + 140, stripY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Razorpay (SSL 256-Bit)', margin + 154, stripY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Reconciled electronically via Razorpay Payments Gateway Node.', margin + 4, stripY + 9.5);

  // ================= 4. ITEMIZED INVOICE TABLE =================
  const tableY = 105;
  const colDescX = margin;
  const colDurX = 100;
  const colOrigX = 130;
  const colDiscX = 155;
  const colNetX = 195;

  // Table Header Bar
  doc.setFillColor(46, 125, 50);
  doc.rect(margin, tableY, contentWidth, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Program & Service Description', colDescX + 3, tableY + 5.5);
  doc.text('Duration', colDurX, tableY + 5.5);
  doc.text('Standard Fee', colOrigX, tableY + 5.5);
  doc.text('Scholarship', colDiscX, tableY + 5.5);
  doc.text('Total (INR)', colNetX, tableY + 5.5, { align: 'right' });

  // Table Body Row
  const rowY = tableY + 8;
  const rowHeight = 22;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, rowY, contentWidth, rowHeight, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(programTitle, colDescX + 3, rowY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Personalized clinical diet regime, live yoga sessions, and daily habit coaching.', colDescX + 3, rowY + 11);
  doc.text('Includes dedicated 1-on-1 progress reviews and routine dietary adjustments.', colDescX + 3, rowY + 16);

  // Duration
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(durationLabel, colDurX, rowY + 9);

  // Original Price
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`INR ${originalPrice.toLocaleString('en-IN')}`, colOrigX, rowY + 9);

  // Discount
  doc.setTextColor(220, 38, 38);
  doc.text(`-INR ${discountAmount.toLocaleString('en-IN')}`, colDiscX, rowY + 9);

  // Net Paid
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 125, 50);
  doc.text(`INR ${offerPrice.toLocaleString('en-IN')}`, colNetX, rowY + 9, { align: 'right' });

  // ================= 5. SUMMARY & TOTALS =================
  const summaryY = rowY + rowHeight + 6;
  const summaryBoxX = 115;
  const summaryBoxWidth = margin + contentWidth - summaryBoxX;

  // Left side note card: Next Steps
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, summaryY, 95, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(46, 125, 50);
  doc.text('ONBOARDING PROCEDURE & NEXT STEPS', margin + 4, summaryY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('1. Our wellness team will reach out via WhatsApp / Call within 24 hours.', margin + 4, summaryY + 13);
  doc.text('2. Please keep your recent medical and blood reports handy for review.', margin + 4, summaryY + 19);
  doc.text('3. Your dedicated diet chart and lifestyle protocol will be delivered directly.', margin + 4, summaryY + 25);
  doc.text('4. For any questions, connect with us at hello@onestepmore.in.', margin + 4, summaryY + 31);

  // Right side: Financial Total Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(summaryBoxX, summaryY, summaryBoxWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Base Fee:', summaryBoxX + 4, summaryY + 7);
  doc.text(`INR ${originalPrice.toLocaleString('en-IN')}`, summaryBoxX + summaryBoxWidth - 4, summaryY + 7, { align: 'right' });

  doc.text('Scholarship Discount:', summaryBoxX + 4, summaryY + 13);
  doc.setTextColor(220, 38, 38);
  doc.text(`-INR ${discountAmount.toLocaleString('en-IN')}`, summaryBoxX + summaryBoxWidth - 4, summaryY + 13, { align: 'right' });

  doc.setTextColor(71, 85, 105);
  doc.text('Applicable Taxes:', summaryBoxX + 4, summaryY + 19);
  doc.text('Included', summaryBoxX + summaryBoxWidth - 4, summaryY + 19, { align: 'right' });

  // Total divider
  doc.setDrawColor(203, 213, 225);
  doc.line(summaryBoxX + 4, summaryY + 23, summaryBoxX + summaryBoxWidth - 4, summaryY + 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Total Paid:', summaryBoxX + 4, summaryY + 30);
  doc.setTextColor(46, 125, 50);
  doc.text(`INR ${offerPrice.toLocaleString('en-IN')}/-`, summaryBoxX + summaryBoxWidth - 4, summaryY + 30, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(46, 125, 50);
  doc.text('PAID IN FULL (ZERO BALANCE DUE)', summaryBoxX + summaryBoxWidth - 4, summaryY + 35, { align: 'right' });

  // ================= 6. TERMS & CONDITIONS =================
  const termsY = summaryY + 45;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('Terms & Client Agreement:', margin, termsY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('• This electronic receipt acknowledges successful payment reconciliation for the specified wellness coaching program.', margin, termsY + 4.5);
  doc.text('• Program fees are non-refundable and non-transferable once the onboarding consultation and dietary planning process begins.', margin, termsY + 8.5);
  doc.text('• Nutritional advice is provided for holistic lifestyle improvement and does not replace medical treatment by a physician.', margin, termsY + 12.5);

  // ================= 7. AUTHORIZED SIGNATURE / SEAL =================
  const signY = termsY + 24;

  // Digital Security Stamp (Left)
  doc.setFillColor(232, 245, 233);
  doc.setDrawColor(46, 125, 50);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, signY, 70, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(46, 125, 50);
  doc.text('DIGITALLY VERIFIED INVOICE', margin + 35, signY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  doc.text('AUTHENTICATED VIA 1 STEP MORE SECURE NODE', margin + 35, signY + 10.5, { align: 'center' });
  doc.text(`TIMESTAMP: ${new Date().toISOString()}`, margin + 35, signY + 14.5, { align: 'center' });

  // Founder Stamp / Signature (Right)
  const signRightX = 145;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Dt. Pragati Mishra', signRightX, signY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(FOUNDER.fullTitle || 'Founder & Lead Clinical Nutritionist', signRightX, signY + 11.5);
  doc.text('1 Step More Health & Wellness Clinic', signRightX, signY + 15.5);

  // ================= 8. PAGE FOOTER =================
  const footerY = 285;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY, margin + contentWidth, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('1 Step More • Support: hello@onestepmore.in | Web: www.onestepmore.in', margin, footerY + 4.5);
  doc.text('Page 1 of 1 • System generated invoice. No physical signature required.', margin + contentWidth, footerY + 4.5, { align: 'right' });

  // Trigger browser download
  const cleanFilename = `1StepMore_Receipt_${receiptNo}.pdf`;
  doc.save(cleanFilename);
}
