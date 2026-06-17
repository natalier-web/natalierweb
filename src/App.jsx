import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Scissors, Sparkles, Hand, CalendarDays, X, CheckCircle2, ChevronRight, Check, Plus, Trash2, LayoutDashboard, Users, Image as ImageIcon, Calendar, Lock, LogOut, Mail, Upload, Loader2, Filter, AlertCircle, Phone } from 'lucide-react';

// Google Font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght=200;300;400;500;600;700;800&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const slideshowImages = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop"
];



const GlobalStyle = () => (
  <style>{`
    :root { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
    html, body { margin: 0 !important; padding: 0 !important; width: 100vw; height: 100vh; overflow: hidden; background-color: #0d0a12; color: #fff; }
    #root { width: 100vw; height: 100vh; display: flex; flex-direction: column; background-color: #0d0a12; }
    * { box-sizing: border-box; font-family: 'Noto Sans Georgian', sans-serif; }
    
    .glow-box { border: 1px solid rgba(213, 63, 140, 0.3); box-shadow: 0 0 25px rgba(213, 63, 140, 0.1); }
    .glow-box:hover { border-color: #d53f8c; box-shadow: 0 0 35px rgba(213, 63, 140, 0.3); }
    
    .icon-card { border: 1px solid #1a1020; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); background: #130d16; }
    .icon-card:hover { border-color: #d53f8c; box-shadow: 0 0 20px rgba(213, 63, 140, 0.25); transform: translateY(-3px); }
    
    .master-card { border: 1px solid #222; background: #120d16; transition: all 0.3s ease; }
    .master-card:hover { border-color: #d53f8c; box-shadow: 0 0 20px rgba(213, 63, 140, 0.2); background: #121212; }
    
    input, select, textarea { border: 1px solid #222 !important; transition: all 0.3s !important; background-color: #150f18 !important; color: #fff !important; }
    input:focus, select:focus, textarea:focus { border-color: #d53f8c !important; box-shadow: 0 0 15px rgba(213, 63, 140, 0.2) !important; outline: none; }
    
    .admin-tab { background: none; border: none; padding: 15px 20px; color: #888; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; border-bottom: 2px solid transparent; transition: all 0.3s; display: flex; align-items: center; }
    .admin-tab.active { color: #d53f8c; border-bottom-color: #d53f8c; background: rgba(213,63,140,0.05); }

    .overlap-avatar { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); filter: grayscale(40%); }
    .overlap-avatar:hover { transform: scale(1.05) translateY(-5px) !important; filter: grayscale(0%); z-index: 999 !important; }
    .overlap-avatar.active { filter: grayscale(0%); border-color: #d53f8c !important; box-shadow: 0 0 25px rgba(213, 63, 140, 0.4); }

    .gallery-grid-item { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .file-input-label { border: 1px dashed #333; padding: 15px; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; background: #130d16; color: #aaa; transition: all 0.3s; font-size: 0.8rem; }
    .file-input-label:hover { border-color: #d53f8c; color: #fff; background: #150f18; }

    .day-badge { padding: 10px 15px; border: 1px solid #222; background: #130d16; color: #666; cursor: pointer; font-size: 0.8rem; text-align: center; transition: all 0.2s; font-weight: 600; }
    .day-badge.active { background: rgba(213, 63, 140, 0.15); border-color: #d53f8c; color: #fff; }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #0d0a12; }
    ::-webkit-scrollbar-thumb { background: #222; }
    ::-webkit-scrollbar-thumb:hover { background: #d53f8c; }
  `}</style>
);

