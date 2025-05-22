"use client";
import { useState } from 'react';
import { CreditCard, ChevronDown, AlertCircle, Check, X } from 'lucide-react';


// Sri Lankan banks list with codes
const sriLankanBanks = [
  { name: "Bank of Ceylon", code: "BOC" },
  { name: "People's Bank", code: "PB" },
  { name: "Commercial Bank of Ceylon", code: "CBC" },
  { name: "Hatton National Bank", code: "HNB" },
  { name: "Sampath Bank", code: "SB" },
  { name: "Nations Trust Bank", code: "NTB" },
  { name: "DFCC Bank", code: "DFCC" },
  { name: "National Development Bank", code: "NDB" },
  { name: "Seylan Bank", code: "SLB" },
  { name: "Pan Asia Banking Corporation", code: "PABC" },
  { name: "Union Bank of Colombo", code: "UBC" },
  { name: "Cargills Bank", code: "CB" },
  { name: "Amana Bank", code: "AB" },
  { name: "Standard Chartered Bank", code: "SCB" },
  { name: "HSBC Sri Lanka", code: "HSBC" },
  { name: "State Bank of India", code: "SBI" }
];

const EnhancedBankAccountForm = () => {
  // Main form state
  const [formData, setFormData] = useState({
    // First Bank
    bankName1: '',
    accountHolder1: '',
    accountNumber1: '',
    branchNumber1: '',
    branchCode1: '',
    
    // Second Bank
    bankName2: '',
    accountHolder2: '',
    accountNumber2: '',
    branchNumber2: '',
    branchCode2: '',
  });

  // UI states
  const [activeTab, setActiveTab] = useState(1); // 1 for first bank, 2 for second bank
  const [showSecondBank, setShowSecondBank] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<null | 'success' | 'error'>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Handle input blur for validation
  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
    validateField(name, formData[name as keyof typeof formData]);
  };

  // Field validation
  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (!value && name.includes('1')) { // Only validate primary bank as required
      error = 'This field is required';
    } else if (name.includes('accountNumber') && value && !/^\d+$/.test(value)) {
      error = 'Account number must contain only digits';
    } else if (name.includes('branchNumber') && value && !/^\d+$/.test(value)) {
      error = 'Branch number must contain only digits';
    }
    
    setErrors({
      ...errors,
      [name]: error,
    });
    
    return error;
  };

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    const requiredFields = ['bankName1', 'accountHolder1', 'accountNumber1', 'branchNumber1', 'branchCode1'];
    
    // Validate primary bank fields
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    
    // Validate secondary bank fields only if shown and has any data
    if (showSecondBank) {
      const secondaryFields = ['bankName2', 'accountHolder2', 'accountNumber2', 'branchNumber2', 'branchCode2'];
      const hasAnySecondaryData = secondaryFields.some(field => !!formData[field as keyof typeof formData]);
      
      if (hasAnySecondaryData) {
        secondaryFields.forEach(field => {
          const error = validateField(field, formData[field as keyof typeof formData]);
          if (error) {
            newErrors[field] = error;
            isValid = false;
          }
        });
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    // Mark all primary fields as touched
    const allTouched: Record<string, boolean> = {};
    ['bankName1', 'accountHolder1', 'accountNumber1', 'branchNumber1', 'branchCode1'].forEach(field => {
      allTouched[field] = true;
    });
    
    if (showSecondBank) {
      ['bankName2', 'accountHolder2', 'accountNumber2', 'branchNumber2', 'branchCode2'].forEach(field => {
        allTouched[field] = true;
      });
    }
    
    setTouched(allTouched);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Simulate API call
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      // Simulate successful submission
      setIsSubmitting(false);
      setSubmissionStatus('success');
      
      // Reset form after short delay
      setTimeout(() => {
        if (showSecondBank) {
          setShowSecondBank(false);
        }
        
        setFormData({
          bankName1: '',
          accountHolder1: '',
          accountNumber1: '',
          branchNumber1: '',
          branchCode1: '',
          bankName2: '',
          accountHolder2: '',
          accountNumber2: '',
          branchNumber2: '',
          branchCode2: '',
        });
        
        setSubmissionStatus(null);
        setActiveTab(1);
      }, 2000);
    }, 1500);
  };

  // Auto-fill branch code when bank is selected
  const handleBankSelect = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value } = e.target;
    const selectedBank = sriLankanBanks.find(bank => bank.name === value);
    
    handleInputChange(e);
    
    if (selectedBank) {
      // Auto-fill branch code field with bank code
      const branchCodeField = `branchCode${index}` as keyof typeof formData;
      setFormData({
        ...formData,
        [branchCodeField]: selectedBank.code,
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-blue-700">
          <CreditCard className="mr-2" />
          <h2 className="text-xl font-bold">Bank Account Details</h2>
        </div>
        
        {!showSecondBank && (
          <button
            type="button"
            onClick={() => setShowSecondBank(true)}
            className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
          >
            + Add Another Bank Account
          </button>
        )}
      </div>
      
      {/* Success/Error Feedback */}
      {submissionStatus === 'success' && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
          <Check size={18} className="mr-2" />
          <span>Bank details saved successfully!</span>
        </div>
      )}
      
      {submissionStatus === 'error' && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
          <X size={18} className="mr-2" />
          <span>There was an error saving your details. Please try again.</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {/* Tabs when showing both banks */}
        {showSecondBank && (
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab(1)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 1
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Primary Bank
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 2
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Secondary Bank
            </button>
            
            <button
              onClick={() => setShowSecondBank(false)}
              className="ml-auto text-gray-400 hover:text-gray-600"
              title="Remove secondary bank"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        {/* First Bank Section */}
        {(!showSecondBank || activeTab === 1) && (
          <div className="space-y-4">
            {showSecondBank && (
              <h3 className="text-lg font-medium text-gray-800 mb-4">Primary Bank Account</h3>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="bankName1"
                  value={formData.bankName1}
                  onChange={(e) => handleBankSelect(e, 1)}
                  onBlur={() => handleBlur('bankName1')}
                  className={`w-full p-2 pl-3 pr-10 border rounded appearance-none ${
                    errors.bankName1 && touched.bankName1 ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                  required
                >
                  <option value="">Select a bank</option>
                  {sriLankanBanks.map((bank) => (
                    <option key={bank.name} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
              {errors.bankName1 && touched.bankName1 && (
                <p className="mt-1 text-xs text-red-500 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.bankName1}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Holder <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="accountHolder1"
                value={formData.accountHolder1}
                onChange={handleInputChange}
                onBlur={() => handleBlur('accountHolder1')}
                className={`w-full p-2 border rounded ${
                  errors.accountHolder1 && touched.accountHolder1 ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                placeholder="e.g. John Smith"
                required
              />
              {errors.accountHolder1 && touched.accountHolder1 && (
                <p className="mt-1 text-xs text-red-500 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.accountHolder1}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber1"
                  value={formData.accountNumber1}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('accountNumber1')}
                  className={`w-full p-2 border rounded ${
                    errors.accountNumber1 && touched.accountNumber1 ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                  placeholder="e.g. 1234567890"
                  required
                />
                {errors.accountNumber1 && touched.accountNumber1 && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.accountNumber1}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="branchNumber1"
                  value={formData.branchNumber1}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('branchNumber1')}
                  className={`w-full p-2 border rounded ${
                    errors.branchNumber1 && touched.branchNumber1 ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                  placeholder="e.g. 001"
                  required
                />
                {errors.branchNumber1 && touched.branchNumber1 && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.branchNumber1}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="branchCode1"
                value={formData.branchCode1}
                onChange={handleInputChange}
                onBlur={() => handleBlur('branchCode1')}
                className={`w-full p-2 border rounded ${
                  errors.branchCode1 && touched.branchCode1 ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                placeholder="e.g. BOC123"
                required
              />
              {errors.branchCode1 && touched.branchCode1 && (
                <p className="mt-1 text-xs text-red-500 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.branchCode1}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Branch code will be auto-filled when you select a bank
              </p>
            </div>
          </div>
        )}
        
        {/* Second Bank Section */}
        {showSecondBank && activeTab === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Secondary Bank Account</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <div className="relative">
                <select
                  name="bankName2"
                  value={formData.bankName2}
                  onChange={(e) => handleBankSelect(e, 2)}
                  onBlur={() => handleBlur('bankName2')}
                  className={`w-full p-2 pl-3 pr-10 border rounded appearance-none ${
                    errors.bankName2 && touched.bankName2 ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                >
                  <option value="">Select a bank</option>
                  {sriLankanBanks.map((bank) => (
                    <option key={bank.name} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
              {errors.bankName2 && touched.bankName2 && (
                <p className="mt-1 text-xs text-red-500 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.bankName2}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Holder
              </label>
              <input
                type="text"
                name="accountHolder2"
                value={formData.accountHolder2}
                onChange={handleInputChange}
                onBlur={() => handleBlur('accountHolder2')}
                className={`w-full p-2 border rounded ${
                  errors.accountHolder2 && touched.accountHolder2 ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                placeholder="e.g. John Smith"
              />
              {errors.accountHolder2 && touched.accountHolder2 && (
                <p className="mt-1 text-xs text-red-500 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.accountHolder2}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber2"
                  value={formData.accountNumber2}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('accountNumber2')}
                  className={`w-full p-2 border rounded ${
                    errors.accountNumber2 && touched.accountNumber2 ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                  placeholder="e.g. 1234567890"
                />
                {errors.accountNumber2 && touched.accountNumber2 && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.accountNumber2}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Number
                </label>
                <input
                  type="text"
                  name="branchNumber2"
                  value={formData.branchNumber2}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('branchNumber2')}
                  className={`w-full p-2 border rounded ${
                    errors.branchNumber2 && touched.branchNumber2 ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                  placeholder="e.g. 001"
                />
                {errors.branchNumber2 && touched.branchNumber2 && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.branchNumber2}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Code
              </label>
              <input
                type="text"
                name="branchCode2"
                value={formData.branchCode2}
                onChange={handleInputChange}
                onBlur={() => handleBlur('branchCode2')}
                className={`w-full p-2 border rounded ${
                  errors.branchCode2 && touched.branchCode2 ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none`}
                placeholder="e.g. BOC123"
              />
              {errors.branchCode2 && touched.branchCode2 && (
                <p className="mt-1 text-xs text-red-500 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.branchCode2}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Branch code will be auto-filled when you select a bank
              </p>
            </div>
          </div>
        )}
        
        {/* Setup Payment Button */}
        <div className="mt-8">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-indigo-700 font-medium transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Setup Payment'}
          </button>
          
          <p className="mt-2 text-xs text-center text-gray-500">
            <span className="text-red-500">*</span> Required fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBankAccountForm;