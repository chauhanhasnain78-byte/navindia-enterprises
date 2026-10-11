"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { companyConfig } from "@/config/company";
import { Button } from "@/components/ui/Button";

export function RfqSpecSummary() {
  const searchParams = useSearchParams();

  const product = searchParams.get("product") || "";
  const productSlug = searchParams.get("productSlug") || "";
  const category = searchParams.get("category") || "";
  const categorySlug = searchParams.get("categorySlug") || "";
  const quantity = searchParams.get("quantity") || "";
  const destination = searchParams.get("destination") || "";
  const notes = searchParams.get("notes") || "";

  const specEntries: Array<{ label: string; value: string }> = [];
  searchParams.forEach((value, key) => {
    if (key.startsWith("spec_") && value.trim()) {
      specEntries.push({
        label: key.replace(/^spec_/, ""),
        value: value.trim(),
      });
    }
  });

  const hasSpecification = Boolean(
    product || category || quantity || destination || specEntries.length > 0
  );

  // Build pre-filled message for WhatsApp & Email
  const summaryLines: string[] = [
    `Hello ${companyConfig.name},`,
    "We would like to request a quotation for the following specification:",
    "",
  ];
  if (product) summaryLines.push(`• Product: ${product}`);
  if (category) summaryLines.push(`• Category: ${category}`);
  specEntries.forEach((item) => {
    summaryLines.push(`• ${item.label}: ${item.value}`);
  });
  if (quantity) summaryLines.push(`• Quantity: ${quantity}`);
  if (destination) summaryLines.push(`• Destination Country: ${destination}`);
  if (notes) summaryLines.push(`• Additional Notes: ${notes}`);

  const formattedMessage = hasSpecification
    ? summaryLines.join("\n")
    : companyConfig.whatsappPrefilledMessage;

  const whatsappUrl = `https://wa.me/${
    companyConfig.whatsappNumber
  }?text=${encodeURIComponent(formattedMessage)}`;

  const emailSubject = product
    ? `RFQ Enquiry: ${product} — ${companyConfig.name}`
    : `RFQ Enquiry — ${companyConfig.name}`;

  const mailtoUrl = `mailto:${companyConfig.email}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(formattedMessage)}`;

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-silver bg-white p-6 sm:p-10 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
          {hasSpecification ? "Specification Received" : "Request a Quote (RFQ)"}
        </span>

        {categorySlug && productSlug ? (
          <Link
            href={`/products/${categorySlug}/${productSlug}`}
            className="text-xs font-semibold text-steel hover:text-navy transition-colors"
          >
            &larr; Edit Specification
          </Link>
        ) : (
          <Link
            href="/products"
            className="text-xs font-semibold text-steel hover:text-navy transition-colors"
          >
            &larr; Browse Products
          </Link>
        )}
      </div>

      <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-navy">
        {hasSpecification
          ? "Your Specification Summary"
          : "Request a Quotation (RFQ)"}
      </h1>

      <p className="mt-2.5 text-sm sm:text-base text-steel leading-relaxed">
        {hasSpecification
          ? "Review your selected specification below and send it directly to our team via WhatsApp or Email. Our interactive multi-item online submission form will be available in Phase 3."
          : "Our interactive multi-item online quotation form is being prepared for Phase 3. Please share your product specifications, drawings, and quantities directly via WhatsApp or Email."}
      </p>

      {/* Clean Specification Summary Box when query parameters are present */}
      {hasSpecification && (
        <div className="mt-6 rounded-xl border border-silver bg-steel-light/30 p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-silver/70 pb-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-navy">
              Selected Requirement Details
            </h2>
            {category && (
              <span className="rounded bg-white px-2.5 py-0.5 text-xs font-semibold text-steel border border-silver/60">
                {category}
              </span>
            )}
          </div>

          <dl className="mt-3 divide-y divide-silver/50 text-sm">
            {product && (
              <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-12 sm:gap-4">
                <dt className="font-bold text-steel sm:col-span-5">Product</dt>
                <dd className="font-extrabold text-navy sm:col-span-7">
                  {product}
                </dd>
              </div>
            )}

            {specEntries.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-12 sm:gap-4"
              >
                <dt className="font-bold text-steel sm:col-span-5">
                  {item.label}
                </dt>
                <dd className="font-semibold text-navy sm:col-span-7">
                  {item.value}
                </dd>
              </div>
            ))}

            {quantity && (
              <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-12 sm:gap-4">
                <dt className="font-bold text-steel sm:col-span-5">Quantity</dt>
                <dd className="font-extrabold text-navy sm:col-span-7">
                  {quantity}
                </dd>
              </div>
            )}

            {destination && (
              <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-12 sm:gap-4">
                <dt className="font-bold text-steel sm:col-span-5">
                  Destination Country
                </dt>
                <dd className="font-extrabold text-navy sm:col-span-7">
                  {destination}
                </dd>
              </div>
            )}

            {notes && (
              <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-12 sm:gap-4">
                <dt className="font-bold text-steel sm:col-span-5">
                  Additional Notes
                </dt>
                <dd className="font-medium text-navy sm:col-span-7 whitespace-pre-line">
                  {notes}
                </dd>
              </div>
            )}
          </dl>

          <p className="mt-4 text-xs text-steel">
            {companyConfig.trust.indicativeSpecNotice}
          </p>
        </div>
      )}

      {/* Company WhatsApp and Email Contact Cards */}
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-silver/80 bg-steel-light/35 p-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-steel">
            WhatsApp / Phone
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-base font-bold text-navy hover:text-amber-accent transition-colors"
          >
            {companyConfig.phone}
          </a>
        </div>

        <div className="rounded-xl border border-silver/80 bg-steel-light/35 p-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-steel">
            Email Enquiry
          </span>
          <a
            href={mailtoUrl}
            className="mt-1 inline-block text-base font-bold text-navy hover:text-amber-accent transition-colors break-all"
          >
            {companyConfig.email}
          </a>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        <Button href={whatsappUrl} external variant="primary" size="lg">
          {hasSpecification
            ? "Send This Specification on WhatsApp"
            : "Send Requirement on WhatsApp"}
        </Button>
        <Button href={mailtoUrl} variant="outline-dark" size="lg">
          {hasSpecification
            ? "Email This Specification"
            : "Email Your Specification"}
        </Button>
      </div>
    </div>
  );
}
