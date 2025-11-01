import React from "react";

export default function PaymentMethodModal({
  paymentMethod,
  setPaymentMethod,
  onSave,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Enter Payment Method</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!paymentMethod.upi && !paymentMethod.bank && !paymentMethod.mobile) {
              alert("Please provide at least one payment method.");
              return;
            }
            onSave();
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="UPI ID (e.g. name@upi)"
            className="rounded px-3 py-2 border border-blue-200"
            value={paymentMethod.upi}
            onChange={e => setPaymentMethod(pm => ({ ...pm, upi: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Bank Details (e.g. IFSC/Account)"
            className="rounded px-3 py-2 border border-blue-200"
            value={paymentMethod.bank}
            onChange={e => setPaymentMethod(pm => ({ ...pm, bank: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Mobile Number (for wallet/Paytm)"
            className="rounded px-3 py-2 border border-blue-200"
            value={paymentMethod.mobile}
            onChange={e => setPaymentMethod(pm => ({ ...pm, mobile: e.target.value }))}
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
            >
              Save & Accept
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded flex-1"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
