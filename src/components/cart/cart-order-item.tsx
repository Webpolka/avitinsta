import React from "react";

interface CartOrderItemProps {
  label: string;
  value: string;
}

const CartOrderItem: React.FC<CartOrderItemProps> = ({ label, value }) => {
  return (
    <div className="flex items-end text-gray-400">
      <span className="whitespace-nowrap ag-h6 font-medium text-secondary">
        {label}
      </span>
      <span
        className="flex-1 mx-2 border-transparent translate-y-[-5px]"
        style={{
          height: "1px",
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 4px, black 2px, black 6px)",
        }}
      />
      <span className="whitespace-nowrap ag-h6 font-semibold text-secondary">
        {value}
      </span>
    </div>
  );
};

export default CartOrderItem;
