"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { companyConfig } from "@/config/company";
import { CatalogProduct } from "@/data/catalog";
import { Button } from "@/components/ui/Button";

interface RequirementBoxProps {
  product: CatalogProduct;
  categoryName: string;
}

const OTHER_OPTION_VALUE = "Other (type here)";
const NOT_SURE_OPTION_VALUE = "Not sure";

export function RequirementBox({
  product,
  categoryName,
}: RequirementBoxProps) {
  const router = useRouter();
  const unitOptions = product.quantityUnits || ["pcs", "sets", "meters", "kg"];

  // Initialize field state: default select fields to "Not sure" so user can immediately submit or customize
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.fields.forEach((f) => {
      initial[f.id] = f.type === "select" ? NOT_SURE_OPTION_VALUE : "";
    });
    return initial;
  });

  const [otherTextValues, setOtherTextValues] = useState<Record<string, string>>(
    {}
  );
  const [quantity, setQuantity] = useState<string>("");
  const [quantityUnit, setQuantityUnit] = useState<string>(
    product.defaultQuantityUnit || unitOptions[0] || "pcs"
  );
  const [destination, setDestination] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const handleOtherTextChange = (fieldId: string, value: string) => {
    setOtherTextValues((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const parsedQty = Number(quantity);
    if (!quantity.trim() || Number.isNaN(parsedQty) || parsedQty <= 0) {
      newErrors.quantity = "Please enter a valid quantity greater than 0.";
    }

    if (!destination.trim()) {
      newErrors.destination = "Please enter or select a destination country.";
    }

    product.fields.forEach((field) => {
      if (
        field.type === "select" &&
        fieldValues[field.id] === OTHER_OPTION_VALUE &&
        !otherTextValues[field.id]?.trim()
      ) {
        newErrors[field.id] = `Please type your custom ${field.label.toLowerCase()}.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const params = new URLSearchParams();
    params.set("product", product.name);
    params.set("productSlug", product.slug);
    params.set("category", categoryName);
    params.set("categorySlug", product.categorySlug);

    product.fields.forEach((field) => {
      const rawVal = fieldValues[field.id]?.trim() || "";
      if (!rawVal) return;
      const finalVal =
        field.type === "select" && rawVal === OTHER_OPTION_VALUE
          ? `Other: ${otherTextValues[field.id]?.trim() || ""}`
          : rawVal;
      params.set(`spec_${field.label}`, finalVal);
    });

    params.set("quantity", `${quantity.trim()} ${quantityUnit}`);
    params.set("destination", destination.trim());
    if (notes.trim()) {
      params.set("notes", notes.trim());
    }

    router.push(`/rfq?${params.toString()}`);
  };

  return (
    <div
      id="requirement-box"
      className="scroll-mt-24 rounded-2xl border border-silver bg-white p-5 sm:p-7 shadow-card"
    >
      <div className="border-b border-silver/60 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-accent">
          Configure Your Enquiry
        </span>
        <h2 className="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight text-navy">
          Specify Your Requirement
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-steel">
          Select known parameters below or choose &ldquo;Not sure&rdquo; and we will guide you in your quotation.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        {/* Dynamic Product Fields */}
        {product.fields.map((field) => {
          const inputId = `field-${product.slug}-${field.id}`;
          const isOtherSelected =
            field.type === "select" &&
            fieldValues[field.id] === OTHER_OPTION_VALUE;

          const selectOptions =
            field.type === "select"
              ? [
                  ...(field.options || []),
                  ...(field.allowOther ? [OTHER_OPTION_VALUE] : []),
                  NOT_SURE_OPTION_VALUE,
                ]
              : [];

          return (
            <div key={field.id} className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-2">
                <label
                  htmlFor={inputId}
                  className="block text-xs sm:text-sm font-bold text-navy"
                >
                  {field.label}
                </label>
                {field.unit && (
                  <span className="text-[11px] font-semibold text-steel">
                    Unit: {field.unit}
                  </span>
                )}
              </div>

              {field.type === "select" ? (
                <div className="space-y-2">
                  <select
                    id={inputId}
                    value={fieldValues[field.id] || NOT_SURE_OPTION_VALUE}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    className="h-11 w-full rounded-lg border border-silver bg-steel-light/30 px-3.5 text-sm text-navy focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-accent"
                  >
                    {selectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {isOtherSelected && (
                    <div>
                      <label
                        htmlFor={`${inputId}-other`}
                        className="sr-only"
                      >
                        Specify other {field.label}
                      </label>
                      <input
                        id={`${inputId}-other`}
                        type="text"
                        value={otherTextValues[field.id] || ""}
                        onChange={(e) =>
                          handleOtherTextChange(field.id, e.target.value)
                        }
                        placeholder={`Type your required ${field.label.toLowerCase()}...`}
                        className="h-11 w-full rounded-lg border border-navy/40 bg-white px-3.5 text-sm text-navy placeholder:text-steel focus:border-navy focus:outline-none focus:ring-2 focus:ring-amber-accent"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <input
                  id={inputId}
                  type="text"
                  value={fieldValues[field.id] || ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder || "Enter requirement or leave blank if not sure"}
                  className="h-11 w-full rounded-lg border border-silver bg-steel-light/30 px-3.5 text-sm text-navy placeholder:text-steel focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-accent"
                />
              )}

              {field.guideText && (
                <p className="text-[11px] leading-relaxed text-steel">
                  {field.guideText}
                </p>
              )}

              {errors[field.id] && (
                <p role="alert" className="text-xs font-semibold text-red-600">
                  {errors[field.id]}
                </p>
              )}
            </div>
          );
        })}

        {/* Divider before standard order fields */}
        <div className="border-t border-silver/60 pt-4 space-y-4">
          {/* Quantity + Unit */}
          <div className="space-y-1.5">
            <label
              htmlFor={`field-${product.slug}-quantity`}
              className="block text-xs sm:text-sm font-bold text-navy"
            >
              Quantity <span className="text-amber-accent">*</span>
            </label>
            <div className="flex gap-2.5">
              <input
                id={`field-${product.slug}-quantity`}
                type="number"
                min="1"
                step="any"
                required
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (errors.quantity) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.quantity;
                      return next;
                    });
                  }
                }}
                placeholder="e.g. 100"
                className="h-11 flex-1 rounded-lg border border-silver bg-steel-light/30 px-3.5 text-sm text-navy placeholder:text-steel focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-accent"
              />
              <label
                htmlFor={`field-${product.slug}-quantity-unit`}
                className="sr-only"
              >
                Quantity Unit
              </label>
              <select
                id={`field-${product.slug}-quantity-unit`}
                value={quantityUnit}
                onChange={(e) => setQuantityUnit(e.target.value)}
                className="h-11 w-32 sm:w-36 rounded-lg border border-silver bg-steel-light/30 px-3 text-sm font-semibold text-navy focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-accent"
              >
                {unitOptions.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            {errors.quantity && (
              <p role="alert" className="text-xs font-semibold text-red-600">
                {errors.quantity}
              </p>
            )}
          </div>

          {/* Destination Country with quick suggestions */}
          <div className="space-y-1.5">
            <label
              htmlFor={`field-${product.slug}-destination`}
              className="block text-xs sm:text-sm font-bold text-navy"
            >
              Destination Country <span className="text-amber-accent">*</span>
            </label>
            <input
              id={`field-${product.slug}-destination`}
              type="text"
              list={`destination-list-${product.slug}`}
              required
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                if (errors.destination) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.destination;
                    return next;
                  });
                }
              }}
              placeholder="Type or select country (e.g. UAE, Qatar, Bahrain...)"
              className="h-11 w-full rounded-lg border border-silver bg-steel-light/30 px-3.5 text-sm text-navy placeholder:text-steel focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-accent"
            />
            <datalist id={`destination-list-${product.slug}`}>
              {companyConfig.trust.destinationSuggestions.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>

            {/* Quick suggestion pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-medium text-steel mr-1">
                Suggestions:
              </span>
              {companyConfig.trust.destinationSuggestions.map((country) => {
                const isSelected =
                  destination.trim().toLowerCase() === country.toLowerCase();
                return (
                  <button
                    key={country}
                    type="button"
                    onClick={() => {
                      setDestination(country === "Other" ? "" : country);
                      if (errors.destination) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.destination;
                          return next;
                        });
                      }
                    }}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${
                      isSelected
                        ? "bg-navy text-white"
                        : "bg-steel-light/70 text-navy hover:bg-amber-accent/30"
                    }`}
                  >
                    {country}
                  </button>
                );
              })}
            </div>

            {errors.destination && (
              <p role="alert" className="text-xs font-semibold text-red-600">
                {errors.destination}
              </p>
            )}
          </div>

          {/* Optional Additional Notes */}
          <div className="space-y-1.5">
            <label
              htmlFor={`field-${product.slug}-notes`}
              className="block text-xs sm:text-sm font-bold text-navy"
            >
              Additional Notes <span className="font-normal text-steel">(Optional)</span>
            </label>
            <textarea
              id={`field-${product.slug}-notes`}
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share part numbers, schedule, delivery port, or special instructions..."
              className="w-full rounded-lg border border-silver bg-steel-light/30 p-3.5 text-sm text-navy placeholder:text-steel focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-accent"
            />
          </div>
        </div>

        {/* Indicative Specification Notice */}
        <p className="rounded-lg border border-silver/60 bg-steel-light/40 px-3.5 py-2.5 text-xs text-steel leading-relaxed">
          {companyConfig.trust.indicativeSpecNotice}
        </p>

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Request Quote for This Specification
        </Button>
      </form>
    </div>
  );
}
