import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";

export default function CustomizeProduct({ product }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariants, setSelectedVariants] = useState();
  useEffect(() => {
    const variant = product.variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariants(variant);
  }, [selectedOptions, product.variants]);

  function handleOptionSelect(optionType, choice) {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  }
  function isVariantIsInStock(choices) {
    return product.variants.some((variant) => {
      if (!variant.choices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variant.choices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  }
  return (
    <>
      <div className="flex items-center gap-3">
        {product.discount.type !== "NONE" && (
          <span className="scale-90 line-through opacity-50">
            {selectedVariants?.variant.priceData.formatted.discountedPrice}
          </span>
        )}
        <span className="text-lg">
          {selectedVariants?.variant.priceData.formatted.discountedPrice}
        </span>
      </div>
      <div className="divider" />
      <div>
        {product.productOptions.map((option) => (
          <div className="flex flex-col gap-2 p-3" key={option.name}>
            <h2 className="font-semibold">Choose a {option.name}</h2>
            <ul className="flex items-center gap-3">
              {option.choices.map((choice,i) => {
                const disabled = !isVariantIsInStock({
                  ...selectedOptions,
                  [option.name]: choice.description,
                });
                const selected =
                  selectedOptions[option.name] === choice.description;
                const clickHandler = disabled
                  ? undefined
                  : () => handleOptionSelect(option.name, choice.description);

                return option.name === "Color" ? (
                  <div
                    className="tooltip"
                    data-tip={
                      disabled
                        ? "not in stock"
                        : choice.description.toUpperCase()
                    }
                  >
                    <li
                      key={i}
                      className={`flex items-center justify-center rounded-full p-1 ${
                        selected ? "ring-1 ring-gray-500" : ""
                      } ${disabled ? "cursor-not-allowed opacity-50" : ""} `}
                      onClick={clickHandler}
                    >
                      <button
                        style={{ backgroundColor: choice.value }}
                        disabled={disabled}
                        className={`btn btn-circle btn-ghost btn-sm`}
                      ></button>
                    </li>
                  </div>
                ) : (
                  <li
                    className={`btn ${
                      disabled ? "btn-disabled cursor-not-allowed" : ""
                    } ${
                      selected ? "btn-primary" : "btn-outline btn-secondary"
                    } btn-sm rounded-sm`}
                    onClick={clickHandler}
                  >
                    {choice.description}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <AddToCart
          productId={product._id}
          variantId={
            selectedVariants?._id || "00000000-0000-0000-0000-000000000000"
          }
          stockNumber={selectedVariants?.stock?.quantity || 0}
        />
      </div>
    </>
  );
}
