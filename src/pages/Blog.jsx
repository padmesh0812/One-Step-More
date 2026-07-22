import React, { useState } from 'react';
import { X, Clock, User, Heart, CheckCircle2, ChevronRight, Apple } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: "5 Gentle Exercises to Rebuild Your Core & Posture Safely",
    excerpt: "Learn the gentle movement progressions that rebuild abdominal strength, relieve spinal pressure, and correct posture. Crucial safety tips included.",
    category: "Movement",
    author: "Maya Lin (Yoga Therapist)",
    date: "July 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    content: (
      <div className="blog-content-body">
        <p>Whether you are recovering from childbirth or combatting long sitting hours at a desk, standard core workouts like sit-ups, crunches, and heavy front planks can put excess strain on your lower spine and trigger muscle imbalances.</p>
        
        <h4>Understanding Deep Core Rehab</h4>
        <p>True core stability starts with the Transverse Abdominis (TVA) and the pelvic floor. These deep structural stabilizers act as your body's natural corset, supporting posture, reducing back pain, and flattening the abdominal wall from the inside out.</p>
        
        <h4>The 5 Safe Exercises</h4>
        <ol>
          <li>
            <strong>Diaphragmatic Breathing:</strong>
            <p>Lie on your back with knees bent. Place one hand on your chest and one on your belly. Inhale deeply, letting your ribs and abdomen expand outwards. As you exhale slowly, pull your navel gently toward your spine while lifting your pelvic floor. Repeat 10 times.</p>
          </li>
          <li>
            <strong>Supine Pelvic Tilts:</strong>
            <p>Lie on your back, knees bent, feet flat. Inhale. On the exhale, tilt your pelvis backward, pressing your lower back flat into the mat. Hold for 3 seconds, then release. Do 12 repetitions.</p>
          </li>
          <li>
            <strong>Heel Slides:</strong>
            <p>On your back with knees bent, engage your lower abdomen. Slowly slide your right heel forward along the floor until your leg is straight, then draw it back. Alternate sides, keeping your pelvis completely stable. Do 8 per leg.</p>
          </li>
          <li>
            <strong>Glute Bridges:</strong>
            <p>Press your heels flat and squeeze your glutes to lift your hips in a straight line from knees to shoulders. Do not arch your lower back. Lower down slowly. Repeat 10 times.</p>
          </li>
          <li>
            <strong>Opposite Arm-Leg Extension (Bird-Dog):</strong>
            <p>On hands and knees, extend your right arm forward and left leg backward. Keep your hips level and head in line with your spine. Hold for 3 seconds. Alternate sides. Repeat 8 times per side.</p>
          </li>
        </ol>
      </div>
    )
  },
  {
    id: 2,
    title: "Women's Recovery Nutrition: Essential Mineral Rebalancing",
    excerpt: "Restoring depleted mineral reserves is vital for thyroid, adrenal, and overall energy function. Discover Dt. Pragati's golden rules.",
    category: "Nutrition",
    author: "Dt. Pragati Mishra (Dietitian)",
    date: "July 08, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    content: (
      <div className="blog-content-body">
        <p>Postpartum depletion and metabolic sluggishness are clinical realities. When our bodies undergo high-stress windows (such as pregnancy, lactation, or high professional burnout), minerals are drawn directly from bones and tissues, leading to chronic fatigue, thyroid slowdown, and hormonal crashes.</p>
        
        <h4>Why Starvation Diets Fail</h4>
        <p>Restricting calories immediately to lose weight triggers high cortisol (stress hormone) signals, slowing down thyroid conversion and stalling your metabolism. Sustainable weight loss is built on protein-dense and mineral-sufficient nutrition, not extreme deprivation.</p>
        
        <h4>Core Rebalancing Micronutrients</h4>
        <ul>
          <li>
            <strong>Iron:</strong> Transports oxygen throughout the body. Deficiencies lead to chronic exhaustion and brain fog.
            <br /><em>Sources:</em> Grass-fed meats, lentils, pumpkin seeds, dark leafy greens.
          </li>
          <li>
            <strong>Zinc:</strong> Vital for enzyme systems, gut lining repair, immune function, and thyroid hormone synthesis.
            <br /><em>Sources:</em> Pumpkin seeds, sesame seeds, chickpeas, oysters.
          </li>
          <li>
            <strong>Magnesium:</strong> Calms the nervous system, supports sleep architecture, and reduces stress-induced sugar cravings.
            <br /><em>Sources:</em> Cacao nibs, almonds, spinach, avocado.
          </li>
        </ul>

        <h4>Dt. Pragati's Rule: Warm & Digestible</h4>
        <p>When recovering from burnout or birth, prioritize warm, slow-cooked foods. Sluggish digestion cannot process raw, cold foods efficiently. Warm broths, grain bowls, and slow-cooked oats are excellent vessels for rebuilding tissue gently.</p>
      </div>
    )
  },
  {
    id: 3,
    title: "Circadian Rhythm Reset: Manage Cortisol, Mood, and Sleep",
    excerpt: "Nervous system fatigue is real. Read our doula's practical tips for resetting your biological clock and managing daily cortisol spikes.",
    category: "Mindfulness",
    author: "Sarah Jenkins (Certified Doula)",
    date: "June 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
    content: (
      <div className="blog-content-body">
        <p>Managing the emotional and physical demands of motherhood or career stress requires a well-supported nervous system. When sleep is interrupted or stress levels remain high, our stress hormone (cortisol) remains elevated, disrupting progesterone levels and leading to mood swings.</p>
        
        <h4>Nervous System Reset Exercises</h4>
        <ol>
          <li>
            <strong>Vagal Breathing (4-7-8 Technique):</strong>
            <p>Inhale for 4 seconds, hold for 7 seconds, and exhale slowly for 8 seconds. This directly activates the vagus nerve to slow down your heart rate and lower stress hormones instantly.</p>
          </li>
          <li>
            <strong>Circadian Sun Exposure:</strong>
            <p>Step outside for 10 minutes in the morning light. Early sun exposure halts melatonin production and resets your internal biological clock, helping you fall asleep faster at night.</p>
          </li>
          <li>
            <strong>Guided Body Scans:</strong>
            <p>Before bed, practice a 5-minute progressive muscle relaxation body scan to release stored physical tension in the jaw, shoulders, and lower back.</p>
          </li>
        </ol>
      </div>
    )
  }
];

