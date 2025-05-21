"use client"
import React, { useState, useRef } from 'react';
import { DollarSign, CreditCard, FileText, AlertCircle, Clock, CheckCircle, Calendar } from 'lucide-react';

// Mock data - replace with your actual API data
const mockBankDetails = [
  {
    id: 1,
    default: true,
    accountHolderName: "John Smith",
    accountNumber: "1234567890",
    bankName: "First National Bank",
    branchNumber: "001",
    branchCode: "FNB123",
    logo: "https://via.placeholder.com/40"
  },
  {
    id: 2,
    default: false,
    accountHolderName: "John Smith",
    accountNumber: "0987654321",
    bankName: "Standard Bank",
    branchNumber: "045",
    branchCode: "STD045",
    logo: "https://via.placeholder.com/40"
  }
];

const mockEarnings = {
  totalEarnings: 15750.00,
  companyFee: 787.50,
  withdrawableAmount: 14962.50,
  pendingClearance: 2500.00
};

const banksList = [
  { id: 1, name: "First National Bank", logo: "https://via.placeholder.com/30" },
  { id: 2, name: "Standard Bank", logo: "https://via.placeholder.com/30" }
];

const PaymentWithdrawalPage = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [activeBank, setActiveBank] = useState(1); // Default to first bank
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [withdrawalConfirmed, setWithdrawalConfirmed] = useState(false);
  type WithdrawalDetails = {
    bank: string;
    amount: string;
    date: string;
    reference: string;
    status: string;
  };
  
  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawalDetails | null>(null);
  const [isAddingBank, setIsAddingBank] = useState(false);
  
const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBank(e.target.value);
};
  
interface Bank {
    id: number;
    default: boolean;
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branchNumber: string;
    branchCode: string;
    logo: string;
}

const changeActiveBank = (bankId: Bank['id']): void => {
    setActiveBank(bankId);
};
  
  const toggleAddBank = () => {
    setIsAddingBank(!isAddingBank);
  };
  
interface NewBankDetails {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    branchCode: string;
}

const handleNewBankSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // In a real implementation, this would send data to your API
    alert("New bank details would be saved here");
    setIsAddingBank(false);
};
  
