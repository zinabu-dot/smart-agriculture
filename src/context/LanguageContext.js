import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      contact: 'Contact Us'
    },
    home: {
      welcome: 'Welcome to Smart Agriculture',
      subtitle: 'Revolutionizing farming with modern technology',
      features: {
        smartFarming: {
          title: 'Smart Farming',
          desc: 'Use technology to improve your farming practices'
        },
        expertAdvice: {
          title: 'Expert Advice',
          desc: 'Get guidance from agricultural experts'
        },
        market: {
          title: 'Market Access',
          desc: 'Connect with buyers and sellers'
        }
      }
    },
    services: {
      title: 'Our Services',
      soil: {
        title: 'Soil Analysis',
        shortDesc: 'Get detailed insights about your soil quality',
        longDesc: 'Our advanced soil analysis service provides comprehensive reports on soil pH, nutrient levels, organic matter content, and recommendations for improvement.',
        features: [
          'Detailed soil composition analysis',
          'Nutrient deficiency identification',
          'Customized fertilizer recommendations',
          'pH balance optimization'
        ]
      },
      crop: {
        title: 'Crop Management',
        shortDesc: 'Optimize your crop yields with smart solutions',
        longDesc: 'Our crop management system uses AI and real-time monitoring to maximize your yield.',
        features: [
          'Real-time crop monitoring',
          'Disease early warning system',
          'Irrigation scheduling',
          'Yield prediction'
        ]
      },
      weather: {
        title: 'Weather Forecasting',
        shortDesc: 'Stay updated with accurate weather predictions',
        longDesc: 'Get hyperlocal weather forecasts specifically designed for agricultural needs.',
        features: [
          'Temperature and Humidity Monitoring',
          'Precipitation Forecasting',
          'Frost and Heat Warnings',
          'Agricultural Advisory Alerts'
        ]
      },
      drone: {
        title: 'Drone Services',
        shortDesc: 'Advanced aerial monitoring and precision agriculture',
        longDesc: 'Our drone services provide cutting-edge solutions for crop monitoring.',
        features: [
          'Precision pesticide spraying',
          'Real-time crop health monitoring',
          'Disease detection and mapping',
          '3D field mapping'
        ]
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our expert team',
      form: {
        name: 'Name',
        email: 'Email',
        service: 'Service',
        message: 'Message',
        submit: 'Send Message',
        success: 'Thank you for your message! We will get back to you soon.'
      }
    }
  },
  am: {
    nav: {
      home: 'መነሻ',
      services: 'አገልግሎቶች',
      contact: 'አግኙን'
    },
    home: {
      welcome: 'እንኳን ወደ ስማርት እርሻ በደህና መጡ',
      subtitle: 'የእርሻ ስራን በዘመናዊ ቴክኖሎጂ እያሻሻልን',
      features: {
        smartFarming: {
          title: 'ዘመናዊ እርሻ',
          desc: 'ቴክኖሎጂን ተጠቅመው የእርሻ ስራዎን ያሻሽሉ'
        },
        expertAdvice: {
          title: 'የባለሙያ ምክር',
          desc: 'ከግብርና ባለሙያዎች ምክር ያግኙ'
        },
        market: {
          title: 'የገበያ ትስስር',
          desc: 'ከገዢዎች እና ሻጮች ጋር ይገናኙ'
        }
      }
    },
    services: {
      title: 'አገልግሎቶቻችን',
      soil: {
        title: 'የአፈር ምርመራ',
        shortDesc: 'ስለ አፈርዎ ጥራት ዝርዝር መረጃ ያግኙ',
        longDesc: 'የእኛ የላቀ የአፈር ምርመራ አገልግሎት ስለ አፈር pH፣ የ영양ምግብ መጠን፣ የ有機物 ይዘት እና የማሻሻያ ምክሮችን ያካተተ ሪፖርት ይሰጣል።',
        features: [
          'ዝርዝር የአፈር ይዘት ምርመራ',
          'የንጥረ ነገር እጥረት መለየት',
          'የተበጀ የማዳበሪያ ምክሮች',
          'የpH ሚዛን ማስተካከል'
        ]
      },
      crop: {
        title: 'የሰብል አያያዝ',
        shortDesc: 'በዘመናዊ መፍትሄዎች የሰብል ምርትዎን ያሻሽሉ',
        longDesc: 'የእኛ የሰብል አያያዝ ስርዓት AI እና የቀጥታ ክትትልን በመጠቀም ምርትዎን ያሳድጋል።',
        features: [
          'የቀጥታ ሰብል ክትትል',
          'የበሽታ ቅድመ ማስጠንቀቂያ',
          'የመስኖ መርሃ ግብር',
          'የምርት ትንበያ'
        ]
      },
      weather: {
        title: 'የአየር ሁኔታ ትንበያ',
        shortDesc: 'ትክክለኛ የአየር ሁኔታ ትንበያዎችን ያግኙ',
        longDesc: 'ለግብርና ፍላጎቶች የተበጀ የአካባቢ አየር ሁኔታ ትንበያ ያግኙ።',
        features: [
          'የሙቀት እና እርጥበት ክትትል',
          'የዝናብ ትንበያ',
          'የብርድ እና ሙቀት ማስጠንቀቂያዎች',
          'የግብርና ምክር ማስጠንቀቂያዎች'
        ]
      },
      drone: {
        title: 'የድሮን አገልግሎቶች',
        shortDesc: 'የላቀ የአየር ክትትል እና ትክክለኛ እርሻ',
        longDesc: 'የእኛ የድሮን አገልግሎቶች ለሰብል ክትትል ዘመናዊ መፍትሄዎችን ይሰጣሉ።',
        features: [
          'ትክክለኛ ፀረ-ተባይ መርጫ',
          'የቀጥታ የሰብል ጤና ክትትል',
          'የበሽታ መለየት እና ካርታ',
          'የ3D መስክ ካርታ'
        ]
      }
    },
    contact: {
      title: 'አግኙን',
      subtitle: 'ከባለሙያ ቡድናችን ጋር ይገናኙ',
      form: {
        name: 'ስም',
        email: 'ኢሜይል',
        service: 'አገልግሎት',
        message: 'መልእክት',
        submit: 'መልእክት ይላኩ',
        success: 'ለመልእክትዎ እናመሰግናለን! በቅርቡ እናገኝዎታለን።'
      }
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 