const ContactMap = () => {
  // 📍 აქ ჩაწერე სალონის ზუსტი მისამართი
  const address = "თბილისი, პეტრე ქავთარაძის 51"; 
  // გუგლის რუკის ოფიციალური და უცდომელი ემბედ ლინკი:
// გუგლის რუკის ოფიციალური ემბედ ლინკი
const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px 20px', backgroundColor: '#0d0a12' }}>
      
      {/* სათაური პრემიუმ სტილში */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '35px' }}>
        <span style={{ color: '#d53f8c', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: '700' }}>მოგვაგენით</span>
        <h2 style={{ fontSize: '2rem', fontWeight: '300', margin: '10px 0 0 0', letterSpacing: '1px', color: '#fff' }}>კონტაქტი & ლოკაცია</h2>
        <div style={{ width: '60px', height: '1px', backgroundColor: '#d53f8c', marginTop: '15px' }} />
      </div>

      {/* ძირითადი ბლოკი - მობილურზე ავტომატურად ჩამოდის დაბლა */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* საინფორმაციო ბარათი */}
        <div className="glow-box" style={{ backgroundColor: '#120d16', padding: '30px', borderRadius: '8px', border: '1px solid rgba(213,63,140,0.2)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#d53f8c', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>📍 მისამართი</h4>
              <p style={{ margin: 0, color: '#fff', fontSize: '1rem', fontWeight: '300' }}>{address}</p>
            </div>
            
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#d53f8c', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>📞 ტელეფონი</h4>
              <p style={{ margin: 0, color: '#fff', fontSize: '1rem', fontWeight: '300' }}>+995 555 26 56 46</p>
            </div>

            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#d53f8c', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>⏰ სამუშაო საათები</h4>
              <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem', fontWeight: '300' }}>
                ორშაბათი - კვირა: 10:00 - 20:00
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps ინტერაქტიული რუკა */}
        <div className="glow-box" style={{ height: '400px', backgroundColor: '#120d16', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(213,63,140,0.2)' }}>
          <iframe
            title="სალონის რუკა"
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' 
            }}
            loading="lazy"
            allowFullScreen
            src={embedUrl}
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [adminTab, setAdminTab] = useState('bookings'); 
  
  const [userSession, setUserSession] = useState(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [dbMasters, setDbMasters] = useState([]);
  const [dbGallery, setDbGallery] = useState([]);
  const [dbBookings, setDbBookings] = useState([]);
  
  const [bookingFilterMaster, setBookingFilterMaster] = useState('all');

  const weekDaysConfig = [
    { id: 1, name: 'ორშ' },
    { id: 2, name: 'სამშ' },
    { id: 3, name: 'ოთხშ' },
    { id: 4, name: 'ხუთშ' },
    { id: 5, name: 'პარ' },
    { id: 6, name: 'შაბ' },
    { id: 0, name: 'კვირა' }
  ];

  const [activeGalleryMasters, setActiveGalleryMasters] = useState({
    'სტილისტი': null,
    'კოსმეტოლოგი': null,
    'მანიკური': null
  });

  const [selectedTimeMasterId, setSelectedTimeMasterId] = useState('');
  const [booking, setBooking] = useState({ name: '', phone: '', service: 'სტილისტი', master: null, date: null, time: null });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formValidationError, setFormValidationError] = useState(''); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [showCancelModal, setShowCancelModal] = useState(false);
const [cancelPhone, setCancelPhone] = useState('');
const [cancelReason, setCancelReason] = useState('');
const [cancelBookings, setCancelBookings] = useState([]);
const [cancelStep, setCancelStep] = useState(1);
const [cancelSuccess, setCancelSuccess] = useState(false);

// ამოწერის ლოგიკა
const [otpCode, setOtpCode] = useState('');
const [otpInput, setOtpInput] = useState('');
const [otpTarget, setOtpTarget] = useState('');
const [showOtpModal, setShowOtpModal] = useState(false);
const [pendingCancelBooking, setPendingCancelBooking] = useState(null);

  const [showMasterModal, setShowMasterModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);

  // ადმინ ფორმების სტეიტები
  const [newMaster, setNewMaster] = useState({ name: '', role: '', service: 'სტილისტი', exp: '', skills: '', phone: '' });
  const [masterFile, setMasterFile] = useState(null);
  const [galleryFile, setGalleryFile] = useState(null);
  const [selectedGalleryMasterId, setSelectedGalleryMasterId] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('');
  
  const [masterUploading, setMasterUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });

    if (window.location.hash === '#admin') setCurrentPage('admin');

    fetchData();
    generateDays();

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (dbMasters.length > 0) {
      const initial = { ...activeGalleryMasters };
      ['სტილისტი', 'კოსმეტოლოგი', 'მანიკური'].forEach(srv => {
        const firstMaster = dbMasters.find(m => m.service === srv);
        if (firstMaster && !initial[srv]) {
          initial[srv] = firstMaster.id;
        }
      });
      setActiveGalleryMasters(initial);
      
      if (!selectedTimeMasterId && dbMasters.length > 0) {
        setSelectedTimeMasterId(dbMasters[0].id);
      }
    }
  }, [dbMasters]);

  const fetchData = async () => {
    const { data: masters } = await supabase.from('masters').select('*').order('id', { ascending: false });
    const { data: gallery } = await supabase.from('gallery').select('*').order('id', { ascending: false });
    const { data: bookings } = await supabase.from('bookings').select('*').order('id', { ascending: false });
    
    if (masters) setDbMasters(masters);
    if (gallery) setDbGallery(gallery);
    if (bookings) setDbBookings(bookings);
  };

  const generateDays = () => {
    const days = [];
    const today = new Date();
    const dayNames = ['კვირა', 'ორშ', 'სამშ', 'ოთხშ', 'ხუთშ', 'პარ', 'შაბ'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({ 
        dayName: dayNames[d.getDay()], 
        dayNum: d.getDate(), 
        fullDate: d.toLocaleDateString('en-CA'),
        dayIndex: d.getDay() 
      });
    }
    setAvailableDays(days);
  };

  // --- განახლებული ფუნქცია SMS-ების გასაგზავნად Supabase RPC-ის საშუალებით ---
  const triggerSmsNotification = async (toMobile, textContent) => {
  try {
    const cleanNumber = toMobile.replace(/\D/g, '');
    const formattedNumber = cleanNumber.startsWith('995') ? cleanNumber : `995${cleanNumber}`;

    

    const { data, error } = await supabase.functions.invoke('send-sms', {
      body: { phone: formattedNumber, message: textContent }
    });

    if (error) throw error;
    console.log(":", data);

  } catch (err) {
    console.error("", err);
  }
};

  const handleInitialFormSubmit = (e) => {
    e.preventDefault();
    setFormValidationError('');

    const lastBookingTimestamp = localStorage.getItem('natalier_last_booking_time');
    if (lastBookingTimestamp) {
      const timePassed = Date.now() - parseInt(lastBookingTimestamp);
      if (timePassed < 30000) {
        const secondsLeft = Math.ceil((30000 - timePassed) / 1000);
        setFormValidationError(`სპამისგან დაცვა: გთხოვთ დაელოდოთ კიდევ ${secondsLeft} წამი.`);
        return;
      }
    }

    const digitsOnlyRegex = /^\d{9}$/;
    if (!digitsOnlyRegex.test(booking.phone)) {
      setFormValidationError('არასწორი ნომერი! შეიყვანეთ ზუსტად 9 ციფრი (მაგ: 599123456).');
      return;
    }

    if (!booking.master) {
      setShowMasterModal(true); // გასწორდა: ქართული ასო "ს" წაიშალა აქედან
    } else {
      setShowCalendarModal(true);
    }
  };

  const handleServiceChange = (e) => {
    setBooking({ ...booking, service: e.target.value, master: null });
    setFormValidationError('');
  };

  // --- ჯავშნის დასრულება ---
// --- ჯავშნის დასრულება ---
const finalizeBooking = async () => {
  const { error } = await supabase.from('bookings').insert([{
    name: booking.name,
    phone: booking.phone,
    service: booking.service,
    master_name: booking.master ? booking.master.name : 'ნებისმიერი',
    date: booking.date,
    time: booking.time
  }]);

  if (!error) {
    localStorage.setItem('natalier_last_booking_time', Date.now().toString());
    const clientMessage = `სალამი ${booking.name}! თქვენი ჯავშანი სალონ ნატალიერში დადასტურებულია ✨\n\n🔹 სერვისი: ${booking.service}\n🔹 სპეციალისტი: ${booking.master ? booking.master.name : 'ნებისმიერი'}\n📅 თარიღი: ${booking.date}\n⏰ დრო: ${booking.time}\n\nგელით, სასიამოვნო დღეს გისურვებთ!`;
    triggerSmsNotification(booking.phone, clientMessage);
    if (booking.master && booking.master.phone) {
      const masterMessage = `ნატალიერ: ახალი ჯავშანი! 📅 ${booking.date} - ${booking.time}.\nკლიენტი: ${booking.name} (${booking.phone}).\nსერვისი: ${booking.service}`;
      triggerSmsNotification(booking.master.phone, masterMessage);
    }
    setShowCalendarModal(false);
    setBookingSuccess(true);
    fetchData();
    setTimeout(() => {
      setBookingSuccess(false);
      setBooking({ name: '', phone: '', service: 'სტილისტი', master: null, date: null, time: null });
    }, 4000);
  }
};

