import React from 'react';
import { Compass, ShieldCheck, Heart, Users } from 'lucide-react';

const TEAM = [
  {
    name: "Dt. Pragati Mishra",
    role: "Founder & Lead Wellness Coach",
    bio: "Pragati specializes in clinical women's health, holistic nutrition, and metabolic recovery. She creates custom plans focused on sustainable eating habits, mineral rebalancing, and hormonal vitality.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80"
  },
  {
    name: "Maya Lin",
    role: "Postural Yoga Therapist",
    bio: "Maya holds advanced certifications in pelvic-floor rehabilitation and alignment yoga. She designs safe yoga flows that focus on opening tight joints, core stability, and spinal decompression.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=400&h=500&q=80"
  },
  {
    name: "Sarah Jenkins",
    role: "Mindset & Sleep Counselor",
    bio: "Sarah provides critical emotional guidance. She specializes in maternal stress, helping clients manage sleep architecture, daily habit loops, and anxiety regulation.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=500&q=80"
  }
];

const About = () => {
  return (
    <main>
      {/* About Hero Section */}
      <section className="section container">
        <div className="about-hero-grid">
          <div>
            <h1 style={{ marginBottom: '16px', fontSize: '3rem' }}>Every Healthy Habit Begins with <span>One Small Step</span></h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text)', marginBottom: '24px' }}>
              One Step More was founded by Dt. Pragati Mishra on a simple realization: in the rush of professional workloads and family care, a woman's nutrition, sleep, and core vitality are often the first things forgotten.
            </p>
            <p style={{ color: 'var(--text)' }}>
              We reject rigid, high-stress fitness programs and extreme starvation diets that disrupt your metabolism. True health is built incrementally through small, sustainable habit shifts. We combine evidence-based clinical nutrition, restorative alignment yoga, and stress-resiliency practices to support long-term wellness.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551972251-12070d63502a?auto=format&fit=crop&w=800&q=80" 
              alt="Dt. Pragati Mishra consulting on wellness guides" 
              className="about-hero-img"
            />
          </div>
        </div>

        {/* Feature Icons Section */}
        <div className="about-features">
          <div className="about-feature-item">
            <div className="about-feature-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="about-feature-text">
              <h4>Safety & Science First</h4>
              <p style={{ fontSize: '0.9rem' }}>Every diet plan is clinically optimized for mineral restoration, and all yoga flows are audited to protect joints and spinal alignment.</p>
            </div>
          </div>

          <div className="about-feature-item">
            <div className="about-feature-icon">
              <Compass size={22} />
            </div>
            <div className="about-feature-text">
              <h4>Realistic Habits</h4>
              <p style={{ fontSize: '0.9rem' }}>No rigid schedules. We teach you how to stack healthy micro-habits into 15-30 minute slots that work around busy routines.</p>
            </div>
          </div>

          <div className="about-feature-item">
            <div className="about-feature-icon">
              <Heart size={22} />
            </div>
            <div className="about-feature-text">
              <h4>Hormonal Harmony</h4>
              <p style={{ fontSize: '0.9rem' }}>We support metabolic health, thyroid conversion, and adrenal reserves using anti-inflammatory foods and parasympathetic breathing resets.</p>
            </div>
          </div>

          <div className="about-feature-item">
            <div className="about-feature-icon">
              <Users size={22} />
            </div>
            <div className="about-feature-text">
              <h4>A Supportive Network</h4>
              <p style={{ fontSize: '0.9rem' }}>Join our group circles to share nutrition tips, swap recipes, stay accountable, and share your wellness milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission banner */}
      <section className="section" style={{ backgroundColor: '#FAF6F0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading)', marginBottom: '20px' }}>Our Mission</h2>
          <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--heading)', lineHeight: 1.7 }}>
            "To dismantle the culture of crash physical pressure and extreme dietary deprivation, replacing it with a realistic, evidence-based, and compassionate framework that guides women to lasting health."
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="section container">
        <div className="section-header">
          <h2>Meet Our Experts</h2>
          <p>We work with certified, specialized professionals to guide you safely through every phase of your wellness journey.</p>
        </div>

        <div className="team-grid">
          {TEAM.map((member, index) => (
            <div key={index} className="team-member-card">
              <img 
                src={member.image} 
                alt={member.name} 
                className="team-member-img"
              />
              <div className="team-member-info">
                <h4>{member.name}</h4>
                <p>{member.role}</p>
                <p className="team-member-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
