'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const OtpContent = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24);
  const [toastMessage, setToastMessage] = useState('');
  
  // Registration States
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [registrationName, setRegistrationName] = useState('');
  const [registering, setRegistering] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const mobileNo = searchParams.get('mobile_no');
  const txnId = searchParams.get('txn_id');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if there's a value
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6 || !mobileNo) {
      alert('Please enter a valid 6-digit OTP.');
      return;
    }

    const handlePendingCart = async (userObj: any) => {
      const pendingItemStr = localStorage.getItem("gbru_pending_cart_item");
      if (!pendingItemStr) {
        if (userObj?.role?.toLowerCase() === 'farmer') {
          router.push('/dashboard');
        } else {
          router.push('/profile');
        }
        return;
      }

      try {
        const pendingItem = JSON.parse(pendingItemStr);
        const mobile_no = userObj.customer_id?.split('-')[1] || userObj.user_id || userObj.mobile_no;
        if (!mobile_no) {
          localStorage.removeItem("gbru_pending_cart_item");
          router.push('/cart');
          return;
        }

        // Add to cart
        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile_no,
            items: [pendingItem]
          })
        });

        const resJson = await res.json();
        if (resJson.message?.status) {
          alert(`${pendingItem.item_name || "Product"} added to cart successfully!`);
        }
      } catch (e) {
        console.error("Error adding pending item to cart:", e);
      } finally {
        localStorage.removeItem("gbru_pending_cart_item");
        router.push('/cart');
      }
    };

    setLoading(true);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile_no: mobileNo, otp: otpValue }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.isNewUser) {
          setShowRegistrationPopup(true);
        } else {
          // Save user details securely in localStorage
          localStorage.setItem('gbru_user', JSON.stringify(data.user));
          await handlePendingCart(data.user);
        }
      } else {
        alert(data.message || data.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShortRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationName.trim()) {
      alert("Please enter your name");
      return;
    }

    setRegistering(true);
    try {
      const response = await fetch('/api/short-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_no: mobileNo, name: registrationName.trim() }),
      });
      const data = await response.json();

      if (data?.message?.status) {
        // Create basic user session from short registration data
        const shortData = data.message.data;
        const basicUser = {
          Customer_name: registrationName.trim(),
          customer_id: shortData.customer_id,
          user_id: shortData.user_id,
          role: "Farmer",
          status: "ACTIVE",
          is_completed: false
        };
        localStorage.setItem('gbru_user', JSON.stringify(basicUser));
        setShowRegistrationPopup(false);
        
        // Handle pending cart item adding
        const pendingItemStr = localStorage.getItem("gbru_pending_cart_item");
        if (pendingItemStr) {
          try {
            const pendingItem = JSON.parse(pendingItemStr);
            const res = await fetch("/api/cart/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                mobile_no: mobileNo,
                items: [pendingItem]
              })
            });
            const resJson = await res.json();
            if (resJson.message?.status) {
              alert(`${pendingItem.item_name || "Product"} added to cart successfully!`);
            }
          } catch (err) {
            console.error("Error adding pending item to cart:", err);
          } finally {
            localStorage.removeItem("gbru_pending_cart_item");
            router.push('/cart');
          }
        } else {
          router.push('/dashboard');
        }
      } else {
        alert(data?.message?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error in short registration:", err);
      alert("An error occurred during registration. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  const handleResendOtp = async () => {
    if (!mobileNo) return;
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_no: mobileNo }),
      });
      const data = await response.json();
      if (data.message?.status || data.success) { // checking both depending on route return structure
        setToastMessage(`OTP sent successfully check ${mobileNo}`);
        setTimeLeft(24); // Reset countdown
        setTimeout(() => setToastMessage(''), 2500); // Clear toast message
      } else {
        alert(data.message?.message || data.error || 'Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Manrope:wght@600&family=Roboto:wght@400;500;600&display=swap');
        
        @keyframes fadeOut {
          0% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .toast-animate {
          animation: fadeOut 2.5s forwards;
        }
      `}} />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-[#006B21] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 toast-animate"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {toastMessage}
        </div>
      )}

      <div 
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/caroussel-2.jpg')" }}
      >
        <div className="flex flex-col md:flex-row w-full max-w-[1100px] bg-white rounded-xl shadow-2xl overflow-hidden min-h-[650px]">
          
          {/* Left Side (Green Gradient) - Exactly same as Login */}
          <div className="w-full md:w-[45%] relative p-10 flex flex-col bg-gradient-to-b from-[#2E6F18] via-[#4F8D14] to-[#C99C15] overflow-hidden">
            {/* Logo */}
            <div className="mb-10 relative z-10">
              <Image 
                src="/assets/gbru_header_logo.png" 
                alt="GBRU Logo" 
                width={120} 
                height={50} 
                className="object-contain"
              />
            </div>

            {/* Welcome Text */}
            <h1 
              className="text-white mb-8 relative z-10"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '30px',
                letterSpacing: '0px'
              }}
            >
              Welcome to GBRU - Your<br />Partner in Smarter Farming.
            </h1>

            {/* Feature List */}
            <ul className="space-y-4 mb-10 relative z-10">
              {[
                { text: '10k+ Farmers Trust Us', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                { text: 'Secure Payments', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
                { text: '24/7 Technical Support', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-white">
                  {item.icon}
                  <span 
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      lineHeight: '12px',
                      letterSpacing: '0.6px'
                    }}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Farmer Image */}
            <div className="mt-auto relative z-10 flex-1 flex items-end justify-center rounded-xl overflow-hidden">
              <Image 
                src="/assets/farmer.png" 
                alt="Farmer" 
                width={300} 
                height={250} 
                className="object-cover rounded-xl shadow-lg border border-white/20 w-full h-auto max-h-[260px]"
              />
            </div>
            
            {/* Subtle glow overlay for styling */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
          </div>

          {/* Right Side (OTP Form) */}
          <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center bg-white">
            <h2 
              className="text-[#1A1A1A] mb-3"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: '28px',
                lineHeight: '36px'
              }}
            >
              Verify Your Number
            </h2>
            
            <p 
              className="text-[#4A4A4A] mb-1"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '21px'
              }}
            >
              Enter the 6-digit code sent to <span className="font-semibold text-black">{mobileNo ? `+91 ${mobileNo}` : '+91 98765 43210'}</span>
            </p>

            <button 
              className="text-[#006B21] text-left hover:underline mb-10 w-fit"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Edit Number
            </button>

            <form className="flex flex-col">
              {/* OTP Input Fields */}
              <div className="flex gap-3 md:gap-4 mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 md:w-[54px] md:h-[60px] text-center text-xl font-semibold border rounded-lg outline-none transition-all focus:border-[#006B21] focus:ring-1 focus:ring-[#006B21] text-[#1A1A1A]"
                    style={{
                      borderColor: digit ? '#006B21' : '#E5E5E5',
                      backgroundColor: '#F9F9F9',
                      borderWidth: digit ? '2px' : '1px'
                    }}
                  />
                ))}
              </div>

              <button 
                type="button"
                onClick={handleVerify}
                disabled={loading}
                className={`w-full text-white rounded-lg shadow-[0_4px_12px_rgba(0,107,33,0.25)] transition-opacity hover:opacity-90 flex items-center justify-center mb-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                style={{
                  height: '56px',
                  background: '#006B21',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '24px'
                }}
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>

              <div className="text-center w-full mb-8">
                <p 
                  className="text-[#6B7280]"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '21px'
                  }}
                >
                  OTP valid for 10 min
                </p>
              </div>

              <div className="text-center w-full">
                <p 
                  className="text-[#6B7280]"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '15px'
                  }}
                >
                  Didn't receive the code?{' '}
                  {timeLeft > 0 ? (
                    <span className="text-[#9CA3AF]">
                      Resend OTP in 00:{timeLeft.toString().padStart(2, '0')}
                    </span>
                  ) : (
                    <button 
                      type="button" 
                      onClick={handleResendOtp}
                      className="text-[#006B21] font-medium hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>
            </form>

            <div className="mt-12 pt-6 border-t border-[#D9D9D9] flex justify-center items-center w-full">
              <a 
                href="#" 
                className="flex items-center gap-2 text-[#4A4A4A] hover:text-[#006B21] transition-colors" 
                style={{ fontSize: '15px', fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help Center
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Short Registration Popup */}
      {showRegistrationPopup && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2E6F18] to-[#4F8D14] p-6 relative">
              <button 
                onClick={() => router.push('/dashboard')}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Join GBRU Today
              </h3>
              <p className="text-white/90 text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Interested in a short registration? Get started in seconds!
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              <form onSubmit={handleShortRegistration} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={registrationName}
                    onChange={(e) => setRegistrationName(e.target.value)}
                    className="h-12 px-4 border border-zinc-200 rounded-xl text-[15px] text-[#1A1A1A] focus:outline-none focus:border-[#0D9740] focus:ring-1 focus:ring-[#0D9740] transition-all bg-[#F9F9F9]"
                  />
                </div>
                

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-2.5 border border-zinc-200 text-zinc-600 font-bold text-sm rounded-xl hover:bg-zinc-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={registering}
                    className={`px-8 py-2.5 bg-[#006B21] text-white font-bold text-sm rounded-xl hover:bg-[#005a1b] transition-colors shadow-[0_4px_12px_rgba(0,107,33,0.25)] flex items-center justify-center ${registering ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {registering ? 'Processing...' : 'Proceed'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Otp = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OtpContent />
    </Suspense>
  );
};

export default Otp;