// --- OTP გაგზავნა ---
const sendOtp = async (phone, target) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  setOtpCode(code);
  setOtpTarget(target);
  setShowOtpModal(true);
  setOtpInput('');
  const clean = phone.replace(/\D/g, '');
  const formatted = clean.startsWith('995') ? clean : `995${clean}`;
  await triggerSmsNotification(formatted, `ნატალიერი: თქვენი დადასტურების კოდია ${code} 🔐`);
};

// --- OTP შემოწმება ---
const verifyOtp = async () => {
  if (otpInput !== otpCode) {
    alert('კოდი არასწორია! სცადეთ თავიდან.');
    return;
  }
  setShowOtpModal(false);
  setOtpInput('');
  setOtpCode('');
  if (otpTarget === 'booking') {
    await finalizeBooking();
  } else if (otpTarget === 'cancel') {
    await handleCancelBooking(pendingCancelBooking);
  }
};

  const findBookingsByPhone = () => {
  const cleanPhone = cancelPhone.replace(/\D/g, '');
  const found = dbBookings.filter(b => b.phone.replace(/\D/g, '') === cleanPhone);
  setCancelBookings(found);
  if (found.length === 0) alert('ამ ნომრით ჩანიშვნა ვერ მოიძებნა!');
  else setCancelStep(2);
};