const RECIPE = {
  title: "Thyroid & Metabolic Healing Oats",
  desc: "Warm, mineral-dense oats packed with trace elements to support hormone mapping, active metabolism, and energy reserves.",
  image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",
  prep: "5 mins",
  cook: "10 mins",
  servings: "1 Serving",
  ingredients: [
    "1/2 cup Organic rolled oats (slow carbs & fiber)",
    "1 cup Unsweetened almond milk (hydration base)",
    "1 tbsp Ground flaxseeds (healthy omega-3 fats)",
    "1 tbsp Chia seeds (mineral binding & digestion)",
    "1 tbsp Pumpkin seeds (zinc for thyroid conversion)",
    "1/4 cup Walnuts (healthy brain fats)",
    "1 tbsp Raw honey (natural energy catalyst)",
    "Pinch of sea salt and cinnamon (warming metabolic spices)"
  ],
  instructions: [
    "Combine rolled oats, almond milk, cinnamon, and a pinch of salt in a saucepan.",
    "Bring to a gentle boil, then simmer on low for 6-8 minutes, stirring occasionally until creamy.",
    "Remove from heat. Stir in ground flaxseeds and chia seeds until incorporated.",
    "Pour into a bowl. Top with walnuts, pumpkin seeds, raw honey, and fresh berries.",
    "Eat warm to optimize digestive enzyme absorption."
  ],
  nutrition: [
    { label: "Calories", val: "390 kcal" },
    { label: "Protein", val: "11g" },
    { label: "Zinc", val: "18% DV" },
    { label: "Fiber", val: "9g" },
    { label: "Omega-3", val: "2.3g" }
  ]
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeRecipeTab, setActiveRecipeTab] = useState("ingredients");

  const filteredPosts = activeCategory === "All" 
    ? POSTS 
    : POSTS.filter(post => post.category === activeCategory);

  return (
    <main>
      {/* Blog Hero Section */}
      <section className="section container">
        <div className="section-header">
          <h1>Wellness <span>Blog</span></h1>
          <p>Healthy recipes, core rehab exercises, and lifestyle habit guides written by our qualified coaches.</p>
        </div>

        {/* Filters */}
        <div className="blog-filters">
          {["All", "Nutrition", "Movement", "Mindfulness"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="blog-card" onClick={() => setSelectedPost(post)}>
              <img src={post.image} alt={post.title} className="blog-card-img" />
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-tag">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="blog-read-more">
                  Read Article <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPost(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="modal-body" style={{ padding: '40px' }}>
              <div className="blog-modal-header">
                <span className="modal-tag">{selectedPost.category}</span>
                <h2 className="modal-title" style={{ fontSize: '2rem', marginTop: '8px' }}>{selectedPost.title}</h2>
                <div className="blog-modal-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} /> By {selectedPost.author}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {selectedPost.readTime}
                  </span>
                </div>
              </div>
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '24px' }} 
              />
              {selectedPost.content}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Recipe Widget */}
      <section className="section recipe-widget-section">
        <div className="container">
          <div className="section-header">
            <h2>Healthy Recipe Spot</h2>
            <p>Nutrition is a key pillar of energy restoration. Try our healthy hormone balancing recipe of the month.</p>
          </div>

          <div className="recipe-container">
            <div className="recipe-image-box">
              <img src={RECIPE.image} alt={RECIPE.title} className="recipe-img" />
              <span className="recipe-badge">Metabolic Superfood</span>
            </div>
            
            <div className="recipe-details">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
                <Apple size={16} /> Recipe of the Month
              </div>
              <h3>{RECIPE.title}</h3>
              <p className="recipe-desc">{RECIPE.desc}</p>

              <div className="recipe-meta-badges">
                <span className="recipe-meta-tag"><Clock size={14} /> Prep: {RECIPE.prep}</span>
                <span className="recipe-meta-tag"><Clock size={14} /> Cook: {RECIPE.cook}</span>
                <span className="recipe-meta-tag"><CheckCircle2 size={14} /> {RECIPE.servings}</span>
              </div>

              {/* Recipe Tabs */}
              <div className="recipe-tabs">
                <button
                  className={`recipe-tab-btn ${activeRecipeTab === 'ingredients' ? 'active' : ''}`}
                  onClick={() => setActiveRecipeTab('ingredients')}
                >
                  Ingredients
                </button>
                <button
                  className={`recipe-tab-btn ${activeRecipeTab === 'instructions' ? 'active' : ''}`}
                  onClick={() => setActiveRecipeTab('instructions')}
                >
                  Instructions
                </button>
                <button
                  className={`recipe-tab-btn ${activeRecipeTab === 'nutrition' ? 'active' : ''}`}
                  onClick={() => setActiveRecipeTab('nutrition')}
                >
                  Nutritional Value
                </button>
              </div>

              <div className="recipe-tab-content">
                {activeRecipeTab === 'ingredients' && (
                  <ul className="recipe-list">
                    {RECIPE.ingredients.map((ing, idx) => (
                      <li key={idx} className="recipe-list-item">
                        <Heart size={14} fill="var(--primary)" color="var(--primary)" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeRecipeTab === 'instructions' && (
                  <ol className="recipe-list">
                    {RECIPE.instructions.map((step, idx) => (
                      <li key={idx} className="recipe-list-item">
                        <span className="num">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {activeRecipeTab === 'nutrition' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {RECIPE.nutrition.map((nut, idx) => (
                      <div key={idx} style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'center', backgroundColor: 'var(--background)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{nut.label}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--heading)' }}>{nut.val}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
