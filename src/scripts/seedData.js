import { db } from '../services/firebase.js';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

const seedDatabase = async () => {
  try {
    console.log('Starting to seed database...');

    // ============================================
    // 1️⃣ SITE CONTENT
    // ============================================

    // About Us
    await setDoc(doc(db, 'siteContent', 'about'), {
      tuitionName: 'Brainy Edu Network',
      tagline: 'Building Confidence, One Child at a Time',
      about: 'At Brainy Edu Network, we believe every child deserves to feel capable, confident, and respected. That\'s why we create small, focused learning environments where students are encouraged to think independently and thrive academically.',
      why: 'We exist to empower students to build confidence and capability, ensuring no child ever feels small or incapable.'
    });
    console.log('✅ Added about content');

    // Contact Info
    await setDoc(doc(db, 'siteContent', 'contact'), {
      address: 'Changloon',
      phone: '+60 13-668 9108',
      whatsappLink: 'https://wa.me/60136689108',
      email: '',
      facebookLink: 'https://facebook.com/brainyed',
      instagramLink: 'https://instagram.com/brainyedu',
      linkedinLink: 'https://linkedin.com/company/brainy-edu'
    });
    console.log('✅ Added contact content');

    // ============================================
    // 2️⃣ CORE VALUES
    // ============================================
    
    const coreValues = [
      { 
        title: 'Empathy', 
        order: 1, 
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        description: 'Understanding and sharing feelings of others'
      },
      { 
        title: 'Patience', 
        order: 2, 
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135679.png',
        description: 'Calm perseverance in every teaching moment'
      },
      { 
        title: 'Growth', 
        order: 3, 
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
        description: 'Continuous improvement and development'
      },
      { 
        title: 'Integrity', 
        order: 4, 
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135681.png',
        description: 'Honest and ethical in all we do'
      },
      { 
        title: 'Confidence', 
        order: 5, 
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135732.png',
        description: 'Building self-belief in every student'
      }
    ];

    for (const value of coreValues) {
      await addDoc(collection(db, 'coreValues'), value);
    }
    console.log('✅ Added core values');

    // ============================================
    // 3️⃣ HOW WE TEACH (with images)
    // ============================================
    
    const howWeTeach = [
      {
        title: 'Small Focused Groups',
        description: 'Ensuring personal attention for every student with maximum 6 students per group',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135810.png',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500',
        order: 1
      },
      {
        title: 'Individualized Learning Plans',
        description: 'Tailored according to student strengths and weaknesses',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500',
        order: 2
      },
      {
        title: 'Confidence-First Learning',
        description: 'Encouraging questions, celebrating small wins, and making mistakes part of the learning process',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135732.png',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
        order: 3
      },
      {
        title: 'Step-by-Step Mastery',
        description: 'Concepts taught gradually until fully mastered',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
        imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500',
        order: 4
      },
      {
        title: 'Interactive & Engaging Lessons',
        description: 'Quizzes, games, and creative activities for fun learning',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135833.png',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500',
        order: 5
      },
      {
        title: 'Parent-Teacher Collaboration',
        description: 'Progress reports and continuous communication',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135697.png',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500',
        order: 6
      },
      {
        title: 'Online & Offline Integration',
        description: 'Flexibility to learn from home or at mini-center',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135821.png',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
        order: 7
      }
    ];

    for (const method of howWeTeach) {
      await addDoc(collection(db, 'howWeTeach'), method);
    }
    console.log('✅ Added how we teach methods');

    // ============================================
    // 4️⃣ SERVICES (with images)
    // ============================================
    
    const services = [
      {
        title: 'Online Tuition',
        description: 'Main subjects: Mathematics, Science, English, Bahasa Malaysia',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135821.png',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
        features: ['Live interactive classes', 'Recorded sessions', 'Digital resources'],
        order: 1
      },
      {
        title: 'Home Tutoring',
        description: 'Personal sessions focused on student weaknesses',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135810.png',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500',
        features: ['One-to-one attention', 'Flexible schedule', 'Progress tracking'],
        order: 2
      },
      {
        title: 'Mini Center Classes',
        description: 'Small group classes with structured learning plans',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135816.png',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500',
        features: ['6 students max', 'Structured curriculum', 'Regular assessments'],
        order: 3
      },
      {
        title: 'Exam Preparation',
        description: 'Intensive sessions before examinations',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135782.png',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500',
        features: ['Past year papers', 'Exam strategies', 'Time management'],
        order: 4
      },
      {
        title: 'Weekend Special Classes',
        description: 'Enrichment programs and critical thinking skills',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135833.png',
        imageUrl: 'https://drive.google.com/file/d/1m6nGLJUINjqaKUyaD2Dcdsx9f4wp22sW/view?usp=drive_link',
        features: ['Creative thinking', 'Problem solving', 'Enrichment activities'],
        order: 5
      },
      {
        title: 'Workshops',
        description: 'Confidence in Math, Creative Writing, Study Skills & Time Management',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
        imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500',
        features: ['Hands-on learning', 'Expert facilitators', 'Certificate'],
        order: 6
      },
      {
        title: 'Progress Tracking',
        description: 'Monthly visual charts showing student improvement',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135690.png',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
        features: ['Monthly reports', 'Parent meetings', 'Goal setting'],
        order: 7
      }
    ];

    for (const service of services) {
      await addDoc(collection(db, 'services'), service);
    }
    console.log('✅ Added services');

    // ============================================
    // 5️⃣ STATS
    // ============================================
    
    await setDoc(doc(db, 'stats', 'main'), {
      classesCount: 1500,
      tutorsCount: 25,
      studentsCount: 450,
      yearsExperience: 12,
      workshopsCount: 48,
      order: 1
    });
    console.log('✅ Added stats');



    // ============================================
    // 7️⃣ SUBJECTS
    // ============================================
    
    const subjects = [
      {
        name: 'Mathematics',
        level: 'Primary & Secondary',
        description: 'Building strong foundations and problem-solving skills',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135711.png',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
        topics: ['Algebra', 'Geometry', 'Calculus'],
        order: 1
      },
      {
        name: 'Science',
        level: 'Primary & Secondary',
        description: 'Understanding scientific concepts through exploration',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500',
        topics: ['Physics', 'Chemistry', 'Biology'],
        order: 2
      },
      {
        name: 'English',
        level: 'All levels',
        description: 'Developing language proficiency and communication skills',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135717.png',
        imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500',
        topics: ['Grammar', 'Writing', 'Literature'],
        order: 3
      },
      {
        name: 'Bahasa Malaysia',
        level: 'All levels',
        description: 'Mastering the national language',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135718.png',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
        topics: ['Tatabahasa', 'Karangan', 'Pemahaman'],
        order: 4
      }
    ];

    for (const subject of subjects) {
      await addDoc(collection(db, 'subjects'), subject);
    }
    console.log('✅ Added subjects');

    // ============================================
    // 8️⃣ PACKAGES (Simplified as requested)
    // ============================================
    
    const packages = [
      // Age Group 4-6 years
      {
        title: 'Little Explorers - One to One',
        ageRange: '4-6 years',
        sessionType: 'one-to-one',
        price: 300,
        sessionsPerMonth: 8,
        hoursPerSession: 1,
        maxSubjects: 3,
        description: 'Personalized one-to-one attention for young learners',
        imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500',
        order: 1
      },
      {
        title: 'Little Explorers - Group',
        ageRange: '4-6 years',
        sessionType: 'group',
        price: 180,
        sessionsPerMonth: 8,
        hoursPerSession: 1.5,
        maxSubjects: 3,
        maxGroupSize: 4,
        description: 'Fun group learning with peers',
        imageUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=500',
        order: 2
      },
      {
        title: 'Young Achievers - One to One',
        ageRange: '7-9 years',
        sessionType: 'one-to-one',
        price: 350,
        sessionsPerMonth: 8,
        hoursPerSession: 1.5,
        maxSubjects: 4,
        description: 'Focused one-to-one coaching',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
        order: 3
      },
      {
        title: 'Young Achievers - Group',
        ageRange: '7-9 years',
        sessionType: 'group',
        price: 200,
        sessionsPerMonth: 8,
        hoursPerSession: 2,
        maxSubjects: 4,
        maxGroupSize: 6,
        description: 'Collaborative group learning',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500',
        order: 4
      },
      {
        title: 'Smart Scholars - One to One',
        ageRange: '10-12 years',
        sessionType: 'one-to-one',
        price: 400,
        sessionsPerMonth: 8,
        hoursPerSession: 2,
        maxSubjects: 5,
        description: 'Advanced one-to-one coaching',
        imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500',
        order: 5
      },
      {
        title: 'Smart Scholars - Group',
        ageRange: '10-12 years',
        sessionType: 'group',
        price: 250,
        sessionsPerMonth: 8,
        hoursPerSession: 2.5,
        maxSubjects: 5,
        maxGroupSize: 8,
        description: 'Advanced group learning',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500',
        order: 6
      },
      {
        title: 'Future Leaders - One to One',
        ageRange: '13-15 years',
        sessionType: 'one-to-one',
        price: 450,
        sessionsPerMonth: 8,
        hoursPerSession: 2,
        maxSubjects: 6,
        description: 'Advanced secondary coaching',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
        order: 7
      },
      {
        title: 'Future Leaders - Group',
        ageRange: '13-15 years',
        sessionType: 'group',
        price: 280,
        sessionsPerMonth: 8,
        hoursPerSession: 3,
        maxSubjects: 6,
        maxGroupSize: 10,
        description: 'Collaborative secondary learning',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500',
        order: 8
      }
    ];

    for (const pkg of packages) {
      await addDoc(collection(db, 'packages'), pkg);
    }
    console.log('✅ Added packages');

    // ============================================
    // 9️⃣ ACHIEVEMENTS
    // ============================================
    
    const achievements = [
      {
        title: '95% of students improved their grades',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135738.png',
        value: '95%',
        description: 'Grade improvement rate',
        order: 1
      },
      {
        title: '500+ successful students',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135722.png',
        value: '500+',
        description: 'Students graduated',
        order: 2
      },
      {
        title: '12 years of excellence',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135678.png',
        value: '12',
        description: 'Years of service',
        order: 3
      },
      {
        title: 'Best Tuition Center 2023',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135728.png',
        value: 'Award',
        description: 'Education Excellence Award',
        order: 4
      }
    ];

    for (const achievement of achievements) {
      await addDoc(collection(db, 'achievements'), achievement);
    }
    console.log('✅ Added achievements');

    // ============================================
    // 🔟 FEEDBACK (simplified - only feedback images)
    // ============================================
    
    const feedbacks = [
      {
        feedbackImage: 'https://drive.google.com/uc?export=view&id=1HK-HPKN8oN77uettupDM99WWZ02lPdhT',
        order: 1
      },
      {
        feedbackImage: 'https://drive.google.com/uc?export=view&id=1eLjHxD2IUSgGS3578XcXamzWtkHPQKnd',
        order: 2
      },
      {
        feedbackImage: 'https://drive.google.com/uc?export=view&id=1-pQh_SW00XXq6sySNb9bUYecUq2era0G',
        order: 3
      },
      {
        feedbackImage: 'https://drive.google.com/uc?export=view&id=1hKItr-PrXnFqxCJrLPAX3ci8XAxdr5VX',
        order: 4
      }
    ];

    for (const feedback of feedbacks) {
      await addDoc(collection(db, 'feedback'), feedback);
    }
    console.log('✅ Added feedback');

    // ============================================
    // 🔟 JOURNALS (Monthly Bulletins/Newsletters)
    // ============================================
    
    const journals = [
      {
        title: 'Student Excellence Awards 2024',
        description: 'We are proud to celebrate our outstanding students who achieved remarkable results in their recent examinations. Their dedication and hard work have truly paid off!',
        category: 'achievement',
        month: 'March',
        day: '15',
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        highlights: [
          '15 students scored straight As',
          'Top scorer in Mathematics nationwide',
          '90% improvement rate across all subjects'
        ],
        order: 1
      },
      {
        title: 'Science Fair Success',
        description: 'Our students participated in the Regional Science Fair and brought home multiple awards. Their innovative projects impressed the judges and showcased their creativity.',
        category: 'event',
        month: 'February',
        day: '28',
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
        highlights: [
          '3 Gold medals won',
          '5 Silver medals achieved',
          'Best Innovation Award received'
        ],
        order: 2
      },
      {
        title: 'New STEM Program Launch',
        description: 'Exciting news! We are launching a comprehensive STEM program for students aged 10-15. The program includes robotics, coding, and hands-on experiments.',
        category: 'announcement',
        month: 'January',
        day: '10',
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
        highlights: [
          'Weekly robotics sessions',
          'Python programming classes',
          'Monthly science experiments',
          'Limited slots available'
        ],
        order: 3
      },
      {
        title: 'Year-End Celebration 2023',
        description: 'We wrapped up an amazing year with our annual celebration! Students showcased their talents through performances, art exhibitions, and presentations.',
        category: 'event',
        month: 'December',
        day: '20',
        year: '2023',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
        highlights: [
          'Over 200 students participated',
          'Cultural performances and talent show',
          'Award ceremony for top achievers',
          'Parent appreciation day'
        ],
        order: 4
      },
      {
        title: 'Online Learning Platform Update',
        description: 'We have upgraded our online learning platform with new features including interactive quizzes, video lessons, and real-time progress tracking for parents.',
        category: 'update',
        month: 'November',
        day: '5',
        year: '2023',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
        highlights: [
          'New interactive quiz system',
          'HD video lessons library',
          'Parent dashboard for tracking',
          'Mobile app enhancement'
        ],
        order: 5
      }
    ];

    for (const journal of journals) {
      await addDoc(collection(db, 'journals'), journal);
    }
    console.log('✅ Added journal entries');

    // ============================================
    // 🌍 STUDENT COUNTRIES (Global Reach)
    // ============================================
    
    const studentCountries = [
      { code: 'MY', name: 'Malaysia', flag: '🇲🇾', students: 156, x: 62, y: 55 },
      { code: 'SG', name: 'Singapore', flag: '🇸🇬', students: 28, x: 65, y: 60 },
      { code: 'ID', name: 'Indonesia', flag: '🇮🇩', students: 15, x: 58, y: 68 },
      { code: 'TH', name: 'Thailand', flag: '🇹🇭', students: 12, x: 55, y: 50 },
      { code: 'PH', name: 'Philippines', flag: '🇵🇭', students: 18, x: 75, y: 48 },
      { code: 'VN', name: 'Vietnam', flag: '🇻🇳', students: 10, x: 68, y: 40 },
      { code: 'AU', name: 'Australia', flag: '🇦🇺', students: 8, x: 75, y: 85 },
      { code: 'IN', name: 'India', flag: '🇮🇳', students: 22, x: 42, y: 62 },
      { code: 'US', name: 'USA', flag: '🇺🇸', students: 5, x: 15, y: 35 },
      { code: 'GB', name: 'UK', flag: '🇬🇧', students: 4, x: 25, y: 20 }
    ];

    for (const country of studentCountries) {
      await addDoc(collection(db, 'studentCountries'), country);
    }
    console.log('✅ Added student countries');

    // ============================================
    // 1️⃣1️⃣ MEDIA (Video & Carousel Images)
    // ============================================
    
    // Highlight Video URL
    await setDoc(doc(db, 'media', 'highlightVideo'), {
      title: 'One-to-One Classes Video',
      videoUrl: 'https://drive.google.com/file/d/1TmmUfEKlHYrX1BgQEohlUzny_nayOWL8/preview',
      description: 'Engaging video about our personalized learning approach',
      type: 'highlight'
    });
    console.log('✅ Added highlight video URL');

    // Carousel Images
    const carouselImages = [
      {
        imageUrl: 'https://drive.google.com/uc?export=view&id=1lWtAmJMIszFN-H6PzmJmgtOfuY8s-Oth',
        order: 1,
        alt: 'Educational learning environment'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1427504494785-cdea0d712d0f?w=500&h=600&fit=crop',
        order: 2,
        alt: 'Student studying'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=600&fit=crop',
        order: 3,
        alt: 'Interactive learning'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1553531889-e6cf7d304f08?w=500&h=600&fit=crop',
        order: 4,
        alt: 'Student achievement'
      }
    ];

    for (const image of carouselImages) {
      await addDoc(collection(db, 'carouselImages'), image);
    }
    console.log('✅ Added carousel images');

    // Class Images - Classes situation/environment
    const classImages = [
      {
        imageUrl: 'https://images.unsplash.com/photo-1577896049080-289f46e49d60?w=500&h=600&fit=crop',
        order: 1,
        alt: 'One-to-one tutoring session'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&h=600&fit=crop',
        order: 2,
        alt: 'Student and teacher interaction'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1516979187457-635ffe35ff04?w=500&h=600&fit=crop',
        order: 3,
        alt: 'Learning environment'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=600&fit=crop',
        order: 4,
        alt: 'Student focused learning'
      }
    ];

    for (const image of classImages) {
      await addDoc(collection(db, 'classImages'), image);
    }
    console.log('✅ Added class images');

    // ============================================
    // COMPLETE
    // ============================================
    
    console.log('\n🎉 DATABASE SEEDED SUCCESSFULLY!');
    console.log('All collections populated with professional images and icons:');
    console.log('1. siteContent (About, Contact)');
    console.log('2. coreValues (with icon URLs)');
    console.log('3. howWeTeach (with images)');
    console.log('4. services (with images)');
    console.log('5. stats');
    console.log('6. subjects');
    console.log('7. packages (simplified)');
    console.log('8. achievements');
    console.log('9. feedback (image URLs only)');
    console.log('10. journals (monthly bulletins/newsletters)');
    console.log('11. studentCountries (global reach)');
    console.log('12. media (highlight video URL)');
    console.log('13. carouselImages (hero carousel images)');
    console.log('14. classImages (class situation images)');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

seedDatabase();