const handleCancelBooking = async (b) => {
  const { error } = await supabase.from('bookings').delete().eq('id', b.id);
  if (!error) {
    triggerSmsNotification(b.phone, `სალამი ${b.name}! თქვენ ამოეწერეთ ${b.date} ${b.time}-ზე ჩანიშნული ვიზიტიდან სალონ ნატალიერში. სასიამოვნო დღეს გისურვებთ! ✨`);
    const master = dbMasters.find(m => m.name === b.master_name);
    if (master?.phone) {
      triggerSmsNotification(master.phone, `ნატალიერი: ${b.name} (${b.phone}) ამოეწერა ${b.date} ${b.time}-ზე ჩანიშნული ვიზიტიდან.${cancelReason ? ` მიზეზი: ${cancelReason}` : ''}`);
    }
    fetchData();
    setCancelSuccess(true);
    setTimeout(() => {
      setShowCancelModal(false);
      setCancelSuccess(false);
      setCancelPhone('');
      setCancelReason('');
      setCancelBookings([]);
      setCancelStep(1);
    }, 3000);
  }
};

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email: adminEmail, password: adminPassword });
    if (error) setLoginError('არასწორი ელ-ფოსტა ან პაროლი!');
    else { setAdminEmail(''); setAdminPassword(''); }
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setCurrentPage('home');
  };

  const uploadToStorage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('salon-images')
      .upload(fileName, file);

    if (uploadError) {
      alert('ფაილის ატვირთვა ვერ მოხერხდა: ' + uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from('salon-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const addMaster = async (e) => {
    e.preventDefault();
    if (!masterFile) {
      alert('გთხოვთ აირჩიოთ სპეციალისტის ფოტო!');
      return;
    }

    setMasterUploading(true);
    const photoUrl = await uploadToStorage(masterFile);
    
    if (photoUrl) {
      const skillsArray = newMaster.skills.split(',').map(s => s.trim());
      const defaultSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];
      const defaultWorkingDays = [0, 1, 2, 3, 4, 5, 6]; 
      
      const { error } = await supabase.from('masters').insert([{ 
        ...newMaster, 
        skills: skillsArray, 
        time_slots: defaultSlots,
        working_days: defaultWorkingDays,
        photo: photoUrl
      }]);

      if (!error) {
        setNewMaster({ name: '', role: '', service: 'სტილისტი', exp: '', skills: '', phone: '' });
        setMasterFile(null);
        fetchData();
      }
    }
    setMasterUploading(false);
  };

  const deleteMaster = async (id) => {
    await supabase.from('masters').delete().eq('id', id);
    fetchData();
  };

  const addGalleryImage = async (e) => {
    e.preventDefault();
    if (!galleryFile || !selectedGalleryMasterId) {
      alert('გთხოვთ შეავსოთ ყველა ველი და აირჩიოთ ფაილი!');
      return;
    }

    setGalleryUploading(true);
    const uploadedImageUrl = await uploadToStorage(galleryFile);

    if (uploadedImageUrl) {
      const { error } = await supabase.from('gallery').insert([{ 
        image_url: uploadedImageUrl, 
        master_id: parseInt(selectedGalleryMasterId) 
      }]);

      if (!error) {
        setGalleryFile(null);
        setSelectedGalleryMasterId('');
        fetchData();
      }
    }
    setGalleryUploading(false);
  };

  const deleteGalleryImage = async (id) => {
    await supabase.from('gallery').delete().eq('id', id);
    fetchData();
  };

  const activeTimeMaster = dbMasters.find(m => m.id === parseInt(selectedTimeMasterId));

  const addTimeSlotToMaster = async () => {
    if (!newTimeSlot || !activeTimeMaster) return;
    const updatedSlots = [...(activeTimeMaster.time_slots || []), newTimeSlot].sort();
    const { error } = await supabase.from('masters').update({ time_slots: updatedSlots }).eq('id', activeTimeMaster.id);
    if (!error) {
      setNewTimeSlot('');
      fetchData();
    }
  };

  const deleteTimeSlotFromMaster = async (slotToDelete) => {
    if (!activeTimeMaster) return;
    const updatedSlots = activeTimeMaster.time_slots.filter(s => s !== slotToDelete);
    await supabase.from('masters').update({ time_slots: updatedSlots }).eq('id', activeTimeMaster.id);
    fetchData();
  };

  const toggleWorkingDay = async (dayId) => {
    if (!activeTimeMaster) return;
    const currentDays = activeTimeMaster.working_days || [0, 1, 2, 3, 4, 5, 6];
    let updatedDays;
    
    if (currentDays.includes(dayId)) {
      updatedDays = currentDays.filter(d => d !== dayId);
    } else {
      updatedDays = [...currentDays, dayId].sort();
    }

    const { error } = await supabase.from('masters').update({ working_days: updatedDays }).eq('id', activeTimeMaster.id);
    if (!error) {
      fetchData();
    }
  };

  const filteredBookings = bookingFilterMaster === 'all' 
    ? dbBookings 
    : dbBookings.filter(b => b.master_name === bookingFilterMaster);

  const filteredMasters = dbMasters.filter(m => m.service === booking.service);
  const theme = { bg: '#0d0a12', text: '#ffffff', accent: '#d53f8c', border: '#1a1020' };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: theme.bg, color: theme.text }}>
      <GlobalStyle />
      
      {/* --- HEADER --- */}
      <nav style={{ height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 80px', borderBottom: `1px solid ${theme.border}`, backgroundColor: '#FFF5F8', zIndex: 100 }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', letterSpacing: '3px', textTransform: 'uppercase' }}>
          <span style={{ color: theme.accent, textShadow: '0 0 10px rgba(213,63,140,0.5)' }}>NATALIER</span> <span style={{ color: theme.accent, textShadow: '0 0 10px rgba(213,63,140,0.5)' }}>BEAUTY</span>
        </h1>
        <div style={{ display: 'flex', gap: '50px' }}>
          {[
            { id: 'home', label: 'მთავარი' },
            { id: 'gallery', label: 'გალერეა' },
            { id: 'about', label: 'ჩვენს შესახებ' }
          ].map(page => (
            <button key={page.id} onClick={() => { setCurrentPage(page.id); window.location.hash = ''; }} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: currentPage === page.id ? '600' : '400',
              color: currentPage === page.id ? theme.accent : '#000000', textTransform: 'uppercase', letterSpacing: '2px',
              borderBottom: currentPage === page.id ? `2px solid ${theme.accent}` : '2px solid transparent', paddingBottom: '8px', transition: 'all 0.3s'
            }}>
              {page.label}
            </button>
          ))}
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        
        {/* გვერდი 1: მთავარი */}
        {currentPage === 'home' && (
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ width: '55%', height: '100%', position: 'relative' }}>
              {slideshowImages.map((img, index) => (
                <div key={index} style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: index === currentImageIndex ? 0.45 : 0, transition: 'opacity 2s ease-in-out'
                }} />
              ))}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, transparent, #0d0a12)' }} />
              <div style={{ position: 'absolute', bottom: '10%', left: '10%', maxWidth: '70%' }}>
                <span style={{ color: theme.accent, textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.85rem', fontWeight: '700' }}>Haute Couture Salon</span>
                <h1 style={{ fontSize: '3.2rem', fontWeight: '300', letterSpacing: '1px', margin: '15px 0', lineHeight: '1.2' }}>აღმოაჩინე ესთეტიკის ახალი განზომილება</h1>
                <div style={{ width: '60px', height: '1px', backgroundColor: theme.accent }} />
              </div>
            </div>

            <div style={{ width: '45%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', backgroundColor: '#0e0b14', borderLeft: `1px solid ${theme.border}` }}>
              <div className="glow-box" style={{ width: '100%', maxWidth: '440px', backgroundColor: '#120d16', padding: '45px 40px', borderRadius: '0px' }}>
                <h3 style={{ margin: '0 0 35px 0', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  <CalendarDays size={20} color={theme.accent} /> ონლაინ რეზერვაცია
                </h3>
                
                {bookingSuccess ? (
                  <div style={{ color: theme.accent, padding: '40px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <CheckCircle2 size={45} />
                    <span style={{ fontSize: '1.1rem', fontWeight: '300' }}>ჯავშანი წარმატებით დარეგისტრირდა</span>
                  </div>
                ) : (
                  <form onSubmit={handleInitialFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input type="text" placeholder="თქვენი სახელი" required value={booking.name} onChange={e => setBooking({ ...booking, name: e.target.value })} style={{ padding: '16px', fontSize: '0.9rem' }} />
                    <input type="tel" placeholder="ტელეფონის ნომერი (მაგ: 599123456)" required value={booking.phone} onChange={e => { setBooking({ ...booking, phone: e.target.value }); setFormValidationError(''); }} style={{ padding: '16px', fontSize: '0.9rem' }} />
                    
                    <div style={{ position: 'relative' }}>
                      <select value={booking.service} onChange={handleServiceChange} style={{ width: '100%', padding: '16px', fontSize: '0.9rem', appearance: 'none', cursor: 'pointer' }}>
                        <option value="სტილისტი">სტილისტი</option>
                        <option value="კოსმეტოლოგი">კოსმეტოლოგი</option>
                        <option value="მანიკური">მანიკური & პედიკური</option>
                      </select>
                      <ChevronRight size={18} color={theme.accent} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%) rotate(90deg)' }} />
                    </div>

                    {booking.master && (
                      <div onClick={() => setShowMasterModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 15px', border: `1px solid rgba(213,63,140,0.3)`, backgroundColor: '#111', cursor: 'pointer' }}>
                        <img src={booking.master.photo} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', border: `1px solid ${theme.accent}` }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{booking.master.name}</div>
                          <div style={{ fontSize: '0.75rem', color: theme.accent }}>{booking.master.role}</div>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>შეცვლა</span>
                      </div>
                    )}

                    {formValidationError && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.8rem', fontWeight: '500', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '10px 12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <AlertCircle size={15} style={{ flexShrink: 0 }} />
                        <span>{formValidationError}</span>
                      </div>
                    )}

                    <button type="submit" style={{ backgroundColor: booking.master ? '#fff' : theme.accent, color: booking.master ? '#000' : '#fff', border: 'none', padding: '18px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      {booking.master ? 'დროის შერჩევა' : 'აირჩიეთ სპეციალისტი'}
                    </button>
                    <button
  onClick={() => setShowCancelModal(true)}
  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline', marginTop: '10px' }}
>
  ჩანიშვნის გაუქმება
</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* გვერდი 2: გალერეა */}
        {currentPage === 'gallery' && (
          <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '60px 80px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px' }}>
              <span style={{ color: theme.accent, letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Luxury Showcase</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '300', margin: '10px 0' }}>პორტფოლიო სექციების მიხედვით</h2>
              <div style={{ width: '50px', height: '1px', backgroundColor: theme.accent }} />
            </div>

            {['სტილისტი', 'კოსმეტოლოგი', 'მანიკური'].map((serviceCategory) => {
              const categoryMasters = dbMasters.filter(m => m.service === serviceCategory);
              const currentActiveMasterId = activeGalleryMasters[serviceCategory];
              const activeMasterObj = categoryMasters.find(m => m.id === currentActiveMasterId);
              const masterPhotos = dbGallery.filter(img => img.master_id === currentActiveMasterId);

              return (
                <div key={serviceCategory} style={{ marginBottom: '80px', borderBottom: '1px solid #111', paddingBottom: '50px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', backgroundColor: '#0d0a12', padding: '25px 40px', border: '1px solid #141414' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '300', letterSpacing: '2px', textTransform: 'uppercase', color: '#fff' }}>
                        {serviceCategory === 'მანიკური' ? 'მანიკური & პედიკური' : serviceCategory}
                      </h3>
                      {activeMasterObj && (
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: theme.accent, fontWeight: '500' }}>
                          ნამუშევრები: {activeMasterObj.name} ({activeMasterObj.role})
                        </p>
                      )}
                    </div>

                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '80px', width: `${100 + (categoryMasters.length * 40)}px` }}>
                      {categoryMasters.map((m, index) => {
                        const isActive = currentActiveMasterId === m.id;
                        return (
                          <div
                            key={m.id}
                            className={`overlap-avatar ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveGalleryMasters({ ...activeGalleryMasters, [serviceCategory]: m.id })}
                            style={{
                              position: 'absolute', left: `${index * 35}px`, zIndex: isActive ? 50 : index, cursor: 'pointer',
                              width: '65px', height: '65px', borderRadius: '50%', border: isActive ? '2px solid #d53f8c' : '2px solid #222',
                              overflow: 'hidden', boxShadow: '-10px 0 15px rgba(0,0,0,0.5)', transform: isActive ? 'scale(1.15)' : 'scale(1)'
                            }}
                            title={m.name}
                          >
                            <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {masterPhotos.length > 0 ? masterPhotos.map((img) => (
                      <div key={img.id} className="gallery-grid-item" style={{ position: 'relative', overflow: 'hidden', height: '320px', border: '1px solid #160f19', backgroundColor: '#120d16' }}>
                        <img src={img.image_url} alt="Master work" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                      </div>
                    )) : (
                      <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#444', padding: '40px', fontSize: '0.9rem', border: '1px dashed #111' }}>
                        ამ სპეციალისტის ფოტოები ჯერ არ არის ატვირთული.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- MAIN CONTENT --- */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        
        {/* გვერდი 1: მთავარი */}
        {currentPage === 'home' && (
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
             {/* ...შენი ძველი კოდი... */}
          </div>
        )}

        {/* გვერდი 2: გალერეა */}
        {currentPage === 'gallery' && (
          <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '60px 80px' }}>
             {/* ...შენი ძველი კოდი... */}
          </div>
        )}

        

      </div>


        {/* გვერდი 3: ჩვენს შესახებ */}
        {currentPage === 'about' && (
          <ContactMap />
        )}

        {/* გვერდი 4: ადმინ პანელი */}
        {currentPage === 'admin' && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#FFF5F8' }}>
            
            {!userSession ? (
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <div className="glow-box" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#120d16', padding: '45px 40px', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', padding: '15px', backgroundColor: 'rgba(213,63,140,0.05)', border: `1px solid ${theme.accent}`, marginBottom: '25px', color: theme.accent }}>
                    <Lock size={26} />
                  </div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>მართვის ცენტრი</h2>
                  
                  <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Mail size={16} color="#444" style={{ position: 'absolute', left: '15px' }} />
                      <input type="email" placeholder="ელ-ფოსტა" required value={adminEmail} onChange={e => setAdminEmail(e.target.value)} style={{ width: '100%', padding: '14px 14px 14px 45px', fontSize: '0.9rem' }} />
                    </div>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Lock size={16} color="#444" style={{ position: 'absolute', left: '15px' }} />
                      <input type="password" placeholder="პაროლი" required value={adminPassword} onChange={e => setAdminPassword(e.target.value)} style={{ width: '100%', padding: '14px 14px 14px 45px', fontSize: '0.9rem' }} />
                    </div>
                    {loginError && <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600' }}>{loginError}</div>}
                    <button type="submit" style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '15px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>ავტორიზაცია</button>
                  </form>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1020', backgroundColor: '#120d16', padding: '0 40px' }}>
                  <div style={{ display: 'flex' }}>
                    <button className={`admin-tab ${adminTab === 'bookings' ? 'active' : ''}`} onClick={() => setAdminTab('bookings')}><LayoutDashboard size={14} style={{marginRight:8}}/> ჯავშნები</button>
                    <button className={`admin-tab ${adminTab === 'masters' ? 'active' : ''}`} onClick={() => setAdminTab('masters')}><Users size={14} style={{marginRight:8}}/> სპეციალისტები</button>
                    <button className={`admin-tab ${adminTab === 'gallery' ? 'active' : ''}`} onClick={() => setAdminTab('gallery')}><ImageIcon size={14} style={{marginRight:8}}/> გალერეა</button>
                    <button className={`admin-tab ${adminTab === 'config' ? 'active' : ''}`} onClick={() => setAdminTab('config')}><Calendar size={14} style={{marginRight:8}}/> განრიგის & საათების მართვა</button>
                  </div>
                  <button onClick={handleAdminLogout} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', textTransform: 'uppercase', padding: '15px' }} onMouseEnter={e => e.currentTarget.style.color='#ef4444'} onMouseLeave={e => e.currentTarget.style.color='#666'}>
                    <LogOut size={14} /> გამოსვლა
                  </button>
                </div>

                <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                  
                  {/* TAB 1: ჯავშნები */}
                  {adminTab === 'bookings' && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '400', margin: 0 }}>შემოსული რეზერვაციები</h2>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#120d16', padding: '6px 15px', border: '1px solid #1a1020' }}>
                          <Filter size={14} color={theme.accent} />
                          <select 
                            value={bookingFilterMaster} 
                            onChange={e => setBookingFilterMaster(e.target.value)} 
                            style={{ padding: '8px 30px 8px 10px', border: 'none !important', backgroundColor: 'transparent !important', fontSize: '0.85rem', cursor: 'pointer' }}
                          >
                            <option value="all">ყველა სპეციალისტი</option>
                            {dbMasters.map(m => (
                              <option key={m.id} value={m.name}>{m.name} ({m.service})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #222', color: '#666', fontSize: '0.85rem' }}>
                            <th style={{ padding: '15px' }}>კლიენტი</th>
                            <th style={{ padding: '15px' }}>ტელეფონი</th>
                            <th style={{ padding: '15px' }}>სერვისი</th>
                            <th style={{ padding: '15px' }}>სპეციალისტი</th>
                            <th style={{ padding: '15px' }}>თარიღი / დრო</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.length > 0 ? filteredBookings.map(b => (
                            <tr key={b.id} style={{ borderBottom: '1px solid #111', fontSize: '0.9rem' }}>
                              <td style={{ padding: '15px', fontWeight: '600' }}>{b.name}</td>
                              <td style={{ padding: '15px', color: '#aaa' }}>{b.phone}</td>
                              <td style={{ padding: '15px' }}><span style={{ color: theme.accent }}>{b.service}</span></td>
                              <td style={{ padding: '15px', color: '#fff', fontWeight: '500' }}>{b.master_name}</td>
                              <td style={{ padding: '15px' }}><b>{b.date}</b> | {b.time}</td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#444', fontSize: '0.9rem' }}>ჩანაწერები ვერ მოიძებნა.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TAB 2: სპეციალისტები */}
                  {adminTab === 'masters' && (
                    <div style={{ display: 'flex', gap: '40px' }}>
                      <form onSubmit={addMaster} style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#120d16', padding: '25px', border: '1px solid #1a1020' }}>
                        <h3 style={{ fontSize: '1rem', margin: '0 0 10px 0', textTransform: 'uppercase', color: theme.accent }}>ახალი სპეციალისტი</h3>
                        <input type="text" placeholder="სახელი გვარი" required value={newMaster.name} onChange={e => setNewMaster({...newMaster, name: e.target.value})} style={{ padding: '12px' }} />
                        <input type="text" placeholder="პოზიცია" required value={newMaster.role} onChange={e => setNewMaster({...newMaster, role: e.target.value})} style={{ padding: '12px' }} />
                        
                        <input type="tel" placeholder="სპეციალისტის ტელეფონი (SMS-ისთვის)" required value={newMaster.phone} onChange={e => setNewMaster({...newMaster, phone: e.target.value})} style={{ padding: '12px' }} />
                        
                        <select value={newMaster.service} onChange={e => setNewMaster({...newMaster, service: e.target.value})} style={{ padding: '12px' }}>
                          <option value="სტილისტი">სტილისტი</option>
                          <option value="კოსმეტოლოგი">კოსმეტოლოგი</option>
                          <option value="მანიკური">მანიკური</option>
                        </select>
                        <input type="text" placeholder="გამოცდილება" required value={newMaster.exp} onChange={e => setNewMaster({...newMaster, exp: e.target.value})} style={{ padding: '12px' }} />
                        <input type="text" placeholder="უნარები (მძიმით)" required value={newMaster.skills} onChange={e => setNewMaster({...newMaster, skills: e.target.value})} style={{ padding: '12px' }} />
                        
                        <label className="file-input-label">
                          <Upload size={18} color={masterFile ? theme.accent : '#666'} />
                          <span>{masterFile ? masterFile.name : 'აირჩიეთ ფოტო კომპიდან'}</span>
                          <input type="file" accept="image/*" required style={{ display: 'none' }} onChange={e => setMasterFile(e.target.files[0])} />
                        </label>

                        <button type="submit" disabled={masterUploading} style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '14px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          {masterUploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                          {masterUploading ? 'იტვირთება...' : 'დამატება'}
                        </button>
                      </form>

                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '400', marginBottom: '20px' }}>არსებული სპეციალისტები</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                          {dbMasters.map(m => (
                            <div key={m.id} style={{ backgroundColor: '#120d16', border: '1px solid #1a1020', padding: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                              <img src={m.photo} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{m.name}</div>
                                <div style={{ fontSize: '0.75rem', color: theme.accent }}>{m.role} ({m.service})</div>
                                {m.phone && <div style={{ fontSize: '0.7rem', color: '#666', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}><Phone size={10}/> {m.phone}</div>}
                              </div>
                              <button onClick={() => deleteMaster(m.id)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color='#ef4444'} onMouseLeave={e => e.currentTarget.style.color='#444'}><Trash2 size={16} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: გალერეა */}
                  {adminTab === 'gallery' && (
                    <div>
                      <form onSubmit={addGalleryImage} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px', maxWidth: '500px', backgroundColor: '#FFF5F8', padding: '25px', border: '1px solid #1a1020' }}>
                        <h3 style={{ fontSize: '1rem', margin: '0', textTransform: 'uppercase', color: theme.accent }}>ნამუშევრის დამატება</h3>
                        
                        <select required value={selectedGalleryMasterId} onChange={e => setSelectedGalleryMasterId(e.target.value)} style={{ width: '100%', padding: '14px' }}>
                          <option value="">მიაბით კონკრეტულ ოსტატს</option>
                          {dbMasters.map(m => (
                            <option key={m.id} value={m.id}>{m.name} ({m.service})</option>
                          ))}
                        </select>

                        <label className="file-input-label">
                          <Upload size={18} color={galleryFile ? theme.accent : '#666'} />
                          <span>{galleryFile ? galleryFile.name : 'აირჩიეთ ნამუშევრის ფოტო'}</span>
                          <input type="file" accept="image/*" required style={{ display: 'none' }} onChange={e => setGalleryFile(e.target.files[0])} />
                        </label>

                        <button type="submit" disabled={galleryUploading} style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '15px', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                          {galleryUploading ? <Loader2 size={16} className="animate-spin" /> : null}
                          {galleryUploading ? 'მიმდინარეობს ატვირთვა...' : 'გალერეაში დამატება'}
                        </button>
                      </form>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
                        {dbGallery.map(img => {
                          const ownerMaster = dbMasters.find(m => m.id === img.master_id);
                          return (
                            <div key={img.id} style={{ position: 'relative', height: '180px', border: '1px solid #1a1020' }}>
                              <img src={img.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.75)', padding: '5px', fontSize: '0.7rem', color: theme.accent, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {ownerMaster ? ownerMaster.name : 'უცნობი'}
                              </div>
                              <button onClick={() => deleteGalleryImage(img.id)} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', padding: '6px', cursor: 'pointer' }}><Trash2 size={14}/></button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: განრიგის & საათების მართვა */}
                  {adminTab === 'config' && (
                    <div style={{ display: 'flex', gap: '40px' }}>
                      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#666', letterSpacing: '1px', marginBottom: '10px' }}>აირჩიეთ სპეციალისტი</h3>
                        {dbMasters.map(m => (
                          <div 
                            key={m.id} 
                            onClick={() => setSelectedTimeMasterId(m.id)}
                            style={{ 
                              padding: '15px', backgroundColor: selectedTimeMasterId === m.id ? 'rgba(213,63,140,0.08)' : '#120d16',
                              border: selectedTimeMasterId === m.id ? `1px solid ${theme.accent}` : '1px solid #1a1020',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s'
                            }}
                          >
                            <img src={m.photo} alt="" style={{ width: '45px', height: '45px', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: selectedTimeMasterId === m.id ? theme.accent : '#fff' }}>{m.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#666' }}>{m.service}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ flex: 1, backgroundColor: '#120d16', border: '1px solid #1a1020', padding: '30px' }}>
                        {activeTimeMaster ? (
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', borderBottom: '1px solid #1a1020', paddingBottom: '20px' }}>
                              <img src={activeTimeMaster.photo} alt="" style={{ width: '55px', height: '55px', objectFit: 'cover', border: `1px solid ${theme.accent}` }} />
                              <div>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '400' }}><span style={{ color: theme.accent }}>{activeTimeMaster.name}</span>-ის განრიგი</h3>
                                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#555' }}>სამუშაო დღეებისა და საათების ინდივიდუალური მართვა</p>
                              </div>
                            </div>

                            <div style={{ marginBottom: '35px' }}>
                              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#aaa', letterSpacing: '1px', marginBottom: '15px' }}>სამუშაო დღეები (მონიშნეთ როდის მუშაობს):</h4>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {weekDaysConfig.map(day => {
                                  const currentWorkingDays = activeTimeMaster.working_days || [0,1,2,3,4,5,6];
                                  const isActive = currentWorkingDays.includes(day.id);
                                  return (
                                    <div 
                                      key={day.id} 
                                      className={`day-badge ${isActive ? 'active' : ''}`}
                                      onClick={() => toggleWorkingDay(day.id)}
                                    >
                                      {day.name} {isActive ? '✓' : '✕'}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div style={{ width: '100%', height: '1px', backgroundColor: '#1a1020', marginBottom: '30px' }} />

                            <div>
                              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#aaa', letterSpacing: '1px', marginBottom: '15px' }}>თავისუფალი საათების დამატება:</h4>
                              <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', maxWidth: '400px' }}>
                                <input type="text" placeholder="მაგ: 12:45" value={newTimeSlot} onChange={e => setNewTimeSlot(e.target.value)} style={{ padding: '12px', flex: 1, textAlign: 'center', fontSize: '0.9rem', letterSpacing: '1px' }} />
                                <button onClick={addTimeSlotToMaster} style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '0 25px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>დამატება</button>
                              </div>

                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {activeTimeMaster.time_slots && activeTimeMaster.time_slots.length > 0 ? (
                                  activeTimeMaster.time_slots.map(ts => (
                                    <div key={ts} style={{ backgroundColor: '#150f18', border: '1px solid #222', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                      <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{ts}</span>
                                      <X size={14} color="#555" style={{ cursor: 'pointer' }} onClick={() => deleteTimeSlotFromMaster(ts)} />
                                    </div>
                                  ))
                                ) : (
                                  <div style={{ color: '#444', fontSize: '0.85rem' }}>ამ სპეციალისტს საათები არ აქვს. </div>
                                )}
                              </div>
                            </div>

                          </div>
                        ) : (
                          <div style={{ color: '#444', textAlign: 'center', padding: '40px' }}>გთხოვთ, აირჩიოთ სპეციალისტი მარცხენა სიიდან.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- FOOTER --- */}
      {currentPage !== 'admin' && (
        <footer style={{ height: '50px', borderTop: `1px solid ${theme.border}`, backgroundColor: '#FFF5F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 80px', fontSize: '0.7rem', color: '#444', letterSpacing: '1px' }}>
          <div>© {new Date().getFullYear()} NATALIER BEAUTY.</div>
          <button onClick={() => setCurrentPage('admin')} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '2px' }}>
            Staff Portal
          </button>
        </footer>
      )}

      {/* MODAL 1: ოსტატის შერჩევა */}
      {showMasterModal && (
        <div onClick={() => setShowMasterModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#0d0a12', border: `1px solid rgba(213,63,140,0.4)`, width: '100%', maxWidth: '820px', padding: '45px', position: 'relative' }}>
            <button onClick={() => setShowMasterModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={22} /></button>
            <h2 style={{ fontSize: '1.4rem', textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>ექსპერტების შერჩევა</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '35px', fontSize: '0.85rem' }}>მიმდინარე სერვისი: <span style={{color: theme.accent, fontWeight: '600'}}>{booking.service}</span></p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {filteredMasters.map(master => (
                <div key={master.id} className="master-card" onClick={() => { setBooking({...booking, master}); setShowMasterModal(false); setShowCalendarModal(true); }} style={{ flex: '1 1 340px', maxWidth: '370px', padding: '20px', display: 'flex', gap: '20px', alignItems: 'center', cursor: 'pointer' }}>
                  <img src={master.photo} alt="" style={{ width: '95px', height: '95px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.05rem', margin: '0' }}>{master.name}</h3>
                    <div style={{ color: theme.accent, fontSize: '0.75rem', fontWeight: '700', margin: '4px 0 12px 0' }}>{master.role}</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {master.skills.map(skill => <span key={skill} style={{ backgroundColor: '#150f18', border: '1px solid #222', padding: '3px 8px', fontSize: '0.7rem', color: '#aaa' }}>{skill}</span>)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#666' }}><Check size={12} color={theme.accent} /> {master.exp} გამოცდილება</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: კალენდარი და საათები */}
      {/* MODAL 2: კალენდარი და საათები */}
{showCalendarModal && (
  <div onClick={() => setShowCalendarModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
    <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#0d0a12', border: `1px solid rgba(213,63,140,0.4)`, width: '100%', maxWidth: '520px', padding: '40px', position: 'relative' }}>
      <button onClick={() => setShowCalendarModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={22} /></button>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', margin: '0 0 10px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>თარიღი და დრო</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#777', fontSize: '0.85rem' }}>
          <img src={booking.master?.photo} alt="" style={{ width: '22px', height: '22px', objectFit: 'cover', border: `1px solid ${theme.accent}` }} />
          <span>სპეციალისტი: <b style={{ color: '#fff' }}>{booking.master?.name}</b></span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '25px' }}>
        {availableDays.map((day, idx) => {
          const isSelected = booking.date === day.fullDate;
          const masterWorkingDays = booking.master?.working_days || [0,1,2,3,4,5,6];
          const isWorkingDay = masterWorkingDays.includes(day.dayIndex);
          return (
            <button
              key={idx}
              disabled={!isWorkingDay}
              onClick={() => setBooking({...booking, date: day.fullDate, time: null})}
              style={{
                flexShrink: 0, width: '65px', height: '75px',
                border: isSelected ? `1px solid ${theme.accent}` : `1px solid #222`,
                backgroundColor: isSelected ? 'rgba(213, 63, 140, 0.15)' : '#120d16',
                cursor: isWorkingDay ? 'pointer' : 'not-allowed',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                opacity: isWorkingDay ? 1 : 0.25
              }}
            >
              <span style={{ fontSize: '0.65rem', color: isSelected ? theme.accent : '#666' }}>{day.dayName}</span>
              <span style={{ fontSize: '1.2rem', color: isSelected ? '#fff' : '#aaa', fontWeight: '700', margin: '2px 0' }}>{day.dayNum}</span>
              {!isWorkingDay && <span style={{ fontSize: '0.55rem', color: '#ef4444', fontWeight: '700' }}>ისვენებს</span>}
            </button>
          )
        })}
      </div>

      {booking.date ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '35px' }}>
          {booking.master?.time_slots && booking.master.time_slots.length > 0 ? (
            booking.master.time_slots.map((time, idx) => {
              const bookedTimes = dbBookings
                .filter(b => b.master_name === booking.master?.name && b.date === booking.date)
                .map(b => b.time);
              const isSelected = booking.time === time;
              const isBooked = bookedTimes.includes(time);
              return (
                <button
                  key={idx}
                  disabled={isBooked}
                  onClick={() => !isBooked && setBooking({...booking, time})}
                  style={{
                    padding: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: isBooked ? 'not-allowed' : 'pointer',
                    backgroundColor: isBooked ? '#1a1020' : isSelected ? theme.accent : '#160f19',
                    color: isBooked ? '#333' : isSelected ? '#fff' : '#aaa',
                    border: isSelected ? `1px solid ${theme.accent}` : '1px solid #222',
                    textDecoration: isBooked ? 'line-through' : 'none'
                  }}
                >
                  {time}
                </button>
              )
            })
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#444', fontSize: '0.85rem', padding: '10px 0' }}>ამ დღეს თავისუფალი საათები არ არის.</div>
          )}
        </div>
      ) : (
        <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', border: `1px dashed #222`, marginBottom: '35px', fontSize: '0.85rem' }}>გთხოვთ აირჩიოთ სასურველი სამუშაო თარიღი</div>
      )}

      <button
        onClick={() => sendOtp(booking.phone, 'booking')}
        disabled={!booking.date || !booking.time}
        style={{ width: '100%', padding: '18px', backgroundColor: (!booking.date || !booking.time) ? '#222' : '#fff', color: (!booking.date || !booking.time) ? '#555' : '#000', border: 'none', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', cursor: (!booking.date || !booking.time) ? 'not-allowed' : 'pointer' }}
      >
        ჯავშნის დადასტურება
      </button>
    </div>
  </div>
)}
{/* MODAL 3: ამოწერა */}
{showCancelModal && (
  <div onClick={() => setShowCancelModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
    <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#0d0a12', border: '1px solid rgba(239,68,68,0.4)', width: '100%', maxWidth: '480px', padding: '40px', position: 'relative' }}>
      <button onClick={() => setShowCancelModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={22} /></button>
      
      <h2 style={{ fontSize: '1.3rem', textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '2px', textTransform: 'uppercase', color: '#ef4444' }}>ჩანიშვნის გაუქმება</h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.85rem', marginBottom: '30px' }}>შეიყვანეთ ჩანიშვნისას გამოყენებული ნომერი</p>

      {cancelSuccess ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CheckCircle2 size={48} color="#22c55e" style={{ marginBottom: '15px' }} />
          <p style={{ color: '#22c55e', fontSize: '1rem' }}>ჩანიშვნა გაუქმებულია! SMS გაიგზავნა.</p>
        </div>
      ) : cancelStep === 1 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="tel"
            placeholder="ტელეფონის ნომერი (მაგ: 599123456)"
            value={cancelPhone}
            onChange={e => setCancelPhone(e.target.value)}
            style={{ padding: '14px', fontSize: '0.9rem', borderRadius: '0' }}
          />
          <textarea
            placeholder="გაუქმების მიზეზი (არასავალდებულო)"
            value={cancelReason}
            onChange={e => setCancelReason(e.target.value)}
            rows={3}
            style={{ padding: '14px', fontSize: '0.9rem', resize: 'none', borderRadius: '0' }}
          />
          <button
            onClick={findBookingsByPhone}
            style={{ padding: '16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer' }}
          >
            ჩანიშვნის მოძებნა
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '5px' }}>აირჩიეთ გასაუქმებელი ჩანიშვნა:</p>
          {cancelBookings.map(b => (
            <div key={b.id} style={{ border: '1px solid #2a2a2a', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '700', marginBottom: '4px' }}>{b.date} — {b.time}</div>
                <div style={{ color: '#888', fontSize: '0.8rem' }}>{b.service} · {b.master_name}</div>
              </div>
              <button
  onClick={() => { setPendingCancelBooking(b); sendOtp(b.phone, 'cancel'); }}
  style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
>
  გაუქმება
</button>
            </div>
          ))}
          <button
            onClick={() => setCancelStep(1)}
            style={{ padding: '12px', background: 'none', border: '1px solid #333', color: '#888', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            უკან
          </button>
        </div>
      )}
    </div>
  </div>
)}
{/* MODAL 4: OTP დადასტურება */}
{showOtpModal && (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
    <div style={{ backgroundColor: '#0d0a12', border: '1px solid rgba(213,63,140,0.4)', width: '100%', maxWidth: '380px', padding: '40px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.2rem', margin: '0 0 10px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>დადასტურება</h2>
      <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '25px' }}>
        თქვენს ნომერზე გაიგზავნა 4-ციფრიანი კოდი.<br/>შეიყვანეთ ქვემოთ:
      </p>
      <input
        type="number"
        placeholder="0000"
        value={otpInput}
        onChange={e => setOtpInput(e.target.value)}
        maxLength={4}
        style={{ width: '100%', padding: '16px', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '8px', marginBottom: '15px', borderRadius: '0' }}
      />
      <button
        onClick={verifyOtp}
        style={{ width: '100%', padding: '16px', backgroundColor: theme.accent, color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', marginBottom: '10px' }}
      >
        დადასტურება
      </button>
      <button
        onClick={() => { setShowOtpModal(false); setOtpInput(''); setOtpCode(''); }}
        style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid #333', color: '#666', fontSize: '0.8rem', cursor: 'pointer' }}
      >
        გაუქმება
      </button>
    </div>
  </div>
)}
      
    </div>
  );
}