const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWithdrawalAmount(e.target.value);
    // Clear error if it exists
    if (amountError) {
        setAmountError("");
    }
};
  
  const handleWithdrawalRequest = () => {
    // Validate amount
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      setAmountError("Please enter a valid amount");
      return;
    }
    
    if (amount > mockEarnings.withdrawableAmount) {
      setAmountError("Amount cannot exceed your withdrawable balance");
      return;
    }
    
    if (!selectedBank) {
      setAmountError("Please select a bank");
      return;
    }
    
    // Create withdrawal details object
    const details = {
      bank: selectedBank,
      amount: amount.toFixed(2),
      date: new Date().toISOString(),
      reference: "WD" + Math.floor(Math.random() * 10000000),
      status: "Pending"
    };
    
    setWithdrawalDetails(details);
    setWithdrawalConfirmed(true);
  };
  
  const generatePDF = () => {
    // In a real implementation, this would use a library like jsPDF or html2pdf
    // to generate a PDF with withdrawal details
    if (withdrawalDetails) {
        alert(`PDF generated for withdrawal request ${withdrawalDetails.reference}`);
    } else {
        alert("No withdrawal details available to generate PDF.");
    }
  };
  
  const resetForm = () => {
    setSelectedBank("");
    setWithdrawalAmount("");
    setAmountError("");
    setWithdrawalConfirmed(false);
    setWithdrawalDetails(null);
  };
  
  // Format currency
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
};
  
  return (
    <div className="bg-gray-50 min-h-screen p-3 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Payments & Withdrawals</h1>
          <p className="text-sm md:text-base text-gray-500">Manage your earnings and request withdrawals</p>
        </header>
        
        {/* Bank Details Card */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center text-gray-800">
              <CreditCard size={20} className="mr-2 text-blue-500" /> Bank Details
            </h2>
            <button 
              onClick={toggleAddBank}
              className="text-blue-600 text-sm flex items-center hover:text-blue-800 transition duration-200"
            >
              {isAddingBank ? (
                "Cancel"
              ) : (
                <>
                  <span className="mr-1 text-xl font-bold">+</span> Add Bank Account
                </>
              )}
            </button>
          </div>
          
          {isAddingBank ? (
            <form onSubmit={handleNewBankSubmit} className="bg-blue-50 p-4 rounded-lg mb-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">-- Select a bank --</option>
                    {banksList.map(bank => (
                      <option key={bank.id} value={bank.name}>{bank.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Holder Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Full Name as on Bank Account" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Account Number" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch Code
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Branch Code" 
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button 
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200"
                >
                  Save Bank Details
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {mockBankDetails.map((bank) => (
                  <div 
                    key={bank.id}
                    className={`border rounded-lg p-4 transition-all duration-300 ${
                      activeBank === bank.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => changeActiveBank(bank.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-white p-2 rounded-md shadow-sm mr-3">
                          <img src={bank.logo} alt={bank.bankName} className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{bank.bankName}</h3>
                          <p className="text-sm text-gray-500">•••• {bank.accountNumber.slice(-4)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {bank.default && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mr-2">
                            Default
                          </span>
                        )}
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          activeBank === bank.id ? 'border-blue-500' : 'border-gray-300'
                        }`}>
                          {activeBank === bank.id && (
                            <div className="h-3 w-3 rounded-full bg-blue-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Account Holder</p>
                        <p className="text-sm font-medium">{bank.accountHolderName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Account Number</p>
                        <p className="text-sm font-medium">{bank.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Branch Number</p>
                        <p className="text-sm font-medium">{bank.branchNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Branch Code</p>
                        <p className="text-sm font-medium">{bank.branchCode}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Earnings Overview Card */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
            <DollarSign size={20} className="mr-2 text-green-500" /> Earnings Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Earnings</span>
              <span className="font-semibold text-lg">{formatCurrency(mockEarnings.totalEarnings)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Company Fee (5%)</span>
              <span className="font-medium text-red-500">- {formatCurrency(mockEarnings.companyFee)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Pending Clearance</span>
              <div className="flex items-center">
                <Clock size={16} className="mr-1 text-yellow-500" />
                <span className="font-medium text-yellow-500">{formatCurrency(mockEarnings.pendingClearance)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-800 font-medium">Available for Withdrawal</span>
              <span className="font-bold text-xl text-green-600">{formatCurrency(mockEarnings.withdrawableAmount)}</span>
            </div>
          </div>
          
          {/* Visual earnings indicator */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div 
                  style={{ width: `${(mockEarnings.withdrawableAmount / mockEarnings.totalEarnings) * 100}%` }} 
                  className="bg-green-500"
                ></div>
                <div 
                  style={{ width: `${(mockEarnings.pendingClearance / mockEarnings.totalEarnings) * 100}%` }} 
                  className="bg-yellow-400"
                ></div>
                <div 
                  style={{ width: `${(mockEarnings.companyFee / mockEarnings.totalEarnings) * 100}%` }} 
                  className="bg-red-400"
                ></div>
              </div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-yellow-400 mr-1"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-400 mr-1"></div>
                <span>Fees</span>
              </div>
            </div>
          </div>
        </div>
        
        {!withdrawalConfirmed ? (
          /* Withdrawal Request Form */
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
              <FileText size={20} className="mr-2 text-purple-500" /> Request Withdrawal
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Bank Account
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mockBankDetails.map(bank => (
                    <div 
                      key={bank.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 flex items-center ${
                        selectedBank === bank.bankName 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedBank(bank.bankName)}
                    >
                      <div className="bg-white p-1 rounded-md shadow-sm mr-2">
                        <img src={bank.logo} alt={bank.bankName} className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{bank.bankName}</p>
                        <p className="text-xs text-gray-500">•••• {bank.accountNumber.slice(-4)}</p>
                      </div>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        selectedBank === bank.bankName ? 'border-blue-500' : 'border-gray-300'
                      }`}>
                        {selectedBank === bank.bankName && (
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="amount"
                    placeholder="0.00"
                    className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={withdrawalAmount}
                    onChange={handleAmountChange}
                    min="0"
                    max={mockEarnings.withdrawableAmount}
                    step="0.01"
                  />
                </div>
                {amountError && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {amountError}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Maximum withdrawal: {formatCurrency(mockEarnings.withdrawableAmount)}
                </p>
              </div>
              
              <div className="pt-4">
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                  onClick={handleWithdrawalRequest}
                >
                  <DollarSign size={18} className="mr-2" />
                  Request Withdrawal
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Withdrawal Confirmation Card */
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center text-gray-800">
                <CheckCircle size={20} className="mr-2 text-green-500" /> Withdrawal Requested
              </h2>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                {withdrawalDetails?.status || "N/A"}
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Reference:</span>
                <span className="font-medium">{withdrawalDetails?.reference || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bank:</span>
                <span className="font-medium">{withdrawalDetails?.bank || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-green-600">
                  {withdrawalDetails ? formatCurrency(parseFloat(withdrawalDetails.amount)) : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date Requested:</span>
                <span className="font-medium flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {withdrawalDetails ? new Date(withdrawalDetails.date).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 transition duration-200 flex items-center justify-center"
                onClick={generatePDF}
              >
                <FileText size={16} className="mr-2" /> Download PDF
              </button>
              <button
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition duration-200 flex items-center justify-center"
                onClick={resetForm}
              >
                Make Another Request
              </button>
            </div>
          </div>
        )}
        
        {/* Recent Withdrawals */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
            <Clock size={20} className="mr-2 text-blue-500" /> Recent Withdrawals
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {withdrawalDetails ? (
                  <tr className="bg-green-50">
                    <td className="px-4 py-3 text-sm">{new Date(withdrawalDetails.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm font-medium">{withdrawalDetails.reference}</td>
                    <td className="px-4 py-3 text-sm font-medium text-green-600">{formatCurrency(parseFloat(withdrawalDetails.amount))}</td>
                    <td className="px-4 py-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        {withdrawalDetails.status}
                      </span>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td className="px-4 py-3 text-sm">05/01/2025</td>
                  <td className="px-4 py-3 text-sm font-medium">WD7829401</td>
                  <td className="px-4 py-3 text-sm font-medium">$2,500.00</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">04/15/2025</td>
                  <td className="px-4 py-3 text-sm font-medium">WD6754321</td>
                  <td className="px-4 py-3 text-sm font-medium">$1,750.00</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">03/28/2025</td>
                  <td className="px-4 py-3 text-sm font-medium">WD5432109</td>
                  <td className="px-4 py-3 text-sm font-medium">$3,200.00</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentWithdrawalPage;