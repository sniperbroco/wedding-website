import SectionHeading from "./SectionHeading";

export default function GiftGuide() {
  return (
    <section className="section gift-section" id="gift">
      <SectionHeading
        eyebrow="With Gratitude"
        title="Gift Guide"
        description="Your presence at our wedding is the greatest gift we could ask for. If you wish to honor us further, a monetary gift would be greatly appreciated as we begin our new life together. Your generosity will help us build our future, and we are truly grateful for your love and support on this special day."
      />
      <div className="qr-placeholder" aria-label="QR code placeholder">
        <span>QR Code</span>
      </div>
    </section>
  );
}
