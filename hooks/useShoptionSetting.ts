import { useState, useEffect } from 'react';

export function useShoptionSetting() {
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/919114151617");
  const [whatsappEnabled, setWhatsappEnabled] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSetting() {
      try {
        const res = await fetch('/api/shoption-setting');
        const data = await res.json();
        if (data.whatsapp_bot_link) {
          setWhatsappLink(data.whatsapp_bot_link);
        }
        if (data.whatapp_bot_enabled !== undefined) {
          setWhatsappEnabled(data.whatapp_bot_enabled);
        }
      } catch (error) {
        console.error('Failed to fetch shoption setting:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSetting();
  }, []);

  return { whatsappLink, whatsappEnabled, loading };
}
